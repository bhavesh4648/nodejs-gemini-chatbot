# nodejs-gemini-chatbot

Node.js chatbot server using Google Gemini API via the @google/genai SDK. This project provides a RESTful API endpoint for generating AI-powered responses, suitable for integration with web or mobile clients.

Features
Express.js REST API with /chat endpoint

Secure API key management via .env

Integration with Google Gemini (Generative AI) API

JSON request/response for easy frontend consumption

Static file serving for web UI (optional)

Robust error handling and logging

Prerequisites
Node.js v18+ (required by @google/genai)5

A Gemini API key from Google AI Studio5

Installation
Clone the repository

bash
git clone <your-repo-url>
cd <your-project-folder>
Install dependencies

bash
npm install
Configure environment variables

Create a .env file in the project root:

text
API_KEY=your-gemini-api-key
PORT=3000
Replace your-gemini-api-key with your actual Gemini API key.

Usage
Start the server
bash
npm start
The server will run on http://localhost:3000 (or the port specified in .env).

API Endpoints
POST /chat
Description: Generate a response from Gemini based on user input.

Request Body: JSON

json
{
"message": "Your message here"
}
Response: JSON

json
{
"reply": "AI-generated response"
}
Error Responses:

400 Bad Request if message is missing

500 Internal Server Error on API or server errors

GET /
Description: Serves the main HTML UI (if public/index.html exists).

Production Recommendations
API Key Security: Never expose your API key in client-side code. Keep .env secure.

Error Handling: All errors are logged and meaningful messages returned to clients.

Rate Limiting: For public deployment, use middleware to prevent abuse (e.g., express-rate-limit).

HTTPS: Always serve over HTTPS in production.

Environment Variables: Use a process manager like PM2 and environment variables for config.

Static Files: Place your frontend in the public/ directory.

Example Request
bash
curl -X POST http://localhost:3000/chat \
 -H "Content-Type: application/json" \
 -d '{"message": "Hello, Gemini!"}'
Notes
This implementation uses the @google/genai SDK for Node.js, which is the recommended way to access Gemini models server-side for production use15.

For client-side prototyping only, you may use the SDK in the browser, but for production and security, always call Gemini from your backend4.

The code is structured for clarity and maintainability, with clear separation of configuration, routing, and AI integration.

References
Google Gemini API Documentation5

Gemini API Quickstart

Best practices for integrating Google Generative AI6

Author: Bhavesh Patel
