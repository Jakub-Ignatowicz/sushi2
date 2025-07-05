import { getCategories } from "@/lib/api/categories";
import CategoriesClient from "./categories-client";
import FetchError from "@/components/fetch-error";
import CategoryActionPanel from "./action-panel";

const CategoriesPage = async () => {
  return (
    <div className="space-y-4">
      <CategoryActionPanel />
      <CategoriesClient />
    </div>
  );
};

export default CategoriesPage;
