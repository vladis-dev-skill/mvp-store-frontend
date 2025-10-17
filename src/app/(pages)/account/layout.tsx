import { AccountNavigation } from "@/components/navigation/account-navigation";
import { Footer } from "@/components/footer";
import { ReactNode } from "react";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <AccountNavigation />
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}