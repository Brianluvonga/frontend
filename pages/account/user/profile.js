
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = ({ userId }) => {
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            console.log('current Id:', userId);

            if (userId) {
                try {
                    const response = await axios.get(`http://127.0.0.1:8000/user/${userId}/`);
                    const data = response.data;
                    setUserData(data);
                    setIsLoading(false);
                    console.log('response info data', data);
                    console.log('isLoading state after update:', isLoading);

                } catch (error) {
                    console.error('Error fetching user data:', error);
                    setError('Error fetching user data. Please try again later.');
                    setIsLoading(false);
                }

            }

        };

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
    if (!userData) {
        return <div>No Data...</div> // or return a default message like "User data not found"
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
