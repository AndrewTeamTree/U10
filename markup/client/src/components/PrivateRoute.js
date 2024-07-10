import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

/**
 * Sets up the route for authorized user pages
 */

const PrivateRoute = () => {
  /* Get user data from UserContext */
  const { authUser } = useContext(UserContext);
  /* Sets location hook */
  const location = useLocation();

  if (authUser) {
    return <Outlet />
  } else {
    return <Navigate to="/signin" state={{ from: location.pathname }} />
  }

}

export default PrivateRoute;