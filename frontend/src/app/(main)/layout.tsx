import Navbar from "@/components/general/navbar/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col justify-start mx-auto">
      <Navbar />
      <div className="flex-grow mb-64 w-[60%] mx-auto">{children}</div>
    </div>
  );
}
