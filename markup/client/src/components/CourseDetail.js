import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { api } from '../util/apiHelper';
import UserContext from "../context/UserContext";
import ReactMarkdown from "react-markdown";

/**
 * Fetches course details from the course ID and renders all the details of that course
 * 1) If you are an Authorized User (you created the course) you can update or delete the course
 * 2) If you are not Authorized User (did not create the course) you can only view the course
 */

const CourseDetail = () => {
  
  /* Get user data from UserContext */
  const { authUser } = useContext(UserContext);
  /* Sets up navigate for routing */
  const navigate = useNavigate();
  /* Hook to get the course id */
  const courseId = useParams();

  /* Sets state for course */
  const [ course, setCourse ] = useState(null);
  
  /* Fetches the course by id and sets it to course state */
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`http://localhost:5000/api/courses/${ courseId.id }`);
        if (response.ok) {
          const data = await response.json();
          data.authorName = `${ data.owner.firstName } ${ data.owner.lastName }`;
          setCourse(data);
        } else {
          const error = new Error('Network response error');
          error.status = response.status;
          throw error
        }
      } catch (error) {
        console.error(error);
        navigate('/notfound');
      }
    }
    fetchData();
  }, [courseId, navigate]);

  /* Handles the delete for Authorized Users */
  const handleDelete = async () => {
		if (!authUser) {
			console.error('authUser is null or undefined');
			return;
		}
    /* Gets the password of the authUser */
		const { password } = authUser;
    /* Gets the course data and deletes the course */
		const data = await api(`/courses/${ courseId.id }`, 'DELETE', null, { ...authUser, password: password })
		if (data.status === 204) {
			navigate('/')
		} else if (data.status === 403) {
			navigate('/forbidden')
		} else if (data.status === 500) {
			navigate('/error')
		} else {
			throw new Error()
		}
	}

  return (
    <>
      { course &&
        <>
          <div className='actions--bar'>
            <div className='wrap'>
              { (authUser && (authUser.id === course.owner.id)) ? 
              (
                <>
                  <Link className="button" to={ `/courses/${ course.id }/update` }>Update Course</Link>
                  <Link className="button" onClick={ handleDelete }>Delete Course</Link>
                </>
              ) : null
              }
              <Link className='button button-secondary' to='/'>
                Return to List
              </Link>
            </div>
          </div>
          <div className='wrap'>
            <h2>Course Detail</h2>
            <div className='main--flex'>
              <div>
                <h3 className='course--detail--title'>Course</h3>
                <h4 className='course--name'>{ course.title }</h4>
                <p>By { course.authorName }</p>
                <>
                  <ReactMarkdown>{ course.description }</ReactMarkdown>
                </>
              </div>
              <div className='course'>
                <h3 className='course--detail--title'>Estimated Time</h3>
                <p>{ course.estimatedTime }</p>
                <h3 className='course--detail--title'>Materials Needed</h3>
                <ReactMarkdown className='course--detail--list' children={ course.materialsNeeded } />
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default CourseDetail;
