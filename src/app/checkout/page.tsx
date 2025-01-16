"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CheckoutFormData } from "@/lib/types";
import { Alert, AlertDescription } from "@/Components/ui/alert";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string>("");
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
    const productId = searchParams.get("productId");
    if (!productId) {
      router.push("/products");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      productId: searchParams.get("productId") || "",
      productName: searchParams.get("productName") || "",
      price: searchParams.get("price") || "",
      color: searchParams.get("color") || "",
      size: searchParams.get("size") || "",
    }));
  }, [searchParams, router]);

  const validateForm = (): boolean => {
    if (!formData.fullName.trim()) {
      setError("Please enter your full name");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return false;
    }
    if (!formData.location.trim()) {
      setError("Please enter your delivery address");
      return false;
    }
    if (!formData.city.trim()) {
      setError("Please enter your city");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/submit-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      router.push("/checkout/success");
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to submit order"
      );
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
    setError("");
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <p className="font-medium">Product:</p>
              <p>{formData.productName}</p>
              <p className="font-medium">Price:</p>
              <p>${formData.price}</p>
              <p className="font-medium">Color:</p>
              <p className="capitalize">{formData.color}</p>
              <p className="font-medium">Size:</p>
              <p>{formData.size}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Additional Notes */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
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
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-black focus:border-transparent"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Processing..." : "Place Order"}
          </button>
        </form>
      </div>
    </div>
  );
}
