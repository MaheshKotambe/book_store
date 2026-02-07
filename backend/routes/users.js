const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

//signup user
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        //check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "user already exists" });

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

//change password
router.post('/change_password/:id', async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const id = req.params.id;
        const user = await User.findById(id);
        if(!user) return res.status(404).json({msg:'user not found'});

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'invalid old password' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword,salt);
        await user.save();
        return res.status(200).json({msg:'password changed successfully'});
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;