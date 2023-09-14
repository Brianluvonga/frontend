import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = ({ userId }) => {
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    // Fetch user details using the user ID
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/get_user/${userId}/`
        ); // Replace with the actual endpoint
        const userData = response.data;
        setUserDetails(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  return (
    <div>
      <h1>Welcome to Your Dashboard</h1>
      {Object.keys(userDetails).length > 0 && (
        <div>
          <h2>User Profile</h2>
          <p>Name: {userDetails.firstName} {userDetails.lastName}</p>
          <p>Email: {userDetails.email}</p>
          {/* Display other user details here */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
