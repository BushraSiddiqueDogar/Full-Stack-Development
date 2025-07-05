const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware to parse form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (images, sounds, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Set views directory and serve HTML files
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'views')));

// ========== Static HTML Routes ==========

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'home.html'));
});

app.get('/diceGame', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'diceGame.html'));
});

app.get('/drumKitGame', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'drumKitGame.html'));
});

app.get('/flexMediaQuery', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'flexMediaQuery.html'));
});

app.get('/fullStack', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'fullStack.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'profile.html'));
});

app.get('/object', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'object.html'));
});

app.get('/universityGrouping', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'universityGrouping.html'));
});

// ========== File I/O Setup ==========

const dataDir = path.join(__dirname, 'data');
const filePath = path.join(dataDir, 'example.txt');

// Create data directory if it doesn't exist
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Serve HTML form
app.get('/forms', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'forms.html'));
});

// Handle form submission (append content)
app.post('/write', (req, res) => {
  const userInput = req.body.content + '\n';
  fs.appendFile(filePath, userInput, (err) => {
    if (err) return res.status(500).send(' Failed to write to file.');
    res.send('Content appended successfully.');
  });
});

// Create or overwrite file
app.get('/create', (req, res) => {
  fs.writeFile(filePath, 'Initial file content.\n', (err) => {
    if (err) return res.status(500).send(' Error writing file.');
    res.send('File created and content written.');
   
  });
});

// Read file content
app.get('/read', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).send(' Error reading file.');
     res.send(`<h2>📄 File Content:</h2><pre>${data}</pre>`);
  });
});



// ======================================

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
