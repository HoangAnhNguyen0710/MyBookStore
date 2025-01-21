"use client";
import Image from "next/image";
import { FilterBar } from "@/components/Home/FilterBar"; // Import the FilterBar component
import { CafeCardItem } from "@/components/Home/CarouselCard";
import { useEffect, useState } from "react";
import { Carousel } from "@/components/Home/Carousel";
import { Typography } from "@mui/material";
import CategoryCard, { CategoryCardItem } from "@/components/Home/CategoryCard";
import ReviewCard, { ReviewCardItem } from "@/components/Home/ReviewCard";

const cafeList: CafeCardItem[] = [
  {
    id: 1,
    name: "Highlands Coffee",
    preview_url: "/images/banner.jpg",
    price_from: 20000,
    price_to: 100000,
    avg_rating: 4.2,
    location_province: "Ha Noi",
    total_reviews: 10,
  },
  {
    id: 2,
    name: "Starbucks Coffee",
    preview_url: "/images/banner.jpg",
    price_from: 50000,
    price_to: 140000,
    avg_rating: 4,
    location_province: "Ha Noi",
    total_reviews: 20,
  },
  {
    id: 3,
    name: "Cong Cafe",
    preview_url: "/images/banner.jpg",
    price_from: 20000,
    price_to: 80000,
    avg_rating: 3.5,
    location_province: "Ha Noi",
    total_reviews: 30,
  },
  {
    id: 4,
    name: "Trung Nguyen Cafe",
    preview_url: "/images/banner.jpg",
    price_from: 20000,
    price_to: 80000,
    avg_rating: 4.5,
    location_province: "Ha Noi",
    total_reviews: 40,
  },
  {
    id: 5,
    name: "Always Cafe",
    preview_url: "/images/banner.jpg",
    price_from: 20000,
    price_to: 80000,
    avg_rating: 4.8,
    location_province: "Ha Noi",
    total_reviews: 30,
  },
  {
    id: 6,
    name: "Cafe Dong Tay",
    preview_url: "/images/banner.jpg",
    price_from: 20000,
    price_to: 80000,
    avg_rating: 3.2,
    location_province: "Ha Noi",
    total_reviews: 60,
  },
];

const reviews: ReviewCardItem[] = [
  {
    id: 1,
    reviewer_name: "John Doe",
    reviewer_avatar_url: "https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg",
    content: "I love this place",
    rating: 5,
    cafe: {
      id: 6,
      name: "Cafe Dong Tay",
      price_from: 20000,
      price_to: 80000,
      avg_rating: 3.2,
      location_province: "Ha Noi",
      total_reviews: 60,
      preview_url: "",
    },
    created_at: new Date(),
  },
  {
    id: 2,
    reviewer_name: "John Doe",
    reviewer_avatar_url: "https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg",
    content: "I love this place",
    rating: 5,
    cafe: {
      id: 5,
      name: "Always Cafe",
      preview_url: "/images/banner.jpg",
      price_from: 20000,
      price_to: 80000,
      avg_rating: 4.8,
      location_province: "Ha Noi",
      total_reviews: 30,
    },
    created_at: new Date(),
  },
  {
    id: 3,
    reviewer_name: "Hoa Khanh",
    reviewer_avatar_url: "https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg",
    content: "Delicious cookies",
    rating: 4.5,
    cafe: {
      id: 6,
      name: "Cafe Dong Tay",
      price_from: 20000,
      price_to: 80000,
      avg_rating: 3.2,
      location_province: "Ha Noi",
      total_reviews: 60,
      preview_url: "",
    },
    created_at: new Date(),
  },
  {
    id: 4,
    reviewer_name: "HoangAnh",
    reviewer_avatar_url: "https://i.pinimg.com/564x/24/21/85/242185eaef43192fc3f9646932fe3b46.jpg",
    content: "Not bad!",
    rating: 3,
    cafe: {
      id: 5,
      name: "Always Cafe",
      preview_url: "/images/banner.jpg",
      price_from: 20000,
      price_to: 80000,
      avg_rating: 4.8,
      location_province: "Ha Noi",
      total_reviews: 30,
    },
    created_at: new Date(),
  },
];

