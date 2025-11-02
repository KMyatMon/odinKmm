const express = require('express');
const app = express();
const PORT = 3000;

// Array to store messages (in-memory)
const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
];

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// Index route (GET)
app.get('/', (req, res) => {
  res.render('pages/index', { title: "Mini Messageboard", messages: messages });
});

// New message form route (GET)
app.get('/new', (req, res) => {
  res.render('pages/form', { title: "New Message" });
});

// New message form submission route (POST)
app.post('/new', (req, res) => {
  const messageText = req.body.messageText;
  const messageUser = req.body.messageUser;
  messages.push({ 
    text: messageText, 
    user: messageUser, 
    added: new Date() 
  });
  res.redirect('/');
});

// Message detail route (GET) - Optional, for the "open" button functionality
app.get('/message/:id', (req, res) => {
    const message = messages[req.params.id];
    if (message) {
        res.render('pages/detail', { 
            title: "Message Details", 
            message: message 
        });
    } else {
        res.status(404).send('Message not found');
    }
});


// Start the server
app.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
