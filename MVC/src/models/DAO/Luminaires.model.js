import mongoose from 'mongoose';

const LuminaireSchema = new mongoose.Schema({
    modelo: { type: String, required: true },
    potencia: { type: String, required: true },
    municipio: { type: String, required: true },
    link_foto: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('luminarias', LuminaireSchema);