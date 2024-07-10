import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../util/apiHelper';
import UserContext from '../context/UserContext';
import ValidatonErrors from './ValidationErrors';

/**
 * Page for user to sign up
 * 1) Form field for First Name, Last Name, Email Address and password
 * 2) Button to submit user info
 * 3) Button to cancel
 */

const UserSignUp = () => {
  const { actions } = useContext(UserContext);
  const navigate = useNavigate();

  // user states
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
		e.preventDefault();
		
    const user = {
			firstName: firstName.current.value,
			lastName: lastName.current.value,
			emailAddress: emailAddress.current.value,
			password: password.current.value
		};
		
    try {
			const response = await api('/users', 'POST', user)
			if (response.status === 201) {
				console.log(`${user.firstName} ${user.lastName} is successfully signed up and authenticated!`)
				const credentials = {
					emailAddress: user.emailAddress,
					password: user.password
				}
				await actions.signIn(credentials);
				navigate('/');
			} else if (response.status === 400) {
				const data = await response.json();
				setErrors(data.errors)
			} else if (response.status === 500) {
				navigate('/error');
			} else {
				throw Error();
			}
		} catch (error) {
      console.log(error);
      navigate("/");
    }
	};

  const handleCancel = () => {
		navigate('/');
	};

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
			<ValidatonErrors errors={ errors } />
			<form onSubmit={ handleSubmit }>
				<label htmlFor='firstName'>First Name</label>
				<input id='firstName' name='firstName' type='text' ref={ firstName } placeholder='First Name' />
				<label htmlFor='lastName'>Last Name</label>
				<input id='lastName' name='lastName' type='text' ref={ lastName } placeholder='Last Name' />
				<label htmlFor='emailAddress'>Email Address</label>
				<input id='emailAddress' name='emailAddress' type='email' ref={ emailAddress } placeholder='Email Address' />
				<label htmlFor='password'>Password</label>
				<input id='password' name='password' type='password' ref={ password } placeholder='Password' />
				<button className='button' type='submit'>Sign Up</button>
				<button className='button button-secondary' onClick={ handleCancel } type='button'>Cancel</button>
			</form>
			<p>
				Already have a user account? Click here to <Link to='/signin'>sign in</Link>!
			</p>
    </div>
  )
};

export default UserSignUp;