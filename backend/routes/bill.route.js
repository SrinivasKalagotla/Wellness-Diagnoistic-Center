const router = require('express').Router();
const Bill = require('../models/Bill');
const Counter = require('../models/Counter');


router.route('/').get((req, res) => {
    Bill.find()
        .then(bills => res.json(bills))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post(async (req, res) => {
  const patientName = req.body.patientName;
  const tests = req.body.tests;
  const amountPaid = req.body.amountPaid;
  const date = req.body.date;

  const amount = tests.reduce((total, test) => total + test.price, 0);
  const balance = amount - amountPaid;

  try {
    // Get the counter document for bill number or create one if it doesn't exist
    let counter = await Counter.findById('billNumber').exec();
    if (!counter) {
      counter = new Counter({ _id: 'billNumber', seq: 1 });
      await counter.save();
    }

    const billNumber = counter.seq;

    const newBill = new Bill({ billNumber, patientName, tests, amountPaid, balance, date });

    await newBill.save();

    // Increment the counter for the next bill
    counter.seq += 1;
    await counter.save();

    res.json({ message: 'Bill added!', balance: balance, billNumber: billNumber });
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

  
  

  router.route('/name/:patientName').get((req, res) => {
    const patientName = req.params.patientName;
    const regex = new RegExp(patientName, 'i');
    Bill.find({ patientName: { $regex: regex } }) 
      .then(bills => res.json(bills))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').delete((req, res) => {
    Bill.findByIdAndDelete(req.params.id)
      .then(() => res.json('Bill deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  

  
module.exports = router;
