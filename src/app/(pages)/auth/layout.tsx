import { AuthNavigation } from "@/components/navigation/auth-navigation";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AuthNavigation />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}