import Navbar from "@/components/general/navbar/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="w-[85%] max-w-[1240px] mx-auto">{children}</div>
    </div>
  );
}
