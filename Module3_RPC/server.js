const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from 'public' directory
app.use(express.static('public'));

// In-memory list of notices
let notices = [];

// REST API Routes

// GET /api/notices - Retrieve all notices
app.get('/api/notices', (req, res) => {
    res.json(notices);
});

// POST /api/notices - Add a new notice
app.post('/api/notices', (req, res) => {
    const { title, message, date } = req.body;

    if (!title || !message || !date) {
        return res.status(400).json({ error: 'Missing required fields: title, message, date' });
    }

    const newNotice = {
        id: Date.now().toString(), // Simple unique ID
        title,
        message,
        date
    };

    notices.push(newNotice);
    res.status(201).json({ message: 'Notice added successfully', notice: newNotice });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
