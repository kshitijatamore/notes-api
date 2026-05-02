# 📝 Notes API Backend

A RESTful API for a Notes application with authentication and CRUD functionality.

---

## 🚀 Tech Stack

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication

---

## ✨ Features

* User Authentication (Register / Login)
* Create, Read, Update, Delete Notes
* Search Notes
* Pagination support
* Secure routes using JWT

---

## 🌐 Live Demo
Frontend: https://notes-api-kgfj.vercel.app/
Backend: https://notes-api-3wr3.onrender.com

---

## 📌 API Endpoints

### 🔐 Auth Routes

* `POST /register` → Register user
* `POST /login` → Login user

---

### 📝 Notes Routes (Protected)

* `GET /notes` → Get all notes
* `POST /notes` → Create note
* `PUT /notes/:id` → Update note
* `DELETE /notes/:id` → Delete note
* `GET /notes/search?query=` → Search notes

---

## 🔐 Authorization

Send token in headers:

Authorization: Bearer YOUR_TOKEN

---

## ⚙️ How to Run Locally

1. Clone the repo
2. Run `npm install`
3. Add `.env` file with:

   * MONGO_URI
   * JWT_SECRET
4. Start server:

   ```
   node server.js
   ```

---

## 📷 Sample Request (Using Postman / Thunder Client)

```json
POST /login
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

