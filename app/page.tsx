"use client"
import Image from "next/image";
import Nav from "./components/NavBar";
import Announcement from "./components/Announcement";
import Banner from "./components/Banner";
import Hero from "./components/Hero";
import ProductDetail from "./components/NewsLetter";
import HomePage from "./(client)/home/page";
import { useEffect } from "react";
import { useRouter } from "next/navigation";



export default function Home() {
  const router = useRouter();

  useEffect( ()=> {
    router.push('/home')
  },[])

  return (
    <> 
      
    </>
  );
}
