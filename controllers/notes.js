const loki = require("lokijs")
const path = require('path');
const fs=require('fs');
const { all } = require("../router/notesRoutes");
var db = new loki('notes.db');
var notes = db.addCollection('notes');
const crypto=require('crypto-js');
const algorithm="aes-256-cbc";
const key="Niswhwal@123"


var id = 1;

function encrupt(data){
    
    //encryption
    // const cipher=crypto.createCipheriv(algorithm,key,iv);
    // let encyrpt=cipher.update(data,'utf-8','hex');
    // encyrpt+=cipher.final('hex');
    const encrypted = crypto.AES.encrypt(data, key).toString();
    console.log("ENCRYPTED",encrypted);
    return encrypted;
}

function decrypt(encrypted){
    // return new Promise((res,rej)=>{
        try{
            const decrypted = crypto.AES.decrypt(encrypted, key).toString(crypto.enc.Utf8);
            console.log(decrypted);
           //res(decrypted);
           return decrypted;
            

        }
        catch(err){
            console.log(err);
            //rej(err);
            return err;

        }
    // })
    // const decipher=crypto.createDecipheriv(algorithm,key,iv);
    // let decrypted=decipher.update(encrypted,"hex","utf-8");
    // decrypted+=decipher.final('utf-8');
    // console.log(decrypted);
    
    


}




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
    console.log("file path",req.file.path);

    const encrypteData=encrupt(req.body.data);
    const encryptImagePath=encrupt(req.file.path);
    notes.insert({noteId:id, name : req.body.name ,note:encrypteData,imageFilePath:encryptImagePath});
    id++;
    db.saveDatabase();
    res.send("added succesfully")

}

exports.getNotes=async(req,res,next)=>{
    // const targetFolder='C:\Users\nishw\OneDrive\Desktop\Secure-node-app\public';
    const allNotes=notes.find();

    const notesWithImage=await Promise.all( allNotes.map((note)=>{
        if(note.imageFilePath){
            
            const filePath=decrypt(note.imageFilePath);
            const data=decrypt(note.note);
            note.imageFilePath=filePath;
            note.note=data;
        }
        return note;

    }))
   
    if(notesWithImage.length==0){
        res.send("No notes found");
    }

    res.json(notesWithImage);
}



exports.getNoteById=async(req,res,next)=>{
    let data=notes.findOne({ noteId: parseInt(req.params.noteId) });
    if(!data){
        res.send("No notes found with given Id");
        return;
    }
    const filePath=decrypt(data.imageFilePath);
    const decryptData=decrypt(data.note);
    data.imageFilePath=filePath;
    data.note=decryptData;
    res.send(data);
}




exports.updateNoteById = async (req, res, next) => {
    try {
        const note = notes.findOne({ noteId: parseInt(req.params.noteId) });// Find the document in the LokiJS collection
        if (!note) {
            return res.status(404).send("Note not found");
        }
        
        // Update the fields of the retrieved document
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
        console.log(err);
         res.status(501).send("Internal sever error")
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


