import React from "react";
import SheetDemo from "./shet"; // Ensure the path is correct
import Cart from "./cart";
import Cart2 from "./cart-black";
import ShoppingCartModal from "./ShoppingCartModal"; // Ensure the path is correct
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const Nav2 = () => {
  return (
    <header className="flex items-center justify-between p-2 bg-transparent mb-6">
      <div className="flex items-center space-x-4">
        <SheetDemo />
        {/* <span className="font-semibold text-lg">Syeda Hafsa</span> */}
      </div>
      <div className="flex items-center space-x-2">
        <SignedOut>
          {/* <SignInButton /> */}
          <SignInButton mode="modal">
            <span className="text-black font-semibold py-2 px-4 rounded">
              Sign In
            </span>
          </SignInButton>
          {/* <SignInButton mode="modal" className=" text-black font-semibold py-2 px-4 rounded">
            Sign In
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

export default Nav2;

