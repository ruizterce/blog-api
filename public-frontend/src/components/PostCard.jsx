import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <Card className="post-card">
      {post.image && (
        <CardMedia
          component="img"
          className="post-image"
          image={post.image}
          alt={post.title}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {post.text.substring(0, 100)}...
        </Typography>
        <Link to={`/post/${post.id}`}>
          <Button className="action-button" variant="contained" color="primary">
            Read More
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
