const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT;
const router = require("./routes/router");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

// Allow requests from frontend dev (http://localhost:5173)
app.use(cors({ origin: "http://localhost:5173" }));

// Serve static files from 'uploads'
app.use(
  "/api/uploads/images",
  express.static(path.join(__dirname, "uploads/images"))
);

app.use(express.json());

// ROUTES
app.use("/api/", router);

// Gracefully close Prisma Client on termination signals
const gracefulShutdown = async () => {
  await prisma.$disconnect();
  console.log("Prisma client disconnected");
  process.exit(0);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

//SERVER
app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}`));
