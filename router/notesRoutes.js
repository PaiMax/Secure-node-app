const express=require('express');
const router=express.Router();
const notesController=require('../controllers/notes');
router.post('/api/notes',notesController.addNotes);
router.get('/api/notes',notesController.getNotes);
router.get('/api/notes/:noteId',notesController.getNoteById);
router.put('/api/notes/:noteId',notesController.updateNoteById);
router.delete('/api/notes/:noteId',notesController.deleteById);

module.exports=router;