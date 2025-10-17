"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PaymentHealthPage() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHealthCheck = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/payment/health");

      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await res.text();
        setError(`Server returned non-JSON response: ${text.substring(0, 100)}...`);
        return;
      }

      const data = await res.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResponse(data);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Payment Service Health Check
          </h1>
          <p className="text-xl text-gray-600">
            Test microservices communication
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Backend Health Check
            </h2>
            <p className="text-gray-600">
              Test connection to Payment Service via Backend API
            </p>
          </div>

          {/* Button */}
          <div className="flex justify-center mb-8">
            <Button
              onClick={fetchHealthCheck}
              disabled={loading}
              className="px-8 py-3 text-lg"
            >
              {loading ? "Loading..." : "Check Payment Service Health"}
            </Button>
          </div>

          {/* Response Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">
                    <strong>Error:</strong> {error}
                  </p>
                </div>
              </div>
            </div>
          )}

          {response && (
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Response from Backend
                </h3>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  ✓ Success
                </span>
              </div>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          )}

          {!response && !error && !loading && (
            <div className="text-center text-gray-500 py-8">
              <svg
                className="mx-auto h-12 w-12 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <p>Click the button to fetch payment service health status</p>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Architecture Info
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="font-medium w-32">Frontend:</span>
              <span>Next.js 15 (App Router)</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">API Gateway:</span>
              <span>http://localhost:8090</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Backend API:</span>
              <span>http://localhost:8090/api</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Payment API:</span>
              <span>http://localhost:8090/api/payment</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Tech Stack:</span>
              <span>Symfony 7.3 (PHP 8.2+)</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium w-32">Architecture:</span>
              <span>Microservices with API Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}