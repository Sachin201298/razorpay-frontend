import Link from 'next/link';
import React from 'react'

const page = () => {
 return (
    <div className="flex  max-w-6xl mx-auto h-screen items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded shadow text-center">
        <h1 className="text-3xl text-green-600 font-bold">Thank you!</h1>
        <p className="mt-2 text-gray-600">
          Your contribution was successful. 🙏
        </p>
        <p className='mt-6'>visit our site to help more by <Link className='text-blue-600 text-[17px] hover:border-b-2' href={"/"}>click here</Link></p>
      </div>
    </div>
  );
}

export default page