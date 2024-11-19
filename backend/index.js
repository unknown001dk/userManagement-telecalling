const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const xlsx = require("xlsx");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Schema
const userSchema = new mongoose.Schema({
  name: String,
  phone: String,
  status: String,
  notes: String,
});

const User = mongoose.model("User", userSchema);

// Routes

// Get all users
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add a user
app.post("/api/users", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to add user" });
  }
});

// Edit a user
app.put('/api/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated user
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});


// Delete a user
app.delete('/api/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


// Export users to Excel
app.get("/api/export", async (req, res) => {
  const users = await User.find();

  const data = users.map((user) => ({
    Name: user.name,
    Phone: user.phone,
    Status: user.status,
    Notes: user.notes,
  }));

  const workbook = xlsx.utils.book_new();
  const worksheet = xlsx.utils.json_to_sheet(data);

  const heading = ["Name", "Phone", "Status", "Notes"];
  const range = xlsx.utils.decode_range(worksheet["!ref"]);
  for (let col = 0; col < heading.length; col++) {
    worksheet[xlsx.utils.encode_cell({ r: 0, c: col })].s = {
      font: { sz: 28 },
      fill: { fgColor: { rgb: "FFFF00" } },
    };
  }

  xlsx.utils.book_append_sheet(workbook, worksheet, "Users");
  const filePath = "./users.xlsx";
  xlsx.writeFile(workbook, filePath);

  res.download(filePath, "users.xlsx", () => {
    fs.unlinkSync(filePath); // Remove file after download
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
