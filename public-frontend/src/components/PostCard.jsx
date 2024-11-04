import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PostCard = ({ post }) => (
  <div className="post-card">
    <h2>{post.title}</h2>
    <p>{post.text.substring(0, 100)}...</p>
    <Link to={`/post/${post.id}`}>Read More</Link>
  </div>
);

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostCard;
