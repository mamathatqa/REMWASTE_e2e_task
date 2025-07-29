# Test Plan

## Project Overview
This project is a fullstack JavaScript application with a React client (client folder) and a Node.js backend server (server folder). The client communicates with the backend APIs to perform CRUD operations and user authentication.

### What is Being Tested

#### UI Functional Tests
Validating user interactions on the React frontend, including login flow, task creation, editing, and deletion.

#### API Tests 
Testing backend REST API endpoints for user login, task creation, update, and deletion to ensure correct request handling, validation, and response status codes.

#### End-to-End Workflows
Ensuring the client and server integration behaves as expected (login, task management).

### Test Coverage Areas
#### Authentication 
Valid and invalid login attempts, token generation.

#### Task Management 
Creating, reading, updating, and deleting tasks.

#### Error Handling
Responses to invalid inputs or unauthorized access.

#### UI Validation
Element visibility, workflow navigation, form submissions.

#### API Validation
Response status codes, response body contents, headers.

### Tools Used and Why
#### Cypress (UI Testing):

Provides a robust, developer-friendly framework for UI automation testing.

Supports fixtures for test data, easy DOM querying, and assertion chaining.

#### Supertest (API Testing):

Simple and powerful HTTP assertion library to test REST APIs in Node.js environments.

Allows running API tests independently from Cypress to separate concerns and increase maintainability.

#### Node.js & Jest (Test Runner for API):

Jest provides test structuring, assertion, and reporting for Supertest API tests.

#### How to Run the Tests
Prerequisites:
Ensure both client and server are installed and running:

client: Run npm install then npm start

server: Run npm install then npm start

### Running UI Tests with Cypress:
Navigate to client folder:

cd client

Run Cypress tests:
npx cypress open   # to open UI test runner with GUI

npx cypress run    # to run tests headlessly
### Running API Tests with Supertest:
Navigate to server folder:

cd server
Run API tests:

npm test           # assuming Jest is configured as test runner

### Assumptions and Limitations
The backend server must be running locally on the configured port (e.g., http://localhost:4000) for API tests to pass.

Tests assume that the initial database state is clean or in a known state (for example, no pre-existing tasks with the same name).

UI tests depend on the availability and responsiveness of the frontend and backend.

Supertest API tests are designed to run independently and do not require UI tests.

Some edge cases or non-functional testing (performance, security) are out of scope for this phase.