import AdminDashboardSidePanel from "./side-panel";

type Props = {
  children: React.ReactNode;
};

const AdminDashboardLayoutPage = ({ children }: Props) => {
  return (
    <div className="flex h-full">
      <AdminDashboardSidePanel />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default AdminDashboardLayoutPage;
