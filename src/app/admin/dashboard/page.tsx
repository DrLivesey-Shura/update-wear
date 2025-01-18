"use client";

import { CldUploadWidget } from "next-cloudinary";
import React, { useEffect, useState } from "react";
import { Order, ContactMessage, Product } from "@/lib/types";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { Card, CardHeader, CardContent } from "@/Components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Button } from "@/Components/ui/button";
import { Textarea } from "@/Components/ui/textarea";
import { sendOrderStatusEmail } from "@/utils/email";
import { Mail, Pencil, Phone, Plus, Trash, Upload } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Image from "next/image";

type TabType = "orders" | "messages";
type OrderStatus = "pending" | "accepted" | "rejected";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<TabType>("orders");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    color: "",
    sizes: [],
    image: "",
    description: "",
  });
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>("");

  useEffect(() => {
    const initialize = async () => {
      try {
        await checkAuth();
        await Promise.all([fetchOrders(), fetchMessages(), fetchProducts()]);
      } catch (err) {
        setError("Failed to initialize dashboard");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    // Ensure Cloudinary is properly initialized
    if (typeof window !== "undefined" && (window as any).cloudinary) {
      (window as any).cloudinary.applyUploadWidget;
    }
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error || !session) {
      router.push("/admin/login");
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (err) {
      setError("Failed to fetch orders");
      console.error(err);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (err) {
      setError("Failed to fetch messages");
      console.error(err);
    }
  };

  const handleOrderStatus = async (orderId: string, status: OrderStatus) => {
    try {
      const response = responses[orderId] || "";
      const { error: updateError } = await supabase
        .from("orders")
        .update({ status, admin_response: response })
        .eq("id", orderId);

      if (updateError) throw updateError;

      // Get the complete order details
      const { data: orderData, error: fetchError } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (fetchError) throw fetchError;

      // Send status update email
      const emailResult = await sendOrderStatusEmail(
        orderData,
        status,
        response
      );

      if (!emailResult.success) {
        console.error("Failed to send status update email");
        setError("Order updated but failed to send email notification");
      }

      // Clear response field after successful update
      setResponses((prev) => {
        const newResponses = { ...prev };
        delete newResponses[orderId];
        return newResponses;
      });

      await fetchOrders();
    } catch (err) {
      setError(`Failed to update order status: ${err}`);
      console.error(err);
    }
  };

  const handleMessageStatus = async (
    messageId: string,
    status: "read" | "unread"
  ) => {
    try {
      // Update message status in Supabase
      const { error } = await supabase
        .from("contact_messages")
        .update({ status })
        .eq("id", messageId);

      if (error) throw error;

      // Refresh messages list to show updated status
      await fetchMessages();
    } catch (err) {
      setError(`Failed to update message status: ${err}`);
      console.error(err);
    }
  };

  const handleResponseChange = (id: string, value: string) => {
    setResponses((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("name");

      if (error) throw error;
      setProducts(data || []);
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!uploadedImageUrl) {
        setError("Please upload an image first");
        return;
      }

      if (editingProduct) {
        const { error } = await supabase
          .from("products")
          .update({
            name: productForm.name,
            price: productForm.price,
            color: productForm.color,
            sizes: productForm.sizes,
            image: uploadedImageUrl,
            description: productForm.description,
          })
          .eq("id", editingProduct.id);

        if (error) throw error;
      } else {
        const productData = {
          name: productForm.name,
          price: productForm.price,
          color: productForm.color,
          sizes: productForm.sizes || [],
          image: uploadedImageUrl,
          description: productForm.description,
        };

        const { error } = await supabase.from("products").insert([productData]);
        if (error) throw error;
      }

      await fetchProducts();
      setIsProductDialogOpen(false);
      resetProductForm();
    } catch (err) {
      setError(
        `Failed to ${editingProduct ? "update" : "create"} product: ${err}`
      );
      console.error(err);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", productId);

        if (error) throw error;
        await fetchProducts();
      } catch (err) {
        setError("Failed to delete product");
        console.error(err);
      }
    }
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      price: 0,
      color: "",
      sizes: [],
      image: "",
      description: "",
    });
    setUploadedImageUrl("");
    setEditingProduct(null);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      price: product.price,
      color: product.color,
      sizes: product.sizes,
      image: product.image,
      description: product.description,
    });
    setUploadedImageUrl(product.image);
    setIsProductDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <Button
              variant="ghost"
              onClick={() => supabase.auth.signOut()}
              className="ml-4"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
        >
          <TabsList>
            <TabsTrigger value="orders">Orders ({orders.length})</TabsTrigger>
            <TabsTrigger value="messages">
              Messages ({messages.length})
            </TabsTrigger>
            <TabsTrigger value="products">
              Products ({products.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium">
                          {order.product_name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.product_color} / {order.product_size}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer_name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.customer_email}
                        </p>
                        <p className="text-sm text-gray-500">
                          {order.delivery_address}
                        </p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "accepted"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                    </div>

                    {order.status === "pending" && (
                      <div className="mt-4 space-y-2">
                        <Textarea
                          value={responses[order.id] || ""}
                          onChange={(e) =>
                            handleResponseChange(order.id, e.target.value)
                          }
                          placeholder="Add a response..."
                          rows={2}
                        />
                        <div className="flex space-x-2">
                          <Button
                            onClick={() =>
                              handleOrderStatus(order.id, "accepted")
                            }
                            variant="default"
                            className="bg-green-500 hover:bg-green-600"
                          >
                            Accept
                          </Button>
                          <Button
                            onClick={() =>
                              handleOrderStatus(order.id, "rejected")
                            }
                            variant="destructive"
                          >
                            Reject
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-6">
              {messages.map((message) => (
                <Card key={message.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-medium">{message.name}</h3>
                        <div className="mt-1 space-y-1">
                          <p className="text-sm text-gray-500">
                            <Mail className="w-4 h-4 inline mr-1" />
                            {message.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            <Phone className="w-4 h-4 inline mr-1" />
                            {message.phone}
                          </p>
                        </div>
                        <p className="mt-4">{message.message}</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Received:{" "}
                          {new Date(message.created_at).toLocaleString()}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${
                  message.status === "unread"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-800"
                }`}
                      >
                        {message.status}
                      </span>
                    </div>

                    {message.status === "unread" && (
                      <div className="mt-4 flex space-x-2">
                        <Button
                          onClick={() =>
                            (window.location.href = `mailto:${message.email}`)
                          }
                          variant="outline"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Reply by Email
                        </Button>
                        <Button
                          onClick={() =>
                            (window.location.href = `tel:${message.phone}`)
                          }
                          variant="outline"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          onClick={() =>
                            handleMessageStatus(message.id, "read")
                          }
                          variant="default"
                        >
                          Mark as Read
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="products">
            <div className="mb-6">
              <Button
                onClick={() => {
                  resetProductForm();
                  setIsProductDialogOpen(true);
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Product
              </Button>
            </div>

            <div className="space-y-6">
              {products.map((product) => (
                <Card key={product.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="text-lg font-medium">{product.name}</h3>
                        <p className="text-sm text-gray-500">
                          Color: {product.color}
                        </p>
                        <p className="text-sm text-gray-500">
                          Sizes: {product.sizes.join(", ")}
                        </p>
                        <p className="text-sm text-gray-500">
                          Price: ${product.price}
                        </p>
                        <p className="mt-2">{product.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          onClick={() => openEditDialog(product)}
                        >
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Dialog
              open={isProductDialogOpen}
              onOpenChange={setIsProductDialogOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleProductSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label>Product Image</Label>
                    <div className="flex flex-col items-center gap-4">
                      {uploadedImageUrl && (
                        <div className="relative w-40 h-40">
                          <Image
                            src={uploadedImageUrl}
                            alt="Product preview"
                            fill
                            className="object-cover rounded-md"
                          />
                        </div>
                      )}
                      <CldUploadWidget
                        uploadPreset="update-wear"
                        onSuccess={(result: any) => {
                          if (result.info && result.info.secure_url) {
                            setUploadedImageUrl(result.info.secure_url);
                            setTimeout(() => {
                              setIsProductDialogOpen(true);
                            }, 1000);
                          }
                        }}
                      >
                        {({ open }) => {
                          const handleImageUpload = () => {
                            setIsProductDialogOpen(false);
                            // Add a slightly longer delay before opening the widget
                            setTimeout(() => {
                              if (open) {
                                open();
                              }
                            }, 300);
                          };

                          return (
                            <Button
                              type="button"
                              variant="outline"
                              className="w-full"
                              onClick={handleImageUpload}
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Upload Image
                            </Button>
                          );
                        }}
                      </CldUploadWidget>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value),
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="color">Color</Label>
                    <Input
                      id="color"
                      value={productForm.color}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          color: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                    <Input
                      id="sizes"
                      value={productForm.sizes?.join(", ")}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          sizes: e.target.value.split(",").map((s) => s.trim()),
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={productForm.description}
                      onChange={(e) =>
                        setProductForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsProductDialogOpen(false);
                        resetProductForm();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingProduct ? "Update" : "Create"} Product
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
