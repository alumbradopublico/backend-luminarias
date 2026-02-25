
import LuminairesService from '../services/Luminaires.services.js';
import { google } from 'googleapis';
import fs from 'fs';

class LuminairesController {
    constructor() {
        this.service = new LuminairesService();
    }

    getLuminaires = async (req, res) => {
        try {
            let filtros = req.query;

            if (req.user) {
                console.log(`👤 Usuario solicitante: ${req.user.role} - Municipio: ${req.user.municipio}`);

                if (req.user.role === 'cliente') {
                    console.log(`🔒 Restringiendo resultados a: ${req.user.municipio}`);
                    filtros.municipio = req.user.municipio;
                }
            }

            const luminarias = await this.service.getAllLuminaires(filtros);
            res.status(200).json(luminarias);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al obtener luminarias");
        }
    };

    saveLuminaire = async (req, res) => {
        try {
            const nuevaLuminaria = await this.service.createLuminaire(req.body);
            res.status(201).json(nuevaLuminaria);
        } catch (error) {
            res.status(500).send("Error al guardar luminaria");
        }
    };

    uploadLuminaires = async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: "No se subió ningún archivo." });
            }

            const oauth2Client = new google.auth.OAuth2(
                process.env.GOOGLE_CLIENT_ID,
                process.env.GOOGLE_CLIENT_SECRET,
                "https://developers.google.com/oauthplayground"
            );

            oauth2Client.setCredentials({
                refresh_token: process.env.GOOGLE_REFRESH_TOKEN
            });

            const driveService = google.drive({ version: 'v3', auth: oauth2Client });

            const fileMetadata = {
                name: req.file.filename,
                parents: [process.env.GOOGLE_DRIVE_FOLDER_ID]
            };

            const media = {
                mimeType: req.file.mimetype,
                body: fs.createReadStream(req.file.path),
            };

            const response = await driveService.files.create({
                resource: fileMetadata,
                media: media,
                fields: 'id, webViewLink, webContentLink',
            });

            await driveService.permissions.create({
                fileId: response.data.id,
                requestBody: { role: 'reader', type: 'anyone' },
            });

            fs.unlinkSync(req.file.path);

            const linkDirecto = `https://lh3.googleusercontent.com/d/${response.data.id}`;

            const { municipio, modelo, potencia } = req.body;

            const nuevaLuminaria = await this.service.createLuminaire({
                municipio,
                modelo,
                potencia,
                link_foto: linkDirecto,
            });

            res.status(200).json({
                message: "¡Luminaria creada y subida a Drive!",
                data: nuevaLuminaria
            });

        } catch (error) {
            console.error("Error en upload:", error);
            res.status(500).json({ message: "Error al subir a Drive: " + error.message });
        }
    };

    deleteLuminaire = async (req, res) => {
        try {
            const { id } = req.params; 

            const luminaria = await this.service.getLuminaireById(id);

           if (!luminaria) {
                return res.status(404).json({ message: "Luminaria no encontrada" });
            }

            if (luminaria.link_foto) {
                try {
                    
                    const oauth2Client = new google.auth.OAuth2(
                        process.env.GOOGLE_CLIENT_ID,
                        process.env.GOOGLE_CLIENT_SECRET,
                        "https://developers.google.com/oauthplayground"
                    );
                    oauth2Client.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });
                    const driveService = google.drive({ version: 'v3', auth: oauth2Client });

                    const fileId = getDriveIdFromLink(luminaria.link_foto);
                    
                    if (fileId) {
                        console.log(`🗑️ Eliminando archivo de Drive: ${fileId}`);
                        await driveService.files.delete({ fileId: fileId });
                    }
                } catch (driveError) {
                    console.error("⚠️ Error al borrar foto de Drive (continuando con Mongo):", driveError.message);
                   
                }
            }

            await this.service.deleteLuminaire(id);
            
            res.status(200).json({ message: "Luminaria y foto eliminadas correctamente" });

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error al eliminar la luminaria" });
        }
    };


    updateLuminaire = async (req, res) => {
        try {
            const { id } = req.params;
            const datosNuevos = req.body; 

            const updated = await this.service.updateLuminaire(id, datosNuevos);

            if (!updated) return res.status(404).json({ message: "Luminaria no encontrada" });

            res.status(200).json({ message: "Luminaria actualizada", data: updated });
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar" });
        }
    };
}

function getDriveIdFromLink(link) {
    if (link.includes('id=')) {
        return link.split('id=')[1];
    }
    
    return link.split('/').pop().replace('view?usp=drivesdk', ''); 
}

export default LuminairesController;