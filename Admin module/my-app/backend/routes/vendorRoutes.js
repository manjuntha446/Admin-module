import express from "express";
import {
  getVendors,
  getVendorStats,
  addVendor,
  approveVendor,
  rejectVendor,
  deleteVendor,
  searchVendors,
  getVendorNotification,
  getVendorSummary 
} from "../controllers/vendorController.js";

const router = express.Router();

router.get("/all", getVendors);
router.get("/stats", getVendorStats);
router.post("/add", addVendor);
router.put("/approve/:id", approveVendor);
router.put("/reject/:id", rejectVendor);
router.delete("/:id", deleteVendor);
router.get("/notification/:id", getVendorNotification);
router.get("/summary", getVendorSummary);


router.get("/search", searchVendors);


export default router;
