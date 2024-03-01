// pages/car/[id].js

import { useRouter } from 'next/router';
import carData from '../../data/carData'; // Assuming you have car data stored in a separate file

const CarDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  
  // Find the car object from the carData array based on the ID
  const car = carData.find((car) => car.id === parseInt(id));

  if (!car) {
    return <div>Loading...</div>; // Add proper loading state
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{car.name}</h1>
      <img src={car.image} alt={car.name} className="w-full h-auto rounded-lg mb-4" />
      <p className="text-lg text-gray-600 mb-4">Price: Ksh.{car.price}</p>
      {/* Add more details about the car as needed */}
    </div>
  );
};

export default CarDetailPage;
