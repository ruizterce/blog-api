import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../services/api";
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import "../styles/styles.css";
const apiUrl = import.meta.env.VITE_API_URL;

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

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error)
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Error: {error}
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card>
        {post.image && (
          <CardMedia
            component="img"
            image={`${apiUrl}${post.image}`}
            alt={`${post.title} cover`}
            sx={{
              height: 300,
              borderRadius: "4px",
              mb: 2,
            }}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {post.title}
          </Typography>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar alt={post.author.username} src={post.author.avatar} />
            <Box>
              <Typography variant="subtitle2">
                {post.author.username}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Published: {new Date(post.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          <Typography variant="body1" paragraph>
            {post.text}
          </Typography>
        </CardContent>
      </Card>

      <Box mt={4}>
        <Typography variant="h5" component="h2" gutterBottom>
          Comments ({post.comments.length})
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <List>
          {post.comments.map((comment) => (
            <ListItem key={comment.id} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={comment.user.username} src={comment.user.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body2">{comment.text}</Typography>
                }
                secondary={
                  <Typography variant="caption" color="text.secondary">
                    by {comment.user.username} on{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default PostDetails;
