const express = require('express');
const check_auth = require('../middleware/check_auth');
const Notes = require('../models/Notes');
const router = express.Router();

router.get('/allnotes', check_auth, async (req, res) => {
    const userId = req.userData.userId;
    const notes = await Notes.find({ user: userId });
    res.send({
        count: notes.length,
        notes: notes,
    })
})

router.post('/addnotes', check_auth, async (req, res) => {
    const userId = req.userData.userId;
    const { title, description, tag } = req.body;
    if (!title || !description) {
        res.status(400).json({ message: "Please fill in the required field" })
    }
    const note = await new Notes({
        title: title,
        description: description,
        tag: tag,
        user: userId
    }).save()
    res.status(200).json({ note: note })
})

router.put('/updatenote/:id', check_auth, async (req, res) => {
    const { title, description, tag } = req.body;
    const newNotes = { title, description, tag }
    let note = await Notes.findById(req.params.id);
    if (!note) {
        res.status(404).json({ Message: "Not Found" });
    }
    if (note.user.toString() !== req.userData.userId) {
        return res.status(401).json("Not Allowed")
    }
    const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
    res.send(updatedNote)
})

router.delete('/deletenote/:id', check_auth, async (req, res) => {
    let note = await Notes.findById(req.params.id);
    if (!note) {
        res.status(404).json({ Message: "Not Found" });
    }
    if (note.user.toString() !== req.userData.userId) {
        return res.status(401).json("Not Allowed")
    }
    const delNote = await Notes.findByIdAndDelete(req.params.id);
    res.send({
        messsage : "Note Has Been Deleted",
        note : delNote
    })
})




module.exports = router;