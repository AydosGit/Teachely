const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const Resource = mongoose.model('Resource', new mongoose.Schema({
  title: String,
  url: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
}));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/resources', async (req, res) => {
  const resources = await Resource.find().sort({ createdAt: -1 });
  res.json(resources);
});

app.post('/resources', async (req, res) => {
  const { title, url, description } = req.body;
  if (!title || !url || !description) return res.status(400).json({ error: 'Missing fields' });

  const resource = new Resource({ title, url, description });
  await resource.save();
  res.json(resource);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));