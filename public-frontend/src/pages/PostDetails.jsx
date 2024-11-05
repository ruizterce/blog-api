import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById, fetchUserProfile, postComment } from "../services/api";
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
  TextField,
  Button,
} from "@mui/material";
import "../styles/styles.css";
const apiUrl = import.meta.env.VITE_API_URL;

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");

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

    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userData = await fetchUserProfile(token);
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      }
    };

    fetchPost();
    fetchUser();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const commentData = await postComment(id, {
        text: newComment,
        userId: user.id,
      });
      setPost((prevPost) => ({
        ...prevPost,
        comments: [
          ...prevPost.comments,
          { ...commentData, user: { username: user.username } },
        ],
      }));
      setNewComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error)
    return (
      <Typography color="error" sx={{ mt: 2 }}>
        Error: {error}
      </Typography>
    );

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card>
        {post.image && (
          <CardMedia
            component="img"
            image={`${apiUrl}${post.image}`}
            alt={`${post.title} cover`}
            sx={{
              height: 600,
              borderRadius: "4px",
              mb: 2,
              objectFit: "cover",
              objectPosition: "center",
              width: "100%",
            }}
          />
        )}
        <CardContent>
          <Typography variant="h4" component="h1" color="primary" gutterBottom>
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
                    by{" "}
                    <Typography variant="caption" color="secondary">
                      {comment.user.username}
                    </Typography>{" "}
                    on {new Date(comment.createdAt).toLocaleDateString()}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {user && (
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ mt: 3 }}>
            <TextField
              label="Add a comment"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Post Comment
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PostDetails;
