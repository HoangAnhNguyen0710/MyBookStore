"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@/config/redux/store";
import BookCard, { BookCardItem } from "@/components/Home/BookCard";
import { Carousel } from "@/components/Home/Carousel";
import { listingBooks } from "@/services/filterBooks";
import { BookFilterResponseDto, BookListItem } from "@/api";

const bookList: BookCardItem[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    cover_image_url: "/images/book1.jpg",
    price: 150000,
    rating: 4.5,
    author: "F. Scott Fitzgerald",
    number_of_reviews: 100,
  },
  {
    id: 2,
    title: "1984",
    cover_image_url: "/images/book2.jpg",
    price: 180000,
    rating: 4.8,
    author: "George Orwell",
    number_of_reviews: 200,
  },
  {
    id: 3,
    title: "To Kill a Mockingbird",
    cover_image_url: "/images/book1.jpg",
    price: 160000,
    rating: 4.7,
    author: "Harper Lee",
    number_of_reviews: 150,
  },
  {
    id: 4,
    title: "Moby-Dick",
    cover_image_url: "/images/book2.jpg",
    price: 170000,
    rating: 4.3,
    author: "Herman Melville",
    number_of_reviews: 90,
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user.value);
  const [feature_books, setFeatureBooks] = useState<
    BookListItem[] | undefined
  >();
  useEffect(() => {
    setIsLoading(false);
    async function getBooks() {
      const books = await listingBooks({
        page: 1,
        per_page: 8,
        rating_from: 4.5,
        rating_to: 5,
      });
      const features_list = (books as unknown as BookFilterResponseDto).list;
      console.log(features_list);
      setFeatureBooks(features_list);
    }

    getBooks();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid justify-items-center min-h-screen pt-0 md:px-16 pb-20 gap-16">
      <div className="flex flex-wrap items-center justify-center w-full my-4">
        <div className=" h-fit">
          <Carousel bookList={bookList} />
        </div>
        <div className="hidden md:flex flex-col h-full w-2/5">
          <div className="relative h-1/2 w-full mb-2">
            <Image
              src="/images/banner.jpg"
              alt="Banner"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
          <div className="relative h-1/2 w-full mt-2">
            <Image
              src="/images/banner.jpg"
              alt="Banner"
              layout="fill"
              objectFit="cover"
              priority={true}
            />
          </div>
          {/* <Image
              src="data:image/png;base64,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"
              alt="Banner"
              width={200}
              height={200}
            /> */}
        </div>
      </div>

      <Typography
        variant="h5"
        className="bg-primary p-2 text-white font-bold rounded-lg"
      >
        Best Sellers
      </Typography>
      <Box
        component="div"
        className="md:px-16 w-full flex flex-col items-center justify-center"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-[1500px] pb-8">
          {feature_books && feature_books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
        <Button
          variant="outlined"
          color="error"
          size="large"
          className="!px-8 !py-2"
          sx={{
            borderWidth: 2, // Tăng độ dày của border
            fontWeight: "bold", // Tăng độ đậm của text
          }}
        >
          See more
        </Button>
      </Box>

      {user && (
        <div>
          <div>
            User: {user.email}, Name: {user.name}
          </div>
        </div>
      )}
    </div>
  );
}
