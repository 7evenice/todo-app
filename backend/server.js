const express = require ("express");
const mongoose = require('mongoose');
const cors = require('cors')


const  app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/todos", {
    useNewUrlParser : true, //cho phép kết nối MongoDB có port mặc định mới nhất.
    useUnifiedTopology: true // đảm bảo sự ổn định của kết nối
})  .then (() => console.log("----------Connected to DB----------"))
    .catch(console.error)

const Todo = require('./models/Todo');
const { text } = require("body-parser");

    app.get('/todos', async (req, res) => {
        const todos = await Todo.find();
        res.json(todos);
    })

    app.post('/todos/new', async (req, res) => {
        const text = req.body.text
        console.log(text);
        try {
            await Todo.create({
                text: text,
                // complete: complete,
                // timestamp: Date.now()
            });
            // Todo.save()
            // res.json(Todo);
        } catch(error) {
            console.error(error);
            res.status(500).send('sorry can not create')
        }
    })

    app.delete('/todos/delete/:id', async (req, res) => {
        const result = await Todo.findByIdAndDelete(req.params.id);
        res.json(result)
    })

    app.get('/todos/complete/:id', async (req, res) => {
        try {
            const todo = await Todo.findById(req.params.id);
            todo.complete = !todo.complete;
            await todo.save();
            res.json(todo)
        }
        catch (error) {
            console.error();
            res.status(500).send('Nhu cc')
        }
    })

app.listen(3003, () => console.log("===Server started on port 3003==="));