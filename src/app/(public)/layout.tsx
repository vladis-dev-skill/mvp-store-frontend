import { PublicNavigation } from "@/components/navigation/public-navigation";
import { Footer } from "@/components/footer";
import { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <PublicNavigation />
      <main>{children}</main>
      <Footer />
    </>
  );
}