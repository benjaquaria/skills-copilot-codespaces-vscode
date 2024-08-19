// Create web server
// Import libraries
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var port = 3000;

// Set up the web server
app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading comments.json');
      return;
    }
    res.send(data);
  });
});

app.post('/comments', function(req, res) {
  fs.readFile('comments.json', 'utf8', function(err, data) {
    if (err) {
      console.log(err);
      res.status(500).send('Error reading comments.json');
      return;
    }
    var comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile('comments.json', JSON.stringify(comments), function(err) {
      if (err) {
        console.log(err);
        res.status(500).send('Error writing comments.json');
        return;
      }
      res.send('Comment added');
    });
  });
});

app.listen(port, function() {
  console.log('Listening on port ' + port);
});