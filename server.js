const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
let router = express.Router();

const app = express();
app.use(bodyParser.json());
const db = require('./config/keys').mongoURI;

require('./models/User');

mongoose.connect(db)
    .then(() => console.log('MongoDB connect...'))
    .catch(err => console.log(err))

router.get('/', function (req, res) {
    res.json({ 'message': 'Ping Successfull' });
});

app.use('/api', router);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));