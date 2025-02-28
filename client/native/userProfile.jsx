import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 text-lg font-semibold text-gray-700 dark:text-white">
        <div className="animate-pulse text-center">
          <p>Loading user...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-sm text-center transform transition-all hover:scale-105">
        <img
          src={user.profilePicture || "https://via.placeholder.com/150"}
          alt="User Profile"
          className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-gray-300 dark:border-gray-600 shadow-md"
        />
        <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{user.name}</h2>
        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
