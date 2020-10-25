const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Controllers
const {
    getNoteController,
    addNoteController,
    deleteNoteController,
    updateNoteController,
    getNotesController
} = require('../controllers/noteControllers');


// GET all notes
router.get('/', getNotesController)

// GET single note
router.get(
    '/:noteId',
    check('noteId', 'Note Not Found').isMongoId(),
    getNoteController
)

// Add note
router.post(
    '/',
    [
        check('title', 'Title is required').notEmpty(),
        check('description', 'Description is required').notEmpty(),

        // For multiple validation rules
        // check('description')
        //     .notEmpty()
        //     .withMessage('Description is required')
        //     .isLength({ min: 10, max: 100 })
        //     .withMessage('Description be in 10 to 100 characters')

    ],
    addNoteController
)


// Update note
router.put(
    '/:noteId',
    [
        check('noteId', 'Note Not Found').isMongoId(),
        check('title', 'Title is required')
            .optional()
            .notEmpty(),
        check('description', 'Description is required')
            .optional()
            .notEmpty(),
    ],
    updateNoteController
    )


// Delete notes
router.delete(
    '/:noteId',
    check('noteId', 'Note Not Found').isMongoId(),
    deleteNoteController
)

module.exports = router;