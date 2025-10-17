interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">Product #{id}</h1>
      <div className="bg-white rounded-lg shadow-lg p-6">
        <p className="text-gray-600">Product details will be displayed here</p>
      </div>
    </div>
  );
}