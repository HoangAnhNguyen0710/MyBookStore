"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  BookFilterDto,
  BookFilterResponseDto,
  BookListItem,
  CategoryItem,
} from "@/api";
import {
  TextField,
  Card,
  Typography,
  Chip,
  Pagination,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { listingBooks } from "@/services/filterBooks";
import BookCard from "@/components/Home/BookCard";
import { ListingCategories } from "@/services/listingCategories";

export default function FilterBooksPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const parseFiltersFromParams = (): BookFilterDto => {
    const params = new URLSearchParams(searchParams.toString());
    return {
      author: params.getAll("author"),
      title: params.get("title") || "",
      publisher_ids: params
        .getAll("publisher_ids")
        .map(Number)
        .filter((id) => !isNaN(id)),
      category_ids: params
        .getAll("category_ids")
        .map(Number)
        .filter((id) => !isNaN(id)),
      rating_from: Number(params.get("rating_from")) || 0,
      rating_to: Number(params.get("rating_to")) || 5,
      price_from: Number(params.get("price_from")) || 0,
      price_to: Number(params.get("price_to")) || 1000,
      tags: params.getAll("tags"),
      page: Number(params.get("page")) || 1,
      per_page: Number(params.get("per_page")) || 8,
    };
  };

  const [filters, setFilters] = useState<BookFilterDto>(parseFiltersFromParams);
  const [books, setBooks] = useState<BookListItem[] | undefined>();
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authorInput, setAuthorInput] = useState("");
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else {
        params.set(key, String(value));
      }
    });
    router.replace(`?${params.toString()}`, { scroll: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const handleFilterChange = (field: keyof BookFilterDto, value: unknown) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const addAuthor = () => {
    if (
      authorInput.trim() !== "" &&
      !(filters.author ?? []).includes(authorInput)
    ) {
      setFilters((prev) => ({
        ...prev,
        author: [...(prev.author ?? []), authorInput.trim()],
      }));
    }
    setAuthorInput("");
  };

  const removeAuthor = (authorToRemove: string) => {
    setFilters((prev) => ({
      ...prev,
      author: prev.author?.filter((author) => author !== authorToRemove) ?? [],
    }));
  };

  useEffect(() => {
    async function fetchCategories() {
      const categoryList = await ListingCategories();
      setCategories(categoryList.list);
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      setLoading(true);
      try {
        const filter_list = await listingBooks(filters);
        const data = filter_list as unknown as BookFilterResponseDto;
        if (data) {
          setBooks(data.list);
          setTotalPages(
            Math.ceil((data.total ?? 0) / (filters.per_page ?? 10)) || 1
          );
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBooks();
  }, [filters]);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    handleFilterChange("page", newPage);
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="p-6 my-3 shadow-md">
        <Typography variant="h5" className="mb-6 font-semibold">
          Filter Books
        </Typography>

        {/* Author Search */}
        <div className="!my-3">
          <div className="flex gap-2">
            <TextField
              label="Enter author name"
              fullWidth
              value={authorInput}
              onChange={(e) => setAuthorInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addAuthor()}
            />
            <Button
              variant="contained"
              className="!bg-primary text-white"
              onClick={addAuthor}
            >
              Add Author
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(filters.author ?? []).map((author) => (
              <Chip
                key={author}
                label={author}
                onDelete={() => removeAuthor(author)}
                className="bg-gray-200"
              />
            ))}
          </div>
        </div>

        {/* Title Filter */}
        <TextField
          label="Title"
          fullWidth
          className="!my-3"
          value={filters.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
        />

        {/* Category Filter */}
        {categories.length > 0 && (
          <FormControl fullWidth className="!my-3">
            <InputLabel>Categories</InputLabel>
            <Select
              multiple
              value={filters.category_ids}
              onChange={(e) =>
                handleFilterChange("category_ids", e.target.value)
              }
              renderValue={(selected) =>
                categories
                  .filter((cat) => selected.includes(cat.id))
                  .map((cat) => cat.name)
                  .join(", ")
              }
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
        {/* Price Range */}
        <div className="flex gap-4 my-6">
          <TextField
            label="Min Price"
            type="number"
            fullWidth
            value={filters.price_from}
            onChange={(e) =>
              handleFilterChange("price_from", Number(e.target.value))
            }
          />
          <TextField
            label="Max Price"
            type="number"
            fullWidth
            value={filters.price_to}
            onChange={(e) =>
              handleFilterChange("price_to", Number(e.target.value))
            }
          />
        </div>
      </Card>

      {loading && <div>Loading books...</div>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {!books || books.length === 0 ? (
          <Typography variant="h6" className="text-center col-span-full">
            No books found.
          </Typography>
        ) : (
          books.map((book) => <BookCard key={book.id} book={book} />)
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination
            count={totalPages}
            page={filters.page}
            onChange={handlePageChange}
            color="secondary"
          />
        </div>
      )}
    </div>
  );
}
