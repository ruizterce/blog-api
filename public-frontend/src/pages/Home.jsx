import { useState, useEffect } from "react";
import { fetchPosts } from "../services/api";
import PostCard from "../components/PostCard";
import { Container, Typography, Grid2, CircularProgress } from "@mui/material";
import "../styles/styles.css";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container className="container">
      <Typography variant="h4" component="h1" gutterBottom>
        Blog Posts
      </Typography>
      <Grid2 container spacing={2}>
        {posts.map((post) => (
          <Grid2 item xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
};

export default Home;
