# GMAT Helper

## Getting Started

This project includes a backend and frontend application, both containerized with Docker.

It consists of a GMAT virtual assistant, which can help you solve GMAT questions and get the explanation of why the correct answer is correct.

Some improvements:
    -FRONTEND:
        + add a conditional component to let the user know a response is being fetch
        + categorize the questions by type
    - BACKEND:
        + integrate with a real DDBB to save preferences and questions
        + authentication system
    - AI:
        + be able to ask for different styles of explanations
        + determine the difficulty of a question

### Prerequisites

- Docker
- Docker Compose

### Building and Running the Application

To build and run the application, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/your-repository.git
   cd your-repository
