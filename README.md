# 📚 Book Store App – MERN Stack (Role-Based Authentication) live: https://book-store-frontend-suraj.vercel.app/

A full-stack **Book Management Application** built using the **MERN Stack** with **role-based authentication** and **JWT cookies**.  
Admins can manage books (Create, Update, Delete), while regular users can only view books.

---

## 🚀 Features

### 🔑 Authentication & Authorization
- **JWT Authentication** stored in **HttpOnly Cookies** for secure login sessions.
- **Role-Based Access**:
  - **Admin**: Add, update, and delete books.
  - **User**: View books only.
- **Protected Routes** using middleware:
  - `authMiddleware` → Checks if the user is logged in.
  - `adminMiddleware` → Checks if the user has `admin` role.

### 📚 Book Management
- **Create, Read, Update, Delete** (CRUD) books.
- Each book includes:
  - Title
  - Author
  - Published Year
  - Description
  - Cover Image

### 💻 Tech Stack
- **Frontend**: React + Vite + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Authentication**: JWT + Cookies
- **Hosting**:
  - Frontend → Vercel
  - Backend → Vercel

