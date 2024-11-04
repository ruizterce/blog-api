import { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "block",
});

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const StyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

const StyledTypography = styled(Typography)({
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
});

function Author({ author, date }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <Avatar
          key={author}
          alt={author}
          src={"img"}
          sx={{ width: 24, height: 24 }}
        />
        <Typography variant="caption">{author}</Typography>
      </Box>
      <Typography variant="caption">{date}</Typography>
    </Box>
  );
}

Author.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string.isRequired,
};

const PostCard = ({ post }) => {
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };
  return (
    <StyledLink to={`/post/${post.id}`}>
      <StyledCard
        variant="outlined"
        onFocus={() => handleFocus(0)}
        onBlur={handleBlur}
        tabIndex={0}
        className={focusedCardIndex === 0 ? "Mui-focused" : ""}
      >
        {post.image && (
          <CardMedia
            component="img"
            alt={post.title}
            image={
              `${apiUrl}${post.image}` || "../assets/placeholder-image.jpg"
            }
            sx={{
              aspectRatio: "16 / 9",
              borderBottom: "1px solid",
              borderColor: "divider",
            }}
          />
        )}
        <StyledCardContent>
          <Typography gutterBottom variant="h6" component="div">
            {post.title}
          </Typography>
          <StyledTypography variant="body2" color="text.secondary" gutterBottom>
            {post.text.substring(0, 100)}...
          </StyledTypography>
        </StyledCardContent>
        <Author
          author={post.author}
          date={new Date(post.createdAt).toLocaleDateString()}
        />
      </StyledCard>
    </StyledLink>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    text: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
