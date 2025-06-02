import {Outlet, Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";



export function AdminProtectedRoutes(){
    var role = null;
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    role = decodedToken?.role;
    if(role==null){
        return <Navigate to="/adminlogin" />
    }
    return (role == "ADMIN") ? <Outlet /> : <Navigate to="/unauthorized" />
}