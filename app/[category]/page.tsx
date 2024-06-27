"use client"
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { simplifiedProduct } from "../interface";
import SheetDemo2 from "@/components/shet2-black";
import Cart2 from "@/components/cart-black";
import ShoppingCartModal from "@/components/ShoppingCartModal";
import { client } from "../lib/sanity";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
// Function to fetch data (should be used in server-side context or during SSR)
async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
    _id,
    "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
  }`;

  const data = await client.fetch(query);
  return data;
}

// Functional component for CategoryPage
const CategoryPage = ({ params }: { params: { category: string } }) => {
  // State to hold product data
  const [data, setData] = React.useState<simplifiedProduct[]>([]);

  // Fetch data when component mounts (client-side rendering)
  React.useEffect(() => {
    // Function to fetch data and update state
    const fetchData = async () => {
      try {
        const result = await getData(params.category);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [params.category]); // Ensure useEffect runs when category param changes

  return (
    <main>
      <div className="bg-white">
        <header className="flex items-center justify-between p-2 bg-transparent mb-6">
          <div className="flex items-center space-x-4">
            <SheetDemo2 />
          </div>
          {/* <div className="flex items-center space-x-4">
            <Cart2 />
            <ShoppingCartModal />
          </div> */}
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
        <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold tracking-tight text-p">
              Our Products for {params.category}
            </h2>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => (
              <div key={product._id} className="group relative">
                {/* <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div> */}
                <Link href={`/product/${product.slug}`}> <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Image
                    src={product.imageUrl}
                    alt="Product image"
                    className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                    width={300}
                    height={300}
                  />
                </div></Link>

                <div className="mt-4 flex justify-between">
                  <div>
                    {/* <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product.slug}`}>
                        <p className="no-underline mr-4">{product.name}</p>
                      </Link>
                    </h3> */}
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product.slug}`} className="no-underline mr-4">
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.categoryName}
                    </p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CategoryPage;

// "use client"
// import React from "react";
// import Link from "next/link";
// import { simplifiedProduct } from "../interface";
// import SheetDemo2 from "@/components/shet2-black";// Ensure the path is correct
// import Cart from "@/components/cart";
// import Cart2 from "@/components/cart-black";
// import ShoppingCartModal from "@/components/ShoppingCartModal"; // Ensure the path is correct
// import { client } from "../lib/sanity";
// import Image from "next/image";
// import Nav2 from "@/components/nav-black";

// async function getData(cateogry: string) {
//   const query = `*[_type == "product" && category->name == "${cateogry}"] {
//             _id,
//               "imageUrl": images[0].asset->url,
//               price,
//               name,
//               "slug": slug.current,
//               "categoryName": category->name
//           }`;

//   const data = await client.fetch(query);

//   return data;
// }

// export const dynamic = "force-dynamic";

// export default async function CategoryPage({
//   params,
// }: {
//   params: { category: string };
// }) {
//   const data: simplifiedProduct[] = await getData(params.category);

//   return (
//     <main>
//       <div className="bg-white">
//       <header className="flex items-center justify-between p-2 bg-transparent mb-6">
//       <div className="flex items-center space-x-4">
//         <SheetDemo2/>
//         {/* <span className="font-semibold text-lg">Syeda Hafsa</span> */}
//       </div>
//       <div className="flex items-center space-x-4">
//         <Cart2 />
//         <ShoppingCartModal />
//       </div>
//     </header>
//         <div className="mx-auto max-w-2xl px-4 sm:px-6  lg:max-w-7xl lg:px-8">
//           <div className="flex justify-between items-center">
//             <h2 className="text-2xl font-bold tracking-tight text-p">
//               Our Products for {params.category}
//             </h2>
//           </div>

//           <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
//             {data.map((product) => (
//               <div key={product._id} className="group relative">
//                 <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
//                   <Image
//                     src={product.imageUrl}
//                     alt="Product image"
//                     className="w-full h-full object-cover object-center lg:h-full lg:w-full"
//                     width={300}
//                     height={300}
//                   />
//                 </div>

//                 <div className="mt-4 flex justify-between">
//                   <div>
//                     <h3 className="text-sm text-gray-700">
//                       <Link href={`/product/${product.slug}`} className="no-underline mr-4">
//                         {product.name}
//                       </Link>
//                     </h3>
//                     <p className="mt-1 text-sm text-gray-500">
//                       {product.categoryName}
//                     </p>
//                   </div>
//                   <p className="text-sm font-medium text-gray-900">
//                     ${product.price}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
// export default CategoryPage;
