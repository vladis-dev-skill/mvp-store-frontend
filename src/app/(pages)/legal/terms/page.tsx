import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: Coming Soon
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our Terms of Service are currently being prepared and will be available soon.
              This page will contain important information about the use of our platform,
              user rights, and responsibilities.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What will be included:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Acceptance of terms and conditions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>User account responsibilities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Product purchase and payment terms</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Return and refund policies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Limitation of liability</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Intellectual property rights</span>
                </li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button className="px-6 py-3">
                  Back to Home
                </Button>
              </Link>
              <Link href="/shop/products">
                <Button variant="outline" className="px-6 py-3">
                  Browse Products
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            For questions regarding our terms, please contact us at{" "}
            <a href="mailto:legal@mvpstore.com" className="text-blue-600 hover:text-blue-700">
              legal@mvpstore.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}