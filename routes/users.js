// routes/users.js
const express = require('express');
const router = express.Router();
const validateUser = require('../middleware/validateUser');

// In-memory storage 
let users = [
    { id: 1, Firstname: 'Anand', LastName: 'Tiwari', Hobby: 'Coding', email: 'anand@example.com' },
    { id: 2, Firstname: 'Aditya', LastName: 'Tiwari', Hobby: 'Guitar', email: 'aditya@example.com' },
    { id: 3, Firstname: 'Gungun', LastName: 'Mishra', Hobby: 'Teaching', email: 'gungun@example.com' },
    { id: 4, Firstname: 'Aradhya', LastName: 'Singh', Hobby: 'Creative art', email: 'aradhya@example.com' }
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

// POST /users - Add a new user
router.post('/', (req, res, next) => {
    // Add users array to request object for validation
    req.users = users;
    validateUser(req, res, next);
}, (req, res) => {
    const { Firstname, LastName, Hobby, email } = req.body;
    const user = {
        id: users.length + 1,
        Firstname: Firstname.trim(),
        LastName: LastName.trim(),
        Hobby: Hobby.trim(),
        email: email.trim()
    };
    users.push(user);
    res.status(201).json(user);
});

// PUT /users/:id - Update an existing user
router.put('/:id', (req, res, next) => {
    // Add users array to request object for validation
    req.users = users;
    validateUser(req, res, next);
}, (req, res) => {
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });

    const { Firstname, LastName, Hobby, email } = req.body;
    if (Firstname) user.Firstname = Firstname.trim();
    if (LastName) user.LastName = LastName.trim();
    if (Hobby) user.Hobby = Hobby.trim();
    if (email) user.email = email.trim();

    res.json(user);
});

// DELETE /users/:id - Delete a user
router.delete('/:id', (req, res) => {
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex === -1) return res.status(404).json({ message: 'User not found' });

    users = users.filter(u => u.id !== parseInt(req.params.id));
    res.status(204).send();
});

// Export the router only
module.exports = router;