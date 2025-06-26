import Navbar from "@/components/general/navbar/Navbar";
import { CartStateProvider } from "@/context/CartState";

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col justify-start mx-auto">
      <CartStateProvider>
        {modal}
        <Navbar />
        <div className="flex-grow mb-64 w-[60%] mx-auto">{children}</div>
      </CartStateProvider>
    </div>
  );
}
