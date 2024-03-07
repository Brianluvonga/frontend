import { useRouter } from 'next/router';

const CarDetailPage = () => {
  const router = useRouter();
  const { car } = router.query;

  // Parse the car object from the query parameter
  const parsedCar = car ? JSON.parse(car) : null;

  if (!parsedCar) {
    return <div>Loading...</div>; // Add proper loading state
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center">
        <div className="w-full md:w-1/2 mb-4">
          <img src={parsedCar.image} alt={parsedCar.name} className="w-full h-auto max-w-full md:max-w-md rounded-lg" />
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <h1 className="text-3xl font-bold mb-4">{parsedCar.name}</h1>
          <p className="text-lg text-gray-600 mb-4">Price: Ksh.{parsedCar.price}</p>
          {/* Add more details about the car as needed */}
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
