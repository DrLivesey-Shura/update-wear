import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import products from "@/lib/data/products";

const newArrivals: Product[] = products;

export default function NewArrivals() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">New Arrivals</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newArrivals.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group"
            >
              <div className="relative aspect-square mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg group-hover:opacity-75 transition"
                />
              </div>
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">${product.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
