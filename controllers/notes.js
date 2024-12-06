const loki = require("lokijs")

var db = new loki('notes.db');
var notes = db.addCollection('notes');
var id = 1;
exports.addNotes=async(req,res,next)=>{
    if (!req.body.name || !req.body.data) {
        return res.status(400).send("Invalid input");
    }
    notes.insert({noteId:id, name : req.body.name ,note:req.body.data});
    id++;
    db.saveDatabase();
    res.send("added succesfully")

}

exports.getNotes=async(req,res,next)=>{
    res.send(notes.find());
}

exports.getNoteById=async(req,res,next)=>{
    res.send(notes.findOne({ noteId: parseInt(req.params.noteId) }));
}

// exports.updateNoteById = async (req, res, next) => {
//     try {
//         const result = await notes.update(
//             { noteId: parseInt(req.params.noteId) }, // query to find the document
//             { $set: { name: req.body.name, note: req.body.data } } // update operation
//         );

//         if (result.modifiedCount === 0) {
//             return res.status(404).send("Note not found or no changes made.");
//         }

//         res.send("success");
//     } catch (err) {
//         next(err); // Pass error to the next middleware
//     }
// }
exports.updateNoteById = async (req, res, next) => {
    try {
        const note = notes.findOne({ noteId: parseInt(req.params.noteId) });// Find the document in the LokiJS collection
        if (!note) {
            return res.status(404).send("Note not found");
        }
        
        // Update the fields of the retrieved document
        note.name = req.body.name;
        note.note = req.body.data;
        // Save the updated document back to the collection
        notes.update(note);

        res.send("success");
    } catch (err) {
        console.log(err);
         // Pass the error to the error-handling middleware
    }
};

exports.deleteById=async (req,res,next) => {
    try{
        const note=notes.findOne({noteId:parseInt(req.params.noteId) });
        if(!note){
            return res.status(404).send("Note not found");
        }
        notes.remove(note);

        res.send("note deleted successfully");
    }
    catch(err){
        console.log(err);
    }
    
}