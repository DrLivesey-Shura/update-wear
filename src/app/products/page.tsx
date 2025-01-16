"use client";

import { useEffect, useState } from "react";
import ProductFilters from "@/Components/products/product-filters";
import ProductGrid from "@/Components/products/product-grid";
import { Product } from "@/lib/types";
import { supabase } from "@/lib/supabase/client";
import { Alert, AlertDescription } from "@/Components/ui/alert";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        console.log("Fetching products...");
        const { data, error } = await supabase.from("products").select("*");

        console.log("Supabase response:", { data, error });

        if (error) {
          throw error;
        }

        setProducts(data || []);
      } catch (err) {
        console.error("Error details:", err);
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-64 flex-shrink-0">
            <ProductFilters />
          </div>

          <div className="flex-1">
            {isLoading ? (
              // Loading skeleton
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-lg aspect-[3/4] animate-pulse"
                  />
                ))}
              </div>
            ) : products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
