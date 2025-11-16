// middleware/validateUser.js
function validateUser(req, res, next) {
    const { method, body } = req;
    const users = req.users || [];
    const requiredFields = ['Firstname', 'LastName', 'Hobby', 'email'];

    // Validate POST (full data required)
    if (method === 'POST') {
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
    }

    // Email format validation - only if email is provided
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (body.email && !emailRegex.test(body.email)) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'INVALID_EMAIL',
                message: 'Invalid email format'
            }
        });
    }

    // Check for duplicate email - for POST or PUT email change
    if (body.email) {
        if (users.some(user => user.email === body.email && user.id !== parseInt(req.params.id))) {
            return res.status(400).json({
                success: false,
                error: {
                    code: 'DUPLICATE_EMAIL',
                    message: 'Email already exists'
                }
            });
        }
    }

    next();
}

module.exports = validateUser;
