const express = require("express")
const router = express.Router()

const User = require('../models/User')


router.get('/', async (req, res)=>{
    try {
        const users = await User.find()
        res.json(users)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})

router.post("/",async (req, res)=>{
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
})

router.put('/:id', async (req, res)=>{
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

router.delete('/:id', async (req, res)=>{
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



module.exports = router;