import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-[600px]">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero.png')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-6">Discover Your Style</h1>
          <p className="text-xl mb-8">
            Find the perfect pieces for your wardrobe
          </p>
          <Link
            href="/products"
            className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </div>
  );
}
