import React, { useRef, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../util/apiHelper';
import UserContext from '../context/UserContext';
import ValidatonErrors from './ValidationErrors';

/**
 * Page for user to create a new course
 * 1) Form for the user to input information
 * 2) Create a course button to create new course
 * 3) Cancel button to leave page and not create a new course
 */

const CreateCourse = () => {
	/* Get user data from UserContext */
	const { authUser } = useContext(UserContext);
	/* Get user data from UserContext */
  const { password } = authUser;
	/* Sets up navigate for routing */
  const navigate = useNavigate();

  /* Sets error state */
  const [ errors, setErrors ] = useState([]);

  /* Sets the reference for each course field */
  const courseTitle = useRef(null);
  const courseDescription = useRef(null);
  const courseEstimatedTime = useRef(null);
  const courseMaterialsNeeded = useRef(null);

	/* Handles the submit for the create a course for logged in users */
  const handleCreateCourse = async (e) => {
		e.preventDefault();

    const course = {
      title: courseTitle.current.value,
      description: courseDescription.current.value,
      estimatedTime: courseEstimatedTime.current.value,
      materialsNeeded: courseMaterialsNeeded.current.value,
      userId: authUser.id
    }

		/* POST request to create a new course */
		const data = await api(`/courses`, 'POST', course, { ...authUser, password: password });

		if (data.status === 201) {
			navigate(`/`);
		} else if (data.status === 400) {
			const res = await data.json();
			console.log("res", res);
			if (res.errors) {
				setErrors(res.errors);
			}
		} else if (data.status === 500) {
			navigate('/error');
		} else {
			throw new Error();
		}
	};

  /* Handles the submit for the cancel button */
  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className='wrap'>
      <h2>Create Course</h2>
			<ValidatonErrors errors={ errors } />
			<form onSubmit={ handleCreateCourse }>
				<div className='main--flex'>
					<div>
						<label htmlFor='courseTitle'>Course Title</label>
						<input id='courseTitle' name='courseTitle' type='text' ref={ courseTitle } />
						<p>
							by { authUser?.firstName } { authUser?.lastName }
						</p>
						<label htmlFor='courseDescription'>Course Description</label>
						<textarea id='courseDescription' name='courseDescription' ref={ courseDescription } />
					</div>
					<div>
						<label htmlFor='estimatedTime'>Estimated Time</label>
						<input id='estimatedTime' name='estimatedTime' type='text' ref={ courseEstimatedTime } />
						<label htmlFor='materialsNeeded'>Materials Needed</label>
						<textarea id='materialsNeeded' name='materialsNeeded' ref={ courseMaterialsNeeded } />
					</div>
				</div>
				<button className='button' type='submit'>Create Course</button>
				<button className='button button-secondary' onClick={ handleCancel }>Cancel</button>
			</form>
    </div>
  )
};

export default CreateCourse