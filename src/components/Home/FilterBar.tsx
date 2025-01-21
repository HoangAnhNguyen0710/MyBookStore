import React from "react";
import {
  Box,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"; // Import the Search icon

export const FilterBar = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "60%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: 2,
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        width: "80%",
        maxWidth: "800px",
        flexWrap: "wrap", // Allow wrapping when necessary
        justifyContent: "center",
      }}
    >
      {/* Category Filter */}
      <FormControl sx={{ minWidth: 120, flex: "1 1 150px" }}>
        <InputLabel id="category-label">Category</InputLabel>
        <Select labelId="category-label" label="Category" defaultValue="">
          <MenuItem value="">All</MenuItem>
          <MenuItem value="cafe">Cafe</MenuItem>
          <MenuItem value="milk-tea">Milk Tea</MenuItem>
          <MenuItem value="regular-drink">Regular Drinks</MenuItem>
        </Select>
      </FormControl>

      {/* Location Search */}
      <TextField
        label="Location"
        placeholder="Enter location"
        variant="outlined"
        fullWidth
        sx={{ flex: "1 1 150px" }}
      />

      {/* Search Button with Icon */}
      <IconButton
        color="primary"
        size="large"
        aria-label="search"
        sx={{
          color: "white",
          width: "56px", // Fixed width for button
          height: "56px", // Match height to width
          flex: "0 0 auto", // Prevent it from shrinking
        }}
        className="!bg-primary hover:!bg-secondary"
      >
        <SearchIcon />
      </IconButton>
    </Box>
  );
};
