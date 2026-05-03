my_eleventh_assignment/ 
│
├── client/                # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── shared/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Loader.jsx
│   │   │   ├── ui/
│   │   ├── context/
│   │   │   ├──AuthContext.jsx
│   │   ├── firebase
│   │   │   ├── firebase.config.js
│   │   ├── hooks/
│   │   │   ├── useProducts.js
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx
│   │   │   ├── DashboardLayout.jsx
│   │   ├── pages/
│   │   │   ├── Booking.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── AllProducts.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── dashboard/
│   │   │   │   ├── Admin/
│   │   │   │   │   ├── AllOrders.jsx
│   │   │   │   │   ├── AllProduct.jsx
│   │   │   │   │   ├── ManagerUser.jsx
│   │   │   │   ├── Manager/
│   │   │   │   │   ├── AddProduct.jsx
│   │   │   │   │   ├── ApprovedOrders.jsx
│   │   │   │   │   ├── ManageProducts.jsx
│   │   │   │   │   ├── PendingOrder.jsx
│   │   │   │   ├── User/
│   │   │   │   │   ├── MyOrders.jsx
│   │   │   │   │   ├── Profile.jsx
│   │   │   │   │   ├── TrackOrder.jsx
│   │   ├── routes/
│   │   │   ├── Router.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── RoleRoute.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   ├── package.json
│   ├──.env
│   ├──index.html
│   └── README.md
│
│
├── server/                # Backend (Express)
│   ├── config/
│   │   ├── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── roleMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── userRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   ├── .env
│   ├── index.js
│   ├── package.json
│
