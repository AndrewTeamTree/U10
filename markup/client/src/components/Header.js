import { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';

/**
 * Header for the Page
 * 1) Signed in user sees a sign out link
 * 2) Non-signed in user sees a sign up and sign in links
 */

const Header = () => {
  /* Get user data from UserContext */
  const { authUser } = useContext(UserContext);

  return(
    <header>
      <div className='wrap header--flex'>
        <h1 className='header--logo'><Link to='/'>Courses</Link></h1>
        <nav>
          {
            authUser ? (
              <ul className="header--signedin">
                <li>Welcome, {authUser.firstName}</li>
                <li><Link to="/signout">Sign Out</Link></li>
              </ul>
            ) : (
              <ul className="header--signedout">
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </ul>
            )
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;