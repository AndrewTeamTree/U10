import { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

/**
 * Sign out function (Doesn't display a page)
 */

const UserSignOut = () => {
  /* imports Sign In/Sign Out actions in User Context */
  const { actions } = useContext(UserContext);

  /* Signs out the user */
  useEffect(() => actions.signOut());

  return (
    <Navigate to="/" replace />
  )
}

export default UserSignOut;