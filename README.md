This is simple User Profile Management System with  backend framework built with Node.js and Express.js. It is designed to facilitate the development of RESTful APIs and microservices by providing a structured architecture and reusable components.

TechStack:-

1. Node.js — JavaScript runtime environment

2.Express.js — Web framework for Node.js

3.cors — Middleware for enabling Cross-Origin Resource Sharing

4.cookie-parser — Middleware to parse cookies

5.dotenv — Loads environment variables from .env files

6.nodemon — Tool for automatically restarting the server during development

7.mongoose — MongoDB object modeling for Node.js

8.jsonwebtoken — JSON Web Token implementation for authentication

9.bcrypt — Library to hash passwords securely

SetUp:-

Follow these steps to set up the SuperGram-riya backend on your local machine:

1. Clone the repository
     `git clone https://github.com/ri123-ya/SuperGram-riya.git`
2. Navigate to the project directory
     `cd api`
3. Install dependencies
     Make sure you have Node.js installed. Then run:
     `npm install`
     to install all the Packages
     

5. Configure environment variables
     Create a .env file in the root folder (same level as index.js) and add necessary variables. For example:
     `PORT=3000
      MONGODB_URI=your_mongodb_connection_string
      JWT_SECRET=your_secret_key_for_tokens`
      Replace your_mongodb_connection_string with your actual MongoDB connection URI. If you don’t have MongoDB locally, you can use a service like MongoDB Atlas.

6. Start the server
    To run the server in development mode (with automatic restarts on file changes):
     `npm install nodemon`
     in package.json add
     `"scripts": {
        "dev": "nodemon index.js"
     }`
    Then run-
    `npm run dev`

7. Test the API
   Once the server is running, you can test the API endpoints  using Postman  by sending requests as
   `http://localhost:3000/`

