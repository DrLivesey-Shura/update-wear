"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Order, ContactMessage } from "@/lib/types";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [activeTab, setActiveTab] = useState<"orders" | "messages">("orders");

  useEffect(() => {
    checkAuth();
    fetchOrders();
    fetchMessages();
  }, []);

  const checkAuth = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.push("/admin/login");
    }
  };

  const fetchOrders = async () => {
    const { data } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setOrders(data);
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setMessages(data);
  };

  const handleOrderStatus = async (
    orderId: string,
    status: "accepted" | "rejected",
    response: string
  ) => {
    const { error } = await supabase
      .from("orders")
      .update({ status, admin_response: response })
      .eq("id", orderId);

    if (!error) {
      fetchOrders();
    }
  };

  const handleMessageResponse = async (messageId: string, response: string) => {
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "read", admin_response: response })
      .eq("id", messageId);

    if (!error) {
      fetchMessages();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
              </div>
            </div>
            <button
              onClick={() => supabase.auth.signOut()}
              className="ml-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Sign Out
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex">
            <button
              className={`${
                activeTab === "orders"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm mr-8`}
              onClick={() => setActiveTab("orders")}
            >
              Orders
            </button>
            <button
              className={`${
                activeTab === "messages"
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              onClick={() => setActiveTab("messages")}
            >
              Messages
            </button>
          </nav>
        </div>

        {/* Content */}
        {activeTab === "orders" ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow rounded-lg p-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium">
                      {order.product_name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {order.customer_name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {order.customer_email}
                    </p>
                  </div>
                  <div className="text-right">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
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
                    <textarea
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Add a response..."
                      rows={2}
                    />
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          handleOrderStatus(
                            order.id,
                            "accepted",
                            "Order accepted"
                          )
                        }
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() =>
                          handleOrderStatus(
                            order.id,
                            "rejected",
                            "Order rejected"
                          )
                        }
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="bg-white shadow rounded-lg p-6">
                <div>
                  <h3 className="text-lg font-medium">{message.name}</h3>
                  <p className="text-sm text-gray-500">{message.email}</p>
                  <p className="mt-2">{message.message}</p>
                </div>

                {message.status === "unread" && (
                  <div className="mt-4 space-y-2">
                    <textarea
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Write a response..."
                      rows={2}
                    />
                    <button
                      onClick={() =>
                        handleMessageResponse(message.id, "Response sent")
                      }
                      className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                    >
                      Send Response
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
