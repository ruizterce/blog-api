import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
