// Create web server
// npm install express
// npm install body-parser
// npm install sqlite3
// npm install cors
// npm install nodemon
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();
const db = new sqlite3.Database('comments.db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS comments (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, content TEXT)');
});

app.get('/comments', (req, res) => {
  db.all('SELECT * FROM comments', (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(rows);
    }
  });
});

app.post('/comments', (req, res) => {
  const name = req.body.name;
  const content = req.body.content;
  db.run('INSERT INTO comments (name, content) VALUES (?, ?)', [name, content], (err) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send('Comment added');
    }
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});