import express from 'express';
import UsersController from '../controller/Users.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

class UsersRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new UsersController();
    }

    start() {
        this.router.post('/login', this.controller.login);
        this.router.post('/users', authMiddleware.verifyToken, this.controller.createUser);
        
        return this.router;
    }
}

export default UsersRoutes;