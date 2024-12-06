const loki = require("lokijs")
const path = require('path');
const crypto=require('crypto-js'); 
const fs=require('fs');
const { all } = require("../router/notesRoutes");
var db = new loki('notes.db');
var notes = db.addCollection('notes');
const key="Niswhwal@123" //private key
var id = 1;   //global variable for the id of each note
const logger = require('../utility/logger');

function encrupt(data){  //increption function
    const encrypted = crypto.AES.encrypt(data, key).toString();
    logger.info(`ENCRYPTED data :${encrypted}`);
    return encrypted;
}

function decrypt(encrypted){     //decryption function
    try{
        const decrypted = crypto.AES.decrypt(encrypted, key).toString(crypto.enc.Utf8);
        logger.info(`decyrpted data :${decrypted}`);
        return decrypted;
    }
    catch(err){
        logger.error(`error occured ${err}`);
        return err;

        }
  }




exports.addNotes=async(req,res,next)=>{       //this will add the notes in to the in memory db
    logger.info(`${req.method}:${req.originalUrl}: Enter`);
    
    if (!req.body.name || !req.body.data) {
        return res.status(400).send("Invalid input");
    }
    if(!req.file){
        res.status(400).send("NO file uploaded");
    }
    logger.info(`file path ${req.file.path}`);
    logger.info(`request body ${JSON.stringify(req.body)}`);

    const encrypteData=encrupt(req.body.data);
    const encryptImagePath=encrupt(req.file.path);
    notes.insert({noteId:id, name : req.body.name ,note:encrypteData,imageFilePath:encryptImagePath});
    id++;
    db.saveDatabase();
    res.status(200).send("added succesfully")

}



exports.getNotes=async(req,res,next)=>{   //this will return all the notes in the memory
    logger.info(`${req.method}:${req.originalUrl}: Enter`);
    try{
        const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const startIndex = (page - 1) * limit;

    const totalNotes=notes.find().length;
    const allNotes=notes.chain()         
    .offset(startIndex) // skip the first 'startIndex' items
    .limit(limit)       // limit the number of items to limit
    .data();            // retrieve the resulting data
    
    const totalPages = Math.ceil(totalNotes / limit);
    const notesWithImage=await Promise.all( allNotes.map((note)=>{
        let obj;    //this will wait till all the data decrypted successfully
        if(note.imageFilePath){
            const filePath=decrypt(note.imageFilePath);
            const data=decrypt(note.note);
            obj={...note,imageFilePath:filePath,note:data};
        }
        return obj;

    }))
   
    if(notesWithImage.length==0){
        res.send({message:"No notes found"});
        return;
    }

    res.json({
        page,
        totalPages,
        totalNotes,
        notes: notesWithImage
    });
    }
    catch(err){
        logger.error(`Response Sent :${err}`);
        res.status(501).send("Internal sever error")


    }
    
}



exports.getNoteById=async(req,res,next)=>{
    logger.info(`${req.method}:${req.originalUrl}: Enter`);
    let data=notes.findOne({ noteId: parseInt(req.params.noteId) });
    console.log("dataa",data);
    if(!data){
        res.send("No notes found with given Id");
        return;
    }
    logger.info(`file path ${data.imageFilePath}`);
    logger.info(`decryptData ${data.note}`);
    const filePath=decrypt(data.imageFilePath);
    const decryptData=decrypt(data.note);
    data.imageFilePath=filePath;
    data.note=decryptData;
    res.send(data);
}




exports.updateNoteById = async (req, res, next) => {
    logger.info(`${req.method}:${req.originalUrl}: Enter`);
    try {
        const note = notes.findOne({ noteId: parseInt(req.params.noteId) });// find the document in the LokiJS collection
        if (!note) {
            return res.status(404).send("Note not found");
        }
        
        // update the fields of the retrieved document
        const encrypteData=encrupt(req.body.data);
        note.name = req.body.name;
        note.note = encrypteData;
        console.log(encrypteData);
        // for image update
        if(req.file){
            if(note.imageFilePath){
                const oldPath=decrypt(note.imageFilePath);
                if(fs.existsSync(oldPath)){   //check if old file exist then delete that file 
                    fs.unlinkSync(oldPath);
                }

            }
            note.imageFilePath=encrupt(req.file.path); // update with the new path
        }
        notes.update(note);
    
        res.send("success");
    } catch (err) {
        logger.error(`Response Sent :${err}`);
        res.status(501).send("Internal sever error")
    }
};

exports.deleteById=async (req,res,next) => {
    logger.info(`${req.method}:${req.originalUrl}: Enter`);
    try{
        const note=notes.findOne({noteId:parseInt(req.params.noteId) });   //find the note in the local db
        if(!note){
            return res.status(404).send("Note not found");
        }
        notes.remove(note);    //removing the node 
 
        res.send("note deleted successfully");
    }
    catch(err){
        logger.error(`Response Sent :${err}`);
        res.status(501).send("Internal sever error")
        
    }
    
}






