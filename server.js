const { urlencoded } = require('express');
const express = require('express');
const app = express();
const user = require('./routes/user');
const db = require('./config/db');

app.use(express.json({
    extended: true
}))

db();

app.use('/api/user', user);

app.listen(3000, (req, res) => {
    console.log(`Server started at port 3000`);
})


