// "use client"
import React from 'react';
// import { useRouter } from 'next/router';
import { Button } from "@/components/ui/button";

const SuccessPage = () => {
  // const router = useRouter();

  // const handleGoBack = () => {
  //   router.push('/');
  // };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md">
        <h1 className="text-3xl font-bold text-green-500 mb-4">Payment Successful!</h1>
        <p className="text-gray-700 mb-6">
          Your payment was processed successfully. Thank you for your purchase!
        </p>
        {/* <Button onClick={handleGoBack} className="bg-p text-white hover:bg-p hover:text-white">
          Go Back to Home
        </Button> */}
      </div>
    </div>
  );
}

export default SuccessPage;
