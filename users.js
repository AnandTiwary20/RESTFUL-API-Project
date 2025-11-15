// routes/users.js
const express = require('express');
const router = express.Router();

// In-memory storage (replace with a database in production)
let users = [
    { id: 1, Firstname: 'Anand ', LastName: 'Tiwari' , Hobby: 'Coding' , email: 'anand@example.com' },
    { id: 2, Firstname: 'Aditya ', LastName: 'Tiwari' , Hobby: 'Guitar' , email: 'aditya@example.com' },
    { id: 3, Firstname: 'Gungun ', LastName: 'Mishra' , Hobby: 'Teaching' , email: 'gungun@example.com' },
     {id: 4, Firstname: 'Aradhya ', LastName: 'Singh' , Hobby: 'Creative art' , email: 'aradhya@example.com' },
];

// GET /users - Fetch all users
router.get('/', (req, res) => {
    res.json(users);
});

// GET /users/:id - Fetch a specific user by ID
router.get('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
});

// POST /user - Add a new user
router.post('/', (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: 'Name and email are required' });
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };

    users.push(user);
    res.status(201).json(user);
});

// PUT /user/:id - Update an existing user
router.put('/:id', (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (req.body.name) user.name = req.body.name;
    if (req.body.email) user.email = req.body.email;

    res.json(user);
});

// DELETE /user/:id - Delete a user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});

module.exports = router;