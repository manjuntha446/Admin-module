import React, { useEffect, useState } from "react";

const Subscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    planType: "",
    startDate: "",
    status: "Active",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = "http://localhost:3000/api/subscriptions"; // 🔧 update if needed

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  // Fetch all subscriptions
  async function fetchSubscriptions() {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      const data = await res.json();
      setSubscriptions(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load subscriptions");
    } finally {
      setLoading(false);
    }
  }

  // Handle form input change
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  // Add a new subscription
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add subscription");

      const newSubscription = await res.json();
      setSubscriptions((prev) => [newSubscription, ...prev]);
      setForm({
        customerName: "",
        planType: "",
        startDate: "",
        status: "Active",
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  // Delete a subscription
  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this subscription?"))
      return;
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete subscription");
      setSubscriptions((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Heading */}
      <h1 className="text-2xl font-bold mb-4 text-center">
        Subscription Management 💳
      </h1>

      {/* Add Subscription Form */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-3 bg-gray-100 p-4 rounded-lg mb-6"
      >
        <input
          name="customerName"
          placeholder="Customer Name"
          value={form.customerName}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          name="planType"
          placeholder="Plan Type (e.g., Basic, Premium)"
          value={form.planType}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          required
          className="border p-2 rounded col-span-1"
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 rounded col-span-1"
        >
          <option value="Active">Active</option>
          <option value="Expired">Expired</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Subscription
        </button>
      </form>

      {/* Subscription List */}
      {loading ? (
        <p className="text-center">Loading subscriptions...</p>
      ) : (
        <div className="space-y-3">
          {subscriptions.length === 0 ? (
            <p className="text-center text-gray-600">
              No subscriptions found.
            </p>
          ) : (
            subscriptions.map((s) => (
              <div
                key={s._id}
                className="flex justify-between items-center bg-white shadow p-3 rounded"
              >
                <div>
                  <p className="font-semibold">{s.customerName}</p>
                  <p className="text-sm text-gray-600">
                    Plan: {s.planType} | Status:{" "}
                    <span
                      className={`${
                        s.status === "Active"
                          ? "text-green-600"
                          : s.status === "Expired"
                          ? "text-yellow-600"
                          : "text-red-600"
                      } font-semibold`}
                    >
                      {s.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Started: {new Date(s.startDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(s._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Subscription;
