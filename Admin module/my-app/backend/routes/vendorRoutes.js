import express from "express";
import {
  getVendors,
  getVendorStats,
  addVendor,
  approveVendor,
  rejectVendor,
  deleteVendor
} from "../controllers/vendorController.js";

const router = express.Router();

router.get("/all", getVendors);
router.get("/stats", getVendorStats);
router.post("/add", addVendor);
router.put("/approve/:id", approveVendor);
router.put("/reject/:id", rejectVendor);
router.delete("/:id", deleteVendor);

export default router;
