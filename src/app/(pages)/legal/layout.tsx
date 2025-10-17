import { PublicNavigation } from "@/components/navigation/public-navigation";
import { Footer } from "@/components/footer";
import { ReactNode } from "react";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavigation />
      <main className="flex-1 bg-gray-50">{children}</main>
      <Footer />
    </div>
  );
}