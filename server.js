var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

const research = require('./api/routes/research');
app.use('/api/research', research);

const stop = require('./api/routes/stop');
app.use('/api/stop', stop);

const quest = require('./api/routes/quest');
app.use('/api/quest', quest);

app.listen(port);

console.log('Stop Map RESTful API server started on: ' + port);