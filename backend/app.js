const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const router = require("./routes/router");

app.use("/api/", router);

app.listen(PORT, () => console.log(`Express app - listening on port ${PORT}`));
