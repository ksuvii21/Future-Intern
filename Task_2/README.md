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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.
