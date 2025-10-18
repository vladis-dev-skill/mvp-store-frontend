'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTest = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/payment-service-health', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        setError(`Error ${response.status}: ${data.error || data.message || 'Unknown error'}`);
      } else {
        setResult(data);
      }
    } catch (err: any) {
      setError(`Network error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Payment Service Integration Test
            </h1>
            <p className="text-gray-600">
              Test the complete microservices chain
            </p>
          </div>

          {/* Test Button */}
          <div className="flex justify-center mb-8">
            <button
              onClick={handleTest}
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-4 px-8 rounded-lg shadow-lg transition-all transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
            >
              {loading ? 'Testing...' : 'Test Backend → Payment Service'}
            </button>
          </div>

          {/* Flow Diagram */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Request Flow:</h2>
            <div className="font-mono text-sm text-gray-700 space-y-2">
              <div className="flex items-center">
                <span className="text-blue-600 font-bold mr-2">1.</span>
                <span>Frontend (Browser)</span>
              </div>
              <div className="ml-4 text-gray-400">↓ GET /api/payment-service-health</div>

              <div className="flex items-center">
                <span className="text-green-600 font-bold mr-2">2.</span>
                <span>Next.js API Route</span>
              </div>
              <div className="ml-4 text-gray-400">↓ Proxy to Gateway</div>

              <div className="flex items-center">
                <span className="text-purple-600 font-bold mr-2">3.</span>
                <span>Backend Service (Symfony)</span>
              </div>
              <div className="ml-4 text-gray-400">↓ Call /inner-api/payment/health</div>

              <div className="flex items-center">
                <span className="text-orange-600 font-bold mr-2">4.</span>
                <span>Payment Service (Symfony)</span>
              </div>
              <div className="ml-4 text-gray-400">↑ Return response</div>
            </div>
          </div>

          {/* Current URL Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Current URL:</span>{' '}
              {typeof window !== 'undefined' ? window.location.origin : 'Loading...'}
            </p>
            <p className="text-xs text-blue-600 mt-2">
              ✓ Works on http://localhost:3000/test<br />
              ✓ Works on http://localhost:8090/test
            </p>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Success Display */}
          {result && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-sm font-medium text-green-800 mb-2">Success!</h3>
                  <div className="bg-white rounded-lg p-4 border border-green-200">
                    <pre className="text-xs text-gray-800 overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Status Indicators */}
          {result && (
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className={`text-2xl mb-2 ${result.backend_service === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
                  {result.backend_service === 'ok' ? '✓' : '✗'}
                </div>
                <p className="text-xs font-semibold text-gray-600">Backend</p>
                <p className="text-xs text-gray-500">{result.backend_service}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className={`text-2xl mb-2 ${result.payment_service_status === 'healthy' || result.payment_service_status === 'ok' ? 'text-green-500' : 'text-red-500'}`}>
                  {result.payment_service_status === 'healthy' || result.payment_service_status === 'ok' ? '✓' : '✗'}
                </div>
                <p className="text-xs font-semibold text-gray-600">Payment Service</p>
                <p className="text-xs text-gray-500">{result.payment_service_status}</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
                <div className={`text-2xl mb-2 ${result.communication === 'working' ? 'text-green-500' : 'text-red-500'}`}>
                  {result.communication === 'working' ? '✓' : '✗'}
                </div>
                <p className="text-xs font-semibold text-gray-600">Communication</p>
                <p className="text-xs text-gray-500">{result.communication}</p>
              </div>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Testing Instructions</h2>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center font-semibold mr-3">1</span>
              <p>Make sure all services are running (Gateway, Backend, Payment Service)</p>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center font-semibold mr-3">2</span>
              <p>Access this page via <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:3000/test</code> or <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8090/test</code></p>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center font-semibold mr-3">3</span>
              <p>Click the test button to verify the complete microservices chain</p>
            </div>
            <div className="flex items-start">
              <span className="inline-block w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-center font-semibold mr-3">4</span>
              <p>All three status indicators should show green checkmarks ✓</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}