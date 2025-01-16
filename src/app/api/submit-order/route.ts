import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/supabase";
import { CheckoutFormData, OrderRecord } from "@/lib/types";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData: CheckoutFormData = await request.json();

    // Validate required fields
    const requiredFields = [
      "productId",
      "productName",
      "fullName",
      "email",
      "phone",
      "location",
      "city",
    ];

    for (const field of requiredFields) {
      if (!formData[field as keyof CheckoutFormData]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Format delivery address
    const deliveryAddress = `${formData.location}, ${formData.city}${
      formData.additionalNotes ? ` (${formData.additionalNotes})` : ""
    }`;

    // Prepare order record
    const orderRecord: OrderRecord = {
      product_id: formData.productId,
      product_name: formData.productName,
      customer_name: formData.fullName,
      customer_email: formData.email,
      customer_phone: formData.phone,
      delivery_address: deliveryAddress,
    };

    // Insert order into database
    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert(orderRecord)
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Send email notification (implement this based on your email service)
    // try {
    //   await sendOrderConfirmationEmail(formData.email, data.id);
    // } catch (emailError) {
    //   console.error("Email notification failed:", emailError);
    //   // Don't fail the request if email fails
    // }

    return NextResponse.json(
      {
        message: "Order submitted successfully",
        orderId: data.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
