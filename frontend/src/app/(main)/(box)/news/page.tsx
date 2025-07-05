import { authLogin, authRefresh } from "@/lib/api/auth";

export default async function page() {
  const xd = await authLogin("admin", "Admin123!");
  await authRefresh();
  return <div>news</div>;
}
