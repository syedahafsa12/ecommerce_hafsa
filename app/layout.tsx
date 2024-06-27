"use client"
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/Providers";
import ShoppingCartModal from "@/components/ShoppingCartModal";
import "bootstrap/dist/css/bootstrap.css";


<link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
// import "bootstrap/dist/js/bootstrap.js";
import { useEffect } from "react";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700", "500"]
})
const inter = Inter({ subsets: ["latin"] });
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


// export const metadata: Metadata = {
//   title: "Syeda Hafsa",
//   description: "Ecommerce website made with Nextjs, Sanity, Shadcn, and Stripe",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    //@ts-ignore
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, [])
  return (
    <ClerkProvider>
      <html lang="en">

        <body className={poppins.className}>
       
          {/* <SheetDemo /> */}
          {/* <Cart /> */}
          {/* <Navbar /> */}
          <CartProvider>
            <ShoppingCartModal />
            {children}</CartProvider>
        </body>

      </html>
    </ClerkProvider>
  );
}
// export async function getStaticProps() {
//   const data = await fetchData(); // Replace with your data fetching logic
//   return { props: { data } };
// }

