export interface Product {
  id: string;
  name: string;
  price: number;
  color: string;
  sizes: string[];
  image: string;
  description: string;
}
export interface CheckoutFormData {
  // Product details
  productId: string;
  productName: string;
  price: string;
  color: string;
  size: string;

  // Customer details
  fullName: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  deliveryType: "home" | "office";
  additionalNotes?: string;
}

export interface Order {
  id: string;
  created_at: string;
  product_id: string;
  product_name: string;
  product_color: string;
  product_size: string;
  price: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  delivery_type: "home" | "office";
  city: string;
  status: "pending" | "accepted" | "rejected";
  admin_response?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  created_at: string;
  status: "unread" | "read";
}
