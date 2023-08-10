'use client'

import 'tailwindcss/tailwind.css';
import React, { useState, useEffect } from "react";
import axios from "axios";


const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    // Function to reset the success message status after a duration
    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                setIsSubmitted(false);
            }, 10000); // Set the duration in milliseconds (10 seconds in this example)

            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make an HTTP POST request to the backend API endpoint
            const response = await axios.post('http://127.0.0.1:8000/api/send_message/', formData);

            // Handle the response from the backend (e.g., show a success message)
            console.log(response.data);

            // Clear the form after successful submission
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            // Set isSubmitted to true to trigger the success message display
            setIsSubmitted(true);
        } catch (error) {
            // Handle any errors that occurred during the form submission
            console.error(error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (

        <div>


            <div className="flex flex-wrap justify-center items-center py-10" id='contact'>
                <div className="w-full lg:w-1/2 p-4">

                    <div className="bg-gray-100 shadow-lg rounded-lg p-6 font-serif">
                        <h2 className="text-2xl font-bold mb-4">Reach Out to Us</h2>
                        <p className="text-lg mb-4">
                            For further information or any inquiries, please feel free to contact us using the
                            provided phone number or email address. We would be happy to assist you.
                        </p>
                        <div className="flex items-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone" viewBox="0 0 16 16"> <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 
                        4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" /> </svg>
                            <span className="text font-medium p-2">(254) 798210403</span>
                        </div>
                        <div className="flex items-center mb-4">
                            <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" id="IconChangeColor"><path d="M44 24V9H24H4V24V39H24" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path><path d="M31 36L36 40L44 30" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path><path d="M4 9L24 24L44 9" stroke="#333" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" id="mainIconPathAttribute"></path></svg>

                            <span className="text font-medium p-2">support@ClassicsKE.com</span>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-map" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103zM10 1.91l-4-.8v12.98l4 .8V1.91zm1 12.98 4-.8V1.11l-4 .8v12.98zm-6-.8V1.11l-4 .8v12.98l4-.8z" /> </svg>
                            <span className="text font-medium p-2">123 Street, Eldoret, Eldoret</span>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 p-4">
                    <div className="bg-white shadow-lg rounded-lg p-6 font-serif">
                        <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <input
                                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            <input
                                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                            <textarea
                                className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                name="message"
                                placeholder="Message"
                                value={formData.message}
                                onChange={handleInputChange}
                            ></textarea>
                            <button
                                className="inline-flex items-center p-3 ml-auto text-white font-bold bg-black hover:bg-gray-500 focus:ring-4 font-serif focus:outline-none focus:ring-blue-300 rounded-full 
                            text-sm px-4 py-2.5 text-center md:mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                type="submit"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            {isSubmitted && (
                <div className="bg-green-200 text-green-700 py-2 px-4 flex items-center">
                    Message submitted successfully!
                </div>
            )}
        </div>

    );

};

export default ContactSection;
