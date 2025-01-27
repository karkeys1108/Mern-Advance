const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON bodies
app.use(express.json());

let items = [
    { id: 1, name: 'Karthikeyan M ' },
    { id: 2, name: 'Sasi Kumar '}
];

app.get('/api/items', (req, res) => {
    res.json(items);
});


app.get('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');
    res.json(item);
});


app.post('/api/items', (req, res) => {
    const newItem = {
        id: items.length + 1,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found.');

    item.name = req.body.name;
    res.json(item);
});


app.delete('/api/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found.');

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
