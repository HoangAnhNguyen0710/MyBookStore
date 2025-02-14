import { BookApi, BookFilterDto, Configuration } from "@/api";
import apiClient from "@/config/httpClient";

export async function listingBooks(filterDto: BookFilterDto) {
  const {
    author,
    title,
    publisher_ids,
    category_ids,
    rating_from,
    rating_to,
    price_from,
    price_to,
    tags,
    page,
    per_page,
  } = filterDto;
  const api = new BookApi(
    new Configuration({ baseOptions: {} }),
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
    apiClient
  );
  // Make the API call with the individual parameters
  return (await api.booksControllerListingBooks(
    author,
    title,
    publisher_ids,
    category_ids,
    rating_from,
    rating_to,
    price_from,
    price_to,
    tags,
    page,
    per_page
  )).data;
}
