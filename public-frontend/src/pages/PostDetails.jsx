import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../services/api";
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
} from "@mui/material";
import "../styles/styles.css";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container className="container">
      <Typography variant="h4" component="h1" gutterBottom>
        {post.title}
      </Typography>
      {post.image && (
        <img
          src={post.image}
          alt={`${post.title} cover`}
          className="post-image"
        />
      )}
      <Typography variant="body1" paragraph>
        {post.text}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Author: {post.author.username}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Published: {new Date(post.createdAt).toLocaleDateString()}
      </Typography>

      <Typography variant="h5" component="h2" gutterBottom>
        Comments ({post.comments.length})
      </Typography>
      <List>
        {post.comments.map((comment) => (
          <ListItem key={comment.id}>
            <Typography>{comment.text}</Typography>
            <Typography variant="caption" color="text.secondary">
              by {comment.user.username} on{" "}
              {new Date(comment.createdAt).toLocaleDateString()}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default PostDetails;
