import React from 'react';

const SubscribeSection = () => {
    return (
        <section className="bg-gray-300 py-16">
            <div className="mx-auto px-4">
                <h2 className="text-2xl text-center font-bold mb-6">Subscribe to Our Newsletter</h2>
                <p className="text-gray-600 text-center mb-8">Get the latest updates straight to your inbox.</p>
                <div className="max-w-md mx-auto">
                    <form className="flex items-center">
                        <input
                            className="flex-grow py-3 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            type="email"
                            placeholder="Enter your email address"
                        />
                        <button
                            className="bg-black hover:bg-white hover:text-black  text-white py-3 px-6 rounded-r-lg tracking-wide focus:outline-none focus:ring-2 "
                            type="submit"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default SubscribeSection;
