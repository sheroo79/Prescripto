import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("ADMIN") === "true";
  return isAdmin ? children : <Navigate to="/login" />;
};

export default AdminRoute;
