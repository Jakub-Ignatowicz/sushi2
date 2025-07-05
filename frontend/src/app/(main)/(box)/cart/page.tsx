import FetchError from "@/components/fetch-error";
import CartPageClient from "./page-client";

export default async function CartPage() {
  try {
    return <CartPageClient />;
  } catch (error) {
    return <FetchError error={error} />;
  }
}
