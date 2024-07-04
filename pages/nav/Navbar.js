
'use client'

import Link from 'next/link';

import React, { useState } from "react";


const Navbar = () => {

    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };
    // handle smooth scrolling
    const handleMenuItemClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setActive(false); // Close the mobile menu after clicking on a menu item
        }
    };

    return <>


        <nav className=" navbar-container flex items-center flex-wrap bg-white p-3 sticky top-0 z-10">
            <a href="/">
                <a className="inline-flex items-center p-2 mr-4">
                    <span className="text-xl text-black font-bold tracking-wide font-serif">
                        ClassicsKE
                    </span>
                </a>
            </a>
            <button
                className="inline-flex p-3 hover:bg-black rounded lg:hidden ml-auto hover:text-white outline-none"
                onClick={handleClick}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
            <div
                className={`${active ? "" : "hidden"} w-full lg:inline-flex lg:flex-grow lg:w-auto`}
            >
                <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
                    <a href="/">
                        <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center font-serif hover:text-gray-400">
                            Home
                        </a>

                    </a>

                    <Link
                        href='/about/About'
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center font-serif hover:text-gray-400">

                        Shell

                    </Link>
                    <Link href="/built/already_built"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center font-serif hover:text-gray-400">
                        Already Built

                    </Link><a href="/shop/parts/parts" onClick={() => handleMenuItemClick('/shop/shop')}
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center font-serif hover:text-gray-400">
                        Sell

                    </a>
                    <Link href="/contacts/contact"
                        className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-black font-bold items-center justify-center font-serif hover:text-gray-400">
                        Contact

                    </Link>
                    
                </div>
                <div>
                    <Link href='/admin/login' className="inline-flex items-center p-2 ml-auto text-white font-bold bg-black hover:bg-gray-500 focus:ring-4 font-serif focus:outline-none focus:ring-blue-300 rounded-full text-sm px-4 py-2 text-center md:mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Get Started
                    </Link>
                </div>
            </div>

        </nav>

        <div className="flex items-center justify-center min font-serif">
            <div className="container mx-auto flex flex-col md:flex-row">
                <div className="md:w-1/2">
             
                    <img className="h-auto max-w-full" src="/back1.png" alt="Background" />
                </div>
                <div className="md:w-1/2 p-8">
                    <h1 className="text-4xl font-bold mb-4">Classic Cars</h1>
                    <p className="text-lg mb-4 text-gray-600">Preserving Automotive Heritage, Celebrating the Golden Era of Classic Cars.</p>

                    <p className="text-base mb-4 text-gray-800">Sell and Buy To Re-Build
                        Your Next Classic Car.</p>

                    <button type="button" class="text-white w-32 bg-black hover:bg-gray-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Learn More</button>

                </div>


            </div>


        </div>


    </>;
};

export default Navbar;


