const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const request = require('request');

// let serverRoute = "http://13.232.174.231";
let serverRoute = "http://cms.iare.ac.in";
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


app.post('/login', async (req, res) => {
    let options = {
        url : serverRoute + '/login',
        method: 'post',
        body: {
            rollno: req.body.rollno,
            wak: req.body.wak,
            student_ok:"Student Login"
        },
        json: true
    };
    request(options, function(err, response, body){     
        response.body = "";
        sess = response.headers["set-cookie"][0].slice(10, 36);
        console.log(sess); 
        res.cookie("PHPSESSID",sess); 
        res.send(response);

    });
});

app.get('/info', async (req, res) => {
    let options = {
        url : serverRoute + '/results/L_student_information.php',
        headers: {
            'PHPSESSID': req.cookies.PHPSESSID
        },
        method: 'get',
        body: {
            rollno: req.body.rollno,
            wak: req.body.wak,
            student_ok:"Student Login"
        },
        json: true
    };
    console.log(req.cookies.PHPSESSID);
    request(options, function(err, response, body){     
        // response.body = ""; 
        res.send(body);
    });
});

app.listen(5000,()=>console.log('Server @ port 5000'));
