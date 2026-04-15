const mongoose = require('mongoose');

// garment sub-schema
const garmentSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  }
});

// main schema
const laundryOrderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  garments: [garmentSchema],

  totalAmount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
    default: "RECEIVED"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('LaundryOrder', laundryOrderSchema);