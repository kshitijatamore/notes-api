# Notes API Backend

## 🚀 Tech Used

* Node.js
* Express.js
* MongoDB Atlas
* JWT Authentication

## ✨ Features

* User Authentication (Register/Login)
* Create, Read, Update, Delete Notes
* Search Notes
* Pagination
* Secure routes using JWT

## 🌐 Live API

https://notes-api-3wr3.onrender.com

## 📌 API Endpoints

### Auth

POST /register
POST /login

### Notes (Protected)

GET /notes
POST /notes
PUT /notes/:id
DELETE /notes/:id
GET /notes/search?query=

## 🔐 Authorization

Send token in headers:
Authorization: YOUR_TOKEN
