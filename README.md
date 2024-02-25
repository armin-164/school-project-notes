# Notes

This repository contains the notes project for the API course at Medieinstitutet. This project fulfills the basic requirements for the highest grade of this specific assignment. Future work may be done to enhance the project or a new project might be created to revisit this idea with more knowledge and features.

## Project Structure

This project is structured into two main components: a frontend and a backend.

### Frontend

The frontend folder contains the user interface of the application. It was built using Vite, a common and modern build tool. The frontend interacts with the backend API to retrieve and manipulate data dynamically.

### Backend

The backend folder contains the API server built using Express.js. The backend communicates with a SQL database server to perform CRUD (Create, Read, Update, Delete) operations, linking the frontend to the database.

## Technologies Used

- Frontend:
  - Vite
  - HTML
  - SCSS
  - JavaScript

- Backend:
  - Express.js
  - Node.js
  - SQL (for database operations)

## Setup Instructions

To set up and run the project locally, follow these steps:

1. **Set up SQL Server**: Install and configure a SQL server on your machine. Note the host and port values for configuration.

2. **Configure Backend**:
   - Navigate to the `backend/lib/connect.js` file.
   - Update the host and port values with those of your SQL server.

3. **Install Dependencies**: Run `pnpm install` in the root directory of the project to install all required packages.

4. **Start Frontend**: Run `pnpm run dev` in the `frontend/` directory to start the frontend development server.

5. **Start Backend**: Run `nodemon start` in the `backend/` directory to start the backend server.


## Author
@armin-164
