import express from 'express';
import mongoose from 'mongoose';
import { URL } from 'url';

import authenticateJWT from './middleware/authenticateJWT.js';

import gifRouter from './routes/gifs.js';
import authRouter from './routes/auth.js';

mongoose.connect(process.env.MONGO_STRING, { useNewUrlParser: true });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

app.use('/auth', authRouter);
app.use('/gifs', authenticateJWT, gifRouter);

app.use(express.static(new URL('./client/build', import.meta.url).pathname))
app.get('*', (req, res) => {
    res.sendFile(new URL('./client/build/index.html', import.meta.url).pathname)
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})