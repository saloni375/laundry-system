const express = require("express");
const app = express();

// DB connect
require("./db");

// middleware
app.use(express.json());

// model import
const LaundryOrder = require('./models/LaundryOrder');


// 👇 YAHI PE TERA API CODE AAYEGA
app.post('/orders', async (req, res) => {
  try {
    const { customerName, phone, garments } = req.body;

    if (!customerName || !phone || !garments || !Array.isArray(garments)) {
      return res.status(400).json({ error: "Invalid input data" });
    }

    const priceList = {
      shirt: 10,
      pant: 15,
      saree: 20
    };

    let totalAmount = 0;

    garments.forEach(item => {
      const type = item.type?.toLowerCase();
      const price = priceList[type] || 0;
      totalAmount += price * item.quantity;
    });

    const order = new LaundryOrder({
      customerName,
      phone,
      garments,
      totalAmount
    });

    const savedOrder = await order.save();

    res.status(201).json(savedOrder);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put('/orders/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["RECEIVED", "PROCESSING", "READY", "DELIVERED"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedOrder = await LaundryOrder.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(updatedOrder);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


app.get('/orders', async (req, res) => {
  try {
    const { status, customerName, phone } = req.query;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    if (customerName) {
      filter.customerName = customerName;
    }

    if (phone) {
      filter.phone = phone;
    }

    const orders = await LaundryOrder.find(filter);

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});



app.get('/dashboard', async (req, res) => {
  try {
    const totalOrders = await LaundryOrder.countDocuments();

    const orders = await LaundryOrder.find();

    let totalRevenue = 0;
    let statusCount = {
      RECEIVED: 0,
      PROCESSING: 0,
      READY: 0,
      DELIVERED: 0
    };

    orders.forEach(order => {
      totalRevenue += order.totalAmount;

      if (statusCount[order.status] !== undefined) {
        statusCount[order.status]++;
      }
    });

    res.json({
      totalOrders,
      totalRevenue,
      ordersByStatus: statusCount
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});


// server start
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});