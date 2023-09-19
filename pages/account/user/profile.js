import React, { useState, useEffect } from "react";
import axios from 'axios';



const fetchUserDetails = async (userId) => {
    try {
        const response = await axios.get(`http://127.0.0.1:8000/user/${userId}/`);
        const user = response.data;
        return user;
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
};


const UserProfile = ({ userId }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = await fetchUserDetails(userId);
            if (user) {
                setUserData(user);
            }
        };

        fetchUserData();
    }, [userId]);

    if (!userData) {
        return <div>Loading user data...</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p>Email: {userData.email}</p>
            <p>First Name: {userData.firstName}</p>
            <p>Last Name: {userData.lastName}</p>
            {/* Display other user details here */}
        </div>
    );
};

export default UserProfile;
