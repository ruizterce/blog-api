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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  TableSortLabel,
} from "@mui/material";

import "../styles/styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [authorFilter, setAuthorFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

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

  const uniqueAuthors = [...new Set(posts.map((post) => post.author))];

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleAuthorChange = (event) => setAuthorFilter(event.target.value);

  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => (authorFilter ? post.author === authorFilter : true))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.id - b.id;
      return b.id - a.id;
    });

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container className="container">
      <Box display="flex" justifyContent={"space-between"} gap={1} mb={2}>
        <FormControl sx={{ width: 200 }} size="small">
          <InputLabel>Filter by Author</InputLabel>
          <Select
            value={authorFilter}
            onChange={handleAuthorChange}
            label="Filter by Author"
            size="small"
          >
            <MenuItem value="">All Authors</MenuItem>
            {uniqueAuthors.map((author) => (
              <MenuItem key={author} value={author}>
                {author}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ width: "100%", maxWidth: "60%", flexGrow: 1 }}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder="Search articles..."
            onChange={handleSearchChange}
          />
        </Box>

        <Button
          onClick={toggleSortOrder}
          sx={{ paddingLeft: 3, paddingRight: 2 }}
          color="discreteGrey"
        >
          Sort <TableSortLabel active direction={sortOrder}></TableSortLabel>
        </Button>
      </Box>

      {filteredPosts.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          No posts found matching your search criteria.
        </Typography>
      ) : (
        <Grid2 container spacing={2}>
          {filteredPosts.map((post) => (
            <Grid2 size={{ xs: 12, md: 6 }} key={post.id}>
              <PostCard post={post} />
            </Grid2>
          ))}
        </Grid2>
      )}
    </Container>
  );
};

export default Home;
