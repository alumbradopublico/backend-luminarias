import express from 'express';
import UsersController from '../controller/Users.controller.js';

class UsersRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new UsersController();
    }

    start() {
        this.router.post('/login', this.controller.login);
        
        return this.router;
    }
}

export default UsersRoutes;