import "../index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Outlet,
  useParams,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Post() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/description/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setError(err.message);
      });

    // Fetch comments
    fetch(`http://localhost:8080/api/comments/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch comments");
        }
        return response.json();
      })
      .then((data) => {
        setComments(data.comments);
      })
      .catch((err) => {
        console.error("Fetch comments failed:", err);
      });
  }, [slug]);

  if (error) {
    return <span>Error: {error}</span>;
  }

  if (!post) {
    return <span>Loading...</span>;
  }

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    try {
      const response = await fetch("http://localhost:8080/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId: post.title,
          comment: comment
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setComments(data.comments);
        setComment("");
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const { title, description } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>

      <div style={{ marginTop: 20 }}>
        <h4>Comments ({comments.length})</h4>
        <div style={{ marginBottom: 10 }}>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
            style={{ 
              padding: 8, 
              width: 300,
              borderRadius: 4,
              border: '1px solid #ddd',
              marginRight: 10
            }}
          />
          <button 
            onClick={handleCommentSubmit}
            style={{ 
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Comment
          </button>
        </div>
        <div style={{ maxWidth: 600 }}>
          {comments.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment, index) => (
              <div 
                key={index} 
                style={{ 
                  marginBottom: 15,
                  padding: 15,
                  backgroundColor: '#f8f9fa',
                  borderRadius: 8,
                  border: '1px solid #e9ecef',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  marginBottom: 8 
                }}>
                  <div style={{ 
                    width: 32, 
                    height: 32, 
                    borderRadius: '50%', 
                    backgroundColor: '#007bff',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 10
                  }}>
                    {String.fromCharCode(65 + (index % 26))}
                  </div>
                  <div>
                    <div style={{ fontWeight: 'bold' }}>User {index + 1}</div>
                    <div style={{ fontSize: '0.8em', color: '#666' }}>
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div style={{ marginLeft: 42 }}>{comment}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
