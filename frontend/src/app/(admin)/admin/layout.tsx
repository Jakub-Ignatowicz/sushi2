"use client";

type Props = {
  children: React.ReactNode;
};

const AdminLayoutPage = ({ children }: Props) => {
  return <div className="flex h-full w-full flex-col">{children}</div>;
};

export default AdminLayoutPage;
