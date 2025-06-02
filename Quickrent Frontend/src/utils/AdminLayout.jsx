import { Outlet } from "react-router-dom"
import Footer from "../components/Footer"
import { DashNav } from "../components/DashNav"

export default function AdminLayout(){
    
    return (
        <>
            <DashNav />
            <Outlet />
            {/* <Footer /> */}
        </>
    )
}