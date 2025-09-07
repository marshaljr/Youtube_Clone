import React from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";
// import SearchBar from "./SearchBar";

const Categories = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
      py: 1,
    }}>
    {categories.map((category) => (
      <button
        key={category.name}
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        style={{
          backgroundColor:
            category.name === selectedCategory ? "#FC1503" : "transparent",
          color: "white",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          padding: "8px 16px",
          marginBottom: 8,
          border: "none",
          borderRadius: 4,
        }}>
        <span
          style={{
            color: category.name === selectedCategory ? "white" : "#FC1503",
            marginRight: 15,
            display: "flex",
            alignItems: "center",
          }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === selectedCategory ? 1 : 0.8 }}>
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default Categories;
