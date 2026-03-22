const userModel = require('../models/userModel');
const userService = require('../services/userService');
const { validationResult } = require('express-validator');
const blacklistTokenModel = require('../models/blacklistTokenModel');

// register a new user and return a JWT token
module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    try {
        const user = await userService.createUser({
            firstname: fullname.firstname, lastname: fullname.lastname, email, password });
        const token = user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (err) {
        next(err);
    }
};

// authenticate an existing user and return a token
module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, role } = req.body;
    try {
        // TEST MODE: Accept any credentials in development
        if (process.env.NODE_ENV !== 'production') {
            const testUser = {
                _id: 'test_user_' + Math.random().toString(36).substr(2, 9),
                firstname: email.split('@')[0],
                lastname: 'User',
                email: email,
                role: role || 'student',
                generateAuthToken: function() {
                    return 'test_token_' + Math.random().toString(36).substr(2, 20);
                }
            };
            
            const token = testUser.generateAuthToken();
            res.cookie('token', token);
            
            return res.json({ 
                token, 
                user: { 
                    _id: testUser._id,
                    firstname: testUser.firstname,
                    lastname: testUser.lastname,
                    email: testUser.email,
                    role: testUser.role 
                } 
            });
        }

        // PRODUCTION MODE: Check against database
        const user = await userService.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isValid = await user.comparePassword(password);
        if (!isValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = user.generateAuthToken();
        res.cookie('token', token); 

        res.json({ token, user });
    } catch (err) {
        next(err);
    }
};

//logout
module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token= req.cookies.token || req.headers.authorization.split(' ')[1];
    await blacklistTokenModel.create({ token });
    res.json({ message: 'Logged out successfully' });
};