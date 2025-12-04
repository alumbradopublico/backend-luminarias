import LuminaireModel from './Luminaires.model.js'; 

class LuminairesMongoDAO {
    constructor() {
        
    }
    async getAllLuminaires(filters = {}) {
        try {
            
            let query = {};
            if (filters.municipio) query.municipio = { $regex: filters.municipio, $options: 'i' };
            if (filters.modelo) query.modelo = { $regex: filters.modelo, $options: 'i' };
            if (filters.potencia) query.potencia = { $regex: filters.potencia, $options: 'i' };

           
            const luminarias = await LuminaireModel.find(query);
            return luminarias;
        } catch (error) {
            console.error("Error en DAO Mongo (getAll):", error);
            throw new Error("Error al obtener luminarias de la BD");
        }
    }

    async createLuminaire(data) {
        try {
            const newLuminaire = await LuminaireModel.create(data);
            return newLuminaire;
        } catch (error) {
            console.error("Error en DAO Mongo (create):", error);
            throw new Error("Error al crear luminaria en la BD");
        }
    }

    async getLuminaireById(id) {
        try {
            return await LuminaireModel.findById(id);
        } catch (error) {
            console.error("Error en DAO (getById):", error);
            throw error;
        }
    }

    async deleteLuminaire(id) {
        try {
            return await LuminaireModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error en DAO (delete):", error);
            throw error;
        }
    }

    async updateLuminaire(id, data) {
        try {
            return await LuminaireModel.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            console.error("Error en DAO (update):", error);
            throw error;
        }
    }
}

export default LuminairesMongoDAO;