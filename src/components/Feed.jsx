import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchVideos } from "../utils/fetchFromAPI";
import { Videos, Sidebar } from "./";
import { useDebounce } from "../hooks/Debounce";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [searchTerm, setSearchTerm] = useState("");

  const debounceSearchTerm = useDebounce(searchTerm, 1500);
  const query = debounceSearchTerm || selectedCategory;

  const {
    data: videos = [], // default to empty array
    error,
    isLoading,
  } = useQuery({
    queryKey: ["videos", query],
    queryFn: () => fetchVideos(query),
    staleTime: Infinity,
    enabled: !!query,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos: {error.message}</div>;

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>
      <Box
        sx={{
          height: { sx: "auto", md: "92vh" },
          borderRight: "1px solid #3d3d3d",
          px: { sx: 0, md: 2 },
        }}>
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        <Typography
          className="copyright"
          variant="body2"
          sx={{ mt: 1, color: "#fff" }}>
          Copyright © 2025 Marshal Ram
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={2}
          pl={2}
          sx={{ color: "white" }}>
          {debounceSearchTerm || selectedCategory || "New"}{" "}
          <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        {videos.length > 0 ? (
          <Videos videos={videos} />
        ) : (
          <Typography color="gray" pl={2}>
            No videos found
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
