import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { loginUser } from "../services/api";
import PropTypes from "prop-types";

const LoginForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, password };
      const response = await loginUser(userData);
      const { token } = response;
      localStorage.setItem("token", token);

      setShowForm(false);
      setOpenSnackbar(true);
      setUsername("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    onClose();
    window.location.reload();
  };

  return (
    <>
      {showForm ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          {error && <Typography color="error">{error}</Typography>}{" "}
          {/* Display error message */}
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button onClick={onClose} color="secondary" sx={{ mt: 1 }}>
            Cancel
          </Button>
        </Box>
      ) : (
        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Login successful!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

LoginForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default LoginForm;
