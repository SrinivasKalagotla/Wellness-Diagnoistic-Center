const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./authRoutes');
const billRoutes = require('./routes/bill.route');
const http = require('http');
const path = require('path');


// Connect to MongoDB
mongoose.connect('mongodb+srv://skalagotla98:Nani%40284577@srinivas.2mvz68u.mongodb.net/srinivas', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create an Express app
const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

app.use('/api/auth', authRoutes);

app.use('/api/bills', billRoutes);

//Heroku Angular FrontEnd
app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Listen for the connection open event
mongoose.connection.on('open', () => {
  console.log('MongoDB connection successful');
});

// Listen for any connection error events
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.get('/', (req, res) => {
  res.send('Welcome to the server!');
});


// Create an HTTP server
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


