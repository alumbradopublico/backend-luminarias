// src/middlewares/upload.middleware.js
import multer from 'multer';
import path from 'path';

// Configuración básica: guardar en carpeta temporal 'uploads'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Asegúrate de crear esta carpeta manualmente en la raíz si no se crea sola
    },
    filename: function (req, file, cb) {
        // Guardamos el archivo con su extensión original (jpg, png)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

export default upload;