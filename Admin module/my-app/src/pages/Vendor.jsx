import React, { useEffect, useState } from "react";

const Vendor = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalVendors: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const API_URL = "http://localhost:3000/api/vendors";

  // ===========================
  // Fetch vendors
  // ===========================
  useEffect(() => {
    fetchVendors();
  }, []);

  async function fetchVendors() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);

      if (!res.ok) throw new Error("Failed to fetch vendors");

      const data = await res.json();
      setVendors(data);

      // Calculate stats
      const total = data.length;
      const approved = data.filter((v) => v.status === "Approved").length;
      const pending = data.filter((v) => v.status === "Pending").length;
      const rejected = data.filter((v) => v.status === "Rejected").length;

      setStats({ totalVendors: total, approved, pending, rejected });
    } catch (err) {
      console.error(err);
      alert("Error loading vendor data");
    } finally {
      setLoading(false);
    }
  }

  // ===========================
  // Update vendor status
  // ===========================
  async function updateStatus(id, newStatus) {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update vendor status");

      // Update locally without refetching
      setVendors((prev) =>
        prev.map((v) => (v._id === id ? { ...v, status: newStatus } : v))
      );

      // Recalculate stats
      fetchVendors();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // ===========================
  // UI Render
  // ===========================
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Vendor Management 🏢
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow">
          <p className="text-gray-600 text-sm">Total Vendors</p>
          <p className="text-2xl font-semibold text-blue-700">
            {stats.totalVendors}
          </p>
        </div>

        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow">
          <p className="text-gray-600 text-sm">Approved</p>
          <p className="text-2xl font-semibold text-green-700">
            {stats.approved}
          </p>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow">
          <p className="text-gray-600 text-sm">Pending</p>
          <p className="text-2xl font-semibold text-yellow-700">
            {stats.pending}
          </p>
        </div>

        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded shadow">
          <p className="text-gray-600 text-sm">Rejected</p>
          <p className="text-2xl font-semibold text-red-700">
            {stats.rejected}
          </p>
        </div>
      </div>

      {/* Vendor Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                #
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Vendor Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Email
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Service
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading vendors...
                </td>
              </tr>
            ) : vendors.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No vendors found.
                </td>
              </tr>
            ) : (
              vendors.map((v, i) => (
                <tr
                  key={v._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-4 text-gray-700">{i + 1}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {v.name}
                  </td>
                  <td className="py-2 px-4 text-gray-700">{v.email}</td>
                  <td className="py-2 px-4 text-gray-700">
                    {v.serviceName || "N/A"}
                  </td>

                  <td
                    className={`py-2 px-4 font-semibold ${
                      v.status === "Approved"
                        ? "text-green-600"
                        : v.status === "Rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {v.status}
                  </td>

                  <td className="py-2 px-4 space-x-2">
                    <button
                      onClick={() => updateStatus(v._id, "Approved")}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => updateStatus(v._id, "Rejected")}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Vendor;
