import { getCategories } from "@/lib/api/categories";
import CategoriesClient from "./categories-client";
import FetchError from "@/components/fetch-error";
import CategoryActionPanel from "./action-panel";
import { getProducts } from "@/lib/api/products";

const CategoriesPage = async () => {
  try {
    const categories = await getCategories();

    return (
      <div className="space-y-4">
        <CategoryActionPanel />
        <CategoriesClient categories={categories} />
      </div>
    );
  } catch (error: any) {
    return <FetchError error={error} />;
  }
};

export default CategoriesPage;
