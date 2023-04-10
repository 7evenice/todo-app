const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    text : {
        type: String,
        required: true
    },
    complete : {
        type: Boolean,
        default: false
    },
    timestamp : {
        type: String,
        default: Date.now()
    }
}, {
    collection: "todos"
});

module.exports = mongoose.model('Todo', TodoSchema);