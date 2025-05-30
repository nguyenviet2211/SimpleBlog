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
      if (!creds.username || !creds.password) {
        setError("Please enter both username and password");
        return;
      }
      
      const response = await fetch("http://localhost:8080/api/user/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(creds),
      });
      
      console.log("Response status:", response.status);
      
      if (response.ok) {
        try {
          const userData = await response.json();
          console.log("Login successful:", userData);
          // Luu user ID vào local
          localStorage.setItem("userId", userData._id);
          localStorage.setItem("firstName", userData.first_name);
          localStorage.setItem("lastName", userData.last_name);
          
          onLogin && onLogin({
            id: userData._id, 
            firstName: userData.first_name,
            lastName: userData.last_name,
            username: creds.username
          });
          
          navigate("/stats");
        } catch (jsonError) {
          console.error("Error parsing JSON response:", jsonError);
          setError("Server returned invalid data. Please try again.");
        }
      } else {
        try {
          const errorData = await response.json();
          setError(errorData.error || "Invalid username or password!");
        } catch (jsonError) {
          const errorText = await response.text();
          console.error("Non-JSON response:", errorText);
          setError(`Server error: ${response.status}`);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed! Please check your connection.");
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