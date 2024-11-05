# blog-api

## Multi-Frontend Blogging Platform with Backend API

This project demonstrates the design of a blogging platform that separates backend and frontend functionalities into three parts: a backend API and two distinct frontend interfaces.

## Components

### 1. Backend API

The backend API is the backbone of the platform, built using [Node.js](https://nodejs.org/) with [Express](https://expressjs.com/). It manages data and business logic using:

- [prisma](https://www.prisma.io/docs/) for database interaction with a [PostgreSQL](https://www.postgresql.org/) database.
- [bcrypt](https://www.npmjs.com/package/bcrypt) for secure password hashing.
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and [passport](http://www.passportjs.org/) for user authentication and authorization.
- [multer](https://www.npmjs.com/package/multer) for handling file uploads.
- [dotenv](https://www.npmjs.com/package/dotenv) for environment variable management.
- [cors](https://www.npmjs.com/package/cors) to manage cross-origin requests.

Key functionalities include user management, content delivery, and data management through RESTful endpoints.

### 2. Public Frontend

The public frontend is is a single-page application (SPA) designed for general users, utilizing [React](https://reactjs.org/) with [Vite](https://vitejs.dev/) for a modern, fast development experience. It features:

- [@mui/material](https://mui.com/material-ui/) and [@mui/icons-material](https://mui.com/material-ui/icons/) for a responsive and intuitive UI.
- [axios](https://axios-http.com/) for seamless API calls to fetch blog content.
- [react-router-dom](https://reactrouter.com/) for efficient navigation between different views as a single-page app.

This interface allows users to browse posts, leave comments, and share content on social media.

### 3. Authors Frontend

// TODO
