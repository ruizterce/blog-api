import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import ModalContainer from "./ModalContainer";
import { fetchUserProfile, logout } from "../services/api";

const Header = () => {
  const [username, setUsername] = useState(null);

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
  };

  return (
    <AppBar position="static" color="primary" sx={{ padding: "0.5rem 1rem" }}>
      <Toolbar
        variant="dense"
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          My Blog
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Your daily dose of knowledge
        </Typography>
        {username ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" sx={{ marginRight: 2 }}>
              Welcome, {username}!
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <ModalContainer />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
