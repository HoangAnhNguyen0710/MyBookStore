"use client";
import { useState } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

export interface CategoryCardItem {
  id: number;
  default_src: string; // Default image
  hover_src: string; // Image to show on hover
  alt: string;
  name: string;
}

interface CategoryCardProps {
  category: CategoryCardItem;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Box
      sx={{
        position: "relative",
        width: 300,
        height: 300,
        overflow: "hidden",
        cursor: "pointer",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <Image
        src={isHovered ? category.hover_src : category.default_src}
        alt={category.alt}
        width={300}
        height={300}
        style={{
          transition: "opacity 0.3s ease-in-out",
          objectFit: "cover",
        }}
      />

      {/* Overlay with dynamic opacity */}
      <div
        className="absolute inset-0 bg-black"
        style={{
          transition: "background-color 0.3s ease-in-out",
          backgroundColor: isHovered ? "rgba(0, 0, 0, 0.6)" : "rgba(0, 0, 0, 0.4)",
        }}
      />

      {/* Category Name */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
          {category.name}
        </Typography>
      </div>
    </Box>
  );
};

export default CategoryCard;
