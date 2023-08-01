import jwt from 'jsonwebtoken';

export default function verifyToken (token) {
    try {
        jwt.verify(token, 'FREEFORALL');
        return true;
    } catch (error) {
        return false;
    }
};
