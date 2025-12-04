import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import UserModel from './src/models/DAO/User.model.js';

dotenv.config();

const seedUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Conectado a Mongo");

        const usuarios = [
            {
                username: "admin",
                password: "admin123", 
                role: "admin",
                municipioAsignado: "Todos"
            },
            {
                username: "empleado",
                password: "empleado123",
                role: "empleado",
                municipioAsignado: "Todos"
            },
            {
                username: "cliente_avellaneda",
                password: "cliente123",
                role: "cliente",
                municipioAsignado: "Avellaneda"
            }
        ];

        for (const u of usuarios) {
            const existe = await UserModel.findOne({ username: u.username });
            if (!existe) {
                const hashedPassword = await bcrypt.hash(u.password, 10);
                await UserModel.create({ ...u, password: hashedPassword });
                console.log(`🎉 Usuario creado: ${u.username} (${u.role})`);
            } else {
                console.log(`⚠️ El usuario ${u.username} ya existe`);
            }
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        mongoose.disconnect();
        console.log("👋 Conexión cerrada");
    }
};

seedUsers();