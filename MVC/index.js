import express from 'express';
import LuminairesRoutes from "./src/routes/Luminaires.routes.js";
import UsersRoutes from "./src/routes/Users.routes.js";
import mongoose from 'mongoose'; 
import cors from 'cors'; 
import config from './config.js';

const app = express();
const PORT = config.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); 

mongoose.connect(config.MONGO_URI)
     .then(() => console.log('✅ Conectado a base de datos Mongo Atlas'))
     .catch((error) => console.error('❌ Error al conectar a Mongo:', error));

app.use("/", new LuminairesRoutes().start());
app.use("/", new UsersRoutes().start());

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});