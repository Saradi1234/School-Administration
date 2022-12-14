const mongoose = require('mongoose');

const studSchema = new mongoose.Schema({
    id: Number,
    name: String,
    currentClass: String,
    division: String
}, { versionKey: false })

const students = mongoose.model('students', studSchema);

module.exports = students;