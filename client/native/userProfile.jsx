import { useEffect, useState } from "react";
import axios from "axios";

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user", {
                    withCredentials: true, 
                    signal: controller.signal,
                });

                const { name, email, profilePicture } = response.data; 
                setUser({ name, email, profilePicture });
            } catch (error) {
                if (axios.isCancel(error)) {
                    console.log("Request canceled", error.message);
                } else {
                    setError("Failed to load user data");
                    console.error("Error fetching user data:", error);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchUser();

        return () => controller.abort();
    }, []);

    if (loading) return <p>Loading user...</p>;
    if (error) return <p className="error">{error}</p>;

    return user ? (
        <div className="user-profile">
            <img src={user.profilePicture} alt={user.name} className="profile-pic" />
            <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        </div>
    ) : (
        <p>No user found</p>
    );
};

export default UserProfile;
