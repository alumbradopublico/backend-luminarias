import express from 'express';
import LuminairesController from '../controller/Luminaires.controller.js';
import validationMiddleware from '../middleware/validation.middleware.js';
import authMiddleware from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';

class LuminairesRoutes {
    constructor() {
        this.router = express.Router();
        this.controller = new LuminairesController();
    }

    start() {
        this.router.get('/luminarias', authMiddleware.verifyToken, this.controller.getLuminaires);

        this.router.post('/luminarias', authMiddleware.verifyToken, validationMiddleware.validateLuminaireData, this.controller.saveLuminaire);

        this.router.post('/luminarias/upload', authMiddleware.verifyToken, upload.single('image'), this.controller.uploadLuminaires);

        this.router.delete('/luminarias/:id', authMiddleware.verifyToken, this.controller.deleteLuminaire);
        
        this.router.put('/luminarias/:id', authMiddleware.verifyToken, this.controller.updateLuminaire);

        return this.router;
    }
}

export default LuminairesRoutes;