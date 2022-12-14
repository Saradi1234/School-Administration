const express = require('express');
const fs = require('fs');
const path = require('path');
const studentArray = require('../InitialData');
const students = require('../models/studModel');
const router = express.Router();

// -----------------------GET--------------------------------
router.get('/student', async (req, res) => {
    try {
        const prevData = await students.find();
        !prevData.length ?
            await students.create(studentArray, { _id: 0 })
            : null

        res.json(await students.find({}, { _id: 0 }).sort({ id: 1 }))
    }
    catch (e) { res.json({ message: e.message }) }
})

// -------------------------GET------------------------------

router.get('/student/:id', async (req, res) => {
    try {
        const searchedStud = await students.findOne({ id: req.params.id }, { _id: 0 })

        searchedStud ?
            res.json(searchedStud)
            : res.status(404).json({ message: 'Id is invalid' })
    }
    catch (e) { res.json({ message: e.message }) }
})

// --------------------------POST-----------------------------

router.post('/student', async (req, res) => {
    try {
        const { name, currentClass, division } = req.body
        if (name && currentClass && division) {
            const filePath = path.join(__dirname, 'nextId.txt')
            let currId = fs.readFileSync(filePath)
            await students.create({
                id: ++currId,
                ...req.body
            })
            fs.writeFileSync(filePath, String(currId))
            return res.json({ id: currId })
        }
        res.status(400).json({ Message: 'Incomplete field(s)' })
    }
    catch (e) { res.json({ message: e.message }) }
})

// ------------------------PUT-------------------------------

router.put('/student/:id', async (req, res) => {
    try {
        const searchedStudent = await students.findOne({ id: req.params.id })
        if (searchedStudent) {
            await students.updateOne(
                { id: req.params.id }, { $set: req.body }
            )
            return res.json(await students.findOne(
                { id: req.params.id }, { _id: 0 }))
        }
        res.status(400).json({ message: "Invalid Id" })
    }
    catch (e) { res.status(400).json({ message: e.message }) }
})

// -------------------------------------------------------

router.delete('/student/:id', async (req, res) => {
    try {
        const searchedStud = await students.findOne({ id: req.params.id })

        searchedStud ?
            res.json(await students.deleteOne({ id: req.params.id }))
            : res.status(404).json({ message: 'Id is invalid' })
    }
    catch (e) { res.json({ message: e.message }) }
})


module.exports = router;