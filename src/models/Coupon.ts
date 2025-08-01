import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
    min: 0,
  },
  minPurchase: {
    type: Number,
    min: 0,
  },
  maxUsage: {
    type: Number,
    required: true,
    min: 1,
  },
  currentUsage: {
    type: Number,
    default: 0,
    min: 0,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Check if coupon is valid
couponSchema.methods.isValid = function() {
  const now = new Date();
  return (
    this.isActive &&
    this.currentUsage < this.maxUsage &&
    this.expiresAt > now
  );
};

// Use coupon
couponSchema.methods.use = function() {
  if (this.isValid()) {
    this.currentUsage += 1;
    return true;
  }
  return false;
};

export default mongoose.models.Coupon || mongoose.model('Coupon', couponSchema);