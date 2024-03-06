import React, { useState } from 'react';
import 'tailwindcss/tailwind.css';
import Footer from "pages/footer/Footer";
import Link from 'next/link';



const Shop = () => {
    const cars = [
        {
            id: 1,
            name: '1941 Jeep RDI',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'Don Luvo',
            images: ['/back1.png'],
        },
        {
            id: 2,
            name: '1941 Jeep RDI',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'John Doe',
            images: ['/shop5.jpg'],
        },
        {
            id: 3,
            name: '1941 Jeep RDI',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'Gilbert Omosh',
            images: ['/shop7.jpg'],
        },
        {
            id: 4,
            name: '1941 Jeep RDI',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'Emmanuel',
            images: ['/shop8.jpg'],
        },
        {
            id: 5,
            name: '1941 Jeep RDI',
            description: 'Compact car with excellent fuel efficiency.',
            price: '$10,000',
            location: 'Los Angeles, CA',
            seller: 'Brian Muyekho',
            images: ['/shop4.png'],
        },
        // Add more cars here
    ];

    const [selectedCar, setSelectedCar] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);


    const handleCarClick = (car) => {
        setSelectedCar(car);
    };

    const handleCloseDetails = () => {
        setSelectedCar(null);
    };

    const handleAddToCart = (car, quantity) => {
        const existingCartItem = cartItems.find((item) => item.id === car.id);

        if (existingCartItem) {
            // If the car is already in the cart, update the quantity
            existingCartItem.quantity += quantity;
        } else {
            // If the car is not in the cart, add it with the given quantity
            const newCartItem = { ...car, quantity };
            setCartItems([...cartItems, newCartItem]);
        }
    };

    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };


    const CarCard = ({ car, onCarClick }) => (
        <div className="bg-white shadow rounded-lg p-4 cursor-pointer font-serif transition duration-300 ease-in-out transform hover:scale-105" onClick={() => onCarClick(car)}>
            <img className="h-48 w-full object-cover rounded-lg mb-4" src={car.images[0]} alt={car.name} />
            <h2 className="text-xl font-bold mb-2 text-left">{car.name}</h2>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-lg font-semibold mb-2 text-center">{car.price}</p>
                </div>
                <div>
                    <p className="text-gray-500 text-sm text-center">{car.seller}</p>
                </div>
            </div>
        </div>
    );

    const CarDetails = ({ car, onClose }) => (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out">
            <div className="bg-white shadow rounded-lg p-8">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold font-serif">{car.name}</h2>
                    <button className="text-gray-500 hover:text-gray-700 focus:outline-none" onClick={onClose}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="flex">
                    <div className="w-1/2 pr-8">
                        <img className="h-auto w-full rounded-lg mb-4 " src={car.images[0]} alt={car.name} />
                        <div className="flex align-left">
                            {car.images.map((image, index) => (
                                <img
                                    key={index}
                                    className="h-16 w-16 object-cover rounded-lg ml-1"
                                    src={image}
                                    alt={`${car.name}-${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="bg-gray-100 rounded-lg p-4">
                            <h3 className="text-lg font-bold mb-4">Specs:</h3>
                            <p>{car.description}</p>
                            <p>Location: {car.location}</p>
                            <p>Seller: {car.seller}</p>
                        </div>
                        <div className="flex justify-left mt-8">
                            <button className="bg-black hover:bg-gray-500 text-white py-2 px-4 rounded-lg" onClick={() => handleAddToCart(car)}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



    const CartIcon = () => {
        const cartItemCount = cartItems.length;

        return (
            <div className="relative cursor-pointer" onClick={handleOpenCart}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16"> <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" /> </svg>
                {cartItemCount > 0 && (
                    <div className="absolute top-0 right-0 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs">
                        {cartItemCount}
                    </div>
                )}
            </div>
        );
    };

    return (
        <>
            {/* Navigation bar */}
            <nav className="bg-gray-100 py-4 px-8 text-black font-serif">
                <div className="container mx-auto flex items-center justify-between">
                    <h1 className="text-2xl font-bold font-serif">Shop</h1>
                    <h1></h1>
                    <CartIcon />
                </div>
            </nav>

            <div className="py-4 px-4 font-serif">
                <div className="container mx-auto">
                    <nav className="text-sm">
                        <Link href="/"
                            className="text-blue-600">Home
                        </Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-600">Shop</span>
                    </nav>
                </div>
            </div>
            <div className="container mx-auto p-4">
                {/* <h1 className="text-2xl font-bold mb-8 font-serif">Shop</h1> */}

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {cars.map((car) => (
                        <div key={car.id} className="relative">
                            <CarCard car={car} onCarClick={handleCarClick} />

                        </div>
                    ))}
                </div>

                {selectedCar && (
                    <CarDetails car={selectedCar} onClose={handleCloseDetails} />
                )}

                {/* Cart section */}
                <div className="mt-8">

                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        <>
                            <div className={`fixed top-0 right-0 bottom-0 left-0 z-50 transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                                <div className="bg-white w-64 h-screen p-4 shadow-lg overflow-y-auto">
                                    <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => setSelectedCar(item)}
                                            className="cursor-pointer p-2 border-b border-gray-200 hover:bg-gray-100"
                                        >
                                            <p className="text-lg font-semibold">{item.name}</p>
                                            <p className="text-gray-500">{item.price}</p>
                                        </div>
                                    ))}
                                    <button
                                        onClick={handleCloseCart}
                                        className="bg-red-500 text-white mt-4 px-4 py-2 rounded-full hover:bg-red-600 focus:outline-none"
                                    >
                                        Close Cart
                                    </button>
                                </div>
                            </div>
                            <div
                                className={`fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out ${isCartOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                                onClick={handleCloseCart}
                            ></div>
                        </>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Shop;
