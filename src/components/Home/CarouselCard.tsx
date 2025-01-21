"use client";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";

export interface CafeCardItem {
  id: number;
  preview_url: string;
  name: string;
  avg_rating: number;
  total_reviews?: number;
  location_province?: string;
  price_from?: number;
  price_to?: number;
}

export interface CarouselCardProps {
  cafe: CafeCardItem;
}

export default function CarouselCard({ cafe }: CarouselCardProps) {
  return (
    <Card sx={{ maxWidth: 320, my: 1.5, mx: 1.75 }}>
      <CardMedia
        sx={{ height: 180 }}
        image={cafe.preview_url}
        title={cafe.name}
      />
      <CardContent className="flex flex-col">
        <Typography gutterBottom variant="h5" component="div">
          {cafe.name}
        </Typography>
        <div className="flex items-center justify-between">
          <Rating value={cafe.avg_rating} precision={0.25} />
          <Typography>
            {cafe.total_reviews ? cafe.total_reviews : 0} reviews
          </Typography>
        </div>
        <div className="py-2">
          <Typography>{cafe.location_province}</Typography>
          <Typography>
            {cafe.price_from ? cafe.price_from : "?"} ~{" "}
            {cafe.price_to ? cafe.price_to : "?"}
          </Typography>
        </div>
        <Button variant="outlined" color="error">
          {" "}
          See more ...{" "}
        </Button>
      </CardContent>
    </Card>
  );
}
