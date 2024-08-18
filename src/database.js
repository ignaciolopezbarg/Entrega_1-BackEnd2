import mongoose from "mongoose";

mongoose.connect('mongodb+srv://nacho:holanacho@cluster0.g6mfb4u.mongodb.net/Integradora1?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('Conexion exitosa a la BD'))
.catch((error) => console.log('Error interno del servidor', error))