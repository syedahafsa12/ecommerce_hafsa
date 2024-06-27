import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SignInButton, SignedOut, useAuth } from "@clerk/nextjs";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [signInModalOpen, setSignInModalOpen] = useState(false);

  const handleCheckoutClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      if (!isSignedIn) {
        // Open the sign-in modal instead of redirecting
        setSignInModalOpen(true);
      } else {
        const result = await redirectToCheckout();
        if (result?.error) {
          console.error("Error redirecting to checkout:", result.error);
        }
      }
    } catch (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn && signInModalOpen) {
      // Close the sign-in modal when signed in
      setSignInModalOpen(false);
    }
  }, [isSignedIn, signInModalOpen]);

  return (
    <>
      <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
        <SheetContent className="sm:max-w-lg w-[90vw]">
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
          </SheetHeader>

          <div className="h-full flex flex-col justify-between">
            <div className="mt-8 flex-1 overflow-y-auto">
              <ul className="-my-6 divide-y divide-gray-200">
                {cartCount === 0 ? (
                  <h3 className="py-6 text-base justify-center text-center">You don&apos;t have any items</h3>
                ) : (
                  <>
                    {Object.values(cartDetails ?? {}).map((entry) => (
                      <li key={entry.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <Image
                            src={entry.image as string}
                            alt="Product image"
                            width={100}
                            height={100}
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-sm text-gray-900">
                              <h3 className="text-xl">{entry.name}</h3>
                              <p className="ml-4 text-xl">${entry.price}</p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                              {entry.description}
                            </p>
                          </div>

                          <div className="flex flex-1 items-end justify-between text-sm">
                            <p className="text-gray-500">QTY: {entry.quantity}</p>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={() => removeItem(entry.id)}
                                className="font-medium text-black hover:text-primary/80"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>

            {cartCount! > 0 && (
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal:</p>
                  <p>${totalPrice?.toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes are calculated at checkout.
                </p>

                <div className="mt-6">
                  <Button onClick={handleCheckoutClick} className="w-full bg-black text-white hover:bg-primary/80">
                    Checkout
                  </Button>
                </div>

                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    OR{" "}
                    <button
                      onClick={handleCartClick}
                      className="font-medium text-black hover:text-primary/80"
                    >
                      Continue Shopping
                    </button>
                  </p>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      {/* Sign In Modal Trigger
      <div className="fixed bottom-4 right-4">
        <SignedOut>
          <SignInButton mode="modal">
            <span className="text-black font-semibold py-2 px-4 rounded">
              Sign In
            </span>
          </SignInButton>
        </SignedOut>
      </div> */}

      {signInModalOpen && (
        <SignInModal onClose={() => setSignInModalOpen(false)} />
      )}
    </>
  );
}

function SignInModal({ onClose }: { onClose: () => void }) {
  // Example implementation of a sign-in modal component
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Sign In</h2>
        <p className="text-gray-700 mb-4">Sign in to continue your checkout.</p>
        {/* Replace with your actual sign-in component or modal */}
        {/* <SignInComponent onClose={onClose} /> */}
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Example SignInComponent placeholder
function SignInComponent({ onClose }: { onClose: () => void }) {
  // Example implementation of a sign-in component
  return (
    <form>
      {/* Your sign-in form fields */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary/80 sm:text-sm rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary/80 sm:text-sm rounded-md"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Sign In
      </button>
    </form>
  );
}

// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import Image from "next/image";
// import { useShoppingCart } from "use-shopping-cart";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { SignInButton, useAuth } from "@clerk/nextjs";

// export default function ShoppingCartModal() {
//   const {
//     cartCount,
//     shouldDisplayCart,
//     handleCartClick,
//     cartDetails,
//     removeItem,
//     totalPrice,
//     redirectToCheckout,
//   } = useShoppingCart();

//   const router = useRouter();
//   const { isSignedIn } = useAuth();
//   const [signInModalOpen, setSignInModalOpen] = useState(false);

//   const handleCheckoutClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
//     event.preventDefault();
//     try {
//       if (!isSignedIn) {
//         // Open the sign-in modal instead of redirecting
//         setSignInModalOpen(true);
//       } else {
//         const result = await redirectToCheckout();
//         if (result?.error) {
//           console.error("Error redirecting to checkout:", result.error);
//         }
//       }
//     } catch (error) {
//       console.error("Error redirecting to checkout:", error);
//     }
//   };

//   useEffect(() => {
//     if (isSignedIn && signInModalOpen) {
//       // Close the sign-in modal when signed in
//       setSignInModalOpen(false);
//     }
//   }, [isSignedIn, signInModalOpen]);

//   return (
//     <>
//       <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
//         <SheetContent className="sm:max-w-lg w-[90vw]">
//           <SheetHeader>
//             <SheetTitle>Shopping Cart</SheetTitle>
//           </SheetHeader>

//           <div className="h-full flex flex-col justify-between">
//             <div className="mt-8 flex-1 overflow-y-auto">
//               <ul className="-my-6 divide-y divide-gray-200">
//                 {cartCount === 0 ? (
//                   <h3 className="py-6 text-base justify-center text-center">You don&apos;t have any items</h3>
//                 ) : (
//                   <>
//                     {Object.values(cartDetails ?? {}).map((entry) => (
//                       <li key={entry.id} className="flex py-6">
//                         <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                           <Image
//                             src={entry.image as string}
//                             alt="Product image"
//                             width={100}
//                             height={100}
//                           />
//                         </div>

//                         <div className="ml-4 flex flex-1 flex-col">
//                           <div>
//                             <div className="flex justify-between text-sm text-gray-900">
//                               <h3 className="text-xl">{entry.name}</h3>
//                               <p className="ml-4 text-xl">${entry.price}</p>
//                             </div>
//                             <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                               {entry.description}
//                             </p>
//                           </div>

//                           <div className="flex flex-1 items-end justify-between text-sm">
//                             <p className="text-gray-500">QTY: {entry.quantity}</p>

//                             <div className="flex">
//                               <button
//                                 type="button"
//                                 onClick={() => removeItem(entry.id)}
//                                 className="font-medium text-black hover:text-primary/80"
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </>
//                 )}
//               </ul>
//             </div>

//             {cartCount! > 0 && (
//               <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                 <div className="flex justify-between text-base font-medium text-gray-900">
//                   <p>Subtotal:</p>
//                   <p>${totalPrice?.toFixed(2)}</p>
//                 </div>
//                 <p className="mt-0.5 text-sm text-gray-500">
//                   Shipping and taxes are calculated at checkout.
//                 </p>

//                 <div className="mt-6">
//                   <Button onClick={handleCheckoutClick} className="w-full bg-black text-white hover:bg-primary/80">
//                     Checkout
//                   </Button>
//                 </div>

//                 <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                   <p>
//                     OR{" "}
//                     <button
//                       onClick={handleCartClick}
//                       className="font-medium text-black hover:text-primary/80"
//                     >
//                       Continue Shopping
//                     </button>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </SheetContent>
//       </Sheet>

//       {/* Sign In Modal Trigger */}
//       {/* <SignInButton mode="modal" className="fixed bottom-4 right-4 text-white font-semibold py-2 px-4 rounded bg-primary hover:bg-primary/80">
//         Sign In
//       </SignInButton> */}

//       {signInModalOpen && (
//         <SignInModal onClose={() => setSignInModalOpen(false)} />
//       )}
//     </>
//   );
// }

// function SignInModal({ onClose }: { onClose: () => void }) {
//   // Example implementation of a sign-in modal component
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-xl font-semibold mb-4">Sign In</h2>
//         <p className="text-gray-700 mb-4">Sign in to continue your checkout.</p>
//         {/* Replace with your actual sign-in component or modal */}
//         <SignInComponent onClose={onClose} />
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={onClose}
//             className="text-sm text-gray-600 hover:text-gray-900"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Example SignInComponent placeholder
// function SignInComponent({ onClose }: { onClose: () => void }) {
//   // Example implementation of a sign-in component
//   return (
//     <form>
//       {/* Your sign-in form fields */}
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary/80 sm:text-sm rounded-md"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary/80 sm:text-sm rounded-md"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//       >
//         Sign In
//       </button>
//     </form>
//   );
// }

// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import Image from "next/image";
// import { useShoppingCart } from "use-shopping-cart";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { SignInButton, useAuth } from "@clerk/nextjs";

// export default function ShoppingCartModal() {
//   const {
//     cartCount,
//     shouldDisplayCart,
//     handleCartClick,
//     cartDetails,
//     removeItem,
//     totalPrice,
//     redirectToCheckout,
//   } = useShoppingCart();

//   const router = useRouter();
//   const { isSignedIn } = useAuth();
//   const [signInModalOpen, setSignInModalOpen] = useState(false);
//   // const router = useRouter();

//   const handleCheckoutClick2 = () => {
//     if (!isSignedIn) {
//       router.push('https://viable-drake-93.accounts.dev/sign-in'); // Redirect to sign-in page if not signed in
//     } else {
//       handleCartClick(); // Proceed with checkout if signed in
//     }
//   }

//   async function handleCheckoutClick(event: React.MouseEvent<HTMLButtonElement>) {
//     event.preventDefault();
//     try {
//       if (!isSignedIn) {
//         // Open the sign-in modal instead of redirecting
//         setSignInModalOpen(true);
//         return;
//       }

//       const result = await redirectToCheckout();
//       if (result?.error) {
//         console.error("Error redirecting to checkout:", result.error);
//       }
//     } catch (error) {
//       console.error("Error redirecting to checkout:", error);
//     }
//   }

//   useEffect(() => {
//     if (isSignedIn && signInModalOpen) {
//       // Close the sign-in modal when signed in
//       setSignInModalOpen(false);
//     }
//   }, [isSignedIn, signInModalOpen]);

//   return (
//     <>
//       <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
//         <SheetContent className="sm:max-w-lg w-[90vw]">
//           <SheetHeader>
//             <SheetTitle>Shopping Cart</SheetTitle>
//           </SheetHeader>

//           <div className="h-full flex flex-col justify-between">
//             <div className="mt-8 flex-1 overflow-y-auto">
//               <ul className="-my-6 divide-y divide-gray-200">
//                 {cartCount === 0 ? (
//                   <h3 className="py-6 text-base justify-center text-center">You don&apos;t have any items</h3>
//                 ) : (
//                   <>
//                     {Object.values(cartDetails ?? {}).map((entry) => (
//                       <li key={entry.id} className="flex py-6">
//                         <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                           <Image
//                             src={entry.image as string}
//                             alt="Product image"
//                             width={100}
//                             height={100}
//                           />
//                         </div>

//                         <div className="ml-4 flex flex-1 flex-col">
//                           <div>
//                             <div className="flex justify-between text-sm text-gray-900">
//                               <h3 className="text-xl">{entry.name}</h3>
//                               <p className="ml-4 text-xl">${entry.price}</p>
//                             </div>
//                             <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                               {entry.description}
//                             </p>
//                           </div>

//                           <div className="flex flex-1 items-end justify-between text-sm">
//                             <p className="text-gray-500">QTY: {entry.quantity}</p>

//                             <div className="flex">
//                               <button
//                                 type="button"
//                                 onClick={() => removeItem(entry.id)}
//                                 className="font-medium text-primary hover:text-primary/80"
//                               >
//                                 Remove
//                               </button>
//                             </div>
//                           </div>
//                         </div>
//                       </li>
//                     ))}
//                   </>
//                 )}
//               </ul>
//             </div>

//             {cartCount! > 0 && (
//               <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//                 <div className="flex justify-between text-base font-medium text-gray-900">
//                   <p>Subtotal:</p>
//                   <p>${totalPrice?.toFixed(2)}</p>
//                 </div>
//                 <p className="mt-0.5 text-sm text-gray-500">
//                   Shipping and taxes are calculated at checkout.
//                 </p>

//                 <div className="mt-6">
//                   <Button onClick={handleCheckoutClick2} className="w-full">
//                     Checkout
//                   </Button>
//                 </div>

//                 <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                   <p>
//                     OR{" "}
//                     <button
//                       onClick={handleCartClick}
//                       className="font-medium text-primary hover:text-primary/80"
//                     >
//                       Continue Shopping
//                     </button>
//                   </p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </SheetContent>
//       </Sheet>

//       {/* Sign In Modal Trigger */}
//       <SignInButton mode="modal" className="fixed bottom-4 right-4 text-white font-semibold py-2 px-4 rounded bg-primary hover:bg-primary/80">
//         Sign In
//       </SignInButton>

//       {signInModalOpen && (
//         <SignInModal onClose={() => setSignInModalOpen(false)} />
//       )}
//     </>
//   );
// }

// function SignInModal({ onClose }: { onClose: () => void }) {
//   // Example implementation of a sign-in modal component
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
//         <h2 className="text-xl font-semibold mb-4">Sign In</h2>
//         <p className="text-gray-700 mb-4">Sign in to continue your checkout.</p>
//         {/* Replace with your actual sign-in component or modal */}
//         <SignInComponent onClose={onClose} />
//         <div className="mt-4 flex justify-end">
//           <button
//             onClick={onClose}
//             className="text-sm text-gray-600 hover:text-gray-900"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// // Example SignInComponent placeholder
// function SignInComponent({ onClose }: { onClose: () => void }) {
//   // Example implementation of a sign-in component
//   return (
//     <form>
//       {/* Your sign-in form fields */}
//       <div className="mb-4">
//         <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//           Email
//         </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary/80 sm:text-sm rounded-md"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//           Password
//         </label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-primary focus:border-primary/80 sm:text-sm rounded-md"
//           required
//         />
//       </div>
//       <button
//         type="submit"
//         className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//       >
//         Sign In
//       </button>
//     </form>
//   );
// }

// "use client";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// import Image from "next/image";
// import { useShoppingCart } from "use-shopping-cart";

// export default function ShoppingCartModal() {
//   const {
//     cartCount = 0,
//     shouldDisplayCart,
//     handleCartClick,
//     cartDetails = {},
//     removeItem,
//     totalPrice = 0,
//     redirectToCheckout,
//   } = useShoppingCart() || {};

//   async function handleCheckoutClick(event: { preventDefault: () => void }) {
//     event.preventDefault();
//     try {
//       const result = await redirectToCheckout();
//       if (result?.error) {
//         console.log("result");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
//       <SheetContent className="sm:max-w-lg w-[90vw]">
//         <SheetHeader>
//           <SheetTitle>Shopping Cart</SheetTitle>
//         </SheetHeader>

//         <div className="h-full flex flex-col justify-between">
//           <div className="mt-8 flex-1 overflow-y-auto">
//             <ul className="-my-6 divide-y divide-gray-200">
//               {cartCount === 0 ? (
//                 <h3 className="py-6 text-base justify-center text-center">You don&apos;t have any items</h3>
//               ) : (
//                 <>
//                   {Object.values(cartDetails).map((entry) => (
//                     <li key={entry.id} className="flex py-6">
//                       <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//                         <Image
//                           src={entry.image as string}
//                           alt="Product image"
//                           width={100}
//                           height={100}
//                         />
//                       </div>

//                       <div className="ml-4 flex flex-1 flex-col">
//                         <div>
//                           <div className="flex justify-between text-sm text-gray-900">
//                             <h3 className="text-xl">{entry.name}</h3>
//                             <p className="ml-4 text-xl">${entry.price}</p>
//                           </div>
//                           <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//                             {entry.description}
//                           </p>
//                         </div>

//                         <div className="flex flex-1 items-end justify-between text-sm">
//                           <p className="text-gray-500">QTY: {entry.quantity}</p>

//                           <div className="flex">
//                             <button
//                               type="button"
//                               onClick={() => removeItem(entry.id)}
//                               className="font-medium text-p hover:text-primary/80"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </li>
//                   ))}
//                 </>
//               )}
//             </ul>
//           </div>
//           {cartCount > 0 && (
//             <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
//               <div className="flex justify-between text-base font-medium text-gray-900">
//                 <p>Subtotal:</p>
//                 <p>${totalPrice.toFixed(2)}</p>
//               </div>
//               <p className="mt-0.5 text-sm text-gray-500">
//                 Shipping and taxes are calculated at checkout.
//               </p>
//               <div className="mt-6">
//                 <Button onClick={handleCheckoutClick} className="w-full bg-p text-white hover:bg-p hover:text-white">
//                   Checkout
//                 </Button>
//               </div>
//               <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
//                 <p>
//                   OR{" "}
//                   <button
//                     onClick={handleCartClick}
//                     className="font-medium text-p hover:text-primary/80"
//                   >
//                     Continue Shopping
//                   </button>
//                 </p>
//               </div>
//             </div>
//           )}
//         </div>
//       </SheetContent>
//     </Sheet>
//   );
// }

// // "use client";
// // import { Button } from "@/components/ui/button";
// // import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// // import Image from "next/image";
// // import { useShoppingCart } from "use-shopping-cart";

// // export default function ShoppingCartModal() {
// //   const {
// //     cartCount,
// //     shouldDisplayCart,
// //     handleCartClick,
// //     cartDetails,
// //     removeItem,
// //     totalPrice,
// //     redirectToCheckout,
// //   } = useShoppingCart();

// //   async function handleCheckoutClick(event: { preventDefault: () => void }) {
// //     event.preventDefault();
// //     try {
// //       const result = await redirectToCheckout();
// //       if (result?.error) {
// //         console.log("result");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// //   return (
// //     <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
// //       <SheetContent className="sm:max-w-lg w-[90vw]">
// //         <SheetHeader>
// //           <SheetTitle>Shopping Cart</SheetTitle>
// //         </SheetHeader>

// //         <div className="h-full flex flex-col justify-between">
// //           <div className="mt-8 flex-1 overflow-y-auto">
// //             <ul className="-my-6 divide-y divide-gray-200">
// //               {cartCount === 0 ? (
// //                 <h3 className="py-6 text-base justify-center text-center">You don&apos;t have any items</h3>
// //               ) : (
// //                 <>
// //                   {Object.values(cartDetails ?? {}).map((entry) => (
// //                     <li key={entry.id} className="flex py-6">
// //                       <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
// //                         <Image
// //                           src={entry.image as string}
// //                           alt="Product image"
// //                           width={100}
// //                           height={100}
// //                         />
// //                       </div>

// //                       <div className="ml-4 flex flex-1 flex-col">
// //                         <div>
// //                           <div className="flex justify-between text-sm text-gray-900">
// //                             <h3 className="text-xl">{entry.name}</h3>
// //                             <p className="ml-4 text-xl">${entry.price}</p>
// //                           </div>
// //                           <p className="mt-1 text-sm text-gray-500 line-clamp-2">
// //                             {entry.description}
// //                           </p>
// //                         </div>

// //                         <div className="flex flex-1 items-end justify-between text-sm">
// //                           <p className="text-gray-500">QTY: {entry.quantity}</p>

// //                           <div className="flex">
// //                             <button
// //                               type="button"
// //                               onClick={() => removeItem(entry.id)}
// //                               className="font-medium text-p hover:text-primary/80"
// //                             >
// //                               Remove
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </>
// //               )}
// //             </ul>
// //           </div>
// //           {cartCount > 0 && (
// //             <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
// //               <div className="flex justify-between text-base font-medium text-gray-900">
// //                 <p>Subtotal:</p>
// //                 <p>${totalPrice?.toFixed(2)}</p>
// //               </div>
// //               <p className="mt-0.5 text-sm text-gray-500">
// //                 Shipping and taxes are calculated at checkout.
// //               </p>
// //               <div className="mt-6">
// //                 <Button onClick={handleCheckoutClick} className="w-full bg-p text-white hover:bg-p hover:text-white">
// //                   Checkout
// //                 </Button>
// //               </div>
// //               <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
// //                 <p>
// //                   OR{" "}
// //                   <button
// //                     onClick={handleCartClick}
// //                     className="font-medium text-p hover:text-primary/80"
// //                   >
// //                     Continue Shopping
// //                   </button>
// //                 </p>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </SheetContent>
// //     </Sheet>
// //   );
// // }

// // // /seeing in thsi is hwoing
// // "use client";
// // import { Button } from "@/components/ui/button";
// // import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
// // import Image from "next/image";
// // import { useShoppingCart } from "use-shopping-cart";

// // export default function ShoppingCartModal() {
// //   const {
// //         cartCount,
// //         shouldDisplayCart,
// //         handleCartClick,
// //         cartDetails,
// //         removeItem,
// //         totalPrice,
// //         redirectToCheckout,
// //       } = useShoppingCart();

// //   async function handleCheckoutClick(event: { preventDefault: () => void; }) {
// //     event.preventDefault();
// //     try {
// //       const result = await redirectToCheckout();
// //       if (result?.error) {
// //         console.log("result");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }

// //   return (
// //     <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>
// //       <SheetContent className="sm:max-w-lg w-[90vw]">
// //         <SheetHeader>
// //           <SheetTitle>Shopping Cart</SheetTitle>
// //         </SheetHeader>
        
// //              <div className="h-full flex flex-col justify-between">
// //         <div className="mt-8 flex-1 overflow-y-auto">
// //        <ul className="-my-6 divide-y divide-gray-200">
// //          {cartCount === 0 ? (
// //                 <h3 className="py-6 text-2xl justify-center">You dont have any items</h3>
// //               ) : (
// //                 <>
// //                   {Object.values(cartDetails ?? {}).map((entry) => (
// //                     <li key={entry.id} className="flex py-6">
// //                       <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
// //                         <Image
// //                           src={entry.image as string}
// //                           alt="Product image"
// //                           width={100}
// //                           height={100}
// //                         />
// //                       </div>

// //                       <div className="ml-4 flex flex-1 flex-col">
// //                         <div>
// //                           <div className="flex justify-between text-sm text-gray-900">
// //                             <h3 className="text-xl">{entry.name}</h3>
// //                             <p className="ml-4 text-xl">${entry.price}</p>
// //                           </div>
// //                           <p className="mt-1 text-sm text-gray-500 line-clamp-2">
// //                             {entry.description}
// //                           </p>
// //                         </div>

// //                         <div className="flex flex-1 items-end justify-between text-sm">
// //                           <p className="text-gray-500">QTY: {entry.quantity}</p>

// //                           <div className="flex">
// //                             <button
// //                               type="button"
// //                               onClick={() => removeItem(entry.id)}
// //                               className="font-medium text-p hover:text-primary/80"
// //                             >
// //                               Remove
// //                             </button>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </li>
// //                   ))}
// //                 </>
// //               )}
// //             </ul>
// //           </div>
// //           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
// //             <div className="flex justify-between text-base font-medium text-gray-900">
// //               <p>Subtotal:</p>
// //               <p>${totalPrice?.toFixed(2)}</p>
// //             </div>
// //             <p className="mt-0.5 text-sm text-gray-500">
// //               Shipping and taxes are calculated at checkout.
// //             </p>
// //             <div className="mt-6">
// //               <Button onClick={handleCheckoutClick} className="w-full bg-p text-white hover:bg-p hover:text-white">
// //                 Checkout
// //               </Button>
// //             </div>
// //             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
// //               <p>
// //                 OR{" "}
// //                 <button
// //                   onClick={handleCartClick}
// //                   className="font-medium text-p hover:text-primary/80"
// //                 >
// //                   Continue Shopping
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div>
// //       </SheetContent>
// //     </Sheet>
// //   );
// // }

// // "use client";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Sheet,
// //   SheetContent,
// //   SheetHeader,
// //   SheetTitle,
// // } from "@/components/ui/sheet";

// // import Image from "next/image";
// // import { useShoppingCart } from "use-shopping-cart";

// // export default function ShoppingCartModal() {
// //   const {
// //     cartCount,
// //     shouldDisplayCart,
// //     handleCartClick,
// //     cartDetails,
// //     removeItem,
// //     totalPrice,
// //     redirectToCheckout,
// //   } = useShoppingCart();

// //   async function handleCheckoutClick(event: any) {
// //     event.preventDefault();
// //     try {
// //       const result = await redirectToCheckout();
// //       if (result?.error) {
// //         console.log("result");
// //       }
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   }
// //   return (
    
// //      <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()} >
// //       <SheetContent className="sm:max-w-lg w-[90vw]">
// //         <SheetHeader>
// //           <SheetTitle>Shopping Cart</SheetTitle>
// //         </SheetHeader>

//         // <div className="h-full flex flex-col justify-between">
//         //   <div className="mt-8 flex-1 overflow-y-auto">
//         //     <ul className="-my-6 divide-y divide-gray-200">
//         //       {cartCount === 0 ? (
//         //         <h1 className="py-6">You dont have any items</h1>
//         //       ) : (
//         //         <>
//         //           {Object.values(cartDetails ?? {}).map((entry) => (
//         //             <li key={entry.id} className="flex py-6">
//         //               <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
//         //                 <Image
//         //                   src={entry.image as string}
//         //                   alt="Product image"
//         //                   width={100}
//         //                   height={100}
//         //                 />
//         //               </div>

//         //               <div className="ml-4 flex flex-1 flex-col">
//         //                 <div>
//         //                   <div className="flex justify-between text-base font-medium text-gray-900">
//         //                     <h3>{entry.name}</h3>
//         //                     <p className="ml-4">${entry.price}</p>
//         //                   </div>
//         //                   <p className="mt-1 text-sm text-gray-500 line-clamp-2">
//         //                     {entry.description}
//         //                   </p>
//         //                 </div>

//         //                 <div className="flex flex-1 items-end justify-between text-sm">
//         //                   <p className="text-gray-500">QTY: {entry.quantity}</p>

//         //                   <div className="flex">
//         //                     <button
//         //                       type="button"
//         //                       onClick={() => removeItem(entry.id)}
//         //                       className="font-medium text-primary hover:text-primary/80"
//         //                     >
//         //                       Remove
//         //                     </button>
//         //                   </div>
//         //                 </div>
//         //               </div>
//         //             </li>
//         //           ))}
//         //         </>
//         //       )}
//         //     </ul>
//         //   </div>

// //           <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
// //             <div className="flex justify-between text-base font-medium text-gray-900">
// //               <p>Subtotal:</p>
// //               <p>${totalPrice}</p>
// //             </div>
// //             <p className="mt-0.5 text-sm text-gray-500">
// //               Shipping and taxes are calculated at checkout.
// //             </p>

// //             <div className="mt-6">
// //               <Button onClick={handleCheckoutClick} className="w-full">
// //                 Checkout
// //               </Button>
// //             </div>

// //             <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
// //               <p>
// //                 OR{" "}
// //                 <button
// //                   onClick={() => handleCartClick()}
// //                   className=" font-medium text-primary hover:text-primary/80"
// //                 >
// //                   Continue Shopping
// //                 </button>
// //               </p>
// //             </div>
// //           </div>
// //         </div> 
        
// //       </SheetContent>
// //     </Sheet>
// //   );
// // }