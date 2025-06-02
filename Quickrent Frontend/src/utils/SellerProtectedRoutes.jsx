import {Outlet, Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";



export function SellerProtectedRoutes(){
    var role = null;
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    role = decodedToken?.role;
    if(role==null){
        return <Navigate to="/login" />
    }
    return (role == "SELLER") ? <Outlet /> : <Navigate to="/unauthorized" />
}