import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    name: "Classic Balck Cotton T-Shirt",
    price: 29.99,
    color: "White",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/blackshirt.png",
    description:
      "Premium cotton basic tee with a comfortable fit and durable fabric. Perfect for everyday wear.",
  },
  {
    id: "2",
    name: "Slim Fit Denim Jeans",
    price: 79.99,
    color: "Dark Blue",
    sizes: ["30", "32", "34", "36"],
    image: "/products/jeans.png",
    description:
      "Modern slim-fit jeans made from high-quality stretch denim. Features a classic five-pocket design.",
  },
  {
    id: "3",
    name: "Casual Hooded Sweatshirt",
    price: 49.99,
    color: "Gray",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/products/sweater.png",
    description:
      "Cozy cotton-blend hoodie with kangaroo pocket and adjustable drawstring hood.",
  },
  {
    id: "4",
    name: "Classic White Cotton T-Shirt",
    price: 89.99,
    color: "Blue Floral",
    sizes: ["XS", "S", "M", "L"],
    image: "/products/whiteshirt.jpg",
    description:
      "Light and airy summer dress with delicate floral print. Features a flattering A-line silhouette.",
  },
  {
    id: "5",
    name: "Athletic Performance Jeans",
    price: 34.99,
    color: "Black",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/jeans2.jpg",
    description:
      "Moisture-wicking athletic shorts with built-in liner. Perfect for running and gym workouts.",
  },
  {
    id: "6",
    name: "Leather Bomber Jacket",
    price: 199.99,
    color: "Brown",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/jacket1.jpg",
    description:
      "Classic leather bomber jacket with ribbed cuffs and collar. Features a soft inner lining.",
  },
  {
    id: "7",
    name: "Striped blue Polo Shirt",
    price: 39.99,
    color: "Navy/White",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: "/products/blueshirt.png",
    description:
      "Casual striped polo shirt made from breathable pique cotton. Perfect for golf or casual wear.",
  },
  {
    id: "8",
    name: "High-Waisted jeans Pants",
    price: 59.99,
    color: "Purple",
    sizes: ["XS", "S", "M", "L"],
    image: "/products/jeans3.jpg",
    description:
      "Stretchy high-waisted yoga pants with pocket. Made from moisture-wicking fabric for maximum comfort.",
  },
  {
    id: "9",
    name: "Formal Business Blazer jacket",
    price: 149.99,
    color: "Charcoal",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/jacket2.png",
    description:
      "Professional single-breasted blazer with subtle check pattern. Perfect for office wear.",
  },
  {
    id: "10",
    name: "Printed Graphic Jacket",
    price: 24.99,
    color: "Black",
    sizes: ["S", "M", "L", "XL"],
    image: "/products/jacket3.png",
    description:
      "Cotton graphic tee featuring original artwork. Limited edition design with premium print quality.",
  },
];

export default products;
