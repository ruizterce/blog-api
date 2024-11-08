import { useState, useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Dialog,
  DialogContent,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  updatePost,
  fetchPostById,
  updateComment,
  deleteComment,
} from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [status, setStatus] = useState("UNPUBLISHED");
  const [selectedImage, setSelectedImage] = useState(null);
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePost(id, { title, text, image, status });
    navigate("/dashboard");
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const handleEditComment = async (commentId, updatedText) => {
    await updateComment(id, commentId, { text: updatedText });
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, text: updatedText } : c
      )
    );
  };

  const handleDeleteComment = async (commentId) => {
    await deleteComment(id, commentId);
    setComments(comments.filter((c) => c.id !== commentId));
  };

  useEffect(() => {
    const fetchPost = async (id) => {
      try {
        const data = await fetchPostById(id);
        setTitle(data.title);
        setText(data.text);
        setOriginalImage(data.image);
        setStatus(data.status);
        setComments(data.comments);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPost(id);
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        boxSizing: "border-box",
        padding: 3,
        width: "100%",
      }}
    >
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
      />
      <TextField
        label="Text"
        multiline
        rows={20}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        margin="normal"
      />
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"flex-end"}
      >
        <Box>
          <InputLabel id="status-select-label">Status</InputLabel>
          <Select
            labelId="status-select-label"
            id="status-select"
            value={status}
            label="status"
            onChange={handleStatusChange}
          >
            <MenuItem value={"UNPUBLISHED"}>UNPUBLISHED</MenuItem>
            <MenuItem value={"PUBLISHED"}>PUBLISHED</MenuItem>
          </Select>
        </Box>
        <Typography>
          Original image:{" "}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setSelectedImage(originalImage);
            }}
          >
            {originalImage}
          </a>
        </Typography>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
          accept="image/*"
        />
        <Button type="submit" variant="contained">
          Update Post
        </Button>
      </Box>

      {/* Comments Section */}
      <Box mt={4}>
        <Typography variant="h6">Comments</Typography>
        {comments.map((comment) => (
          <Box key={comment.id} display="flex" alignItems="center" mb={2}>
            <TextField
              fullWidth
              value={comment.text}
              onChange={(e) => {
                const newText = e.target.value;
                setComments(
                  comments.map((c) =>
                    c.id === comment.id ? { ...c, text: newText } : c
                  )
                );
              }}
            />
            <Button
              color="primary"
              onClick={() => handleEditComment(comment.id, comment.text)}
            >
              <EditIcon />
            </Button>
            <Button
              color="secondary"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <DeleteIcon />
            </Button>
          </Box>
        ))}
      </Box>

      <Dialog open={!!selectedImage} onClose={handleImageClose}>
        <DialogContent>
          <CloseIcon
            aria-label="close"
            onClick={handleImageClose}
            sx={{ position: "absolute", right: 8, top: 8 }}
          ></CloseIcon>
          {originalImage && (
            <img
              src={`${import.meta.env.VITE_API_URL + originalImage}`}
              alt="Post"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default EditPost;
