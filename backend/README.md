# Backend

## Overview

The backend of the Multi-Frontend Blogging Platform serves as the core API, managing data and business logic for the application. It is built using [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/), providing a RESTful interface for frontend communication.

## Key Technologies

- **Database**: [PostgreSQL](https://www.postgresql.org/) for data storage, managed via [Prisma](https://www.prisma.io/docs/).
- **Authentication**: [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) and [passport](http://www.passportjs.org/) for user authentication and authorization.
- **File Handling**: [multer](https://www.npmjs.com/package/multer) for handling file uploads.
- **Environment Management**: [dotenv](https://www.npmjs.com/package/dotenv) for managing environment variables.
- **Cross-Origin Resource Sharing**: [cors](https://www.npmjs.com/package/cors) for managing API access from different origins.

## API Reference

#### Get all posts

```http
GET /api/posts
```

| Parameter | Type | Description             |
| :-------- | :--- | :---------------------- |
| N/A       | N/A  | Fetches all blog posts. |

---

#### Get post by ID

```http
GET /api/posts/${id}
```

| Parameter | Type     | Description                            |
| :-------- | :------- | :------------------------------------- |
| `id`      | `string` | **Required**. Id of the post to fetch. |

---

#### Get user profile

```http
GET /api/user/profile
```

| Parameter | Type | Description                           |
| :-------- | :--- | :------------------------------------ |
| N/A       | N/A  | Fetches the logged-in user's profile. |

---

#### Create a new post

```http
POST /api/posts
```

| Parameter | Type   | Description                           |
| :-------- | :----- | :------------------------------------ |
| N/A       | N/A    | Creates a new blog post.              |
| `image`   | `file` | Optional. An image file for the post. |

---

#### Add comment to a post

```http
POST /api/posts/${postId}/comments
```

| Parameter | Type     | Description                   |
| :-------- | :------- | :---------------------------- |
| `postId`  | `string` | **Required**. Id of the post. |

---

#### Register a new user

```http
POST /api/register
```

| Parameter | Type | Description           |
| :-------- | :--- | :-------------------- |
| N/A       | N/A  | Registers a new user. |

---

#### Log in a user

```http
POST /api/login
```

| Parameter | Type | Description                             |
| :-------- | :--- | :-------------------------------------- |
| N/A       | N/A  | Logs in a user and returns a JWT token. |

---

#### Update a specific post

```http
PUT /api/posts/${id}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of the post to update. |

---

#### Update a specific comment

```http
PUT /api/posts/${postId}/comments/${id}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `postId`  | `string` | **Required**. Id of the post.              |
| `id`      | `string` | **Required**. Id of the comment to update. |

---

#### Delete a specific post

```http
DELETE /api/posts/${id}
```

| Parameter | Type     | Description                             |
| :-------- | :------- | :-------------------------------------- |
| `id`      | `string` | **Required**. Id of the post to delete. |

---

#### Delete a specific comment

```http
DELETE /api/posts/${postId}/comments/${id}
```

| Parameter | Type     | Description                                |
| :-------- | :------- | :----------------------------------------- |
| `postId`  | `string` | **Required**. Id of the post.              |
| `id`      | `string` | **Required**. Id of the comment to delete. |
