"use client";

import { products } from "@/lib/data/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/lib/types";
import { Alert, AlertDescription } from "@/Components/ui/alert";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [error, setError] = useState<string>("");
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Alert variant="destructive">
          <AlertDescription>
            Product not found. Please check the URL or return to the{" "}
            <Link href="/products" className="underline">
              products page
            </Link>
            .
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setError("");
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      setError("Please select a size before proceeding");
      return;
    }

    const queryParams = new URLSearchParams({
      productId: product.id,
      productName: product.name,
      price: product.price.toString(),
      color: product.color,
      size: selectedSize,
    }).toString();

    router.push(`/checkout?${queryParams}`);
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Products
          </Link>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-2xl font-semibold mt-2">
                ${product.price.toLocaleString()}
              </p>
            </div>

            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Color</h3>
              <div className="flex items-center mt-2">
                <span
                  className="w-6 h-6 rounded-full border"
                  style={{ backgroundColor: product.color }}
                />
                <span className="ml-2 text-gray-600 capitalize">
                  {product.color}
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Select Size</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md transition-all duration-200 ${
                      selectedSize === size
                        ? "bg-black text-white border-black"
                        : "hover:bg-gray-50 hover:border-black"
                    }`}
                    onClick={() => handleSizeSelect(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!selectedSize}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
