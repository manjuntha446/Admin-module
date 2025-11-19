import React, { useEffect, useState } from "react";

const Booking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    completed: 0,
  });

  const API_URL = "http://localhost:3000/api/bookings"; // 🔧 Update if needed

  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch all bookings
  async function fetchBookings() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();

      setBookings(data);

      // Calculate statistics
      const total = data.length;
      const totalRevenue = data.reduce((sum, b) => sum + (b.price || 0), 0);
      const completed = data.filter((b) => b.status === "Completed").length;

      setStats({
        totalBookings: total,
        totalRevenue,
        completed,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Booking Dashboard 📅
      </h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 rounded shadow">
          <p className="text-gray-600 text-sm">Total Bookings</p>
          <p className="text-2xl font-semibold text-blue-700">
            {stats.totalBookings}
          </p>
        </div>
        <div className="bg-green-100 border-l-4 border-green-500 p-4 rounded shadow">
          <p className="text-gray-600 text-sm">Completed Bookings</p>
          <p className="text-2xl font-semibold text-green-700">
            {stats.completed}
          </p>
        </div>
        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow">
          <p className="text-gray-600 text-sm">Total Revenue</p>
          <p className="text-2xl font-semibold text-yellow-700">
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Booking List Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">#</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Customer Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Service
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Price
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Status
              </th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">
                Booking Date
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  Loading bookings...
                </td>
              </tr>
            ) : bookings.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-500">
                  No bookings found.
                </td>
              </tr>
            ) : (
              bookings.map((b, i) => (
                <tr
                  key={b._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="py-2 px-4 text-gray-700">{i + 1}</td>
                  <td className="py-2 px-4 font-medium text-gray-800">
                    {b.customerName || "—"}
                  </td>
                  <td className="py-2 px-4 text-gray-700">{b.serviceName}</td>
                  <td className="py-2 px-4 text-gray-700">
                    ₹{b.price?.toLocaleString()}
                  </td>
                  <td
                    className={`py-2 px-4 font-semibold ${
                      b.status === "Completed"
                        ? "text-green-600"
                        : b.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {b.status || "Pending"}
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {new Date(b.bookingDate).toLocaleDateString()}
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

export default Booking;
