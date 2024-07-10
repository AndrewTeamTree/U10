import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../util/apiHelper';
import UserContext from '../context/UserContext';
import ValidatonErrors from './ValidationErrors';

/**
 * Page to update the course
 * 1) Fetches the course by ID
 * 2) User can update any of the information in the form field
 * 3) Button to submit info
 * 4) Button to cancel
 */

const UpdateCourse = () => {
	/* Get user data from UserContext */
	const { authUser } = useContext(UserContext);
	/* Sets up navigate for routing */
	const navigate = useNavigate();
	/* Hook to get the course id */
  const courseId = useParams();

	/* Sets state */
	const [course, setCourse] = useState({});
	const [errors, setErrors] = useState([]);

	/* Fetches the course by id and displays it */
	useEffect(() => {
		async function getCourses() {
			try {
				const data = await api(`/courses/${ courseId.id }`, 'GET', null);
				if (data.status === 200) {
					const course = await data.json();
					if (authUser?.id !== course?.userId) {
						navigate('/forbidden');
					} else {
						setCourse(course);
					}
				} else if (data.status === 404) {
					navigate('/notfound');
				} else if (data.status === 500) {
					navigate('/error');
				}
			} catch (error) {
				console.log('Error fetching and parsing data in Course Detail', error);
				navigate('/notfound');
			}
		}
		getCourses();
	}, [ courseId, navigate, authUser ]);

	/* Handles the update of a course for logged in users */
  const handleUpdateCourse = async (e) => {
		e.preventDefault()
		/* PUT request to update the course */
		const data = await api(`/courses/${courseId.id}`, 'PUT', course, authUser);
		if (data.status === 204) {
			navigate(`/courses/${courseId.id}`);
		} else if (data.status === 400) {
			const res = await data.json()
			setErrors(res.errors);
		} else if (data.status === 404) {
			navigate('/notfound');
		} else if (data.status === 500) {
			navigate('/error');
		} else {
			throw new Error();
		}
		e.target.reset();
	};

	/* Handles the submit for the cancel button */
  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${course.id}`);
  };

  return (
    <div className='wrap'>
      <h2>Update Course</h2>
			<ValidatonErrors errors={ errors } />
			<form onSubmit={ handleUpdateCourse }>
				<div className='main--flex'>
					<div>
						<label htmlFor='courseTitle'>Course Title</label>
						<input id='courseTitle' name='courseTitle' type='text' value={ course.title } onChange={(e) => setCourse({ ...course, title: e.target.value })} />
						<p>
							By {course.User?.firstName} {course.User?.lastName}
						</p>
						<label htmlFor='courseDescription'>Course Description</label>
						<textarea id='courseDescription' name='courseDescription' value={ course.description } onChange={(e) => setCourse({ ...course, description: e.target.value })} />
					</div>
					<div>
						<label htmlFor='estimatedTime'>Estimated Time</label>
						<input id='estimatedTime' name='estimatedTime' type='text' value={ course.estimatedTime } onChange={(e) => setCourse({ ...course, estimatedTime: e.target.value })} />
						<label htmlFor='materialsNeeded'>Materials Needed</label>
						<textarea id='materialsNeeded' name='materialsNeeded' value={ course.materialsNeeded } onChange={(e) => setCourse({ ...course, materialsNeeded: e.target.value })} />
					</div>
				</div>
				<button className='button' type='submit'>Update Course</button>
				<button className='button button-secondary' onClick={ handleCancel }>Cancel</button>
			</form>
    </div>
  )
}

export default UpdateCourse
