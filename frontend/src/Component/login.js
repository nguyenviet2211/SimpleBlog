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


function Login({ onLogin }) {
  const [creds, setCreds] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "post",
        headers: {
          Accept: "application /json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      if (response.ok) {
        onLogin && onLogin({ username: creds.username });
        navigate("/stats");
      } else setError("Invalid username or password!");
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed!");
    }
  };
  return (
    <div style={{ padding: 10 }}>
      {" "}
      <br />
      <span>Username:</span>
      <br />
      <input
        type="text"
        onChange={(e) => setCreds({ ...creds, username: e.target.value })}
      />
      <br />
      <span>Password:</span>
      <br />
      <input
        type="password"
        onChange={(e) => setCreds({ ...creds, password: e.target.value })}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
      <p>{error}</p>
    </div>
  );
}

export default Login;