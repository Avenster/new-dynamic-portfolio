const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = "mongodb+srv://avenster:IGF9EONYxYXR5FIl@login-details.plgmf.mongodb.net/?retryWrites=true&w=majority&appName=login-details";
const client = new MongoClient(uri);
let collection;

const JWT_SECRET = 'aadeb42f91a814953fecccfae030312591ee01e7fc4873e01738b2c761bff2855f006016aac196d999f703b1523546a50e2756385ce9be30f5e0cc449ab25653'; // Replace with a secure secret key

async function connectToMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const database = client.db("login-deatils");
    collection = database.collection("users");
  } catch (e) {
    console.error("MongoDB connection error:", e);
    process.exit(1);
  }
}

connectToMongo();

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Server is running" });
});

// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await collection.findOne({ email: email });
    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.status(200).json({ 
        status: "success", 
        message: "Login successful", 
        name: user.name,
        token: token
      });
      console.log("User Logged In Successfully");
    } else {
      res.status(401).json({ status: "error", message: "Invalid credentials" });
    }
  } catch (e) {
    res.status(500).json({ status: "error", message: "Server error" });
  }
});

// Signup route
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    console.log("Received signup request:", { name, email });
    
    if (!name || !email || !password) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }

    const existingUser = await collection.findOne({ email: email });
    if (existingUser) {
      return res.status(409).json({ status: "error", message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await collection.insertOne({ name, email, password: hashedPassword });
    console.log("New user created:", newUser.insertedId);

    const token = jwt.sign(
      { userId: newUser.insertedId, email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      status: "success", 
      message: "User created successfully",
      token: token
    });
  } catch (e) {
    console.error("Server error during signup:", e);
    res.status(500).json({ status: "error", message: "Server error", details: e.message });
  }
});

// Protected route example
app.get("/protected", verifyToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Middleware to verify JWT
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: "No token provided" });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Failed to authenticate token" });
    req.user = decoded;
    next();
  });
}

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});