import Navbar from "@/components/general/navbar/Navbar";

export default function MainLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col justify-start mx-auto">
      {modal}
      <Navbar />
      <div className="flex-grow">{children}</div>
    </div>
  );
}
