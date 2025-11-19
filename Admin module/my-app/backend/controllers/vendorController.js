import Vendor from "../models/vendor.js";

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).json(vendors);
  } catch (error) {
    res.status(500).json({ message: "Error fetching vendors" });
  }
};

// Get vendor stats
export const getVendorStats = async (req, res) => {
  try {
    const total = await Vendor.countDocuments();
    const approved = await Vendor.countDocuments({ status: "Approved" });
    const pending = await Vendor.countDocuments({ status: "Pending" });

    res.status(200).json({ total, approved, pending });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};

// Add vendor
export const addVendor = async (req, res) => {
  try {
    const vendor = await Vendor.create({
      name: req.body.name,
      email: req.body.email,
      serviceName: req.body.serviceName,
      status: "Pending", // default
    });

    res.status(201).json({ message: "Vendor added", vendor });
  } catch (error) {
    res.status(500).json({ message: "Error adding vendor" });
  }
};

// Approve vendor
export const approveVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.status(200).json({ message: "Vendor approved" });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve vendor" });
  }
};

// Reject vendor
export const rejectVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndUpdate(req.params.id, { status: "Rejected" });
    res.status(200).json({ message: "Vendor rejected" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject vendor" });
  }
};

// Delete vendor
export const deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Vendor deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete vendor" });
  }
};
