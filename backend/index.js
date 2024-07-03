const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const connectDB = require("./config/connectDB.js");
const TransactionModel = require("./models/transactionModel.js");

const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*",
  })
);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Server is running successfully");
});

app.post("/api/submit-form", async (req, res) => {
  try {
    const transactionData = req.body;

    // Create a new transaction using the Transaction model
    const newTransaction = new TransactionModel(transactionData);

    // Save the transaction to the database
    await newTransaction.save();

    // Send a response back to the client
    res.status(201).json({
      message: "Transaction created successfully",
      transactionId: newTransaction._id,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/action-history", async (req, res) => {
  try {
    const transactions = await TransactionModel.find();
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/api/invoice-details", async (req, res) => {
  try {
    const transactionDetails = {
      currency: "INR",
      invBasicAmt: "15,000.00",
      invTaxAmt: "1,000.00",
      totalInvAmt: "16,000.00",
    };
    res.status(200).json(transactionDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/delete-transactions', async (req, res) => {
    try {
      const result = await TransactionModel.deleteMany({});
      res.status(200).json({
        message: 'All transactions deleted successfully',
        deletedCount: result.deletedCount
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
});

//send('New data added to the database successfully')
