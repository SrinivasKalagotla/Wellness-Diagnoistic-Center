const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const counterSchema = new Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 1 }
});

const Counter = mongoose.model('Counter', counterSchema);

module.exports = Counter;
