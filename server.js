const express = require("express")
const mongoose = require("mongoose")

const path = require('path');
require('dotenv').config({path : path.join(__dirname,'config','.env')
})

const User = require('./models/User')


const app = express()


app.use(express.json())


const port = process.env.PORT || 4000

// console.log("path is:",process.env.MONGO_URI)


const mongooseOptions = {
    dbName: 'gmc'
};

mongoose.connect(process.env.MONGO_URI, mongooseOptions )
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

app.get('/api/get', async (req, res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})


app.post("/api/post",async (req, res)=>{
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})


// to be continued........

//starting from here

app.put('/api/modify/:id', async (req, res)=>{
    try {
        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        )
        if (!updateUser) {
            return res.status(404).json({message:"User not Found!"})
        }
        res.json(updateUser)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
})

app.delete('/api/delete/:id', async (req, res)=>{
    try {
        const deletUser = await User.findByIdAndDelete(req.params.id)
        if (!deletUser) {
            return res.status(404).json({message:"User not found"})
        }
        res.json({message:"user found and deleted Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.listen(port, ()=>{
console.log(`you server is running on port localhost:${port}`)
})