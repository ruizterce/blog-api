import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        mt: "auto",
        backgroundColor: "primary.main",
        color: "white",
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} My Blog - Crafted with love by{" "}
        <Link
          href="https://github.com/ruizterce"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          sx={{ fontWeight: "bold" }}
        >
          ruizterce
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
