import React from 'react';
import SheetDemo from './shet'; // Ensure the path is correct
import Cart from './cart';
import ShoppingCartModal from './ShoppingCartModal'; // Ensure the path is correct
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const Nav = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-transparent mb-6">
      <div className="flex items-center space-x-4">
        <SheetDemo />
      </div>
      <div className="flex items-center space-x-2">
        <SignedOut>
          {/* <SignInButton /> */}
          {/* <SignInButton mode="modal" className=" text-white font-semibold py-2 px-4 rounded"> */}
          <SignInButton mode="modal">
            <span className="text-white font-semibold py-2 px-4 rounded">
              Sign In
            </span>
          </SignInButton>
            {/* Sign In
          </SignInButton> */}
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <Cart />
        <ShoppingCartModal />
      </div>
    </header>
  );
};

export default Nav;

// import React from "react";
// import SheetDemo from "./shet"; // Ensure the path is correct
// import Cart from "./cart";
// import ShoppingCartModal from "./ShoppingCartModal"; // Ensure the path is correct
// import { Button } from "./ui/button";
// import Link from "next/link";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton
// } from '@clerk/nextjs'

// const Nav = () => {
//   return (
//     <header className="flex items-center justify-between p-2 bg-transparent mb-6">
//       <div className="flex items-center space-x-4">
//         <SheetDemo />
//         {/* <span className="font-semibold text-lg">Syeda Hafsa</span> */}
//       </div>
//       <div className="flex items-center space-x-4">
// {/* <Link href={'/sign-in'}>Sign In</Link> */}
// <SignedOut>
//             <SignInButton />
//           </SignedOut>
//           <SignedIn>
//             <UserButton />
//           </SignedIn>
//         <Cart />
//         <ShoppingCartModal />
//       </div>
//     </header>
//   );
// };

// export default Nav;



// import React from "react";
// import SheetDemo from "./shet"; // Ensure the path is correct
// import Cart from "./cart";
// import ShoppingCartModal from "./ShoppingCartModal"; // Ensure the path is correct

// const Nav = () => {
//   return (
//     <header className="flex flex-col sm:flex-row items-center justify-between p-2 bg-transparent">
//       <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//         <SheetDemo />
//       </div>
//       <div className="flex items-center space-x-4 sm:ml-auto sm:mr-4">
//         <Cart />
//         <ShoppingCartModal />
//       </div>
//     </header>
//   );
// };

// export default Nav;

// import React from 'react';
// import SheetDemo from './shet'; // Ensure the path is correct
// import Cart from './cart';
// import { Button } from './ui/button';
// // import { ShoppingBag } from 'lucide-react';
// import { ShoppingBag } from 'lucide-react';
// import { useShoppingCart } from "use-shopping-cart";

// const Nav = () => {
//   const { handleCartClick } = useShoppingCart();
//   return (
//     <header className="flex flex-col sm:flex-row items-center justify-between p-2 bg-transparent">
//       <div className="flex items-center space-x-4 mb-4 sm:mb-0">
//         <SheetDemo />
//       </div>
//       <div className="flex items-center space-x-4 sm:ml-auto sm:mr-4">
//         <Cart  />
//         <div className="flex divide-x border-r sm:border-l">
//               <Button
//                   onClick={() => handleCartClick()}
//                 onClick={() => handleCartClick()}
//             className="flex flex-col gap-y-1.5 h-10 w-10 sm:h-10 sm:w-10 md:h-10 md:w-10 rounded-5">
             
//                 <ShoppingBag className='w-40 h-40 text-white md:w-40 md:h-40 ' />
//                 <span className="hidden text-xs font-semibold text-white sm:block pb-2  ">
//                   Cart
//                 </span>
                
//             </Button>
//             </div>
//       </div>
//     </header>
//   );
// };

// export default Nav;


