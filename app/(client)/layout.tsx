import { ReactNode } from "react";
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import Announcement from "../components/Announcement";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <>
         <Announcement />
            <Nav />
            {children}
            <Footer />        
        </>
    )
}