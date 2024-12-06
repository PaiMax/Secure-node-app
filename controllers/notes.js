const loki = require("lokijs")
const path = require('path');
const { all } = require("../router/notesRoutes");


var db = new loki('notes.db');
var notes = db.addCollection('notes');
var id = 1;


exports.addNotes=async(req,res,next)=>{
    if (!req.body.name || !req.body.data) {
        return res.status(400).send("Invalid input");
    }
    // const { image } = req.files;   //EXTRACT THE IMAGE FROM THE REQUEST
    // targetFolder = path.join('./public');
    // targetPath = path.join(targetFolder, image.name);
    // image.mv(targetPath);
    if(!req.file){
        res.status(400).send("NO file uploaded");
    }

    
    
    notes.insert({noteId:id, name : req.body.name ,note:req.body.data,imageFilePath:req.file.path});
    id++;
    db.saveDatabase();
    res.send("added succesfully")

}

exports.getNotes=async(req,res,next)=>{
    const targetFolder='C:\Users\nishw\OneDrive\Desktop\Secure-node-app\public';
    const allNotes=notes.find();

    const notesWithImage=allNotes.map(note=>{
        if(note.imageName)note.imageUrl=path.join(targetFolder,note.imageName);
        return note;

    })

    res.json(notesWithImage);
}

exports.getNoteById=async(req,res,next)=>{
    res.send(notes.findOne({ noteId: parseInt(req.params.noteId) }));
}

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


