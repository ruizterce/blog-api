# blog-api

## Multi-Frontend Blogging Platform with Backend API.

This project demonstrates the design of a blogging platform that separates backend and frontend functionalities into three parts: a backend API and two distinct frontend interfaces.

## Endpoints

### GET

/api/posts - Fetch all posts

/api/posts/:id - Fetch a specific post with detailed information

### POST

/api/posts - Create a post

/api/posts/:postId/comments - Create a comment in a specific post

/api/register - Create a user

/api/login - Login a user to get a JWT token

### PUT

/api/posts/:id - Update a specific post

/api/posts/:postId/comments/:id - Update a specific comment in a specific post

### DELETE

/api/posts/:id - Delete a specific post

/api/posts/:postId/comments/:id - Delete a specific comment in a specific post
