import { Navigate } from "react-router-dom";

const ProdectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if(!token){
        return <Navigate to="/login"/>; 
    }
    return children;
}
export default ProdectedRoute;