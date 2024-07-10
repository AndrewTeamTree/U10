import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import ValidatonErrors from './ValidationErrors';

/**
 * Page for user to sign in
 * 1) Form for the user to input username and password
 * 2) Button to submit information
 * 3) Button to cancel
 */

const UserSignIn = () => {
  /* imports Sign In/Sign Out actions in User Context */
  const { actions } = useContext(UserContext);
  /* Sets up navigate for routing */
  const navigate = useNavigate();
  /* Sets location hook */
  const location = useLocation();

  /* Sets state */
  const [errors, setErrors] = useState([]);

  /* Sets references */
	const emailAddress = useRef(null);
  const password = useRef(null);

  /* Handles signing the user in */
  const handleSignIn = async (e) => {
		e.preventDefault();

		let from = '/';

		if (location.state) {
			from = location.state.from;
		};

		const credentials = {
      emailAddress: emailAddress.current.value,
      password: password.current.value
    };

		try {
			const user = await actions.signIn(credentials);
			if (user) {
        navigate(from);
      } else {
        setErrors(['Sign-in was unsuccessful']);
      }
		} catch (error) {
			navigate('/error');
		}
	}

  /* Handles the submit for the cancel button */
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  }

  return (
    <div className='form--centered'>
			<h2>Sign In</h2>
			<ValidatonErrors errors={ errors } />
			<form onSubmit={ handleSignIn }>
				<label htmlFor='emailAddress'>Email Address</label>
				<input
          id='emailAddress'
          name='emailAddress'
          type='email'
          ref={ emailAddress }
        />
				<label htmlFor='password'>Password</label>
				<input
          id='password'
          name='password'
          type='password'
          ref={ password }
        />
				<button className='button' type='submit'>Sign In</button>
				<button className='button button-secondary' onClick={ handleCancel } type='button'>Cancel</button>
			</form>
			<p>
				Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!
			</p>
		</div>
  )
};

export default UserSignIn;