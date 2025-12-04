// src/model/User.model.js
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true }, 
    role: { 
        type: String, 
        enum: ['admin', 'empleado', 'cliente'], 
        default: 'cliente' 
    },
    municipioAsignado: { type: String, default: 'Todos' } 
}, {
    versionKey: false,
    timestamps: true 
});

export default mongoose.model('User', UserSchema);