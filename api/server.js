const express = require('express'); // is a Node.js web application framework. It simplifies the process of building web applications and APIs
const mongoose = require('mongoose'); // it provides an interface for interacting with MongoDB databases in an object-oriented way.
const cors = require('cors') // web applications in one domain (origin) to make requests for resources hosted on a different domain (a different origin). 

const app = express(); //  This line creates an instance of an Express application and assigns it to the variable app
app.use(express.json()); // is a built-in middleware that parses incoming JSON data, making it available on req.body in route handlers. It's commonly used for handling JSON data sent in requests.
app.use(cors()); // cors() initializes the CORS middleware with default settings, allowing all cross-origin requests.


// Database Connection
mongoose.connect('mongodb://127.0.0.1:27017/mern-todo',{ // is a method provided by the Mongoose library for connecting to a MongoDB database.
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('connected to DB'))
.catch(console.error);


const Todo = require('./models/Todo'); // importing Todo Schema from our Todo models.



// ---------- ROUTES -------------- //

//getting all todos
app.get('/todos', async (req, res) => {
    const todos = await Todo.find(); //when http request is made at this route we use the model.find() function to query for data 
    res.json(todos); // Sends data that is converted into a JSON string back to the client. .JSON is like the json.Stringfy method
})


// making a new todo
app.post('/todo/new', async (req, res) => {

    try {

    let todo = new Todo ({ // this will create a instance of our todo model for a new todo (document) to be put inside our todo collection.
        text: req.body.text // we get the body contents from the req and get its text property. // text is a required field in the todo schema
    })
    
    await todo.save(); // saves the todo and awaits the result to our actual collection using the models method.

    const todos = await Todo.find();

    res.status(201).json(todos) //send back the new todo to the client (and 201 status) so that we can add to our list.
    //TRY SEND BACK ALL THE DATA
} catch (error) {
    // handle errors
    console.error('Error creating todo', error);

    //send error response to server 
    res.status(500).json({error: 'internal server error'})
}

})

// Deleting a Todo

app.delete('/todo/delete/:id', async (req, res) => { // id is a dynamic piece of data that we pass through the URL as a parameter

    try{
        
        await Todo.findByIdAndDelete(req.params.id) // built in mongoose function that allows us to find a item by ID and delete it.

        const todos  = await Todo.find();

        res.status(200).json(todos);
        
    } catch (error) {
        console.error('Error deleting todo', error);
        res.status(500).json({error: 'internal server error'});
    }
})


// Updating a todo

app.get('/todo/complete/:id', async (req, res) => {
    try{
        const todo = await Todo.findById(req.params.id); // find a single document by its id field

        todo.complete = !todo.complete // if todo.complete  = false then it is updated to true.
        
        await todo.save();

        res.status(200).json(todo);

    } catch (error) {

        console.error('Error updating todo', error);
        res.status(500).json({error:'internal server error'});


    }

}) // this is going to toggle documents complete property from false to true.



app.listen(3001, () => { // Makes Express application start an HTTP server listening on port 3001. Server will be accessible at http://localhost:3001.
    console.log('app is running')
})