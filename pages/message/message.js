import React, { useState } from 'react';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission, for example, send the data to a backend server
        console.log(formData);
    };

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-mono">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                            <select id="subject" name="subject" value={formData.subject} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                                <option value="">Select</option>
                                <option value="Question">Check Vehicle Availability</option>
                                <option value="Feedback">Waiting for Feedback</option>
                                <option value="Support">Payment Details</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full h-32 resize-none" required></textarea>
                        </div>
                    </div>
                    <div className="mt-6">
                        <button type="submit" className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-600">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
