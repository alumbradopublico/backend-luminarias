import UsersService from '../services/Users.service.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';

class UsersController {
    constructor() {
        this.service = new UsersService();
    }

    login = async (req, res) => {
        try {
            const { username, password } = req.body;

            const user = await this.service.login(username, password);

            const token = jwt.sign(
                { 
                    id: user._id, 
                    role: user.role, 
                    municipio: user.municipioAsignado 
                },
                config.JWT_SECRET,
                { expiresIn: '8h' } 
            );

            res.json({
                message: "Login exitoso",
                token: token,
                user: {
                    username: user.username,
                    role: user.role,
                    municipio: user.municipioAsignado
                }
            });

        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    };

    createUser = async (req, res) => {
        try {
            const { username, password, role, municipioAsignado } = req.body;
            
            const newUser = await this.service.register({ 
                username, 
                password, 
                role, 
                municipioAsignado 
            });

            res.json({ message: "Usuario creado con éxito", user: newUser });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    };
}

export default UsersController;