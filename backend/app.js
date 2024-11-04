const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = require("./routes/router");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const cors = require("cors");

// Allow requests from frontend dev (http://localhost:5173)
app.use(cors({ origin: "http://localhost:5173" }));

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
