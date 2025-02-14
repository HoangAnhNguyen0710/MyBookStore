import { BookApi, Configuration } from "@/api";
import apiClient from "@/config/httpClient";

export async function getBook(id: string) {
  const api = new BookApi(
    new Configuration({ baseOptions: {} }),
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    apiClient
  );
  // Make the API call with the individual parameters
  return (await api.booksControllerFindOne(id)).data;
};
