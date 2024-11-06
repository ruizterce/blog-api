import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { loginUser } from "../services/api";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userData = { username, password };
      const response = await loginUser(userData);
      const { token } = response;
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ padding: 3 }}>
        <Typography variant="h6" gutterBottom>
          Login
        </Typography>
        {error && <Typography color="error">{error}</Typography>}{" "}
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
      </Box>
    </>
  );
};

export default LoginForm;
