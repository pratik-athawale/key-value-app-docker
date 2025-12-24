const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;
app.use(bodyParser.json());

app.get('/health', (req, res) => {
    res.status(200).send('up');
})

console.log('Connecting to DB');


mongoose.connect(`mongodb://${process.env.MONGODB_HOST}/${process.env.KEY_VALUE_DB}`, {
    auth: {
        username: process.env.KEY_VALUE_USER,
        password: process.env.KEY_VALUE_PASSWORD
    },
    connectTimeoutMS: 500
})
.then(() => {
    console.log('Express app connected to DB');
    app.listen(port, () => {
        console.log(`Express app listening on port ${port}`);
    })
})
.catch((err) => {
    console.log('Something went wrong');
    console.error(err);
})