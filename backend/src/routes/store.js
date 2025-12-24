const express = require('express');

const keyValueRouter = express.Router();

keyValueRouter.post('/', (req, res) => {
    return res.send('creating kv pair');
});

keyValueRouter.get('/:key', (req, res) => {
    return res.send('getting kv pair');
});

keyValueRouter.put('/:key', (req, res) => {
    return res.send('updating kv pair');
});

keyValueRouter.delete('/:key', (req, res) => {
    return res.send('deleting kv pair');
});

module.exports = {
    keyValueRouter,
}