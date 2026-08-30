import { ReactNode, useEffect, useState } from "react";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";
import { useAuth } from "@/contexts/AuthProvider";

export default function Layout({ children }: { children: ReactNode }) {
    const user = useAuth().user;
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    useEffect( ()=> {
        if(user !== null) {setIsLoggedIn(true)};
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