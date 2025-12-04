import 'dotenv/config'; 

export default {
    PORT: process.env.PORT || 8080,
    PERSISTENCE: process.env.PERSISTENCE || 'MONGO', 
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    FILE_PATH: process.env.FILE_PATH || './Luminaires.json'
};