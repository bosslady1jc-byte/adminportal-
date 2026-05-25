# Best Face Forward - Complete Portal Solution

A full-stack web application for tax preparation and ERO software services with admin and client portals.

**Live Domains:**
- Admin Portal: https://bfftracker.net
- Public Website + Client Portal: https://urlocalbff.com

> For local development, use `http://localhost:3001` for the admin portal and `http://localhost:3000` / `http://localhost:3002` for the website and client portal.

## Project Structure

```
adminportal-/
├── backend/                 # Node.js/Express API
│   ├── models/             # MongoDB schemas
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Order.js
│   │   ├── Subscription.js
│   │   └── IntakeForm.js
│   ├── routes/             # API endpoints
│   │   ├── auth.js         # Authentication
│   │   ├── users.js        # User management
│   │   ├── products.js     # Product management
│   │   ├── orders.js       # Order management
│   │   ├── subscriptions.js# Subscription management
│   │   ├── cart.js         # Shopping cart
│   │   └── intakeForms.js  # Intake form handling
│   ├── package.json
│   ├── server.js           # Express server
│   └── .env.example        # Environment variables template
│
├── website/                # Main public website (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   └── Footer.js
│   │   ├── pages/
│   │   │   ├── HomePage.js
│   │   │   ├── ProductsPage.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── CartPage.js
│   │   │   ├── CheckoutPage.js
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── IntakeFormPage.js
│   │   │   └── ContactPage.js
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── admin-portal/           # Admin portal (React)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AdminHeader.js
│   │   │   ├── Sidebar.js
│   │   │   ├── StatCard.js
│   │   │   └── ProductForm.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── ProductsManagement.js
│   │   │   ├── UsersManagement.js
│   │   │   ├── OrdersManagement.js
│   │   │   ├── SubscriptionsManagement.js
│   │   │   └── IntakeFormsManagement.js
│   │   ├── AdminApp.js
│   │   └── index.js
│   └── package.json
│
└── client-portal/          # Client portal (React)
    ├── src/
    │   ├── components/
    │   │   ├── ClientHeader.js
    │   │   ├── ClientSidebar.js
    │   │   └── IntakeFormBuilder.js
    │   ├── pages/
    │   │   ├── ClientDashboard.js
    │   │   ├── MyOrders.js
    │   │   ├── MySubscription.js
    │   │   ├── IntakeForms.js
    │   │   ├── Profile.js
    │   │   └── LoginPage.js
    │   ├── ClientApp.js
    │   └── index.js
    └── package.json
```

## Key Features

### Main Website (Public)
- Product catalog and browsing
- Shopping cart and checkout
- User registration and login
- Tax payer intake forms
- Contact page
- Responsive design

### Admin Portal
- Dashboard with analytics
- Product management (CRUD)
- User management
- Order management and tracking
- Subscription management
- Tax intake form review

### Client Portal
- Personal dashboard
- Order history
- Subscription management (quarterly/yearly options)
- Tax intake form submissions
- Profile management
- Document storage

### Backend API
- **Authentication**: JWT-based user authentication
- **Products**: Full CRUD operations
- **Orders**: Order creation, tracking, and management
- **Subscriptions**: Plan management with quarterly/yearly billing
- **Users**: User registration, profile management
- **Tax Intake Forms**: Form submission and tracking
- **Shopping Cart**: Session-based cart management

## Subscription Plans

### Basic - $99/quarter or $300/year
- Access to Tax Forms
- Email Support
- Basic Analytics

### Professional - $199/quarter or $600/year
- All Basic features
- ERO Software
- Priority Support
- Advanced Analytics
- Client Management

### Enterprise - $399/quarter or $1,200/year
- All Professional features
- Dedicated Account Manager
- 24/7 Support
- Custom Integrations
- Training Included

## Setup Instructions

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Update .env with your database and Stripe keys
npm start
```

### 2. Website Setup
```bash
cd website
npm install
npm start
```

### 3. Admin Portal Setup
```bash
cd admin-portal
npm install
npm start
```

### 4. Client Portal Setup
```bash
cd client-portal
npm install
npm start
```

## Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/tax-portal
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
ADMIN_EMAIL=admin@bestfaceforward.com
ADMIN_PASSWORD=changeme123
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Orders
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/user/:userId` - Get user orders
- `POST /api/orders` - Create order
- `PUT /api/orders/:id` - Update order (admin)

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions (admin)
- `GET /api/subscriptions/user/:userId` - Get user subscription
- `POST /api/subscriptions` - Create subscription
- `PUT /api/subscriptions/:id` - Update subscription
- `PATCH /api/subscriptions/:id/cancel` - Cancel subscription

### Tax Intake Forms
- `GET /api/intake-forms` - Get all forms (admin)
- `GET /api/intake-forms/user/:userId` - Get user forms
- `POST /api/intake-forms` - Create form
- `PUT /api/intake-forms/:id` - Update form
- `PATCH /api/intake-forms/:id/submit` - Submit form

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB, JWT, Stripe
- **Frontend**: React.js, React Router, Axios
- **UI**: React Icons, Recharts, CSS3
- **Database**: MongoDB
- **Payment**: Stripe Integration
- **Authentication**: JWT (JSON Web Tokens)

## Future Enhancements

- Email notifications
- Payment integration with Stripe
- Document upload and storage
- Video tutorials
- Live chat support
- Email verification
- Password reset functionality
- Two-factor authentication
- Advanced reporting
- Calendar scheduling
- Multi-language support

## License

ISC
