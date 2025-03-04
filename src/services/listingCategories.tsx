import { CategoryApi, CategoryItem, Configuration } from "@/api";
import apiClient from "@/config/httpClient";

export async function ListingCategories() {
  const categoryApi = new CategoryApi(
    new Configuration({ baseOptions: {} }),
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    apiClient
  );
  // Tạo RequestContext từ API đã generate
  return (await categoryApi.categoriesControllerGetAll()).data as unknown as {list: CategoryItem[]};
}
