# RBAC Authentication with JWT Refresh Token (MERN)

This project is a simple implementation of **Role-Based Access Control (RBAC)** with **JWT Authentication** and a **Refresh Token mechanism** using the MERN stack (MongoDB, Express, React, Node.js).

## 🚀 Features
- User Registration & Login with JWT tokens
- Role-Based Access Control (Admin, Editor, User)
- Secure API routes (only Admins can access admin dashboard, Editors can access editor page, etc.)
- JWT Refresh Token mechanism to keep users logged in
- Protected frontend routes in React
- Simple inline styling (no Tailwind/CSS frameworks)

## 🛠️ Tech Stack
- **Frontend:** React.js (Context API, React Router)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT (Access & Refresh Tokens), Cookies for refresh token
- **Other:** dotenv, bcryptjs, cors
