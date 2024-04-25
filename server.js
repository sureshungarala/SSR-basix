const express = require('express');
const ejs = require('ejs');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.json());

const items = [];

app.get('/js', (req, res) => {
  // res.header('Content-Type', 'text/javascript');
  // const script = fs.readFileSync(`${__dirname}/script.js`, 'utf-8');
  res.sendFile(`${__dirname}/script.js`);
  // res.send('alert("Hello World");');
});

app.get('/', (req, res) => {
  res.header(
    'Content-Security-Policy',
    `script-src http://localhost:${port} self`
  );
  res.render('app', { nAme: 'Suresh Ungarala', items: JSON.stringify(items) });
});

app.get('/items', (req, res) => {
  res.json({ items: JSON.stringify(items) });
});

app.post('/add-item', (req, res) => {
  const body = req.body;
  const item = body.item;
  console.log('Item:', item);
  items.push(item);
  res.status(201).json({ item });
});

app.get('/search', (req, res) => {
  const query = req.query.q;
  console.log('Query:', query);
  const result = items.filter(
    (item) => item.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
  );
  res.json({ items: JSON.stringify(result) });
});

const me = { name: 'Suresh', age: 30 };
app.get('/about', (_req, res) => {
  res.render('about', {
    hint: 'simple hint messg',
    objj: JSON.stringify(me),
  });
});

app.get('/about/me', (req, res) => {
  res.json(me);
});

app.listen(port, () => {
  console.log('Express server is running on port 3000');
});
