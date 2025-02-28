import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import UserProfile from "../native/userProfile"; 
import "./App.css";

const LoginForm = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Navigation hook

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    try {
        const { data } = await axios.post(`http://localhost:5000${endpoint}`, formData, { withCredentials: true });

        // ✅ Store token & user data in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user)); 

        setMessage(isLogin ? `Welcome, ${data.user.name}!` : "Account created successfully!");

        if (isLogin) {
            navigate("/profile"); // Redirect to Profile Page
        }
    } catch (error) {
        setMessage(error.response?.data?.error || "Something went wrong!");
    }

    setLoading(false);
};


  return (
    <div className="container">
      <div className="header">
        <button onClick={() => setDarkMode(!darkMode)} className="toggle-btn">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className="form-container">
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          )}
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign up" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </Router>
  );
};

export default App;
