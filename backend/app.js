const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;

app.get("/api", (req, res) => {
  res.json({
    message: " Welcome to the API",
  });
});

app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}`));
