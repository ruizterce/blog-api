import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchPosts, deletePost } from "../services/api";
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
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import "../styles/styles.css";

const PostsTable = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

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

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);

      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container className="container" sx={{ marginTop: 0 }}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginTop={1}
        marginBottom={1}
      >
        <Typography
          variant="h6"
          component="h1"
          color="primary"
          gutterBottom
          sx={{ margin: 0 }}
        >
          Blog Posts
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/new-post")}
        >
          New Post
        </Button>
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
                  <TableCell>
                    {" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleImageClick(post.image);
                      }}
                    >
                      {post.image}
                    </a>
                  </TableCell>
                  <TableCell>{post.title}</TableCell>
                  <TableCell>{post.text}</TableCell>
                  <TableCell>{post.createdAt}</TableCell>
                  <TableCell>{post.updatedAt}</TableCell>
                  <TableCell>{post.status}</TableCell>
                  <TableCell>
                    <ButtonGroup orientation="vertical">
                      <Button>
                        <EditNoteIcon
                          onClick={() => navigate(`/edit-post/${post.id}`)}
                        ></EditNoteIcon>
                      </Button>
                      <Button>
                        <DeleteForeverIcon
                          onClick={() => handleDelete(post.id)}
                        ></DeleteForeverIcon>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Dialog open={!!selectedImage} onClose={handleImageClose}>
        <DialogContent>
          <CloseIcon
            aria-label="close"
            onClick={handleImageClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          ></CloseIcon>
          {selectedImage && (
            <img
              src={`${import.meta.env.VITE_API_URL + selectedImage}`}
              alt="Post"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default PostsTable;
