import React from "react";
import 'tailwindcss/tailwind.css';
import Footer from "../footer/Footer";
import Link from 'next/link';



const AboutSection = () => {
    return (
        <>
            <div className="py-4 px-4 font-serif">
                <div className="container mx-auto">
                    <nav className="text-sm">
                        <Link href="/"
                            className="text-blue-600">Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-600">About</span>
                    </nav>
                </div>
            </div>

            <section className="bg-white py-16 font-serif">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 lg:pr-8">
                            <h2 className="text-4xl font-bold mb-6">About ClassicsKE</h2>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                ClassicsKE is dedicated to preserving automotive heritage and
                                celebrating the golden era of classic cars. Our passion for
                                vintage automobiles drives us to provide a platform where car
                                enthusiasts can connect, buy, and sell classic cars and parts.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                At ClassicsKE, we believe that classic cars are more than just
                                vehicles; they are pieces of history and art. We strive to create
                                a community where like-minded individuals can come together to
                                share their passion, knowledge, and stories about these timeless
                                automobiles.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                Whether you are a seasoned collector or a newcomer to the world of
                                classic cars, ClassicsKE is here to help you find your next dream
                                car or assist you in selling your cherished classic to someone
                                who will appreciate it just as much as you do.
                            </p>

                        </div>
                        <div className="lg:w-1/2 lg:pl-8 mt-8 lg:mt-8">
                            <img
                                className="w-full h-auto rounded-lg shadow-lg"
                                src="/shop5.jpg"
                                alt="About ClassicsKE" />
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
};

export default AboutSection;
