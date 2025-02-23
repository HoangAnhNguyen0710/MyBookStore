"use client";
import { BookListItem } from "@/api";
import { addToCart } from "@/contexts/cartSlice";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useDispatch } from "react-redux";

export interface BookCardItem {
  id: number;
  title: string;
  cover_image_url: string;
  price: number;
  rating: number;
  author: string;
  number_of_reviews: number;
}

export interface BookCardProps {
  book: BookCardItem | BookListItem;
}

export default function BookCard({ book }: BookCardProps) {
  const dispatch = useDispatch();
  const addBookToCart = (
    book: BookCardItem | BookListItem,
    quantity: number
  ) => {
    dispatch(
      addToCart({ bookId: book.id, quantity: quantity, price: book.price, title: book.title })
    );
    alert(`Added ${book.title} to cart!`);
  };
  return (
    <Card
      sx={{
        maxWidth: 320,
        my: 1.5,
        mx: 1,
        p: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 169, height: 250, objectFit: "cover" }}
        image={book.cover_image_url}
        alt={book.title}
      />
      <CardContent className="flex flex-col !p-0 w-full">
        {/* Header Section */}
        <Box component="div" className="flex flex-col p-4 border-b">
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className="text-gray-800 font-bold hover:!underline"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "2.5em",
            }}
          >
            <Link href={`/book/${book.id}`}>{book.title}</Link>
          </Typography>
          <Typography
            variant="body2"
            className="text-gray-500 text-sm font-medium"
          >
            {book.author} ・ {book.number_of_reviews} reviews
          </Typography>
        </Box>

        {/* Book Content */}
        <Box component="div" className="flex flex-col px-4 py-3 space-y-3">
          <Typography className="flex items-center text-gray-700">
            <Rating
              value={book.rating}
              precision={0.25}
              readOnly
              size="small"
              className="text-yellow-500"
            />
            <span className="px-2 text-sm text-gray-500">
              {book.rating} rating
            </span>
          </Typography>

          <Typography className="text-primary leading-relaxed !text-2xl !font-bold">
            {book.price.toLocaleString()} đ
          </Typography>

          <Button
            variant="text"
            color="error"
            className="!mt-2 !text-red-600 !border-red-600 !hover:bg-red-50 self-start"
            size="small"
            onClick={() => addBookToCart(book, 1)}
          >
            Add To Cart
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
