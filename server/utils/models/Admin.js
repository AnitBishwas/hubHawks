import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  firtsName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const AdminModel = mongoose.model("Admin", adminSchema);

export default AdminModel;
