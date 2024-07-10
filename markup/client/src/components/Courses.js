import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

/**
 * Fetches all of the courses in the database
 * 1) Each course listed is a link to view all the details
 * 2) Lastly a create course button is shown to create your own course
 */

const Courses = () => {
	/* Sets up navigate for routing */
	const navigate = useNavigate();
	
	/* Sets state for courses */
  const [courses, setCourses] = useState([]);

	/* Fetches all the courses in the database */
	useEffect(() => {
		async function fetchCourses() {
			try {
				const response = await fetch('http://localhost:5000/api/courses');
				if (response.ok) {
					const data = await response.json();
					setCourses(data);
				} else {
					throw new Error('Error fetching courses');
				}
			} catch (error) {
				console.error(error);
				navigate('/error');
			}
		}
		fetchCourses();
	}, [navigate]);

  return (
    <div className="wrap main--grid">
      {
        courses.map((course, index) => (
          <Link key={index} className='course--module course--link' to={`/courses/${course.id}`}>
            <h2 className='course--label'>Course</h2>
            <h3 className='course--title'>{course.title}</h3>
          </Link>
			  ))
      }
      <Link className='course--module course--add--module' to='/courses/create'>
				<span className='course--add--title'>
					<svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 13 13' className='add'>
						<polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
					</svg>
					New Course
				</span>
			</Link>
    </div>
  )
}

export default Courses;