import { getProducts } from "@/lib/api/products";
import FetchError from "@/components/fetch-error";
import CartPageClient from "./page-client";

export default async function CartPage() {
  try {
    // const products = await getProducts();
    return <CartPageClient />;
  } catch (error) {
    return <FetchError error={error} />;
  }
}
