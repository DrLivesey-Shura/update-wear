import React from "react";
import {
  Truck,
  Clock,
  MapPin,
  ShieldCheck,
  Package,
  RefreshCw,
  Headphones,
  Gift,
} from "lucide-react";
import { Card, CardContent } from "@/Components/ui/card";

export default function Services() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our range of customer-focused services designed to make
            your shopping experience seamless and enjoyable.
          </p>
        </div>
      </div>

      {/* Main Services Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Home Delivery Service */}
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Home Delivery</h3>
                  <p className="text-gray-600">
                    Convenient delivery right to your doorstep across the city.
                    Track your order in real-time.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Express Delivery */}
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Express Delivery
                  </h3>
                  <p className="text-gray-600">
                    Same-day delivery available for orders placed before 2 PM
                    within selected areas.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flexible Payment */}
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Cash on Delivery
                  </h3>
                  <p className="text-gray-600">
                    Pay when you receive your order. No advance payment needed.
                    100% secure transactions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Selection */}
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Package className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">
                    Product Inspection
                  </h3>
                  <p className="text-gray-600">
                    Check your items at delivery before payment. Ensure complete
                    satisfaction with your purchase.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Easy Returns */}
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-red-100 p-3 rounded-lg">
                  <RefreshCw className="w-6 h-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
                  <p className="text-gray-600">
                    Hassle-free return process. Simply contact us within 24
                    hours of delivery for any issues.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Support */}
          <Card className="bg-white hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <Headphones className="w-6 h-6 text-indigo-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                  <p className="text-gray-600">
                    Our customer service team is always ready to assist you with
                    any queries or concerns.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delivery Areas Section */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Delivery Areas</h2>
            <p className="text-gray-600">
              We currently serve the following areas with our delivery service
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <span>Central City</span>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <span>North District</span>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <span>South Area</span>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
              <MapPin className="w-5 h-5 text-gray-600 mr-2" />
              <span>East Region</span>
            </div>
          </div>
        </div>
      </div>

      {/* Special Services Banner */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-blue-50 rounded-lg p-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Gift className="w-12 h-12 text-blue-600 mr-4" />
              <div>
                <h3 className="text-xl font-semibold">
                  Special Occasion Delivery
                </h3>
                <p className="text-gray-600">
                  Planning a surprise? We offer special timing delivery
                  services!
                </p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
