import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: Coming Soon
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Coming Soon
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our Privacy Policy is currently being prepared and will be available soon.
              We take your privacy seriously and are committed to protecting your personal information.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-left max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                What will be covered:
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Information we collect and how we use it</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Data security and protection measures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Cookie policy and tracking technologies</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Third-party data sharing practices</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>Your rights and choices regarding your data</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 mr-2">•</span>
                  <span>GDPR and CCPA compliance information</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 max-w-2xl mx-auto">
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">Note:</strong> This is a demo/MVP project.
                In production, proper privacy policies compliant with applicable laws
                (GDPR, CCPA, etc.) must be implemented before collecting any user data.
              </p>
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
            For privacy-related questions, please contact us at{" "}
            <a href="mailto:privacy@mvpstore.com" className="text-green-600 hover:text-green-700">
              privacy@mvpstore.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}