var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

const research = require('./api/routes/research');
app.use('/api/research', research);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);