const categories: CategoryCardItem[] = [
  {
    id: 1,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category1",
    name: "Category1",
  },
  {
    id: 2,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category2",
    name: "Category2",
  },
  {
    id: 3,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category3",
    name: "Category3",
  },
  {
    id: 4,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category4",
    name: "Category4",
  },
  {
    id: 5,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category5",
    name: "Category5",
  },
  {
    id: 6,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category6",
    name: "Category6",
  },
  {
    id: 7,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category7",
    name: "Category7",
  },
  {
    id: 8,
    default_src:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqFW7N79wsNE02gbyn8Zb3s_IB8zViENe8Iw&s", // Default image
    hover_src:
      "https://www.nguyenlieutrasua.com/cdn/shop/articles/tra-sua-1_1024x1024.jpg?v=1699365446", // Image to show on hover
    alt: "Category8",
    name: "Category8",
  },
];

export default function Home() {
  // const [cafeListData, setCafeListData] = useState(cafeList);
  const [isLoading, setIsLoading] = useState(true); // State để theo dõi việc tải dữ liệu

  useEffect(() => {
    setIsLoading(false); // Sau khi dữ liệu đã được tải
  }, []); // Chỉ chạy một lần khi component mount

  if (isLoading) {
    return <div>Loading...</div>; // Hiển thị khi dữ liệu chưa sẵn sàng
  }
  return (
    <div className="grid justify-items-center min-h-screen pt-0 pb-20 gap-16 font-[family-name:var(--font-geist-sans)]">
      <div className="relative w-full h-[30vh]">
        {/* Banner Image */}
        <Image
          src="/images/banner.jpg"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          priority={true}
        />

        {/* Overlay FilterBar */}
        <div className="max-w-[500px]">
          <FilterBar />
        </div>
        {/* Carousel  */}
      </div>
      {!isLoading && (
        <div className="flex flex-col gap-8 row-start-2 items-center w-full">
          <Typography
            variant="h5"
            sx={{
              p: 2,
              color: "white",
              fontWeight: 600,
              borderRadius: 3,
            }}
            className="bg-primary"
          >
            Near You
          </Typography>
          <Carousel cafeList={cafeList} />
          <Typography
            variant="h5"
            sx={{
              // bgcolor: "#fb7185",
              p: 2,
              color: "white",
              fontWeight: 600,
              borderRadius: 3,
            }}
            className="bg-primary"
          >
            Highly Recommended
          </Typography>
          <Carousel cafeList={cafeList} />
          <Typography
            variant="h5"
            sx={{
              p: 2,
              color: "white",
              fontWeight: 600,
              borderRadius: 3,
            }}
            className="bg-primary"
          >
            Top Rating
          </Typography>
          <Carousel cafeList={cafeList} />
        </div>
      )}
      {/* reviews */}
      <Typography
        variant="h5"
        sx={{
          p: 2,
          color: "white",
          fontWeight: 600,
          borderRadius: 3,
        }}
        className="bg-primary"
      >
        Recent Reviews
      </Typography>
      <div className="">
        {reviews ? (
          <div className="grid grid-cols-4 gap-4">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        ) : (
          <div>Skeleton here</div>
        )}

        {/* Add more boxes as needed */}
      </div>
      {/* Categories */}
      <Typography
        variant="h5"
        sx={{
          p: 2,
          color: "white",
          fontWeight: 600,
          borderRadius: 3,
        }}
        className="bg-primary"
      >
        Categories
      </Typography>
      <div className="">
        {categories ? (
          <div className="grid grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        ) : (
          <div>Skeleton here</div>
        )}

        {/* Add more boxes as needed */}
      </div>
    </div>
  );
}
