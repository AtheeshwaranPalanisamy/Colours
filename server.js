const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/dress-color-suggestion', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Failed to connect to MongoDB:', error));

// Define a DressColor schema
const dressColorSchema = new mongoose.Schema({
  date: { type: Date, required: true, unique: true },
  color: { type: String, required: true },
});

const DressColor = mongoose.model('DressColor', dressColorSchema);

// API route to get dress color suggestion for a specific date
app.get('/api/dress-color/:date', async (req, res) => {
  const { date } = req.params;
  try {
    const dressColor = await DressColor.findOne({ date });
    res.json(dressColor);
  } catch (error) {
    console.error('Failed to get dress color:', error);
    res.status(500).json({ error: 'Failed to get dress color' });
  }
});

// API route to save dress color suggestion for a specific date
app.post('/api/dress-color', async (req, res) => {
  const { date, color } = req.body;
  try {
    const dressColor = new DressColor({ date, color });
    await dressColor.save();
    res.json(dressColor);
  } catch (error) {
    console.error('Failed to save dress color:', error);
    res.status(500).json({ error: 'Failed to save dress color' });
  }
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
