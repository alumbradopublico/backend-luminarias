import jwt from 'jsonwebtoken';
import config from '../../config.js';
const verifyToken = (req, res, next) => {
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(403).json({ message: "Acceso denegado: Se requiere Token" });
    }

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);
        
        req.user = decoded; 
        
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
};

export default {
    verifyToken
};