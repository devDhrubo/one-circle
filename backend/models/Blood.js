import mongoose from 'mongoose';

const bloodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  lastDonation: { type: String },
  medicalConditions: { type: String },
  location: { type: String }
}, { timestamps: true });

const Blood = mongoose.model('Blood', bloodSchema);
export default Blood;
