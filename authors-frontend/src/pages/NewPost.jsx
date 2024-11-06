import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { createPost } from "../services/api";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState("UNPUBLISHED");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createPost({ title, text, image, status });
    navigate("/dashboard");
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

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
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <Button type="submit" variant="contained">
        Create Post
      </Button>
    </Box>
  );
};

export default NewPost;
