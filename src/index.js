const express = require("express");
const { handleWebhook } = require("./webhookHandler");
require("dotenv").config();

const app = express();
app.use(express.json());

app.post("/webhook", handleWebhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
