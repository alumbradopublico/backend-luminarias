const validateLuminaireData = (req, res, next) => {
    const { modelo, potencia, municipio, link_foto } = req.body;

    if (!modelo || !potencia || !municipio || !link_foto) {
        return res.status(400).json({ 
            error: "Faltan datos obligatorios", 
            detalle: "Se requiere modelo, potencia, municipio y link_foto" 
        });
    }

    next();
};

export default {
  validateLuminaireData
};