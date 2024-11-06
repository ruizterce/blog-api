import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { fetchUserProfile, logout } from "../services/api";

const Header = () => {
  const [username, setUsername] = useState(null);

  const handleLogoClick = () => {
    window.location.href = "/";
  };

  const handleLogin = () => {
    window.location.href = "/login";
  };

  useEffect(() => {
    const fetchUsername = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const userProfile = await fetchUserProfile(token);
          setUsername(userProfile.username);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };
    fetchUsername();
  }, []);

  const handleLogout = () => {
    logout();
    setUsername(null);
    window.location.href = "/";
  };

  return (
    <AppBar position="static" color="primary" sx={{ padding: "0.5rem 1rem" }}>
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          onClick={handleLogoClick}
          sx={{ textTransform: "none", color: "inherit" }}
        >
          <Typography variant="h6" component="div">
            My Blog
          </Typography>
        </Button>
        <Typography
          variant="subtitle1"
          color="textSecondary"
          sx={{
            display: { xs: "none", sm: "block" },
          }}
        >
          Authors Dashboard
        </Typography>
        {username ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              Welcome, {username}!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 1 }}>
              Not logged in
            </Typography>
            <Button color="inherit" onClick={handleLogin}>
              Login
            </Button>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
