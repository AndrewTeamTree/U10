import { createContext, useState } from 'react';
import Cookies from 'js-cookie';
import { api } from '../util/apiHelper';

/**
 * Sets up UserProvider to ensure all components can access user information
 */

const UserContext = createContext(null);

export const UserProvider = (props) => {
  /* Sets cookie and gets the authenticatedUser */
  const cookie = Cookies.get('authenticatedUser');

  /* sets authorized user state */
  const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

  /* Gets Users credentials and encodes it */
  const signIn = async (credentials) => {

    const response = await api('/users', 'GET', null, credentials)
    if (response.status === 200) {
        const user = await response.json();
        user.password = credentials.password;
        setAuthUser(user);
        Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        return user;
    } else if (response.status === 401) {
        return null;
    } else {
        throw new Error();
    }
  }

  /* Handles the Signout and clears the Cookie */
  const signOut = () => {
    setAuthUser(null);
    Cookies.remove('authenticatedUser');
  }

  return (
    <UserContext.Provider value={{
      authUser,
      actions: {
        signIn,
        signOut
      }
    }}>
      { props.children }
     </UserContext.Provider>
  )
}

export default UserContext;