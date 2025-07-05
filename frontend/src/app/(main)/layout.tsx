import Navbar from "@/components/general/navbar";
import { CartStateProvider } from "@/context/cart-context";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartStateProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-1 flex">{children}</div>
      </div>
    </CartStateProvider>
  );
}
