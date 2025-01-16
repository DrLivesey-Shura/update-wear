import { Product } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

interface ProductGridProps {
  products: Product[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="group"
        >
          <div className="relative aspect-square mb-4 overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <div className="mt-2 flex gap-2">
            {product.sizes.slice(0, 3).map((size) => (
              <span key={size} className="text-sm text-gray-500">
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-sm text-gray-500">
                +{product.sizes.length - 3}
              </span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
