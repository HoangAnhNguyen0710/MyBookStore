"use client";
import { Card, CardMedia } from "@mui/material";

export interface BookCardItem {
  id: number;
  title: string;
  cover_url: string;
  price: number;
  avg_rating: number;
  author: string;
  total_reviews: number;
}

export interface CarouselCardProps {
  book: BookCardItem;
}

export default function CarouselCard({ book }: CarouselCardProps) {
  return (
    <Card sx={{ px: 6 }}>
      <CardMedia
        sx={{ height: 400 }}
        image={book.cover_url}
        title={book.title}
      />
      {/* <CardContent className="flex flex-col px-8">
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
        <Button variant="outlined" color="error">
          {" "}
          See more ...{" "}
        </Button>
      </CardContent> */}
    </Card>
  );
}
