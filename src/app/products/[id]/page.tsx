// app/products/[id]/page.tsx
"use client";

import { products } from "@/lib/data/products";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }

    // Create URL with product details
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
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="mb-8">
          <Link href="/products" className="text-gray-600 hover:text-gray-900">
            ← Back to Products
          </Link>
        </nav>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative aspect-square rounded-lg overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl">${product.price}</p>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Color</h3>
              <p className="text-gray-600">{product.color}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Select Size</h3>
              <div className="flex gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-md transition ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {/* Size guide or error message */}
              <p className="text-sm text-red-500 mt-2 h-5">
                {selectedSize === "" ? "Please select a size" : ""}
              </p>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition disabled:bg-gray-400"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
