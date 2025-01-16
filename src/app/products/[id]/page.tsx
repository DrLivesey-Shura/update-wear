import { products } from "@/lib/data/products";
import Image from "next/image";
import Link from "next/link";

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

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
                    className="px-4 py-2 border rounded-md hover:bg-gray-50"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
