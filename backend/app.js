const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Item = require('./models/item');

const app = express();

mongoose.connect("mongodb+srv://db_manager:PKZjMkpMkzSkcpar@cluster0-cftfw.mongodb.net/ToDoList?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    })

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.post("/api/items", (req, res, next) => {
    const item = new Item({
        task: req.body.task,
        description: req.body.description
    });
    item.save().then(createdItem => {
        res.status(201).json({
            message: "Item added successfully",
            itemId: createdItem._id
        });
    });
});

app.get("/api/items", (req, res, next) => {
    Item.find()
        .then(documents => {
            res.status(200).json({
                message: "Items feteched from server",
                content: documents
            });
        })
        .catch(err => {
            console.log('Something went wrong' + err);
        });
});

app.delete(("/api/items/:id"), (req, res, next) => {
    Item.deleteOne({ _id: req.params.id })
        .then(result => {
            //console.log(result);
            res.status(200).json({ message: "Post deleted!" });
        });

});
module.exports = app;