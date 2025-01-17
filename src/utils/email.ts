"use server";

import nodemailer from "nodemailer";
import { Order } from "@/lib/types";

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // or your preferred email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD, // Use app-specific password for Gmail
  },
});

export const sendOrderConfirmationEmail = async (order: Order) => {
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .order-details { background: #f9f9f9; padding: 20px; border-radius: 5px; }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Confirmation</h1>
            <p>Thank you for your order!</p>
          </div>
          
          <div class="order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${new Date(
              order.created_at
            ).toLocaleDateString()}</p>
            
            <h3>Product Information</h3>
            <p><strong>Product:</strong> ${order.product_name}</p>
            <p><strong>Color:</strong> ${order.product_color}</p>
            <p><strong>Size:</strong> ${order.product_size}</p>
            <p><strong>Price:</strong> $${order.price.toFixed(2)}</p>
            
            <h3>Delivery Information</h3>
            <p><strong>Name:</strong> ${order.customer_name}</p>
            <p><strong>Delivery Type:</strong> ${order.delivery_type}</p>
            <p><strong>Address:</strong> ${order.delivery_address}</p>
            
            <div class="total">
              <p>Total Amount: $${order.price.toFixed(2)}</p>
            </div>
          </div>
          
          <p>If you have any questions about your order, please contact our support team.</p>
          
          <div class="footer">
            <p>This is an automated email, please do not reply directly to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.customer_email,
    subject: `Order Confirmation #${order.id}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
};

export const sendOrderStatusEmail = async (
  order: Order,
  status: string,
  adminNote: string
) => {
  const statusText = status === "accepted" ? "Approved" : "Rejected";
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; padding: 20px 0; }
          .order-details { background: #f9f9f9; padding: 20px; border-radius: 5px; }
          .status { 
            text-align: center; 
            padding: 10px; 
            margin: 20px 0; 
            border-radius: 5px;
            font-weight: bold;
            color: white;
            background-color: ${status === "accepted" ? "#4CAF50" : "#f44336"};
          }
          .admin-note {
            background: #fff;
            border-left: 4px solid ${
              status === "accepted" ? "#4CAF50" : "#f44336"
            };
            margin: 20px 0;
            padding: 15px;
          }
          .total { font-size: 18px; font-weight: bold; margin-top: 20px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Order Status Update</h1>
            <p>Your order status has been updated</p>
          </div>
          
          <div class="status">
            Order ${statusText}
          </div>

          ${
            adminNote
              ? `
          <div class="admin-note">
            <strong>Message from Admin:</strong>
            <p>${adminNote}</p>
          </div>
          `
              : ""
          }
          
          <div class="order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> ${order.id}</p>
            <p><strong>Date:</strong> ${new Date(
              order.created_at
            ).toLocaleDateString()}</p>
            
            <h3>Product Information</h3>
            <p><strong>Product:</strong> ${order.product_name}</p>
            <p><strong>Color:</strong> ${order.product_color}</p>
            <p><strong>Size:</strong> ${order.product_size}</p>
            <p><strong>Price:</strong> $${order.price.toFixed(2)}</p>
            
            <h3>Delivery Information</h3>
            <p><strong>Name:</strong> ${order.customer_name}</p>
            <p><strong>Delivery Type:</strong> ${order.delivery_type}</p>
            <p><strong>Address:</strong> ${order.delivery_address}</p>
            
            <div class="total">
              <p>Total Amount: $${order.price.toFixed(2)}</p>
            </div>
          </div>
          
          ${
            status === "accepted"
              ? "<p>We will process your order shortly and send you shipping details.</p>"
              : "<p>If you have any questions about this decision, please contact our support team.</p>"
          }
          
          <div class="footer">
            <p>This is an automated email, please do not reply directly to this message.</p>
          </div>
        </div>
      </body>
    </html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: order.customer_email,
    subject: `Order ${statusText} #${order.id}`,
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error("Failed to send status update email:", error);
    return { success: false, error };
  }
};
