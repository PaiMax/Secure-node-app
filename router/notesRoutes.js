const express=require('express');
const router=express.Router();
const notesController=require('../controllers/notes');
const userController=require('../controllers/user');
const {verifyToken}=require('../authorization/middleware');


const upload=require('../fileUploader/multer');   //multer is imported by this code

router.post('/api/notes',verifyToken,upload.single('image'),notesController.addNotes); //upload middleware we are using if image comes 
router.get('/api/notes',verifyToken,notesController.getNotes);
router.get('/api/notes/:noteId',verifyToken,notesController.getNoteById);
router.put('/api/notes/:noteId',verifyToken,upload.single('image'),notesController.updateNoteById);
router.delete('/api/notes/:noteId',verifyToken,notesController.deleteById);
router.post('/api/login',userController.loginUser);
module.exports=router;