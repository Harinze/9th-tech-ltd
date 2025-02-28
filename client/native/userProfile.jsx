import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css"; // Import the CSS file

const UserProfile = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  if (!user) {
    return (
      <div className="container">
        <div className="loading">Loading user...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="profile-card">
        <img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="profile-pic"
        />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
