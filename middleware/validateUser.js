// middleware/validateUser.js
function validateUser(req, res, next) {
    const { method, body } = req;
    const users = req.users || []; // Get users from request object
    const requiredFields = ['Firstname', 'LastName', 'Hobby', 'email'];

    // Only validate for POST and PUT requests
    if (method === 'POST' || method === 'PUT') {
        // Check for missing required fields
        const missingFields = requiredFields.filter(field => !body[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'MISSING_FIELDS',
                    message: 'Missing required fields',
                    missingFields
                }
            });
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'INVALID_EMAIL',
                    message: 'Invalid email format'
                }
            });
        }

        // Check for duplicate email (only for new users or when email is being changed)
        if (method === 'POST' || (method === 'PUT' && body.email !== req.user?.email)) {
            if (users.some(user => user.email === body.email)) {
                return res.status(400).json({
                    success: false,
                    error: {
                        code: 'DUPLICATE_EMAIL',
                        message: 'Email already exists'
                    }
                });
            }
        }
    }

    next();
}

module.exports = validateUser;
