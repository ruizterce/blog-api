import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../services/api"; // Adjust the import path as necessary

const PostDetails = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null); // Store the post data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchPostById(id); // Use the API service to fetch the post
        setPost(data); // Set the post data
      } catch (error) {
        setError(error.message); // Set error if fetch fails
      } finally {
        setLoading(false); // Loading done
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="post-details">
      <h1>{post.title}</h1>
      {post.image && (
        <img
          src={post.image}
          alt={`${post.title} cover`}
          className="post-image"
        />
      )}
      <p className="post-text">{post.text}</p>
      <div className="post-meta">
        <span>Author: {post.author.username}</span>
        <span>Published: {new Date(post.createdAt).toLocaleDateString()}</span>
      </div>

      <h2>Comments ({post.comments.length})</h2>
      <ul className="comments-list">
        {post.comments.map((comment) => (
          <li key={comment.id} className="comment">
            <p>{comment.text}</p>
            <div className="comment-meta">
              <span>by {comment.user.username}</span>
              <span>on {new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostDetails;
