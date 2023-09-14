
import { useRouter } from 'next/router';

const CarDetail = () => {
  const router = useRouter();
  const { id } = router.query; // Get the car ID from the URL

  // Fetch car details based on the ID and display them here

  return (
    <div>
      <h1>Car Details</h1>
      <p>Car ID: {id}</p>
      {/* Display car details here */}
    </div>
  );
};

export default CarDetail;
