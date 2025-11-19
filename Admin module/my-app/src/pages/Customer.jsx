import React, { useEffect, useState } from "react";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    newThisMonth: 0,
  });

  const API_URL = "http://localhost:3000/api/customers"; // Update as needed

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();

      setCustomers(data);

      const total = data.length;
      const active = data.filter((c) => c.status === "Active").length;
      const thisMonth = data.filter((c) => {
        const created = new Date(c.createdAt);
        const now = new Date();
        return (
          created.getMonth() === now.getMonth() &&
          created.getFullYear() === now.getFullYear()
        );
      }).length;

      setStats({
        totalCustomers: total,
        activeCustomers: active,
        newThisMonth: thisMonth,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load customers");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen p-8 relative overflow-hidden"
      style={{
        background: "linear-gradient(to bottom, #DDEEF3 20%, #1C4452 20%)",
      }}
    >
      {/* Curved Top Accent */}
      <div
        className="absolute top-0 left-0 w-full h-[180px] rounded-b-[80px]"
        style={{ backgroundColor: "#DDEEF3" }}
      ></div>

      {/* Header Section */}
      <div className="relative z-10 text-center mb-10">
        <h1
          className="text-5xl font-extrabold drop-shadow-lg inline-block relative"
          style={{ color: "#1E505C" }} // Slate Blue Title Color
        >
          Customer Dashboard 👥
          <span
            className="block mt-2 mx-auto w-24 h-1 rounded-full bg-[#00A389]"
          ></span>
        </h1>
        <p className="text-[#1C4452]/70 mt-2 text-sm">
          Manage and track customer activity efficiently
        </p>
      </div>

      {/* Stats Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 relative z-10">
        <div className="p-5 rounded-2xl shadow-lg border-l-4 border-[#00A389] bg-[#DDEEF3]/80 backdrop-blur-sm">
          <p className="text-[#1C4452] text-sm">Total Customers</p>
          <p className="text-3xl font-semibold text-[#00A389] mt-1">
            {stats.totalCustomers}
          </p>
        </div>
        <div className="p-5 rounded-2xl shadow-lg border-l-4 border-[#00A389] bg-[#DDEEF3]/80 backdrop-blur-sm">
          <p className="text-[#1C4452] text-sm">Active Customers</p>
          <p className="text-3xl font-semibold text-[#00A389] mt-1">
            {stats.activeCustomers}
          </p>
        </div>
        <div className="p-5 rounded-2xl shadow-lg border-l-4 border-[#00A389] bg-[#DDEEF3]/80 backdrop-blur-sm">
          <p className="text-[#1C4452] text-sm">New This Month</p>
          <p className="text-3xl font-semibold text-[#00A389] mt-1">
            {stats.newThisMonth}
          </p>
        </div>
      </div>

      {/* Customer Table */}
      <div
        className="bg-[#DDEEF3]/90 rounded-2xl shadow-xl overflow-hidden backdrop-blur-md border border-[#CDE4EB] relative z-10"
      >
        <table className="min-w-full border-collapse">
          <thead style={{ backgroundColor: "#00A389" }}>
            <tr>
              {["#", "Name", "Email", "Phone", "Status", "Joined On"].map(
                (heading) => (
                  <th
                    key={heading}
                    className="text-left py-3 px-5 font-semibold text-white text-sm uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-5 text-[#1C4452]">
                  Loading customers...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-5 text-[#1C4452]/80"
                >
                  No customers found.
                </td>
              </tr>
            ) : (
              customers.map((c, i) => (
                <tr
                  key={c._id}
                  className="border-b border-[#CDE4EB] hover:bg-[#CDE4EB]/40 transition-all duration-150"
                >
                  <td className="py-3 px-5 text-[#1C4452]">{i + 1}</td>
                  <td className="py-3 px-5 font-medium text-[#1C4452]">
                    {c.firstName} {c.lastName}
                  </td>
                  <td className="py-3 px-5 text-[#1E505C]">{c.email}</td>
                  <td className="py-3 px-5 text-[#1E505C]">{c.phone}</td>
                  <td
                    className={`py-3 px-5 font-semibold ${
                      c.status === "Active"
                        ? "text-[#00A389]"
                        : "text-red-500"
                    }`}
                  >
                    {c.status || "Inactive"}
                  </td>
                  <td className="py-3 px-5 text-[#1E505C]">
                    {new Date(c.createdAt).toLocaleDateString()}
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

export default Customer;
