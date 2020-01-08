const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const request = require('request');
const mongoose = require('mongoose');

// let serverRoute = "http://13.232.174.231";
// INIT
const app = express();
app.options('*', cors());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);


// app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.suppressDeprecationWarnings = true;

dbConfig = {
    url: 'mongodb://localhost/NotesApp'
}
// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const users = require('./controllers/user.controller.js');
const notes = require('./controllers/note.controller.js');


require('./routes/user.route.js')(app);
require('./routes/note.route.js')(app);



// Examples
app.get('/testGet', async (req, res) => {
    console.log("Tested Get");
    res.json({status: "working"});
  
});

app.post('/testPost', async (req, res) => {
    console.log('request body');
    console.log(req.headers);
    res.json(req.body);
});



app.listen(5000,()=>console.log('Server @ port 5000'));
