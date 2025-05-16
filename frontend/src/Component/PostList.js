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
  fetch("http://localhost:8080/api/titles")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    })
    .catch((err) => {
      console.error("Fetch failed:", err);
    });

  return (
    <ul>
      {data.map((title, index) => (
        <li key={index}>
          <Link to={`/posts/${title}`}>
            <h3>{title}</h3>
          </Link>
        </li>
      ))}
    </ul>
  );

}

export default PostLists;