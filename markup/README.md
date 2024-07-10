# Project Overview

In this final project, I used React to create a client for my existing school database REST API (that I created in a previous project). The full stack application will provide a way for users to administer a school database containing information about courses: users can interact with the database by retrieving a list of courses, viewing detail for a specific course, as well as creating, updating, and deleting courses in the database.

In addition, this project will require users to create an account and sign in to make changes to the database. To complete this project, I used my knowledge of React, JSX, React Router, React Context API, and Create React App.

After using the Create React App tool to set up your initial project, I:
- Used JavaScript and JSX to build out the components for your application in a modular fashion.
- Used React Router to set up your routes.
- Used the Fetch API or a tool like Axios to fetch data from your REST API.
- Allowed users to sign up and use basic authentication to support users signing in.

### To run the project
First, install the respective dependencies of the project in two different terminals
- one for api: <b>npm install</b>
- one for client: <b>npm install</b>

Second, create the database and seed it with initial data in the api terminal: <b>npm run seed</b>

Finally, launch the application in both terminals: 
- api terminal first: <b>npm start</b>
- client terminal second: <b>npm start</b>

Verify the deployment by navigating to your server address in your preferred browser:
- http://localhost:3000 (client)
- http://localhost:5000 (api)

