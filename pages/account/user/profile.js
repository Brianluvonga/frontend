
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            if (userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/user/${userId}/`);
                    const data = response.data;
                    console.log('response info data', data);
                    setUserData(data);
                    setIsLoading(false);
                    console.log('isLoading state after update:', isLoading);
                    console.log('current Id:', userId);

                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data. Please try again later.');
                    setIsLoading(false);
                }

            }

        };

        // fetchUserData(); // Call the function inside useEffect
        if (userId !== undefined && userId !== null) {
            fetchUserData();
        }



    }, [userId]); // Include userId in the dependency array

    if (!isLoading) {
        return <div>Loading user data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
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

export default Profile;
