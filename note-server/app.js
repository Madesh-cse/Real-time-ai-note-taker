const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const authRouter = require("./Route/auth");

const app = express();



app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(bodyParser.json())

app.use("/auth",authRouter);


mongoose.connect('mongodb+srv://madesh10cse:CHzmqXggOgxgC4fI@ai-note-taker.opbb4yz.mongodb.net/note-taker?retryWrites=true&w=majority&appName=ai-note-taker')
.then(() => {
  console.log("✅ MongoDB connected");
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err.message);
})
.finally(() => {
  app.listen(8080, () => {
    console.log("🚀 Server is running on http://localhost:8080");
  });
});