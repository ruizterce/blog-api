import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import PostCard from "../components/PostCard";
import {
  Container,
  Typography,
  Grid2,
  CircularProgress,
  Box,
  TextField,
} from "@mui/material";

import "../styles/styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || // Search in title
      post.text.toLowerCase().includes(searchTerm.toLowerCase()) // Search in text
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container className="container" sx={{ marginTop: 0 }}>
      <Box display={"flex"} margin={1}>
        <Typography
          variant="h6"
          component="h1"
          gutterBottom
          sx={{ flexGrow: 1, minWidth: 220, margin: 0 }}
        >
          Blog Posts
        </Typography>
        <Box sx={{ width: "100%", maxWidth: 300, flexShrink: 1 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search articles..."
            onChange={handleSearchChange}
            sx={{
              "& .MuiInputBase-input": {
                fontSize: "0.8rem", // Smaller font size
                padding: "6px 8px", // Reduced padding
              },
              "& .MuiOutlinedInput-root": {
                height: "32px", // Set a custom height if needed
              },
            }}
          />
        </Box>
      </Box>
      <Grid2 container spacing={2}>
        {filteredPosts.map((post) => (
          <Grid2 size={{ xs: 12, md: 6 }} key={post.id}>
            <PostCard post={post} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Home;
