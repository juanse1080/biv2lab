import express from 'express';
import connect  from 'mongoose';
import json  from 'body-parser';
import { mongoURI as db } from './config/keys';

// const users = require('./routes/api/users').default.default.default;

const app = express();

app.use(json());

connect(db)
    .then(() => console.log('MongoDB connect...'))
    .catch(err => console.log(err))

// app.use('/api/users', users);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));