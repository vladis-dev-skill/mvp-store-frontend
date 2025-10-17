"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  Home,
  Menu,
  X,
  Settings
} from "lucide-react";
import { useState } from "react";

const adminNavItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/users", label: "Users", icon: Users },
];

export function AdminNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo with Admin Badge */}
            <div className="flex items-center gap-4">
              <Link href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors">
                MVP Store
              </Link>
              <span className="px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                ADMIN
              </span>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white hover:bg-gray-800">
                  <Home className="w-4 h-4" />
                  View Site
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-white hover:text-white hover:bg-gray-800"
              >
                <Settings className="w-4 h-4" />
                Settings
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 text-red-400 border-red-400 hover:bg-red-950 hover:text-red-300"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-white hover:bg-gray-800 rounded"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <div className="flex flex-col gap-2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:bg-gray-800">
                    <Home className="w-4 h-4" />
                    View Site
                  </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start gap-2 text-white hover:bg-gray-800">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-red-400 border-red-400 hover:bg-red-950"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Secondary Navigation - Admin Tabs */}
      <div className="bg-gray-800 border-b border-gray-700 sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-6 py-4 whitespace-nowrap border-b-2 transition-colors ${
                    isActive
                      ? "border-blue-500 text-white font-semibold bg-gray-900"
                      : "border-transparent text-gray-300 hover:text-white hover:bg-gray-900"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}