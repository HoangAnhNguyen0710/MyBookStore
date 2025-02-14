"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

export interface BookCardItem {
  id: number;
  title: string;
  cover_url: string;
  price: number;
  avg_rating: number;
  author: string;
  total_reviews: number;
}

export interface BookCardProps {
  book: BookCardItem;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 360,
        my: 1.5,
        mx: 1,
        p: 2,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 200, height: 300, objectFit: "cover" }}
        image={book.cover_url}
        alt={book.title}
      />
      <CardContent className="flex flex-col !p-0 w-full">
        {/* Header Section */}
        <Box component="div" className="flex flex-col p-4 border-b">
          <Typography 
            gutterBottom 
            variant="h5" 
            component="div" 
            className="text-gray-800 font-bold"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              minHeight: "2.5em"
            }}
          >
            {book.title}
          </Typography>
          <Typography variant="body2" className="text-gray-500 text-sm font-medium">
            {book.author} ・ {book.total_reviews} reviews
          </Typography>
        </Box>

        {/* Book Content */}
        <Box component="div" className="flex flex-col px-4 py-3 space-y-3">
          <Typography className="flex items-center text-gray-700">
            <Rating value={book.avg_rating} precision={0.25} readOnly size="small" className="text-yellow-500" />
            <span className="px-2 text-sm text-gray-500">{book.avg_rating} rating</span>
          </Typography>

          <Typography className="text-primary leading-relaxed !text-2xl !font-bold">
            {book.price.toLocaleString()} đ
          </Typography>

          <Button
            variant="text"
            color="error"
            className="!mt-2 !text-red-600 !border-red-600 !hover:bg-red-50 self-start"
            size="small"
          >
            More Info
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
