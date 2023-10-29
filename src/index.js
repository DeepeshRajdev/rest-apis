const express = require('express');
const mongoose = require('mongoose');
 require('./db/connecting');
require('dotenv').config();
const  User  = require('./schemas/userSchema');
const app = express();
app.use(express.json());

//creating a user
app.post('/users', (req,res) => {
    const user = new User(req.body);
    user.save().then(() => {
        res.send(user);
    }).catch((err) => {
        res.send(err);
    })
})
// get all users
app.get('/users',(req,res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send(err);
    })
})

//get user by id
app.get('/users/:id',(req,res) => {
    const { id } = req.params;
    User.find({ _id : id }).then((users) => {
        res.send(users);
    }).catch((err) => {
        res.send(err);
    })
})

//updating user by id
app.patch('/users/:id', async (req,res) => {
   
    const { id } = req.params;
    User.findOneAndUpdate({
        _id: id
    }, req.body)
    .then((user) => {
        if(user) res.send(user)
        else res.send(`NOT FOUND`)
    })
    .catch((err) => {
        res.send(err)
    })
})

//delete by id
app.delete('/users/:id',(req,res) => {
    const { id } = req.params;
    User.deleteOne({ _id : id })
    .then(() => res.send("deleted"))
    .catch((err) => console.log(`ERROR WHILE DELETING : ${err}`))
})


const PORT = process.env.PORT ;
app.listen(PORT,() => {
    console.log(`Server listening on port ${PORT}`);
})
