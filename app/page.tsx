"use client";
import Image from "next/image";

import BackgroundVideo from "../components/BackgroundVideo";
import styles from "../components/BackgroundVideo.module.css";
import Nav from "@/components/nav";
import { Button } from "../components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";

export default function Home() {
  return (
    <main>
      <Nav />
      <div className={styles.videoWrapper}>
        <BackgroundVideo />
        
      </div>
    </main>
  );
}

// 'use client'
// import Image from "next/image";
// import { Product, Footer } from "@/components";
// import {Navbar} from "@/components";
// import Header from "@/components/Header";
// import BackgroundVideo from '../components/BackgroundVideo';
// import styles from '../components/BackgroundVideo.module.css';
// import Nav from "@/components/nav";
// // import { SheetDemo } from "@/components/shet";
// import { Button } from "../components/ui/button";
// import { ShoppingBag } from "lucide-react";
// import { useShoppingCart } from "use-shopping-cart";
// export default function Home() {
//   return (
//     <main>
//       <Nav/>
//         <BackgroundVideo />
//       <div className={styles.contentWrapper}>
//         {/* <ShoppingBag/> */}

//         {/* <Navbar /> */}
//         {/* Add other components here */}
//       </div>
//       {/* <div>
//       {/* i18nIsDynamicList={true} key={'navbar'} */}
//         {/* <Navbar i18nIsDynamicList={undefined} key={undefined} /> */}
//          {/* <SheetDemo/>  */}
//         {/* <Header/> */}
//         {/* <BackgroundVideo/> */}
//         {/* <div className={styles.contentWrapper}> */}
//         {/* <Footer/> */}
//       {/* </div>  */}
//     <a href="/LawnCollections" className="a1 no-underline ">Lawn Collections</a>
//     </main>
//   );
// }
