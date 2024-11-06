import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
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
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container className="container" sx={{ marginTop: 0 }}>
      <Box display={"flex"} marginTop={1} marginBottom={1}>
        <Typography
          variant="h6"
          component="h1"
          color="primary"
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
                fontSize: "0.8rem",
                padding: "6px 8px",
              },
              "& .MuiOutlinedInput-root": {
                height: "32px",
              },
            }}
          />
        </Box>
      </Box>
      {filteredPosts.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          No posts found matching your search criteria.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID </TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow
                  key={"post_" + post.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{post.id}</TableCell>
                  <TableCell>{post.author}</TableCell>
                  <TableCell> {post.image}</TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.text}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
                  <TableCell>{post.updatedAt}</TableCell>
                  <TableCell>{post.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default Home;
