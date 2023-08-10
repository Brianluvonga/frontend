import React from 'react';
import 'tailwindcss/tailwind.css';


const SparesSection = () => {
    return (
        <div className='bg-gray-300'>
            <h2 className="text-2xl font-bold mb-4 p-2 text-center font-serif">Find Spares On</h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 p-3 ">
                <div>
                    <img className="h-auto w-full max-w-[200px] rounded-lg" src="suzuki.png" alt="" />
                </div>
                <div>
                    <img className="h-auto w-full max-w-[200px] rounded-lg" src="ford.png" alt="" />
                </div>
                <div>
                    <img className="h-auto w-full max-w-[200px] rounded-lg" src="mahindra.png" alt="" />
                </div>
                <div>
                    <img className="h-auto w-full max-w-[200px] rounded-lg" src="rolls.png" alt="" />
                </div>
                <div>
                    <img className="h-auto w-full max-w-[200px] rounded-lg" src="tvs.png" alt="" />
                </div>
                <div>
                    <img className="h-auto w-full max-w-[200px] rounded-lg" src="tata.png" alt="" />
                </div>
            </div>
        </div>
    );
};

export default SparesSection;
