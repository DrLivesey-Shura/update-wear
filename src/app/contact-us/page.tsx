"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { Button } from "@/Components/ui/button";
import { Alert, AlertDescription } from "@/Components/ui/alert";
import { supabase } from "@/lib/supabase/client";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form data
      if (
        !formData.name ||
        !formData.email ||
        !formData.phone ||
        !formData.message
      ) {
        throw new Error("Please fill in all fields");
      }

      // Insert into Supabase
      const { error: supabaseError } = await supabase
        .from("contact_messages")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: formData.message,
          },
        ]);

      if (supabaseError) throw supabaseError;

      // Clear form and show success
      setFormData({ name: "", email: "", phone: "", message: "" });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Phone</h3>
                      <p className="text-gray-600">+213 774856079</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Email</h3>
                      <p className="text-gray-600">update-wear@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">Address</h3>
                      <p className="text-gray-600">
                        123 Store Street, Chlef, Algeria
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <Card>
              <CardContent className="p-6">
                {success && (
                  <Alert className="mb-6 bg-green-50 text-green-700 border-green-200">
                    <AlertDescription>
                      Thank you for your message! We'll get back to you soon.
                    </AlertDescription>
                  </Alert>
                )}

                {error && (
                  <Alert variant="destructive" className="mb-6">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Your Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      disabled={loading}
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                        Sending...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
