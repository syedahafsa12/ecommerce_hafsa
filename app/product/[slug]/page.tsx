"use client";
import React, { useState, useEffect } from 'react';
import AddToBag from "@/components/AddToBag";
import CheckoutNow from "@/components/CheckOutNow";
import SheetDemo2 from "@/components/shet2-black";
import Cart from "@/components/cart";
import { fullProduct } from "@/app/interface";

import Cart2 from "@/components/cart-black";
import ShoppingCartModal from "@/components/ShoppingCartModal";
import ImageGallery from "@/components/ImageGallery";
import { Button } from "@/components/ui/button";
import { Star, Truck } from "lucide-react";
import Nav2 from "@/components/nav-black";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { getProductData } from '@/app/FetchProductData'; // Import the fetching function

export default function ProductPge({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<fullProduct | null>(null);

  useEffect(() => {
    async function fetchData() {
      const productData = await getProductData(params.slug);
      setData(productData);
    }
    fetchData();
  }, [params.slug]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className="bg-white">
        <header className="flex items-center justify-between p-2 bg-transparent mb-6">
          <div className="flex items-center space-x-4">
            <SheetDemo2 />
          </div>
          <div className="flex items-center space-x-2">
        <SignedOut>
          {/* <SignInButton /> */}
          {/* <SignInButton mode="modal" className=" text-black font-semibold py-2 px-4 rounded">
            Sign In
          </SignInButton> */}
           <SignInButton mode="modal">
            <span className="text-black font-semibold py-2 px-4 rounded">
              Sign In
            </span>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Cart2 />
        <ShoppingCartModal />
      </div>
        </header>

        <div className="mx-auto max-w-screen-xl px-4 md:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <ImageGallery images={data.images} />

            <div className="md:py-8">
              <div className="mb-2 md:mb-3">
                <span className="mb-0.5 inline-block text-gray-500">
                  {data.categoryName}
                </span>
                <h2 className="text-2xl font-bold text-p lg:text-3xl">
                  {data.name}
                </h2>
              </div>

              <div className="mb-6 flex items-center gap-3 md:mb-10">
                <Button className="rounded-full gap-x-2 bg-p hover:bg-p hover:text-white">
                  <span className="text-sm text-white">4.2</span>
                  <Star className="h-5 w-5 text-white" />
                </Button>

                <span className="text-sm text-gray-500 transition duration-100">
                  56 Ratings
                </span>
              </div>

              <div className="mb-4">
                <div className="flex items-end gap-2">
                  <span className="text-xl font-bold text-p md:text-2xl">
                    ${data.price}
                  </span>
                </div>

                <span className="text-sm text-gray-500">
                  Incl. Vat plus shipping
                </span>
              </div>

              <div className="mb-6 flex items-center gap-2 text-gray-500">
                <Truck className="w-6 h-6" />
                <span className="text-sm">2-4 Day Shipping</span>
              </div>

              <div className="flex gap-2.5 ">
                <AddToBag
                  currency="USD"
                  description={data.description}
                  image={data.images[0]}
                  name={data.name}
                  price={data.price}
                  key={data._id}
                  price_id={data.price_id}
                />
              </div>

              <p className="mt-12 text-base text-gray-500 tracking-wide">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

// "use client"
// import React from 'react'
// import AddToBag from "@/components/AddToBag";
// import CheckoutNow from "@/components/CheckOutNow";
// import SheetDemo2 from "@/components/shet2-black";// Ensure the path is correct
// import Cart from "@/components/cart";
// import Cart2 from "@/components/cart-black";
// import ShoppingCartModal from "@/components/ShoppingCartModal"; // Ensure the path is correct
// import ImageGallery from "@/components/ImageGallery";
// import { fullProduct } from "@/app/interface";
// import { client } from "@/app/lib/sanity";
// import { Button } from "@/components/ui/button";
// import { Star, Truck } from "lucide-react";
// // import Nav2 from '@/components/nav-black';
// import Nav2 from "@/components/nav-black";
// // import {client} from "@/app/lib/sanity"
// // import { fullProduct } from "@/app/interface";
// async function getData(slug: string) {
//   const query = `*[_type == "product" && slug.current == "${slug}"][0] {
//         _id,
//             images,
//             price,
//             name,
//             description,
//             "slug": slug.current,
//             "categoryName": category->name,
//             price_id
//         }`;

//   const data = await client.fetch(query);

//   return data;
// }
// export const dynamic = "force-dynamic";

// export default async function ProductPge({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const data: fullProduct = await getData(params.slug);


//   return (
//     <main>
//       <div className="bg-white">
//       <header className="flex items-center justify-between p-2 bg-transparent mb-6">
//       <div className="flex items-center space-x-4">
//         <SheetDemo2 />
//         {/* <span className="font-semibold text-lg">Syeda Hafsa</span> */}
//       </div>
//       <div className="flex items-center space-x-4">
//         <Cart2 />
//         <ShoppingCartModal />
//       </div>
//     </header>

//         <div className="mx-auto max-w-screen-xl px-4 md:px-8">
//           <div className="grid gap-8 md:grid-cols-2">
//             <ImageGallery images={data.images} />

//             <div className="md:py-8">
//               <div className="mb-2 md:mb-3">
//                 <span className="mb-0.5 inline-block text-gray-500">
//                   {data.categoryName}
//                 </span>
//                 <h2 className="text-2xl font-bold text-p lg:text-3xl">
//                   {data.name}
//                 </h2>
//               </div>

//               <div className="mb-6 flex items-center gap-3 md:mb-10">
//                 <Button className="rounded-full gap-x-2 bg-p hover:bg-p hover:text-white">
//                   <span className="text-sm text-white">4.2</span>
//                   <Star className="h-5 w-5 text-white" />
//                 </Button>

//                 <span className="text-sm text-gray-500 transition duration-100">
//                   56 Ratings
//                 </span>
//               </div>

//               <div className="mb-4">
//                 <div className="flex items-end gap-2">
//                   <span className="text-xl font-bold text-p md:text-2xl">
//                     ${data.price}
//                   </span>
//                   {/* <span className="mb-0.5 text-red-500 line-through">
//                 ${data.price + 20}
//               </span> */}
//                 </div>

//                 <span className="text-sm text-gray-500">
//                   Incl. Vat plus shipping
//                 </span>
//               </div>

//               <div className="mb-6 flex items-center gap-2 text-gray-500">
//                 <Truck className="w-6 h-6" />
//                 <span className="text-sm">2-4 Day Shipping</span>
//               </div>

//               <div className="flex gap-2.5 ">
//                 <AddToBag
//                   currency="USD"
//                   description={data.description}
//                   image={data.images[0]}
//                   name={data.name}
//                   price={data.price}
//                   key={data._id}
//                   price_id={data.price_id}
//                 />
//                 {/* <CheckoutNow
//                   currency="USD"
//                   description={data.description}
//                   image={data.images[0]}
//                   name={data.name}
//                   price={data.price}
//                   key={data._id}
//                   price_id={data.price_id}
//                 /> */}
//               </div>

//               <p className="mt-12 text-base text-gray-500 tracking-wide">
//                 {data.description}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }