import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

export default function ProtectedRoute({ children }) {
    if (localStorage.getItem("token")) {
      return children;
    }else{
        return <Navigate to="/login"/>
    }
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired
};