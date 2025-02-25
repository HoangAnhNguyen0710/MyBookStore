"use client";

import { useEffect, useState } from "react";
import { BookFilterDto, BookFilterResponseDto, BookListItem } from "@/api";
import {
  TextField,
  Card,
  Typography,
  Chip,
  Pagination,
  Button,
} from "@mui/material";
import { listingBooks } from "@/services/filterBooks";
import BookCard from "@/components/Home/BookCard";

export default function FilterBooksPage() {
  const [filters, setFilters] = useState<BookFilterDto>({
    author: [],
    title: "",
    publisher_ids: [],
    category_ids: [],
    rating_from: 0,
    rating_to: 5,
    price_from: 0,
    price_to: 1000,
    tags: [],
    page: 1,
    per_page: 8,
  });

  const [books, setBooks] = useState<BookListItem[] | undefined>();
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [authorInput, setAuthorInput] = useState("");

  const handleFilterChange = (field: keyof BookFilterDto, value: unknown) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const addAuthor = () => {
    if (authorInput.length > 0) {
      const trimmedAuthor = authorInput.trim();
      if (trimmedAuthor && Array.isArray(filters.author)) {
        if (!filters.author.includes(trimmedAuthor)) {
          setFilters((prev) => ({
            ...prev,
            author: [...(prev.author ?? []), trimmedAuthor], // Đảm bảo `author` luôn là mảng
          }));
        }
      } else {
        setFilters((prev) => ({
          ...prev,
          author: [trimmedAuthor], // Nếu `prev.author` chưa có, khởi tạo mảng mới
        }));
      }
      setAuthorInput("");
    }
  };

  const removeAuthor = (authorToRemove: string) => {
    setFilters((prev) => ({
      ...prev,
      author: prev.author?.filter((a) => a !== authorToRemove) || [], // Luôn trả về mảng
    }));
  };

  useEffect(() => {
    console.log(filters.author);
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
    setFilters((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Filter Section */}
      <Card className="p-6 mb-6 shadow-md">
        <Typography variant="h5" className="mb-6 font-semibold">
          Filter Books
        </Typography>

        {/* Author Search */}
        <div className="mb-6">
          <Typography variant="subtitle1" className="mb-2 font-medium">
            Search by Author
          </Typography>
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
          <div className="flex flex-wrap gap-2 mt-2">
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
          className="my-6"
          value={filters.title}
          onChange={(e) => handleFilterChange("title", e.target.value)}
        />

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

      {/* Books List */}
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

      {/* Pagination */}
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
