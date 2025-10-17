"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop/products", label: "Products" },
  { href: "/shop/cart", label: "Cart" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            MVP Store
          </Link>

          <div className="flex items-center gap-8">
            <ul className="flex space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`transition-colors ${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="outline" className="px-4">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="px-4 bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}