import ProductFilters from "@/Components/products/product-filters";
import ProductGrid from "@/Components/products/product-grid";
import { products } from "@/lib/data/products";
import { useState } from "react";

export default function ProductsPage() {
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          <div className="flex-1">
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
