import { Footer } from "@/components/blocks/Footer";
import { HairstyleHeader } from "@/components/blocks/hairstyle/HairstyleHeader";
import { ReactNode } from "react";

export default async function DefaultLayout({
  children,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return (
    <>
      <HairstyleHeader />
      <main className="overflow-x-hidden">{children}</main>
      <Footer />
    </>
  );
}
