# 🚀 Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017 or use MongoDB Atlas)
- Git

## Installation

### Option 1: Automatic Installation (Recommended)
```bash
chmod +x install-all.sh
./install-all.sh
```

### Option 2: Manual Installation
```bash
# Backend
cd backend
npm install

# Website
cd ../website
npm install

# Admin Portal
cd ../admin-portal
npm install

# Client Portal
cd ../client-portal
npm install
```

## Configuration

1. **Backend Configuration:**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your settings:
   # - MONGODB_URI
   # - JWT_SECRET
   # - STRIPE_SECRET_KEY (optional)
   ```

## Running the Application

### Option 1: Run All Services at Once
```bash
chmod +x start-all.sh
./start-all.sh
```

### Option 2: Run Services Separately (Recommended for Development)

**Terminal 1 - Backend API:**
```bash
cd backend
npm start
# Runs on http://localhost:5000
```

**Terminal 2 - Main Website:**
```bash
cd website
npm start
# Runs on http://localhost:3000
```

**Terminal 3 - Admin Portal:**
```bash
cd admin-portal
npm start
# Runs on http://localhost:3001
```

**Terminal 4 - Client Portal:**
```bash
cd client-portal
npm start
# Runs on http://localhost:3002
```

## Access the Application

Once all services are running:

| Application | URL | Purpose |
|-------------|-----|---------|
| **Website** | http://localhost:3000 | Main public site with products and checkout |
| **Admin Portal** | http://localhost:3001 | Admin dashboard and management |
| **Client Portal** | http://localhost:3002 | Client account and subscriptions |
| **API** | http://localhost:5000/api | REST API endpoints |

## Test Accounts

Use these credentials for testing:

### Admin Account
- Email: `admin@bestfaceforward.com`
- Password: `changeme123`

### Register New Accounts
Visit http://localhost:3000/register to create new client accounts

## Project Structure

```
adminportal-/
├── backend/              # Express.js API
├── website/              # Main public website (React)
├── admin-portal/         # Admin dashboard (React)
├── client-portal/        # Client portal (React)
├── install-all.sh        # Installation script
├── start-all.sh          # Startup script
├── README.md             # Full documentation
└── .gitignore            # Git ignore rules
```

## Features

✅ **E-Commerce Store** - Product catalog, cart, checkout  
✅ **User Authentication** - JWT-based login system  
✅ **Subscription Plans** - Quarterly and yearly billing  
✅ **Tax Forms** - Client intake form system  
✅ **Order Management** - Order tracking and status updates  
✅ **Admin Dashboard** - Analytics and full admin control  
✅ **Client Dashboard** - Personal orders, subscriptions, forms  

## API Documentation

### Key Endpoints

**Authentication:**
- `POST /api/auth/register` - Create new account
- `POST /api/auth/login` - User login

**Products:**
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product details

**Orders:**
- `GET /api/orders/user/:userId` - Get user's orders
- `POST /api/orders` - Create new order

**Subscriptions:**
- `GET /api/subscriptions/user/:userId` - Get user subscription
- `POST /api/subscriptions` - Create subscription

## MongoDB Setup

### Local MongoDB
```bash
# Install MongoDB or use Docker:
docker run -d -p 27017:27017 --name mongodb mongo:5.0
```

### MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

## Troubleshooting

**Port Already in Use:**
```bash
# Kill process on port (e.g., 3000)
lsof -i :3000
kill -9 <PID>
```

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Try connecting with MongoDB Compass

**Dependencies Issues:**
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Live Reloading

All React applications have hot reloading enabled - your changes will automatically refresh in the browser as you save files.

## Next Steps

1. ✅ Clone/pull the repository
2. ✅ Run `./install-all.sh` to install dependencies
3. ✅ Configure `.env` in the backend folder
4. ✅ Run `./start-all.sh` or start services individually
5. ✅ Visit http://localhost:3000 to see the website
6. ✅ Create a test account and explore!

## Support

For issues or questions, check the main README.md or create an issue on GitHub.

Happy coding! 🚀
