const express = require('express');
const app = express();
const PORT = 3000;

// Import middleware
const requestCheck = require('./middleware/requestCheck');
const usersRouter = require('./routes/users');

// Middleware to parse JSON bodies
app.use(express.json());

// Use request checker middleware
app.use(requestCheck);

// Routes
app.use('/users', usersRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Something went wrong!',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        }
    });
});

// Start the server
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    server.close(() => process.exit(1));
});