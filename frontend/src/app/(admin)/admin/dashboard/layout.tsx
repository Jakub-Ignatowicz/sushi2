import { AuthProvider } from "@/context/auth-context";
import AdminDashboardSidePanel from "./side-panel";

type Props = {
  children: React.ReactNode;
};

const AdminDashboardLayoutPage = ({ children }: Props) => {
  return (
    <AuthProvider>
      <div className="flex min-h-screen">
        <AdminDashboardSidePanel />
        <div className="my-2 mx-auto w-[50%] px-2">{children}</div>
      </div>
    </AuthProvider>
  );
};

export default AdminDashboardLayoutPage;
