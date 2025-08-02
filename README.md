# Parcel Delivery System API

Welcome to the **Parcel Delivery System API**, a robust and secure backend service designed to manage parcel shipments efficiently. This API supports user management, parcel creation, tracking, delivery status updates, and role-based access control to streamline the entire delivery process.

Built with **TypeScript**, **Express**, and **MongoDB**, the system ensures data validation, authentication, and authorization for different user roles including Admin, Sender, Receiver, and Delivery Agent.

This documentation covers the available API endpoints, their usage, and the role-based permissions necessary to interact with each route.

---
Base_Url_for_user:api/v1/user

Base_Url_for_percel:api/v1/percel


Live_Url:https://parcel-delevery-system-api.vercel.app/


## Technologies Used

- Node.js & Express
- TypeScript
- MongoDB & Mongoose
- Zod for schema validation
- JWT for authentication and authorization

---

## User Roles

| Role           | Description                         |
|----------------|-------------------------------------|
| Admin          | Full access to all resources        |
| Sender         | Creates parcels and tracks them     |
| Receiver       | Receives parcels and can request returns |
| Delivery Agent | Updates parcel delivery status      |

---

## 📦 Parcel Routes

| Method | Endpoint                            | Access Roles                | Description                              |
|--------|-------------------------------------|-----------------------------|------------------------------------------|
| POST   | `/percel/create`                    | Admin, Sender               | Create a new parcel                      |
| GET    | `/percel/getallpercel`              | Admin                       | Retrieve all parcels                     |
| GET    | `/percel/:percelId`                 | Admin, Sender               | Get parcel by ID                         |
| GET    | `/percel/getpercelInfo/:senderId`   | Admin, Sender               | Get all parcels by sender ID             |
| PATCH  | `/percel/:percelId`                 | Admin, Sender, DeliveryAgent| Update parcel (status/details)           |
| DELETE | `/percel/:percelId`                 | Admin                       | Delete a parcel                          |
| GET    | `/percel/track/:trackingId`         | Public                      | Track parcel by tracking ID              |
| PATCH  | `/percel/return_request`            | Receiver                    | Request return of a parcel            |




## 👤 User Routes

| Method | Endpoint                       | Access Roles     | Description                              |
|--------|--------------------------------|------------------|------------------------------------------|
| POST   | `/user/register`               | Public           | Register a new user                      |
| GET    | `/user/allusers`               | Admin            | Get all users                            |
| DELETE | `/user/delete/:userId`         | Admin            | Delete a user                            |
| PATCH  | `/user/update/:userId`         | Admin, Sender, Receiver, DeliveryAgent | Update user info |
| PATCH  | `/user/block/:userId`          | Admin            | Block a user                             |
| PATCH  | `/user/unblock/:userId`        | Admin            | Unblock a user                           |

---


## 🔐 Auth Routes

| Method | Endpoint              | Access Roles     | Description                                |
|--------|-----------------------|------------------|--------------------------------------------|
| POST   | `/auth/login`         | Public           | Login user and receive access/refresh token|
| POST   | `/auth/refresh-token` | Public           | Generate a new access token from refresh   |
| POST   | `/auth/logout`        | Public           | Log out the current session                |
| POST   | `/auth/reset-password`| All roles (Auth) | Reset user password (authenticated only)   |

- Different routes require different role-based permissions.

---

## 📑 Validation

All input data is validated using **Zod** schemas before any controller logic runs.

---

## 🔄 Status Tracking Structure

Each parcel maintains an array of status logs:

```json
"trackingEvents": [
{
  "status": "PENDING",
  "location": "Farmgate, Dhaka",
  "note": "Parcel created",
  "timestamp": "2025-08-01T16:35:39.427Z"
},
{
  "status": "PICKED",
  "location": "Dhaka Hub",
  "note": "Parcel arrived at sorting facility",
  "timestamp": "2025-08-02T10:00:00.000Z"
}
]

```
# Running the Project
```

```bash 

install dependencies
npm install

run in development
npm run dev

 build for production
npm run build

start in production
npm start
```



```
# Server configuration
PORT=5000
NODE_ENV=development

# MongoDB
DB_URL=mongodb+srv://<USERNAME>:<PASSWORD>@<CLUSTER>/<DB_NAME>?retryWrites=true&w=majority&appName=<APP_NAME>

# Bcrypt
SALT_ROUND=10

# JWT Access Token
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=2d

# JWT Refresh Token
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_REFRESH_SECRET_EXPIRES=30d

# Nodemailer (for email notifications)
USER_EMAIL=your_email@gmail.com
APP_PASSWORD=your_app_password
```