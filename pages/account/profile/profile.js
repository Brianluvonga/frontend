import { useState, useEffect, useRef } from 'react';

const ProfileComponent = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="flex items-center cursor-pointer" onClick={toggleDropdown}>
                <div className="h-8 w-8 bg-gray-300 flex items-center justify-center rounded-full uppercase absolute top-0 right-0 h-8 w-8">
                    h {/* Placeholder profile image */}
                </div>
            </div>
            {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 shadow">
                    <ul className="py-2">
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Marketplace</li>
                        <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Log Out</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileComponent;
