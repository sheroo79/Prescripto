import { Navigate } from "react-router-dom";

const PatientRoute = ({ children }) => {
  const isPatient = localStorage.getItem("PATIENT") === "true";
  return isPatient ? children : <Navigate to="/login" />;
};

export default PatientRoute;
