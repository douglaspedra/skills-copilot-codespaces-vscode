// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Load the comments
const comments = require('./comments.json');

// Setup the public directory
app.use(express.static('public'));

// Setup body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// GET /comments
app.get('/comments', function(request, response) {
  response.json(comments);
});

// POST /comments
app.post('/comments', function(request, response) {
  // Add a timestamp to the request body
  request.body.timestamp = Date.now();

  // Add the comment to the array
  comments.push(request.body);

  // Send a copy of the comment back to the client
  response.json(request.body);
});

// Start the server
app.listen(port, function() {
  console.log(`Example app listening on port ${port}!`);
});