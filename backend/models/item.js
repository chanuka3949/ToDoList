const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    task: { type: String, require: true},
    description: { type: String, required: true }
});

module.exports = mongoose.model('Item', itemSchema);