# SmartCommerce - Intelligent E-Commerce Platform

> **Shop Intelligently. Expand Infinitely.**

A modern, futuristic e-commerce platform built with Next.js, featuring an elegant design with a unique color palette, comprehensive admin dashboard, and intelligent shopping features.

## ✨ Features

### 🎨 Design & UI
- **Elegant, futuristic design** with unique color palette (deep mint, cyber-violet, charcoal gold)
- **Professional logo** reflecting innovation and trust
- **Clean layout** with intelligent spacing, soft shadows, and modern typography (Poppins/Inter)
- **Glass morphism effects** and cyber-style animations
- **Fully responsive** design for all devices

### 🔐 Authentication System
- **Visitor login/signup** interface (top-right corner)
- **Admin login** button (top-center) - Credentials: `yasser/yasser`
- **Secure JWT-based authentication**
- **Form validation** and error handling

### 🛒 E-Commerce Features
- **Product catalog** with filters and smart search
- **Dynamic product pages** with image gallery, descriptions, pricing
- **Shopping cart** and checkout system
- **Order management** and tracking
- **Coupon system** with discount codes

### 🛠️ Admin Dashboard
- **Real-time analytics** dashboard with metrics
- **Product management** (add, edit, delete products)
- **Category management** (create branches/categories)
- **Order management** with status tracking
- **Customer management**
- **Discount & coupon management**
- **Site analytics** and reporting

### 🧠 Technical Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: MongoDB with connection pooling
- **Authentication**: JWT tokens, bcrypt password hashing
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with custom design system

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```bash
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/smart-commerce
   
   # Authentication
   JWT_SECRET=your-super-secret-jwt-key-change-in-production
   
   # Next.js Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-nextauth-secret-key
   
   # Admin Credentials
   ADMIN_USERNAME=yasser
   ADMIN_PASSWORD=yasser
   
   # Development
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system or update the connection string to point to your MongoDB instance.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### For Visitors/Customers

1. **Browse Products**: Explore the homepage featuring product catalog with modern design
2. **User Registration**: Click "Login" in the top-right corner to sign up for a new account
3. **Shopping**: Add products to cart and proceed with checkout
4. **Account Management**: Manage your profile and view order history

### For Administrators

1. **Admin Access**: Click "Admin" button in the top-center of the homepage
2. **Login**: Use credentials `yasser/yasser` to access the admin dashboard
3. **Dashboard**: View real-time analytics, revenue, orders, and customer data
4. **Product Management**: Add, edit, or remove products from the catalog
5. **Category Management**: Create and organize product categories
6. **Order Management**: Process and track customer orders
7. **Analytics**: Monitor site performance and sales metrics

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Customer login
- `POST /api/auth/signup` - Customer registration
- `POST /api/auth/admin-login` - Admin authentication
- `GET /api/auth/profile` - Get user profile

### Products
- `GET /api/products/featured` - Get featured products
- `GET /api/products` - Get all products (with pagination/filters)
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Analytics
- `GET /api/analytics/stats` - Get dashboard statistics

## 🎨 Color Palette

The platform uses a unique, futuristic color scheme:

- **Deep Mint**: `#14b8a6` - Primary accent, trust and growth
- **Cyber Violet**: `#a855f7` - Innovation and technology
- **Charcoal Gold**: `#f59e0b` - Premium and value
- **Charcoal**: `#0f172a` to `#f8fafc` - Sophisticated grays

## 🛡️ Security Features

- **Password hashing** with bcrypt (12 salt rounds)
- **JWT token authentication** with expiration
- **Input validation** and sanitization
- **CORS protection** and security headers
- **Admin role-based access control**

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🔮 Future Enhancements

Planned features for future versions:
- **Product reviews** and ratings system
- **Digital product delivery**
- **Inventory tracking** and alerts
- **Multi-language support**
- **Payment gateway integration** (Stripe, PayPal)
- **Email notifications**
- **Advanced analytics** with charts
- **Mobile app** (React Native)

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Ensure MongoDB is running
- Check the connection string in `.env.local`
- Verify network connectivity

**Authentication Issues**
- Clear browser localStorage
- Check JWT_SECRET in environment variables
- Verify admin credentials

**Build Errors**
- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check for TypeScript errors

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Contact the development team

---

**SmartCommerce** - Built with ❤️ for the future of e-commerce
