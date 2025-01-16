"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckoutFormData } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    productId: "",
    productName: "",
    price: "",
    color: "",
    size: "",
    fullName: "",
    email: "",
    phone: "",
    location: "",
    city: "",
    deliveryType: "home",
    additionalNotes: "",
  });

  useEffect(() => {
    // Get product details from URL parameters
    const productId = searchParams.get("productId") || "";
    const productName = searchParams.get("productName") || "";
    const price = searchParams.get("price") || "";
    const color = searchParams.get("color") || "";
    const size = searchParams.get("size") || "";

    setFormData((prev) => ({
      ...prev,
      productId,
      productName,
      price,
      color,
      size,
    }));
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Here you would typically send the data to your API
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to success page or show success message
        router.push("/checkout/success");
      } else {
        throw new Error("Failed to submit order");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error submitting your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        {/* Product Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Product:</span>{" "}
              {formData.productName}
            </p>
            <p>
              <span className="font-medium">Price:</span> ${formData.price}
            </p>
            <p>
              <span className="font-medium">Color:</span> {formData.color}
            </p>
            <p>
              <span className="font-medium">Size:</span> {formData.size}
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium mb-1"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium mb-1"
                >
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="deliveryType"
                  className="block text-sm font-medium mb-1"
                >
                  Delivery Type *
                </label>
                <select
                  id="deliveryType"
                  name="deliveryType"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.deliveryType}
                  onChange={handleChange}
                >
                  <option value="home">Home Delivery</option>
                  <option value="office">Office Delivery</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-1"
                >
                  Address *
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium mb-1"
                >
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="additionalNotes"
                  className="block text-sm font-medium mb-1"
                >
                  Additional Notes
                </label>
                <textarea
                  id="additionalNotes"
                  name="additionalNotes"
                  rows={3}
                  className="w-full px-4 py-2 border rounded-md"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
