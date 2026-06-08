const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('API "ecommerce" is running');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const connectDB = require('./config/db');
connectDB();

const authRoutes = require('./routes/Auth');
app.use('/api/auth', authRoutes);
