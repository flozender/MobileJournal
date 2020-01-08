const User = require('../models/user.model.js');

const jwt = require('jsonwebtoken');
let config = {
    secret: "1234abc"
}

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.username || !req.body.password) {
        return res.status(400).send({
            success: false,
            message: "details can not be empty!"
        });
    }

    // Create a user
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    // Save user in the database
    user.save()
    .then(data => {
        data.success = true;
        res.send(data);
    }).catch(err => {
        err.success = false;
        err.message1 = err.message;
        err.message = "";
        if (err.message1.includes('username')){
            err.message = err.message + 'Username is already taken. \n';
        }
        res.status(500).send(err);
    });

};

// Find username and check pass
exports.checkPass = (req, res) => {
    User.find({username: req.body.username})
    .then(user => {
        if(user.length === 0) {
            return res.status(404).send({
                success: false,
                message: "User not found with id " + req.body.username
            });            
        }
        if(user[0].password === req.body.password){
                // Login successful
            let token = jwt.sign(
                {
                    username: user[0].username
                },
                config.secret,
                {expiresIn: '24h'}
            );
            res.cookie('token', token);

            // return the JWT token for the future API calls
            if(user[0].admin){
                res.send({
                    success: true,
                    admin: true,
                    token: token,
                    username: user[0].username.toUpperCase(),
                    message: "Auth successful"
                });
            } else{
                res.send({
                    success: true,
                    token: token,
                    username: user[0].username.toUpperCase(), 
                    message: "Auth successful"
                });
            }
  
        } else {
            res.send({
                success: false, 
                message: "Incorrect password entered."
            })
        }
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "[caught] User not found with id " + req.body.username
            });                
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving user with id " + req.body.username
        });
    });
};

