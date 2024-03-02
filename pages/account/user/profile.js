import React, { useState, useEffect } from "react";
import axios from 'axios';

const UserProfile = ({ userId }) => {
    const [data, setUserData] = useState({});

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                if (userId) {
                    const response = await axios.get(`http://127.0.0.1:8000/user/${userId}/`);
                    const user = response.data;
                    console.log("Response from API:", response); // Log the response
                    console.log("Fetched user details:", user);
                    setUserData(user);
                }
            }
            catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserDetails();
        console.log("data:", data); // Log userData for debugging


    }, [userId]);


    // Check if userData exists before rendering
    if (Object.keys(data).length === 0) {
        return <div>Loading user data...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Email: {data.email}</p>
            <p>First Name: {data.firstName}</p>
            <p>Last Name: {data.lastName}</p>
            {/* Display other user details here */}
        </div>
    );
};

export default UserProfile;
