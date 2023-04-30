const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const billSchema = new Schema({
    billNumber: { type: Number, required: true },
    patientName: { type: String, required: true },
    tests: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    amountPaid: { type: Number, required: true },
    balance: { type: Number, required: true },
    date: { type: Date, required: true },
  });
  

const Bill = mongoose.model('bills', billSchema);
module.exports = Bill;
