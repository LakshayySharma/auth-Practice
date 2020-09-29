const User = require('../models/User');
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

router.post('/', [
    check('name', 'Name is required')
        .not()
        .isEmpty(),
    check('email', 'Enter a valid email address').isEmail(),
    check('password', 'Password length should min 6').isLength({min: 6})
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res
            .status(400)
            .json({
                errors: errors.array()
            });
    }
    const {name, password, email} = req.body;
    try {
        
        const user = await User.findOne({email});
        if (user) {
            res.status(400).json({
                error: [
                    {
                        msg: 'User already exists'
                    }
                ]
            })
        }
        user = new User({name, email, password});

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hashPassword(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, config.get('jwtsecret'),{expiresIn: 360000},(err, token) => {
            if (err) throw err;
            res.json({token});
        });
        
    }catch(err){
        console.error(err);
        res.status(500).send('Server error');
    }

})

module.exports = router;