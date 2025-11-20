import vendor from "../models/vendor.js";
import Vendor from "../models/vendor.js";

// Get all vendors
export const getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();

    res.status(200).json({sucess:true,message:"Vendor list fetched successfully", vendor});
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
      service: req.body.serviceName,
      status: "pending", // default
    });

    res.status(201).json({ message: "Vendor added", vendor });
  } catch (error) {
    console.error("Error addind",error);
    res.status(500).json({ message: "Error adding vendor" });
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


// SEARCH + FILTER vendors
export const searchVendors = async (req, res) => {
  try {
    const { name, category, status } = req.query;

    let filter = {};

    if (name) {
      filter.name = { $regex: name, $options: "i" };  // case-insensitive
    }

    if (category) {
      filter.service = { $regex: category, $options: "i" };
    }

    if (status) {
      filter.status = status;
    }

    const vendors = await Vendor.find(filter);

    res.status(200).json({
      success: true,
      count: vendors.length,
      vendors,
    });

  } catch (error) {
    console.error("Search Error:", error);
    res.status(500).json({ success: false, message: "Error searching vendors" });
  }
};


export const getVendorNotification = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    res.status(200).json({
      notification: vendor.notification,
      status: vendor.status
    });

  } catch (error) {
    res.status(500).json({ message: "Error fetching notification" });
  }
};


// APPROVE vendor (normalize status to lowercase and set notification)
export const approveVendor = async (req, res) => {
  try {
    const id = req.params.id;
    await Vendor.findByIdAndUpdate(id, {
      status: "approved",                     // normalized
      notification: "Your vendor account has been approved!"
    }, { new: true });

    res.status(200).json({ message: "Vendor approved and notification sent" });
  } catch (error) {
    console.error("approveVendor error:", error);
    res.status(500).json({ message: "Failed to approve vendor" });
  }
};

// REJECT vendor (normalize status to lowercase and set notification)
export const rejectVendor = async (req, res) => {
  try {
    const id = req.params.id;
    await Vendor.findByIdAndUpdate(id, {
      status: "rejected",
      notification: "Your vendor account has been rejected."
    }, { new: true });

    res.status(200).json({ message: "Vendor rejected and notification sent" });
  } catch (error) {
    console.error("rejectVendor error:", error);
    res.status(500).json({ message: "Failed to reject vendor" });
  }
};

// SUMMARY (case-insensitive counts)
export const getVendorSummary = async (req, res) => {
  try {
    const totalVendors = await Vendor.countDocuments();

    // case-insensitive matching using regex ^approved$ with i flag
    const approvedVendors = await Vendor.countDocuments({
      status: { $regex: "^approved$", $options: "i" }
    });

    const cancelledVendors = await Vendor.countDocuments({
      status: { $regex: "^(rejected|cancelled|cancel)$", $options: "i" }
    });

    return res.status(200).json({
      success: true,
      totalVendors,
      approvedVendors,
      cancelledVendors,
    });
  } catch (error) {
    console.error("Error fetching vendor summary:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching vendor summary",
    });
  }
};
