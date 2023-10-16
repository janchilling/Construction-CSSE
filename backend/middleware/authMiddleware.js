const jwt = require('jsonwebtoken');

//jwt token authentication
const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
    }

    try {
        jwt.verify(token, 'secret_key', (err, user) => {
            if (err) {
                return res.status(401).json({ error: 'Authentication failed' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        res.status(500).json({ error: 'Authentication failed' });
    }
};

module.exports = authenticate;
