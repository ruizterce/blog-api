import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { registerUser } from "../services/api";
import PropTypes from "prop-types";

const RegisterForm = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, email, password };
      await registerUser(userData);
      setShowForm(false);
      setOpenSnackbar(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    onClose();
  };

  return (
    <>
      {showForm ? (
        <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom>
            Register
          </Typography>
          {error && <Typography color="error">{error}</Typography>}{" "}
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
          />
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
            color="buttonGrey"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
          <Button onClick={onClose} color="error" sx={{ mt: 1 }}>
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
            Registration successful!
          </Alert>
        </Snackbar>
      )}
    </>
  );
};

RegisterForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default RegisterForm;
