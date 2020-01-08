let middleware = require('../util/middleware.js');

module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/signup', users.create);

    // Login Route
    app.post('/login', users.checkPass);

}