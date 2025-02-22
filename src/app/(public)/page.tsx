"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
// import { useSelector } from "react-redux";
// import { RootState } from "@/config/redux/store";
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
  // const user = useSelector((state: RootState) => state.user.value);
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

      {/* {user && (
        <div>
          <div>
            User: {user.email}, Name: {user.name}
          </div>
        </div>
      )} */}
    </div>
  );
}
