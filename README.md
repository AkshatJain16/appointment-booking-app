# Full-Stack Appointment Booking App

A simple full-stack appointment booking application built using **HTML, CSS, JavaScript, Node.js, Express.js, Sequelize, and MySQL**.

Users can book an appointment by entering their name, phone number, and email. The appointment is stored in a MySQL database through a Node.js backend. Existing appointments can also be viewed and deleted from the frontend.

---

## Features

* Book an appointment
* Store appointment details in MySQL
* Automatically generate a unique user ID
* View all registered appointments
* Delete an appointment
* REST API using Express.js
* Sequelize ORM for database operations
* CORS support for frontend-backend communication
* Responsive frontend design
* Separate frontend and backend structure

---

## Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript
* Fetch API

### Backend

* Node.js
* Express.js
* Sequelize
* MySQL
* CORS

---

## Project Structure

```text
full-stack-Appointment-booking-app
│
├── app.js
├── package.json
│
├── controllers
│   └── userController.js
│
├── models
│   └── users.js
│
├── routes
│   └── userRoutes.js
│
├── utils
│   └── db-connection.js
│
└── frontend
    ├── index.html
    ├── style.css
    └── index.js
```

---

## How the Application Works

The application has three main operations:

### 1. Book Appointment

The user enters:

* Full Name
* Phone Number
* Email Address

The frontend sends the information to the backend using a `POST` request.

The backend creates a new user in the MySQL database using Sequelize.

The database automatically generates an ID for the user.

---

### 2. View Appointments

When the frontend loads, it sends a `GET` request to the backend.

The backend retrieves all users from the database and sends them back as JSON.

The frontend displays the users as appointment cards.

---

### 3. Delete Appointment

Each appointment has a delete button.

When the user clicks the button, the frontend sends a `DELETE` request containing the user's ID.

The backend finds the user using the ID and deletes the user from the database.

---

# Backend Setup

## 1. Clone or Download the Project

Open the project folder in VS Code.

```bash
cd full-stack-Appointment-booking-app
```

---

## 2. Install Dependencies

Run:

```bash
npm install
```

If the packages are not already installed, you can install them using:

```bash
npm install express sequelize mysql2 cors
```

---

## 3. Create the MySQL Database

Open MySQL and create a database:

```sql
CREATE DATABASE booking_appointment;
```

---

## 4. Configure Database Connection

Open:

```text
utils/db-connection.js
```

Add your MySQL username and password.

Example:

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'booking_appointment',
    'root',
    'YOUR_PASSWORD',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

(async () => {
    try {
        await sequelize.authenticate();

        console.log("Connection to the database has been created");

    } catch (error) {

        console.log(error.message);

    }
})();

module.exports = sequelize;
```

Replace:

```text
YOUR_PASSWORD
```

with your actual MySQL password.

---

## 5. Start the Backend

Run:

```bash
node app.js
```

If everything is working correctly, you should see messages similar to:

```text
Connection to the database has been created
Database is synced
Server running at http://localhost:3000
```

The backend will run on:

```text
http://localhost:3000
```

---

# API Endpoints

## Add User

### POST

```text
/user/add-user
```

Full URL:

```text
http://localhost:3000/user/add-user
```

### Request Body

```json
{
    "name": "MS Dhoni",
    "phone": "9876543210",
    "email": "dhoni@example.com"
}
```

### Response

```json
{
    "message": "User created successfully",
    "id": 1
}
```

---

## Get All Users

### GET

```text
/user/get-users
```

Full URL:

```text
http://localhost:3000/user/get-users
```

### Example Response

```json
[
    {
        "id": 1,
        "name": "MS Dhoni",
        "phone": "9876543210",
        "email": "dhoni@example.com"
    }
]
```

---

## Delete User

### DELETE

```text
/user/delete-user/:id
```

Example:

```text
http://localhost:3000/user/delete-user/1
```

The `1` represents the user's ID.

### Response

```json
{
    "message": "User deleted successfully"
}
```

---

# Frontend Setup

The frontend files are located inside:

```text
frontend
```

The frontend contains:

```text
index.html
style.css
index.js
```

Open `index.html` in the browser or use the **Live Server** extension in VS Code.

The frontend JavaScript communicates with the backend using:

```js
const apiUrl = 'http://localhost:3000';
```

Make sure the backend is running before using the appointment form.

---

# Frontend to Backend Flow

The application follows this flow:

```text
User
 │
 │ Enter appointment details
 ▼
Frontend
 │
 │ POST /user/add-user
 ▼
Express Backend
 │
 │ Sequelize
 ▼
MySQL Database
 │
 │ User ID generated
 ▼
Backend
 │
 │ JSON response
 ▼
Frontend
```

For retrieving appointments:

```text
Frontend
 │
 │ GET /user/get-users
 ▼
Express Backend
 │
 │ Sequelize
 ▼
MySQL Database
 │
 │ User records
 ▼
Backend
 │
 │ JSON
 ▼
Frontend
 │
 ▼
Display appointments
```

For deleting an appointment:

```text
Frontend
 │
 │ DELETE /user/delete-user/:id
 ▼
Express Backend
 │
 │ Sequelize
 ▼
MySQL Database
 │
 │ Delete user
 ▼
Backend
 │
 │ JSON response
 ▼
Frontend
```

---

# Database

The application uses a `Users` table created by Sequelize.

The table contains:

| Field | Type    | Description                          |
| ----- | ------- | ------------------------------------ |
| id    | INTEGER | Primary key, automatically generated |
| name  | STRING  | User's full name                     |
| phone | STRING  | User's phone number                  |
| email | STRING  | User's email address                 |

The table is created automatically when the application starts using:

```js
sequelize.sync()
```

---

# Testing with Postman

You can test the backend APIs using Postman.

### Add User

```text
POST http://localhost:3000/user/add-user
```

Body → `raw` → `JSON`

```json
{
    "name": "Virat Kohli",
    "phone": "9876543211",
    "email": "virat@example.com"
}
```

### Get Users

```text
GET http://localhost:3000/user/get-users
```

### Delete User

```text
DELETE http://localhost:3000/user/delete-user/1
```

---

# Important Notes

### MySQL must be running

Make sure your MySQL server is running before starting the Node.js application.

### Backend must be running

Start the backend with:

```bash
node app.js
```

### Check the database password

If the application cannot connect to MySQL, check:

```text
utils/db-connection.js
```

and make sure the username, password, database name, and port are correct.

### CORS

The backend uses CORS so that the frontend can communicate with the backend from a different origin.

```js
const cors = require('cors');

app.use(cors());
```

### JSON

The backend uses:

```js
app.use(express.json());
```

This allows Express to receive JSON data from the frontend.

---

# Future Improvements

Some features that can be added later:

* Edit appointment
* Appointment date and time
* Doctor selection
* Appointment status
* Search appointments
* Form validation
* Login and authentication
* Admin dashboard
* Deployment to a live server
* Online database
* Email confirmation

---

## Author

Built as a full-stack learning project using:

**HTML • CSS • JavaScript • Node.js • Express.js • Sequelize • MySQL**
