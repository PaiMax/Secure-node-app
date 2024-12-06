const express=require('express');
const router=express.Router();
const notesController=require('../controllers/notes');
const userController=require('../controllers/user');
const {verifyToken}=require('../middleware/auth');
const rateLimit=require('../middleware/rateLimiter');


const upload=require('../fileUploader/multer');   //multer is imported by this code

router.post('/api/notes',rateLimit,verifyToken,upload.single('image'),notesController.addNotes); //upload middleware we are using if image comes 
router.get('/api/notes',rateLimit,verifyToken,notesController.getNotes);
router.get('/api/notes/:noteId',rateLimit,verifyToken,notesController.getNoteById);
router.put('/api/notes/:noteId',rateLimit,verifyToken,upload.single('image'),notesController.updateNoteById);
router.delete('/api/notes/:noteId',rateLimit,verifyToken,notesController.deleteById);
router.post('/api/login',rateLimit,userController.loginUser);
module.exports=router;