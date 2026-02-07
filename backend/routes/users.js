const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//signup user
router.post('/signup', async (req, res) => {
    try {
        const {name,email,password} = req.body;

        //check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({msg: "user already exists"});

        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //save user
        user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ msg: "user registered successfully" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user exists
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        //compare entered password and password in db
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        res.json({
            id: user._id,
            name: user.name
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;