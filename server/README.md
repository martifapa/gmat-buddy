# GMAT buddy - Backend

## Overview

This backend handles solving, saving, and retrieving questions for a GMAT questions-solving application. It also includes user authentication and training question and prompt fine-tunning management.

The backend is built with Node.js and Express, and connects to a PostgreSQL database using Prisma.

## Getting started

### Prerequisites

- Node.js
- Docker (if using containers)
- Postgres (or use a Docker Postgres image)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/martifapa/gmat-buddy.git
   cd gmat-buddy

2. **Create a .env file with the GROQ apikey:**

    Create a .env file with the following variables:
    - GROQ_API_KEY="your_api_key"
    - PORT=3000
    - SECRET_KEY="not_A_random_s3cr3t_k3y?"
    - DATABASE_URL=postgres://username:password@localhost:5432/dbname

    Note: If you don't have a GROQ API key, you can create an account and get one via the **[GROQ Console](https://console.groq.com/keys)**

3. **Install the dependencies:**

    ```bash
    npm install
    ```

4. **Run the application:**

    ```bash
    npm run dev
    ```

## API documentation

`/question`

### POST `/solve`

Solves a given question.

#### Request body

```json
{
  "question": "Your question here",
  "questionType": "Type of the question"
}
```

#### Possible responses

- `200` OK: Solved question returned.
- `400` Bad Request: Missing required fields.
- `500` Internal Server Error: Failed to solve the question.

### POST `/solve/new`

Provides a different explanation for the same question.

#### Request body

```json
{
  "question": "Your question here",
  "previousAnswer": "The previous answer provided"
}
```

#### Possible responses

- `200` OK: New explanation returned.
- `400` Bad Request: Missing required fields.
- `500` Internal Server Error: Failed to provide a new explanation.

### POST `/save/one`

Saves a single question (either reading or non-reading).

#### Request body

```json
{
  "question": "The question to be saved",
  // For non-reading questions: "answers", "type" are required.
}
```

#### Possible responses

- `200` OK: Question saved.
- `400` Bad Request: Missing required fields.
- `500` Internal Server Error: Failed to save the question.

### POST `/save/list`

Saves multiple questions in bulk.

#### Request body

```json
[
  { "question": "Question 1", ... },
  { "question": "Question 2", ... }
]
```

#### Possible responses

- `200` OK: Questions saved.
- `400` Bad Request: Invalid request body format.
- `500` Internal Server Error: Failed to save questions.

### GET `/all`

Retrieves all questions (non-reading questions).

#### Possible responses

- `200` OK: List of questions returned.
- `500` Internal Server Error: Failed to retrieve questions.

### GET `/all/reading`

Retrieves all reading questions.

#### Possible responses

- `200` OK: List of reading questions returned.
- `500` Internal Server Error: Failed to retrieve reading questions.

## `/train`

### POST `/new`

Creates a new set of training questions.

#### Request body

```json
[
  { "question": "Training question 1", ... },
  { "question": "Training question 2", ... }
]
```

#### Possible responses

- `200` OK: Training questions created.
- `400` Bad Request: Missing required fields.
- `500` Internal Server Error: Failed to create training questions.

## `/user`

### GET `/all`

Retrieves all users (requires authorization).

#### Possible responses

- `200` OK: List of users returned.
- 401 Unauthorized: Missing or invalid token.
- `500` Internal Server Error: Failed to retrieve users.

### POST `/`

Finds a user by username (requires authorization).

#### Request body

```json
{
  "username": "Username to find"
}
```

#### Possible responses

- `200` OK: User found.
- 401 Unauthorized: Missing or invalid token.
- `500` Internal Server Error: Failed to find user.

### POST `/login`

Logs in a user.

#### Request body

```json
{
  "username": "User's username",
  "password": "User's password"
}
```

#### Possible responses

- `200` OK: User logged in.
- `400` Bad Request: Missing credentials.
- 403 Forbidden: User not found or invalid credentials.

### POST `/register`

Registers a new user.

#### Request body

```json
{
  "username": "New user's username",
  "email": "New user's email",
  "password": "New user's password"
}
```

#### Possible responses

- `200` OK: User successfully registered.
- `400` Bad Request: Missing required fields.
- `500` Internal Server Error: Failed to register user.

## Running tests

You can run the tests using Jest and Supertest

## License

This project is licensed unter the MIT License.