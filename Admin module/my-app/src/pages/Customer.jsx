import { useState } from "react";
import { Search } from "lucide-react";

const Customers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+91 98765 43210", pack: "Family Pack", status: "Active", expiry: "2025-12-15", usage: "8/12" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", phone: "+91 98765 43211", pack: "Smart Pack", status: "Active", expiry: "2025-11-20", usage: "5/8" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", phone: "+91 98765 43212", pack: "Starter Pack", status: "Expired", expiry: "2025-10-01", usage: "4/4" },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", phone: "+91 98765 43213", pack: "Saver Pack", status: "Active", expiry: "2025-12-30", usage: "2/6" },
    { id: 5, name: "David Brown", email: "david@example.com", phone: "+91 98765 43214", pack: "Family Pack", status: "Pending", expiry: "2025-11-05", usage: "10/12" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-success/10 text-success hover:bg-success/20">
            {status}
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-warning/10 text-warning hover:bg-warning/20">
            {status}
          </span>
        );
      case "Expired":
        return (
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold bg-destructive/10 text-destructive hover:bg-destructive/20">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Customer Management</h1>
        <p className="text-muted-foreground mt-1">
          View and manage customer subscriptions and activity
        </p>
      </div>

      {/* TABLE CARD */}
      <div className="rounded-lg border bg-card shadow-sm">
        {/* TOP BAR */}
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold">All Customers</h3>
          <p className="text-sm text-muted-foreground">
            Track customer subscriptions, usage, and renewal status
          </p>

          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-md border bg-background px-10 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="p-6 pt-0">
          <div className="overflow-auto w-full">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left">Name</th>
                  <th className="h-12 px-4 text-left">Email</th>
                  <th className="h-12 px-4 text-left">Phone</th>
                  <th className="h-12 px-4 text-left">Current Pack</th>
                  <th className="h-12 px-4 text-left">Usage</th>
                  <th className="h-12 px-4 text-left">Expiry</th>
                  <th className="h-12 px-4 text-left">Status</th>
                  <th className="h-12 px-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((customer) => {
                  const [used, total] = customer.usage.split("/").map(Number);
                  const percentage = (used / total) * 100;

                  return (
                    <tr key={customer.id} className="border-b hover:bg-muted/50">
                      <td className="p-4 font-medium">{customer.name}</td>
                      <td className="p-4 text-muted-foreground">{customer.email}</td>
                      <td className="p-4 text-muted-foreground">{customer.phone}</td>

                      <td className="p-4">
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                          {customer.pack}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{customer.usage}</span>
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-primary rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-muted-foreground">{customer.expiry}</td>

                      <td className="p-4">{getStatusBadge(customer.status)}</td>

                      <td className="p-4">
                        <button className="inline-flex items-center rounded-md text-sm border hover:bg-accent hover:text-accent-foreground h-8 px-3">
                          View Profile
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Customers;
