import express from 'express';
import axios from 'axios';

import Gif from '../models/Gif.js';

const router = express.Router();

//CREATE
router.post('/', (req, res) => {
    Gif.create({ user: req.user.id, url: req.body.url }, (err, gif) => {
        if(err) {
            console.log(err);
            res.send('error');
        } else {
            res.send('success');
        }
    })
})

//READ
router.get('/', (req, res) => {
    Gif.find({ user: req.user.id }, (err, gifs) => {
        if (err) {
            console.log(err);
            res.send('error')
        } else {
            console.log(gifs);
            res.send(gifs);
        }
    })
})

//SEARCH
router.get('/search', (req, res) => {
    axios.get(`https://api.giphy.com/v1/gifs/search?&q=${req.query.input}&api_key=${process.env.GIPHY_KEY}&rating=g&limit=10`).then((giphyRes) => {
        res.json(giphyRes.data.data);
    }).catch((err) => {
        console.log(err);
        res.status(500);
    })
})

//UPDATE
router.put('/:id', (req, res) => {
    Gif.findByIdAndUpdate(req.params.id, { url: req.body.url }, (err, result) => {
        if(err) {
            console.log(log);
            res.send('error')
        } else {
            console.log(result);
            res.send('success');
        }
    })
})

//DELETE
router.delete('/:id', (req, res) => {
    Gif.findByIdAndDelete(req.params.id, (err, result) => {
        if(err) {
            console.log(err);
            res.send('error');
        } else {
            console.log(result);
            res.send('success');
        }
    })
})

export default router;