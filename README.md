# 🚀 Smart Commerce Platform

> **"Shop Intelligently. Expand Infinitely."**

A sophisticated, futuristic e-commerce platform built with Next.js, TypeScript, and MongoDB. Features an elegant UI with a unique color palette, comprehensive admin dashboard, and intelligent shopping experience.

![Smart Commerce Platform](https://img.shields.io/badge/Next.js-14.0.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0.0-blue?style=for-the-badge&logo=typescript)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-green?style=for-the-badge&logo=mongodb)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.5-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

### 🎨 Design & UI
- **Futuristic Design**: Elegant UI with unique color palette (deep mint, cyber-violet, charcoal gold)
- **Professional Logo**: Reflecting innovation and trust
- **Modern Typography**: Poppins and Inter fonts with intelligent spacing
- **Responsive Design**: Mobile-first approach with smooth animations
- **Glass Effects**: Backdrop blur and modern visual effects

### 🛒 E-Commerce Features
- **Product Catalog**: Dynamic product listing with filters and search
- **Product Pages**: Image galleries, descriptions, pricing, and discount display
- **Shopping Cart**: Add to cart, checkout, and order summary
- **User Authentication**: Secure login/signup with JWT tokens
- **Category Management**: Organized product browsing

### 🛠️ Admin Dashboard
- **Analytics Dashboard**: Real-time metrics and charts
- **Product Management**: Add, edit, delete products with image upload
- **Category Management**: Create and manage product categories
- **Coupon System**: Create promotional discounts and coupon codes
- **Order Management**: Track and manage customer orders

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access**: User and admin role management
- **Password Hashing**: bcrypt encryption for user passwords
- **Admin Credentials**: Username: `yasser`, Password: `yasser`

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-commerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/smart-commerce
   JWT_SECRET=your-super-secret-jwt-key-here
   CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
   CLOUDINARY_API_KEY=your-cloudinary-api-key
   CLOUDINARY_API_SECRET=your-cloudinary-api-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
smart-commerce-platform/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/            # React components
│   │   ├── admin/            # Admin dashboard components
│   │   ├── Header.tsx        # Main header component
│   │   ├── LoginForm.tsx     # Authentication forms
│   │   └── ProductCard.tsx   # Product display components
│   ├── lib/                  # Utility libraries
│   │   ├── auth.ts           # Authentication utilities
│   │   └── db.ts             # Database connection
│   ├── models/               # MongoDB models
│   │   ├── User.ts           # User model
│   │   ├── Product.ts        # Product model
│   │   ├── Category.ts       # Category model
│   │   ├── Coupon.ts         # Coupon model
│   │   └── Order.ts          # Order model
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```

## 🎯 Key Features Explained

### Color Palette
- **Deep Mint**: `#1a4d3a` - Primary brand color
- **Cyber Violet**: `#6b21a8` - Secondary accent
- **Charcoal Gold**: `#b8860b` - Tertiary accent
- **Mint Accent**: `#4ade80` - Success states
- **Violet Accent**: `#a855f7` - Interactive elements
- **Gold Accent**: `#fbbf24` - Highlights and CTAs

### Authentication Flow
1. **User Registration**: Email, username, password with validation
2. **User Login**: JWT token generation and storage
3. **Admin Access**: Dedicated admin login with hardcoded credentials
4. **Protected Routes**: Role-based access control

### Admin Dashboard Sections
1. **Analytics**: Sales charts, visitor metrics, conversion rates
2. **Products**: CRUD operations with image upload
3. **Categories**: Organize products into categories and branches
4. **Coupons**: Create promotional discounts with usage limits

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/admin/login` - Admin login

### Products
- `GET /api/products/featured` - Featured products
- `GET /api/admin/products` - All products (admin)
- `POST /api/admin/products` - Create product (admin)

### Categories
- `GET /api/categories` - All categories
- `GET /api/admin/categories` - Categories (admin)

### Analytics
- `GET /api/admin/analytics` - Dashboard analytics

## 🎨 Customization

### Styling
The platform uses Tailwind CSS with custom color variables. Modify `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  'deep-mint': '#1a4d3a',
  'cyber-violet': '#6b21a8',
  'charcoal-gold': '#b8860b',
  // ... add more custom colors
}
```

### Components
All components are built with TypeScript and follow a modular structure. Each component can be customized independently.

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The platform can be deployed to any Node.js hosting service:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔮 Future Enhancements

- [ ] Product reviews and ratings
- [ ] Digital product delivery
- [ ] Advanced inventory tracking
- [ ] Multi-language support
- [ ] Payment gateway integration
- [ ] Email marketing integration
- [ ] Advanced analytics
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Next.js, TypeScript, and MongoDB**

*"Shop Intelligently. Expand Infinitely."*
