"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  TextField,
  InputAdornment,
  MenuItem,
  Slider,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CarouselCard, { CafeCardItem } from "@/components/Home/CarouselCard";

// Type definitions for categories and locations
interface CategoryMap {
  [key: number]: string;
}

export default function CafeListPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");
  const [title, setTitle] = useState<string>("Cafe List");
  const [filteredCafes, setFilteredCafes] =
    useState<CafeCardItem[]>(mockCafeData);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    location: "",
    priceRange: [0, 30], // Default price range
    rating: 0,
  });

  const categoryMap: CategoryMap = {
    1: "Americano",
    2: "Latte",
    3: "Espresso",
  };

  const locationOptions = [
    "New York",
    "Los Angeles",
    "San Francisco",
    "Chicago",
    "Boston",
  ];

  // Update title dynamically
  useEffect(() => {
    if (category) {
      const categoryName = categoryMap[Number(category)] || "Unknown";
      setTitle(`Cafe List with Category = "${categoryName}"`);
    } else {
      setTitle("Cafe List");
    }
  }, [category]);

  // Update filtered cafes when filters change
  useEffect(() => {
    const filtered = mockCafeData.filter((cafe) => {
      const matchesSearch =
        !filters.search ||
        cafe.name.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory =
        !filters.category || String(cafe.id) === filters.category;
      const matchesLocation =
        !filters.location || cafe.location_province === filters.location;

      const cafePriceFrom = cafe.price_from ?? 0; // Default to 0 if undefined
      const cafePriceTo = cafe.price_to ?? Infinity; // Default to Infinity if undefined
      const matchesPrice =
        cafePriceFrom >= filters.priceRange[0] &&
        cafePriceTo <= filters.priceRange[1];

      const matchesRating = cafe.avg_rating >= filters.rating;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesPrice &&
        matchesRating
      );
    });

    setFilteredCafes(filtered);
  }, [filters]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (key: string, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6 gap-4 bg-gray-50 sm:p-10">
      {/* Title */}
      <h1 className="text-2xl font-bold text-primary">{title}</h1>

      {/* Main Layout */}
      <div className="flex flex-col w-full max-w-7xl gap-4 sm:flex-row">
        {/* Sidebar Filters */}
        <aside className="w-full sm:w-1/3 bg-white shadow-md rounded-lg px-6 py-4 space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">Filters</h2>

          {/* Search Filter */}
          <TextField
            label="Search"
            variant="outlined"
            fullWidth
            placeholder="Search cafes..."
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="bg-white rounded"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          {/* Category Dropdown */}
          <TextField
            label="Category"
            variant="outlined"
            select
            fullWidth
            value={filters.category}
            onChange={(e) => handleFilterChange("category", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {Object.entries(categoryMap).map(([id, name]) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </TextField>

          {/* Location Dropdown */}
          <TextField
            label="Location"
            variant="outlined"
            select
            fullWidth
            value={filters.location}
            onChange={(e) => handleFilterChange("location", e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {locationOptions.map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </TextField>

          {/* Price Range Slider */}
          <div>
            <Typography gutterBottom>Price Range ($)</Typography>
            <div className="mx-2">
              <Slider
                value={filters.priceRange}
                onChange={(e, value) => handleFilterChange("priceRange", value)}
                valueLabelDisplay="auto"
                min={0}
                max={50}
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <Typography gutterBottom>Minimum Rating</Typography>
            <div className="mx-2">
              <Slider
                value={filters.rating}
                onChange={(e, value) => handleFilterChange("rating", value)}
                valueLabelDisplay="auto"
                step={0.5}
                min={0}
                max={5}
              />
            </div>
          </div>
        </aside>

        {/* Cafe List */}
        <div className="flex flex-col w-full sm:w-full space-y-4">
          {/* Cafe Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCafes.map((cafe) => (
              <CarouselCard key={cafe.id} cafe={cafe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Mock Data
const mockCafeData: CafeCardItem[] = [
  {
    id: 1,
    preview_url: "/images/cafe1.jpg",
    name: "Cafe Americano",
    avg_rating: 4.5,
    total_reviews: 120,
    location_province: "New York",
    price_from: 10,
    price_to: 20,
  },
  {
    id: 2,
    preview_url: "/images/cafe2.jpg",
    name: "Latte Lounge",
    avg_rating: 4.0,
    total_reviews: 85,
    location_province: "Los Angeles",
    price_from: 8,
    price_to: 15,
  },
  {
    id: 3,
    preview_url: "/images/cafe1.jpg",
    name: "Espresso Express",
    avg_rating: 5.0,
    total_reviews: 200,
    location_province: "San Francisco",
    price_from: 12,
    price_to: 25,
  },
  {
    id: 4,
    preview_url: "/images/cafe2.jpg",
    name: "Mocha Magic",
    avg_rating: 3.5,
    total_reviews: 50,
    location_province: "Chicago",
    price_from: 7,
    price_to: 12,
  },
  {
    id: 5,
    preview_url: "/images/cafe1.jpg",
    name: "Cappuccino Corner",
    avg_rating: 4.8,
    total_reviews: 150,
    location_province: "Boston",
    price_from: 10,
    price_to: 18,
  },
];
