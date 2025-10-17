export default function AdminProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Manage Products</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
          Add Product
        </button>
      </div>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Product management table will be displayed here</p>
      </div>
    </div>
  );
}