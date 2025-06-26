import { getCategories } from "@/lib/api/categories";
import CategoriesClient from "./categories-client";
import { IProblemDetails, ProblemDetails } from "@/lib/api";
import FetchError from "@/components/fetch-error";

const CategoriesPage = async () => {
  try {
    const categories = await getCategories();
    return <CategoriesClient categories={categories} />;
  } catch (error: any) {
    return <FetchError error={error} />;
  }
};

export default CategoriesPage;
