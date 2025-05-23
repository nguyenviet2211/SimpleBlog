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

function PostLists() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:8080/api/posts/")
      .then((response) => response.json())
      .then((posts) => {
        setData(posts);
      })
      .catch((err) => {
        console.error("Fetch failed:", err);
      });
  }, []); 

  return (
    <ul>
      {data.map((post) => (
        <li key={post._id}>
          <Link to={`/posts/${post.slug}`}>
            <h3>{post.title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );

}

export default PostLists;