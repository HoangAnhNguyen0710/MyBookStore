"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Rating,
  Typography,
} from "@mui/material";
import { CafeCardItem } from "./CarouselCard";
import StarIcon from "@mui/icons-material/Star";

export interface ReviewCardItem {
  id: number;
  reviewer_name: string;
  reviewer_avatar_url: string;
  created_at: Date;
  content: string;
  rating: number;
  cafe: CafeCardItem;
}

export interface ReviewCardProps {
  review: ReviewCardItem;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card
      sx={{
        maxWidth: 360,
        my: 1.5,
        mx: 1,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <CardContent className="flex flex-col !p-0">
        {/* Header Section */}
        <Box
          component="div"
          className="flex items-center p-4 bg-gray-100 border-b"
        >
          <Avatar
            alt={review.reviewer_name}
            src={review.reviewer_avatar_url}
            className="min-h-16 min-w-16 border border-gray-300"
          />
          <Box component="div" className="flex flex-col px-4">
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-gray-800 font-bold"
            >
              {review.reviewer_name}
            </Typography>
            <Typography
              variant="body2"
              className="text-gray-500 text-sm font-medium"
            >
              {review.cafe.name} ・ {review.cafe.total_reviews} reviews
            </Typography>
          </Box>
        </Box>

        {/* Review Content */}
        <Box component="div" className="flex flex-col px-4 py-3 space-y-3">
          <Typography className="flex items-center text-gray-700">
            <Rating
              value={review.rating}
              precision={0.25}
              readOnly
              size="small"
              className="text-yellow-500"
            />
            <span className="px-2 text-sm text-gray-500">
              3 days ago
            </span>
          </Typography>

          <Typography
            className="text-gray-700 leading-relaxed text-base"
            sx={{ height: 150, overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {review.content}
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

        {/* Footer Section */}
        <Box
          component="div"
          className="flex justify-between items-center w-full bg-secondary text-white px-4 py-3"
        >
          <Box component="div" className="flex flex-col">
            <Typography variant="h6" className="font-bold text-lg">
              {review.cafe.name}
            </Typography>
            <Typography
              className="flex items-center text-sm font-medium"
              color="inherit"
            >
              <span>Cafe ・ </span>
              <span className="px-2">{review.cafe.location_province} ・ </span>
              <span className="flex items-center">
                {review.cafe.avg_rating}
                <StarIcon fontSize="small" className="ml-1" />
              </span>
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
