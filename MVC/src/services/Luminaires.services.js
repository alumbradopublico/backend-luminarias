
import LuminaireModel from '../models/DAO/Luminaires.model.js';

class LuminairesService {
    
    async getAllLuminaires(filters) {
        try {
            let query = {};

            if (filters.municipio) query.municipio = { $regex: filters.municipio, $options: 'i' };
            if (filters.modelo) query.modelo = { $regex: filters.modelo, $options: 'i' };
            if (filters.potencia) query.potencia = { $regex: filters.potencia, $options: 'i' };

            const luminaires = await LuminaireModel.find(query);
            return luminaires;
        } catch (error) {
            console.error("Error en servicio:", error);
            throw error;
        }
    }

    async createLuminaire(data) {
        try {
            const newLuminaire = await LuminaireModel.create(data);
            return newLuminaire;
        } catch (error) {
            console.error("Error al crear:", error);
            throw error;
        }
    }

    async getLuminaireById(id) {
        try {
            return await LuminaireModel.findById(id);
        } catch (error) {
            throw error;
        }
    }

    async deleteLuminaire(id) {
        try {
            return await LuminaireModel.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }

    async updateLuminaire(id, data) {
        try {
            return await LuminaireModel.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw error;
        }
    }
}

export default LuminairesService;