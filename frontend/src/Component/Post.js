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
  console.log("slug", slug);
  useEffect(() => {
    fetch(`http://localhost:8080/api/posts/slug/${slug}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        if (data.Comments && Array.isArray(data.Comments)) {
          setComments(data.Comments);
        }
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
        setError(err.message);
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
      const response = await fetch(`http://localhost:8080/api/posts/${post._id}/comment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },      
        body: JSON.stringify({
          text: comment,
          userId: localStorage.getItem("userId") || "anonymous"
        }),
      });

      console.log(localStorage.getItem("firstName"), localStorage.getItem("lastName"));
      const newComment = {
        user: {
          first_name: localStorage.getItem("firstName"),
          last_name: localStorage.getItem("lastName")
        },
        text : comment,
        date : Date.now()
      }
      
      setComments(prev => [...prev, newComment]);
      setComment("");
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };
  const { title, description, slug: postSlug } = post;

  return (
    <div style={{ padding: 20 }}>
      <h3>{title}</h3>
      <p>{description}</p>

      <div style={{ marginTop: 20 }}>
        <h4>Comments ({comments ? comments.length : 0})</h4>
        <div style={{ marginBottom: 10 }}>
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment..."
          />
          <button  onClick={handleCommentSubmit}>
            Comment
          </button>
        </div>        
        <div style={{ maxWidth: 600 }}>
          {!comments || comments.length === 0 ? (
            <p style={{ color: '#666', fontStyle: 'italic' }}>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((commentItem, index) => (
              <div key={commentItem._id || index}>
                <div>           
                  <div>
                    <div>
                      {commentItem.user ? `${commentItem.user.first_name} ${commentItem.user.last_name}` : `Người dùng ${index + 1}`}
                    </div>
                    <div>
                      {new Date(commentItem.date || Date.now()).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div style={{ marginLeft: 42 }}>{commentItem.text}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
