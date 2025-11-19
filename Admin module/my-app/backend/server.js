import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import Admin from "./models/Admin.js";




dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/admin", authRoutes);
app.use("/api/vendors", vendorRoutes);

const PORT = process.env.PORT || 3001;

async function ensureDefaultAdmin() {
  try {
    const existing = await Admin.findOne({});
    if (!existing) {
      await Admin.create({ email: "admin@gmail.com", password: "admin123" });
      console.log("✅ Default admin created: admin@gmail.com / admin123");
    }
  } catch (e) {
    console.error("Failed to ensure default admin", e);
  }
}

ensureDefaultAdmin();

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
