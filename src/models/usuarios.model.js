import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  password: String,
  age: {
    type: Number,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
    required: true,
  },
  rol: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

const UsuarioModel = mongoose.model("usuarios", usuarioSchema);

export default UsuarioModel;
