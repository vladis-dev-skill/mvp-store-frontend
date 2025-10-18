import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to MVP Store
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Your one-stop shop for amazing products. Built with modern microservices architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Why Choose MVP Store?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Lightning Fast
              </h3>
              <p className="text-gray-600">
                Built with Next.js 15 and React 19 for blazing fast performance and seamless user experience.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Dedicated payment microservice ensures your transactions are safe and reliable.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Modern Architecture
              </h3>
              <p className="text-gray-600">
                Microservices architecture with API Gateway for scalability and fault tolerance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Built with Modern Technology
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-gray-900 text-white p-6 rounded-lg mb-4">
                <span className="text-2xl font-bold">Next.js</span>
              </div>
              <p className="text-gray-600 text-sm">v15</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white p-6 rounded-lg mb-4">
                <span className="text-2xl font-bold">React</span>
              </div>
              <p className="text-gray-600 text-sm">v19</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 text-white p-6 rounded-lg mb-4">
                <span className="text-2xl font-bold">Symfony</span>
              </div>
              <p className="text-gray-600 text-sm">v7.3</p>
            </div>
            <div className="text-center">
              <div className="bg-indigo-600 text-white p-6 rounded-lg mb-4">
                <span className="text-2xl font-bold">PHP</span>
              </div>
              <p className="text-gray-600 text-sm">8.2+</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl mb-8 text-indigo-100 max-w-2xl mx-auto">
            Explore our catalog of products and experience the power of modern e-commerce.
          </p>
          <Link href="/shop/products">
            <Button className="bg-green-500 text-white hover:bg-green-400 px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all">
              View All Products
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}