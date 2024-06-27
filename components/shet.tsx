"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo() {
  const [isClient, setIsClient] = useState(false); // Default to false
  const pathname = usePathname(); // Always call hooks at the top level

  useEffect(() => {
    setIsClient(true); // Set to true after mount
  }, []);

  if (!isClient) {
    return null; // Render nothing or a loading indicator on the server
  }

  // const links = [
  //   { name: "Home", href: "/" },
  //   { name: "stitched", href: "/stitched" },
  //   { name: "unstitched", href: "/unstitched" },
  //   { name: "lawn Collections", href: "/lawn-collections" },
  //   { name: "west", href: "/west" },
  // ];

  return (
    <Sheet>
      <SheetTrigger>
        <div className="flex items-center mt-4 ml-4">
          <svg
            width="25"
            className="icon-hamburger mr-4"
            height="12"
            viewBox="0 0 30 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line y1="1" x2="30" y2="1" stroke="white" strokeWidth="2"></line>
            <line y1="11" x2="20" y2="11" stroke="white" strokeWidth="2"></line>
          </svg>
          <h1 className="navbar-brand2 text-xs sm:text-sm md:text-base">
            Syeda Hafsa
          </h1>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <SheetHeader>
          <SheetTitle className="text-base">
            Categories
            <h5 className="col-span-3 text-m">
              <a href="/" className="no-underline mt-4">
                Women
              </a>
            </h5>
          </SheetTitle>
        </SheetHeader>
        {/* <nav className="grid gap-4 py-4">
          {links.map((link, idx) => (
            <div key={idx}>
              <Link
                className="no-underline col-span-3 text-sm visited:text-black"
                href={link.href.toLowerCase()}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav> */}
        <nav className="grid gap-4 py-4">
          <Link className="no-underline col-span-3 text-sm visited:text-black mt-2"
           href={'/'}>Home</Link>
          <Link className="no-underline col-span-3 text-sm visited:text-black "
           href={'/stitched'}>Stitched</Link>
          <Link className="no-underline col-span-3 text-sm visited:text-black "
           href={'/unstitched'}>Unstitched</Link>
          <Link className="no-underline col-span-3 text-sm visited:text-black "
           href={'/lawn-collections'}>lawn Collections</Link>
          <Link className="no-underline col-span-3 text-sm visited:text-black"
           href={'/west'}>West</Link>
          
        </nav>
       

        <SheetFooter>
          <SheetClose asChild>
            {/* <Button className="text-xs">Close</Button> */}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SheetDemo;

// "use client";
// import React from "react";
// import Link from "next/link";
// import { connect } from 'react-redux';

// import { usePathname } from "next/navigation";
// import { Button } from "../components/ui/button";
// import { ShoppingBag, TrendingUp } from "lucide-react";
// import { useShoppingCart } from "use-shopping-cart";

// import { useEffect, useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// export function SheetDemo() {
//   // This state will be used to ensure the component only renders on the client-side
//   const [isClient, setIsClient] = useState(true);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     // Render nothing or a loading indicator on the server
//     return null;
//   }

//   const links = [
//     { name: "Home", href: "/" },
//     { name: "Stitched", href: "/stitched" },
//     { name: "Unstitched", href: "/unstitched" },
//     { name: "Lawn Collections", href: "/lawn-collections"},
//     { name: "West", href: "/west" },
//   ];
//   // Women
//   // Ready To Wear
//   // Unstitched
//   // Western Wear
//   // Lawn Collections
//   const pathname = usePathname();
//   // const { handleCartClick } = useShoppingCart();
//   return (
//     <Sheet>
//       <SheetTrigger>
//         <div className="flex items-center mt-4 ml-4">
//           <svg width="25" className="icon-hamburger mr-4" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <line y1="1" x2="30" y2="1" stroke="white" stroke-width="2"></line>
//             <line y1="11" x2="20" y2="11" stroke="white" stroke-width="2"></line>
//           </svg>
//           {/* <img src="/menu.png" alt="Menu" className="menu mb-1 sm:w-8 sm:h-8 md:mr-2" /> */}
//           <h1 className="navbar-brand2 text-xs sm:text-sm md:text-base">Syeda Hafsa</h1>
//         </div>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
//         <SheetHeader>
//           <SheetTitle className="text-base">Categories
//           <h5 className="col-span-3 text-m">
//               <a href="/women" className="no-underline mt-4">Women</a>
//             </h5>
//           </SheetTitle>
//         </SheetHeader>
//         {/* <div className="grid gap-4 py-4">
//           <div className="grid grid-cols-4 items-center gap-4">
//             <h5 className="col-span-3 text-m">
//               <a href="/women" className="no-underline">Women</a>
//             </h5>
//             <h5 className="col-span-3 text-sm">
//               <a href="/women" className="no-underline">Ready To Wear</a>
//             </h5>
        
//             <h5 className="col-span-3 text-sm">
//               <a href="/girls" className="no-underline">Unstitched</a>
//             </h5>
//             <h5 className="col-span-3 text-sm">
//               <a href="/boys" className="no-underline">Western Wear</a>
//             </h5>
//             <h5 className="col-span-3 text-sm">
//               <a href="/boys" className="no-underline">Lawn Collections
//               </a>
//             </h5>

//           </div> */}

//         {/* </div> */}
//         <nav className="grid gap-4 py-4">
//           {/* <div className="grid grid-cols-4 items-center gap-4"> */}
//              {links.map((link, idx) => (
//               <div key={idx}>
//                 {pathname === link.href ? (
//                   <Link className=" no-underline col-span-3 text-sm visited:text-black" href={link.href}>
//                     {link.name}
//                   </Link>
//                 ) : (
//                   <Link className=" no-underline col-span-3 text-sm visited:text-black" href={link.href}>
//                     {link.name}
//                   </Link>
//                 )}
//               </div>
              
//             ))}
//             {/* </div> */}
//           </nav>
//         <SheetFooter>
//           <SheetClose asChild>
//             {/* <Button className="text-xs">Close</Button> */}
//           </SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

// export default SheetDemo;


