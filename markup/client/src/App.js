import { Route, Routes } from 'react-router-dom';

import Courses from './components/Courses'
import CreateCourse from "./components/CreateCourse";
import CourseDetail from './components/CourseDetail'
import Forbidden from './components/Forbidden';
import Header from './components/Header';
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./components/NotFound";
import UnhandledError from "./components/UnhandledError";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from './components/UserSignOut';
import UserSignUp from "./components/UserSignUp";

function App() {
  return (
    <div id='root'>
      <Header />
      <main>
        <Routes>
          <Route exact path='/' element={<Courses />} />
          <Route path='/courses/:id' element={<CourseDetail />} />
          <Route path="/signin" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path='/signout' element={<UserSignOut />} />
          <Route element={<PrivateRoute />}>
            <Route path="/courses/create" element={<CreateCourse />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
          </Route>
          <Route path="/error" element={<UnhandledError />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/notfound" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
