const mongoose = require('mongoose'); // imports mongoose library into JS code which we use to interact with the DB
const Schema = mongoose.Schema; // a constructor function provided by Mongoose for defining the structure and constraints of your data models.

const TodoSchema = new Schema({
    text:{
        type: String,
        required: true
    },
    complete:{
        type: Boolean,
        default: false

    },
    timestamp:{
        type: String,
        default: Date.now()
    },
});

//Creating a model
const Todo = mongoose.model('Todo', TodoSchema); // Defines a mongoose model assocciated with the 'Todo' collection in the MongoDb database and uses the TodoSchema.
//returns the mongoose object.

module.exports = Todo; // we can now import this module and use it in our application.
