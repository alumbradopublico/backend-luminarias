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

    async register(data) {
        try {
            const existingUser = await UserModel.findOne({ username: data.username });
            if (existingUser) {
                throw new Error("El nombre de usuario ya existe");
            }

            // 2. Encriptamos la contraseña (HASH)
            // '10' es el nivel de complejidad del encriptado
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(data.password, salt);

            // 3. Preparamos el usuario para guardar
            const newUser = new UserModel({
                username: data.username,
                password: hashedPassword,      // Guardamos la encriptada, NO la original
                role: data.role,     
                municipioAsignado: data.municipioAsignado
            });

            const savedUser = await newUser.save();
            return savedUser;

        } catch (error) {
            throw error;
        }
    }
}

export default UsersService;