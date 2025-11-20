import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  service: { type: String, required: true },
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
  notification: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Vendor", vendorSchema);
