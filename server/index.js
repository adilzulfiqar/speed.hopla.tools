const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// app.get('/', (req, res) => res.send('Hello World!'));

var speedTest = require('speedtest-net');
var test = speedTest({ maxTime: 5000 });

test.on('downloadspeedprogress', speed => {
  console.log(
    'Download speed (in progress):',
    (speed * 125).toFixed(2),
    'KB/s'
  );
});

speedTest.visual({ maxTime: 5000 }, (err, data) => {
  console.dir(data);
});

test.on('error', err => {
  console.error(err);
});

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build/index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
