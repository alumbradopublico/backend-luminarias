import UserModel from '../models/DAO/User.model.js';
import bcrypt from 'bcryptjs';

class UsersService {
    
    async login(username, password) {
        try {
            const user = await UserModel.findOne({ username });
            
            if (!user) {
                throw new Error("Usuario no encontrado");
            }

            const isMatch = await bcrypt.compare(password, user.password);
            
            if (!isMatch) {
                throw new Error("Contraseña incorrecta");
            }

            return user;
        } catch (error) {
            throw error;
        }
    }
}

export default UsersService;