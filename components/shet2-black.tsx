"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SheetDemo2() {
  const [isClient, setIsClient] = useState(true);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const pathname = usePathname(); // Call usePathname unconditionally

  const links = [
    { name: "Home", href: "/" },
    { name: "Stitched", href: "/stitched" },
    { name: "Unstitched", href: "/unstitched" },
    { name: "Lawn Collections", href: "/lawn-collections" },
    { name: "West", href: "/west" },
  ];

  if (!isClient) {
    return null; // Render nothing on the server side
  }

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
            <line y1="1" x2="30" y2="1" stroke="black" strokeWidth="2"></line>
            <line y1="11" x2="20" y2="11" stroke="black" strokeWidth="2"></line>
          </svg>
          <h1 className="navbar-brand3 text-black text-xs sm:text-sm md:text-base">
            Syeda Hafsa
          </h1>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <SheetHeader>
          <SheetTitle className="text-base">Categories</SheetTitle>
        </SheetHeader>
        <nav className="grid gap-4 py-4">
          {links.map((link, idx) => (
            <div key={idx}>
              <Link
                className={`no-underline col-span-3 text-sm ${
                  pathname === link.href ? "text-black" : ""
                }`}
                href={link.href}
              >
                {link.name}
              </Link>
            </div>
          ))}
        </nav>
        <SheetFooter>
          <SheetClose asChild>{/* Close button content if needed */}</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default SheetDemo2;

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";

// export function SheetDemo2() {
//   const [isClient, setIsClient] = useState(true);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return null; // Render nothing on the server side
//   }

//   const links = [
//     { name: "Home", href: "/" },
//     { name: "Stitched", href: "/Stitched" },
//     { name: "Unstitched", href: "/Unstitched" },
//     { name: "Lawn Collections", href: "/LawnCollections" },
//     { name: "West", href: "/West" },
//   ];

//   const pathname = usePathname();

//   return (
//     <Sheet>
//       <SheetTrigger>
//         <div className="flex items-center mt-4 ml-4">
//           <svg
//             width="25"
//             className="icon-hamburger mr-4"
//             height="12"
//             viewBox="0 0 30 12"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <line y1="1" x2="30" y2="1" stroke="black" strokeWidth="2"></line>
//             <line y1="11" x2="20" y2="11" stroke="black" strokeWidth="2"></line>
//           </svg>
//           <h1 className="navbar-brand3 text-black text-xs sm:text-sm md:text-base">
//             Syeda Hafsa
//           </h1>
//         </div>
//       </SheetTrigger>
//       <SheetContent className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
//         <SheetHeader>
//           <SheetTitle className="text-base">Categories</SheetTitle>
//         </SheetHeader>
//         <nav className="grid gap-4 py-4">
//           {links.map((link, idx) => (
//             <div key={idx}>
//               <Link
//                 className={`no-underline col-span-3 text-sm ${
//                   pathname === link.href ? "text-primary" : ""
//                 }`}
//                 href={link.href}
//               >
//                 {link.name}
//               </Link>
//             </div>
//           ))}
//         </nav>
//         <SheetFooter>
//           <SheetClose asChild>{/* Close button content if needed */}</SheetClose>
//         </SheetFooter>
//       </SheetContent>
//     </Sheet>
//   );
// }

// export default SheetDemo2;


