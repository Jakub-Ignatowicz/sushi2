import { getCategories } from "@/lib/api/categories";
import CategoriesClient from "./categories-client";

const CategoriesPage = async () => {
  const categories = await getCategories();

  return <CategoriesClient categories={categories} />;
};

export default CategoriesPage;
