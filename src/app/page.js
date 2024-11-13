'use client';

import Link from 'next/link';
import "./globals.css";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import RedirectButton from './button_click';



export default function Home() {
  

  return (
    <body className = "font-sans text-base">
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
    <div id="name" className="flex items-center justify-center font-mono text-xl absolute top-1/2 -translate-y-1/2 mt-[-5%]">
      Spinify
    </div>
    {/* <Image src = "images/icons8-spotify-96.png" /> */}
    <RedirectButton />
    </div>
    </body>
  );
}
