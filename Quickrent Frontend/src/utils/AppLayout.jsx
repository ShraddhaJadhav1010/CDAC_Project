import { Outlet } from "react-router-dom"
import MainNavbar from "../components/MainNavbar"
import Footer from "../components/Footer"
import { useState } from "react"
import TopBar from "../components/TopBar"

export default function AppLayout() {

    const [isLogged, setIsLogged] = useState();

    // useState(()=>{
    //     if (localStorage.getItem("JwtToken") !== null) {
    //         setIsLogged(true);
    //     }else{
    //         setIsLogged(false);
    //     }
    // }, [])

    function handleLogin(value){
        setIsLogged(value);
    }
    

    return (
        <>
            {localStorage.getItem("JwtToken") == null ? <TopBar/> : null}
            <MainNavbar />
            <Outlet handleLogin={handleLogin} />
            <Footer />
        </>
    )
}