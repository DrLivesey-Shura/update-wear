import Hero from "@/Components/home/hero";
import NewArrivals from "@/Components/home/new-arrivals";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <NewArrivals />
    </main>
  );
}
