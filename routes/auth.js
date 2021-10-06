import express from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User.js';

const router = express.Router();

const accessTokenSecret = process.env.JWT_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH;
let refreshTokens = [];

router.post('/login', (req, res) => {
    // read username and password from request body
    const { username, password } = req.body;
    console.log(req.body)

    User.findOne({username: username, password: password }, (err, user) => {
        if(err || !user) {
            res.sendStatus(401);
        } else {
            const accessToken = jwt.sign({ id: user._id, username: user.username }, accessTokenSecret, { expiresIn: '120m' });
            const refreshToken = jwt.sign({ id: user._id, username: user.username }, refreshTokenSecret);
    
            refreshTokens.push(refreshToken);
    
            res.json({
                accessToken,
                refreshToken
            });
        }
    })
});

router.post('/token', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ username: user.username }, accessTokenSecret, { expiresIn: '20m' });

        res.json({
            accessToken
        });
    });
});

router.post('/logout', (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);

    res.send("Logout successful");
});

export default router;