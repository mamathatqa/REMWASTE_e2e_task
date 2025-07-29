# Fullstack Task Management App

This is a full-stack JavaScript project that includes:

- A **React** frontend located in the `client/` directory
- A **Node.js/Express** backend located in the `server/` directory
- UI tests written in **Cypress**
- API tests written using **Supertest** and **Jest**

---

## 🗂 Project Structure

```
fullstacktask/
├── client/               # React frontend
│   ├── cypress/          # Cypress tests for UI
│   ├── public/
│   └── src/
├── server/               # Node.js backend
│   ├── api_tests/        # Supertest API tests
│   ├── fixtures/         # JSON files for test data
│   ├── utils/            # Utility functions (if any)
│   ├── .env              # Environment variables
│   ├── index.js          # Entry point for server
│   └── package.json      # Backend dependencies and scripts
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone <github url>
cd Fullstack-task-tracker-Auth
```

---

## 📦 Setting Up the Server

```bash
cd server
npm install
```

### ➤ Start the Backend Server

```bash
npm start
```

The server will run at `http://localhost:4000` by default.

---

## 💻 Setting Up the Client (React App)

```bash
cd ../client
npm install
```

### ➤ Start the Frontend App

```bash
npm start
```

The React app will run at `http://localhost:3000` by default.

---

## ✅ Running UI Tests with Cypress

Make sure the client is running at `http://localhost:3000`.

```bash
cd client
npx cypress open
```

You can also run headless tests:

```bash
npx cypress run
```

---

## 🧪 Running API Tests with Supertest

Make sure the server is running at `http://localhost:4000`.

```bash
cd ../server
npm test
```

API tests are located in `server/api_tests/` and use Jest as the test runner.

---

## 🔑 Environment Variables

Create a `.env` file in the `server/` folder to store environment-specific values.

Example `.env`:

```
PORT=4000
JWT_SECRET=your_jwt_secret_key
```

---

## 📋 Test Data

Test data for API tests is stored in:

```
server/fixtures/testData.json
```

---

## 🧾 License

This project is for personal and educational use.

---

## 👤 Author

Developed by Mamatha Thatikonda