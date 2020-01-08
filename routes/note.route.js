let middleware = require('../util/middleware.js');

module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new note
    app.post('/notes', middleware.checkToken, notes.create);

    // get all notes
    app.get('/notes', middleware.checkToken, notes.findAll);


    // app.get('/notes/:noteId', middleware.checkToken, notes.findOne);


    // app.put('/notes/:noteId', middleware.checkToken, notes.update);

    
    // app.delete('/notes/:noteId', middleware.checkToken, notes.delete)

}