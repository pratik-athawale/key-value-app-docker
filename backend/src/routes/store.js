const express = require('express');
const { KeyValue } = require('../models/keyValue');

const keyValueRouter = express.Router();

keyValueRouter.post('/', async (req, res) => {
    try {
        const { key, value } = req.body;
        const newKeyValue = new KeyValue({ key, value });
        await newKeyValue.save();
        return res.status(201).json(newKeyValue);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

keyValueRouter.get('/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const keyValue = await KeyValue.findOne({ key });
        if (!keyValue) {
            return res.status(404).json({ error: 'Key not found' });
        }
        return res.status(200).json(keyValue);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

keyValueRouter.put('/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const { value } = req.body;
        const updatedKeyValue = await KeyValue.findOneAndUpdate(
            { key },
            { value },
            { new: true, runValidators: true }
        );
        if (!updatedKeyValue) {
            return res.status(404).json({ error: 'Key not found' });
        }
        return res.status(200).json(updatedKeyValue);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
});

keyValueRouter.delete('/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const deletedKeyValue = await KeyValue.findOneAndDelete({ key });
        if (!deletedKeyValue) {
            return res.status(404).json({ error: 'Key not found' });
        }
        return res.status(200).json(deletedKeyValue);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

module.exports = {
    keyValueRouter,
};