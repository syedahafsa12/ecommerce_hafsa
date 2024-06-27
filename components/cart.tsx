import React from 'react';
import { Button } from './ui/button';
import { ShoppingBag } from 'lucide-react';
import { useShoppingCart } from 'use-shopping-cart';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const Cart = () => {
  const { handleCartClick } = useShoppingCart();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const handleCheckoutClick = () => {
    if (!isSignedIn) {
      router.push('https://viable-drake-93.accounts.dev/sign-in'); // Redirect to sign-in page if not signed in
    } else {
      handleCartClick(); // Proceed with checkout if signed in
    }
  };

  return (
    <Button
      onClick={handleCartClick}
      className="flex items-center justify-center h-10 w-10 bg-transparent p-2 mr-6"
    >
      <ShoppingBag className="w-16 h-16 text-white" />
    </Button>
  );
};

export default Cart;

// import React from 'react';
// import { useRouter } from 'next/router';
// import { Button } from './ui/button';
// import { ShoppingBag } from 'lucide-react';
// import { useShoppingCart } from 'use-shopping-cart';
// import { useAuth } from '@clerk/nextjs';

// const Cart = () => {
//   const { handleCartClick } = useShoppingCart();
//   const { isSignedIn } = useAuth();
//   const router = useRouter();

//   const handleCheckoutClick = () => {
//     if (!isSignedIn) {
//       router.push('/https://viable-drake-93.accounts.dev/sign-in'); // Redirect to sign-in page if not signed in
//     } else {
//       handleCartClick(); // Proceed to checkout if signed in
//     }
//   };

//   return (
//     <Button
//       onClick={handleCheckoutClick}
//       className="flex items-center justify-center h-10 w-10 bg-transparent p-2 mr-6"
//     >
//       <ShoppingBag className="w-16 h-16 text-white" />
//     </Button>
//   );
// };

// export default Cart;

// // import React from 'react';
// // import { Button } from "./ui/button";
// // import { ShoppingBag } from "lucide-react";
// // import { useShoppingCart } from "use-shopping-cart";

// // const Cart = () => {
// //   const { handleCartClick } = useShoppingCart();

// //   return (
// //     <Button
// //       onClick={() => handleCartClick()}
// //       className="flex items-center justify-center h-10 w-10 bg-transparent p-2 mr-6"
// //     >
// //       <ShoppingBag className="  w-16 h-16 text-white" />
// //     </Button >
// //   );
// // };

// // export default Cart;
