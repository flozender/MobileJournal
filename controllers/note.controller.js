const Note = require('../models/note.model.js');

// Create and Save a new note
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        return res.status(400).send({
            success: false,
            message: "Note can not be empty"
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title,
        content: req.body.content,
        date: Date.now(),
        author: req.decoded.username,
        status: false
      });

    // SaveNote in the database
    note.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            success: false,
            message: err.message || "Some error occurred while creating the Note."
        });
    });
};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {
    Note.find({author: req.decoded.username})
    .then(notes => {
        res.send(notes);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Find a single note with a noteId
exports.findOne = (req, res) => {
    Note.find({noteId: req.params.noteId})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                success: false,
                message: "Note not found with id " + req.params.noteId
            });            
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            success: false,
            message: "Error retrieving note with id " + req.params.noteId
        });
    });
};

// Update a note identified by the noteId in the request
exports.update = (req, res) => {
    if(!req.body.noteId) {
        return res.status(400).send({
            success: false,
            message: "content can not be empty"
        });
    }
    // Findnote and update it with the request body
   Note.findOneAndUpdate({noteId: req.body.noteId}, {$set:{
        noteId: req.body.noteId,
        noteName: req.body.noteName,
        noteDate: req.body.noteDate,
        noteDuration: req.body.noteDuration,
        noteStartTime: req.body.noteStartTime,
        noteEndTime: req.body.noteEndTime
        }}, {new: true}, (err, doc) => {
          if(err){
              console.log("Error Occured");
          }
      })
    .then(note => {
        if(!note) {
            return res.status(404).send({
                success: false,
                message: "Note not found with id " + req.body.noteId
            });
        }
        res.send(note);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                success: false,
                message: "Note not found with id " + req.body.noteId
            });                
        }
        return res.status(500).send({
            success: false,
            message: "Error updating Note with id " + req.body.noteId
        });
    });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
    Note.findOneAndRemove({noteId: req.params.noteId})
    .then(note => {
        if(!note) {
            return res.status(404).send({
                success: false,
                message: "note not found with id " + req.params.noteId
            });
        }
        res.send({message: "note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                success: false,
                message: "note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            success: false,
            message: "Could not deletenote with id " + req.params.noteId
        });
    });
};