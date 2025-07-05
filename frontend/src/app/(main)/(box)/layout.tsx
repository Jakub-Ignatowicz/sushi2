import Navbar from "@/components/general/navbar";
import { CartStateProvider } from "@/context/cart-context";

export default function MainBoxLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[85%] max-w-[1000px] mx-auto mt-16 lg:mt-32 mb-32 lg:mb-64">
      {children}
    </div>
  );
}
