import { ReactNode, useEffect, useState } from "react";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { useAuth } from "@/contexts/AuthProvider";

export default function Layout({ children }: { children: ReactNode }) {
    const {isLoggedIn, user, setIsLoggedIn} = useAuth();
   


    useEffect( ()=> {
        if(user == null) {setIsLoggedIn(false)};
    }, [user])

    return (
        <>
         <Announcement />
            <Nav isLoggedIn={isLoggedIn} />
            {children}
            <Footer />        
        </>
    )
}