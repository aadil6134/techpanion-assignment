const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  invoiceAmountDetails: {
    currency: {
      type: String,
      required: true,
      default: "INR",
    },
    invBasicAmt: {
      type: Number,
      required: true,
    },
    invTaxAmt: {
      type: Number,
      required: true,
    },
    totalInvAmt: {
      type: Number,
      required: true,
    },
    advancePaid: {
      type: Number,
      required: true,
      default: 0,
    },
    tcsApplicable: {
      type: Boolean,
      required: true,
    },
    netPayableAmt: {
      type: Number,
      required: true,
    },
  },
  alternatePayeeDetails: {
    alternatePayee1: {
      type: String,
      default: "",
    },
    alternatePayee2: {
      type: String,
      default: "",
    },
    city: {
      type: String,
      default: "",
    },
    street: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      default: "",
    },
    bankKeyIFSCCode: {
      type: String,
      default: "",
    },
    bankAccNo: {
      type: String,
      default: "",
    },
    reference: {
      type: String,
      default: "",
    },
  },
  lineItemDetails: {
    selectDebit: {
      type: String, // Assuming this can be "Debit" or other values
      required: true,
    },
    glDesc: {
      type: String,
      required: true,
    },
    glCode: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: "",
    },
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);
module.exports = TransactionModel;
