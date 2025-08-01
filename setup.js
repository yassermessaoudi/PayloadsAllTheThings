#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('🚀 Smart Commerce Platform Setup');
console.log('================================\n');

// Check if .env.local already exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists. Skipping environment setup.');
} else {
  console.log('📝 Creating environment configuration...');
  
  // Generate a secure JWT secret
  const jwtSecret = crypto.randomBytes(64).toString('hex');
  
  const envContent = `# Database Configuration
MONGODB_URI=mongodb://localhost:27017/smart-commerce

# JWT Configuration
JWT_SECRET=${jwtSecret}

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret

# Optional: Development Configuration
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ Environment file created successfully!');
  console.log('🔑 JWT secret generated automatically');
  console.log('📋 Please update Cloudinary credentials in .env.local\n');
}

console.log('📋 Setup Instructions:');
console.log('======================');
console.log('');
console.log('1. 📊 Database Setup:');
console.log('   - Install MongoDB locally or use MongoDB Atlas');
console.log('   - Update MONGODB_URI in .env.local if needed');
console.log('');
console.log('2. ☁️  Cloudinary Setup (Optional):');
console.log('   - Sign up at https://cloudinary.com');
console.log('   - Get your cloud name, API key, and secret');
console.log('   - Update the Cloudinary variables in .env.local');
console.log('');
console.log('3. 🚀 Start Development:');
console.log('   npm run dev');
console.log('');
console.log('4. 🔐 Admin Access:');
console.log('   - Username: yasser');
console.log('   - Password: yasser');
console.log('   - Access: http://localhost:3000/admin/login');
console.log('');
console.log('5. 🌐 Frontend Access:');
console.log('   - Main site: http://localhost:3000');
console.log('   - Admin dashboard: http://localhost:3000/admin/dashboard');
console.log('');
console.log('🎉 Setup complete! Happy coding!');
console.log('');
console.log('"Shop Intelligently. Expand Infinitely."');