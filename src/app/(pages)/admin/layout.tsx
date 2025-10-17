import { AdminNavigation } from "@/components/navigation/admin-navigation";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <AdminNavigation />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <footer className="bg-gray-900 text-gray-400 py-6 text-center text-sm">
        <p>MVP Store Admin Panel - Manage your e-commerce platform</p>
      </footer>
    </div>
  );
}