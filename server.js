var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const research = require('./api/routes/research');
app.use('/api/research', research);

const stop = require('./api/routes/stop');
app.use('/api/stop', stop);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);