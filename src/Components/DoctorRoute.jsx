import { Navigate } from "react-router-dom";

const DoctorRoute = ({ children }) => {
  const isDoctor = localStorage.getItem("DOCTOR") === "true";
  return isDoctor ? children : <Navigate to="/login" />;
};

export default DoctorRoute;
