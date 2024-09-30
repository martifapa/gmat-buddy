# GMAT buddy

## Getting started

This GMAT buddy uses fine-tuned prompts to help you solve any GMAT question you throw at him, and explain you why it is the correct answer. You can ask for as many new explanations as you want.

Both frontend and backend are dockerized so you don't need to worry about installation.


### Prerequisites

- Docker
- Docker Compose


### Building and running the application

To build and run the application:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/martifapa/gmat-buddy.git
   cd gmat-buddy

2. **Create a .env file with the GROQ apikey:**

    Inside the server/ directory create a .env file with the GROQ_API_KEY="your_api_key"

    Note: If you don't have a GROQ API key, you can create an account and get one via the **[GROQ Console](https://console.groq.com/keys)**

3. **Dockerize the application:**

    ```bash
    docker-compose build
    ```

4. **Run the application:**

    ```bash
    docker-compose up
    ```

5. **Stop the application:**

    ```bash
    docker-compose down
    ```