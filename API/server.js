const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// Airtable configuration
const AIRTABLE_BASE_ID = 'appKaGGPul9GMAhk6';
const AIRTABLE_API_KEY = 'pat2Z7WeymxD1iAga.72971a130904a82df87a588763bdf032256d0a906b5d38aa9f1baa665b1e6710';

// Table IDs
const OCCUPANCIES_TABLE_ID = 'tbl5AFqFkm1ZUSJj4';
const DINING_HALL_TABLE_ID = 'tblIUXaLwSjHGg0k6';
const LOCATION_GROUPS_TABLE_ID = 'tblIJofbSW6m48L5g';

// API endpoint to retrieve data from Occupancies table
app.get('/occupancies', async (req, res) => {
  try {
    const response = await axios.get(`https://api.airtable.com/v0/appKaGGPul9GMAhk6/tbl5AFqFkm1ZUSJj4`, {
      headers: {
        Authorization: `Bearer pat2Z7WeymxD1iAga.72971a130904a82df87a588763bdf032256d0a906b5d38aa9f1baa665b1e6710`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Occupancies table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to retrieve data from Dining Hall table
app.get('/dining-halls', async (req, res) => {
  try {
    const response = await axios.get(`https://api.airtable.com/v0/appKaGGPul9GMAhk6/tblIUXaLwSjHGg0k6`, {
      headers: {
        Authorization: `Bearer pat2Z7WeymxD1iAga.72971a130904a82df87a588763bdf032256d0a906b5d38aa9f1baa665b1e6710`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Dining Hall table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to retrieve data from Location Groups table
app.get('/location-groups', async (req, res) => {
  try {
    const response = await axios.get(`https://api.airtable.com/v0/appKaGGPul9GMAhk6/tblIJofbSW6m48L5g`, {
      headers: {
        Authorization: `Bearer pat2Z7WeymxD1iAga.72971a130904a82df87a588763bdf032256d0a906b5d38aa9f1baa665b1e6710`,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from Location Groups table:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});