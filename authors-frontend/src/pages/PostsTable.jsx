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
  TableSortLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
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
  const [authorFilter, setAuthorFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

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
  const handleStatusChange = (event) => setStatusFilter(event.target.value);

  const filteredPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.text.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((post) => (authorFilter ? post.author === authorFilter : true))
    .filter((post) => (statusFilter ? post.status === statusFilter : true))
    .sort((a, b) => {
      if (sortOrder === "asc") return a.id - b.id;
      return b.id - a.id;
    });

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      const updatedPosts = await fetchPosts();
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleImageClick = (imageUrl) => setSelectedImage(imageUrl);
  const handleImageClose = () => setSelectedImage(null);

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Container className="container" sx={{ marginTop: 0 }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
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
      </Box>

      {/* Filter Options */}
      <Box display="flex" justifyContent={"space-between"} gap={2} mb={2}>
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

        <FormControl sx={{ width: 200 }} size="small">
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={handleStatusChange}
            label="Filter by Status"
            size="small"
          >
            <MenuItem value="">All Statuses</MenuItem>
            <MenuItem value="PUBLISHED">Published</MenuItem>
            <MenuItem value="UNPUBLISHED">Unpublished</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Table Display */}
      {filteredPosts.length === 0 ? (
        <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
          No posts found matching your search criteria.
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active
                    direction={sortOrder}
                    onClick={toggleSortOrder}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Text</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
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
                  <TableCell>
                    {" "}
                    {post.text.length > 80
                      ? post.text.slice(0, 80) + "..."
                      : post.text}
                  </TableCell>
                  <TableCell>
                    {new Date(post.createdAt).toLocaleString("en-GB", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {new Date(post.updatedAt).toLocaleString("en-GB", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  <TableCell>{post.status}</TableCell>
                  <TableCell>
                    <ButtonGroup orientation="vertical">
                      <Button onClick={() => navigate(`/edit-post/${post.id}`)}>
                        <EditNoteIcon />
                      </Button>
                      <Button onClick={() => handleDelete(post.id)}>
                        <DeleteForeverIcon />
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Image Dialog */}
      <Dialog open={!!selectedImage} onClose={handleImageClose}>
        <DialogContent>
          <CloseIcon
            aria-label="close"
            onClick={handleImageClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          />
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
