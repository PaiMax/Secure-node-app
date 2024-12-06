const express=require('express');
const router=express.Router();
const notesController=require('../controllers/notes');

const upload=require('../fileUploader/multer');

router.post('/api/notes',upload.single('image'),notesController.addNotes);
router.get('/api/notes',notesController.getNotes);
router.get('/api/notes/:noteId',notesController.getNoteById);
router.put('/api/notes/:noteId',notesController.updateNoteById);
router.delete('/api/notes/:noteId',notesController.deleteById);
//router.post('/api/upload',notesController.imageUpload);

module.exports=router;