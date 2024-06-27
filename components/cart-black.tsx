import React from 'react';
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

const Cart2 = () => {
  const { handleCartClick } = useShoppingCart();

  return (
    <Button
      onClick={() => handleCartClick()}
      className="flex items-center justify-center h-10 w-10 bg-transparent p-2 mr-4"
    >
      <ShoppingBag className=" mt-2 w-16 h-16 text-black" />
    </Button >
  );
};

export default Cart2;