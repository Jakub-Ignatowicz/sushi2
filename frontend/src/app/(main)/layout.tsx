import Navbar from "@/components/general/navbar/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col justify-start mx-auto">
      <Navbar />
      <div className="flex-grow mb-64 mx-auto xl:w-[60%] md:w-[70%] sm:w-[90%]">
        {children}
      </div>
    </div>
  );
}
