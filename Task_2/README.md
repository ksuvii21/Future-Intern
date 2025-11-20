# Task 2: Full-Stack E-commerce Application

This project is a full-stack e-commerce application built with React (client) and Node.js/Express (server) with MongoDB.

## Project Structure

```
├── server/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ProductList.js
│   │   │   ├── ProductCard.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Login.js
│   │   │   └── Admin.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── CartPage.js
│   │   │   └── CheckoutPage.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── tailwind.config.js
│   └── package.json
├── .gitignore
└── README.md
```

## Features

- Product management (CRUD operations)
- User authentication
- Shopping cart functionality
- Admin panel
- Responsive UI with Tailwind CSS

## Technologies Used

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

### Frontend
- React
- Tailwind CSS
- Axios for API calls
- React Router for navigation

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the project directory

#### Server Setup
```bash
cd server
npm install
# Set up your .env file with MongoDB URI and JWT secret
npm start
```

#### Client Setup
```bash
cd client
npm install
npm start
```

The application will be running on:
- Client: http://localhost:3000
- Server: http://localhost:5000

## API Endpoints

- GET /api/products - Get all products
- GET /api/products/:id - Get product by ID
- POST /api/products - Create new product (auth required)
- PUT /api/products/:id - Update product (auth required)
- DELETE /api/products/:id - Delete product (auth required)

## Deployment Guide

### Frontend Deployment (Netlify)

1. **Connect Repository:**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository

2. **Build Settings:**
   - Base directory: `Task_2/client`
   - Build command: `npm run build`
   - Publish directory: `Task_2/client/build`
   - Add environment variable: `REACT_APP_API_URL=https://your-render-backend-url.onrender.com`

3. **Deploy:**
   - Click "Deploy site"
   - Your frontend will be live at `https://your-site-name.netlify.app`

### Backend Deployment (Render)

1. **Connect Repository:**
   - Go to [Render](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

2. **Service Configuration:**
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Add all environment variables (see below)

3. **Environment Variables:**
   - MONGODB_URI
   - JWT_SECRET
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY
   - CLOUDINARY_API_SECRET
   - STRIPE_SECRET_KEY
   - STRIPE_PUBLISHABLE_KEY
   - EMAIL_USER
   - EMAIL_PASS
   - GOOGLE_CLIENT_ID
   - GOOGLE_CLIENT_SECRET
   - FRONTEND_URL=https://your-netlify-frontend-url.netlify.app

4. **Deploy:**
   - Click "Create Web Service"
   - Your backend will be live at `https://your-service-name.onrender.com`

### Environment Variables Setup

**Frontend (.env file for local development):**
```
REACT_APP_API_URL=http://localhost:5000
```

**Backend (.env file for local development):**
```
MONGODB_URI=mongodb://localhost:27017/shophub
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
