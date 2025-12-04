import config from '../../../../MVC/config.js';
import LuminaireModelMemory from './Luminaires.model.js'; 
import LuminairesMongoDAO from './LuminairesMongo.dao.js'; 

let daoInstance = null;

class Factory {
    static getDAO() {
        console.log("🏭 Modo de persistencia:", config.PERSISTENCE);

        switch (config.PERSISTENCE) {
            case 'MONGO':
                console.log('Using MONGO luminaire model');
                if (!daoInstance) {
                    daoInstance = new LuminairesMongoDAO();
                }
                return daoInstance;

            case 'MEMORY':
                console.log('Using MEMORY luminaire model');
                if (!daoInstance) {
                    daoInstance = new LuminaireModelMemory();
                }
                return daoInstance;

            default:
                console.log('⚠️ Warning: Persistence not found. Using default MEMORY.');
                if (!daoInstance) {
                    daoInstance = new LuminaireModelMemory();
                }
                return daoInstance;
        }
    }
};

export default Factory;