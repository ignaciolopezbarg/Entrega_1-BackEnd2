import mongoose from "mongoose";

const schema = new mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    cartId: crearCarrito(),
    rol: {
        type: String,
        enum: ['admin', 'user'],
        default:'user',
        required: true 
    }
})

const UsuarioModel = mongoose.model('usuarios',schema);

export default UsuarioModel;