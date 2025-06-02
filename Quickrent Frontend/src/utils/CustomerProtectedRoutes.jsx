import {Outlet, Navigate} from "react-router-dom";
import { jwtDecode } from "jwt-decode";



export function CustomerProtectedRoutes(){
    var role = null;
    const token = localStorage.getItem("JwtToken");
    const decodedToken = token ? jwtDecode(token) : null;
    role = decodedToken?.role;
    if(role==null){
        return <Navigate to="/login" />
    }
    return (role == "CUSTOMER") ? <Outlet /> : <Navigate to="/unauthorized" />
}