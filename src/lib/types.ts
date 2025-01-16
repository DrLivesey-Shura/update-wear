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
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  delivery_address: string;
  status: "pending" | "accepted" | "rejected";
  admin_response?: string;
}

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
  status: "unread" | "read";
  admin_response?: string;
}
