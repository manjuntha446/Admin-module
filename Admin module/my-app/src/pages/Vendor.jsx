import { useEffect, useState } from "react";
import { Search, Star, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Vendors = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
const [statusFilter, setStatusFilter] = useState("");
const [categories, setCategories] = useState([]);



 const [vendors, setVendors] = useState([]);
useEffect(() => {
  async function fetchVendors() {
    try {
      const url = new URL("http://localhost:3001/api/vendors/search");

      if (searchQuery) url.searchParams.append("name", searchQuery);
      if (categoryFilter) url.searchParams.append("category", categoryFilter);
      if (statusFilter) url.searchParams.append("status", statusFilter);

      const res = await fetch(url);
      const data = await res.json();
      setVendors(data.vendors || []);
      // extract unique categories
const cats = [...new Set((data.vendors || []).map(v => v.service))];
setCategories(cats);

    } catch (error) {
      console.error("Failed to fetch vendors", error);
    }
  }

  fetchVendors();
}, [searchQuery, categoryFilter, statusFilter]);

const getStatusBadge = (status) => {
  const labelMap = {
    pending: "Pending",
    approved: "Active",
    rejected: "Suspended",
  };

  const label = labelMap[status] || status;

  switch (label) {
    case "Active":
      return (
        <span className="inline-flex items-center rounded-full bg-success/10 text-success border px-2.5 py-0.5 text-xs font-semibold">
          {label}
        </span>
      );
    case "Pending":
      return (
        <span className="inline-flex items-center rounded-full bg-warning/10 text-warning border px-2.5 py-0.5 text-xs font-semibold">
          {label}
        </span>
      );
    case "Suspended":
      return (
        <span className="inline-flex items-center rounded-full bg-destructive/10 text-destructive border px-2.5 py-0.5 text-xs font-semibold">
          {label}
        </span>
      );
    default:
      return <span>{label}</span>;
  }
};


  const handleApprove = async (id, name) => {
  const res = await fetch(
    `http://localhost:3001/api/vendors/approve/${id}`,
    { method: "PUT" }
  );

  if (res.ok) {
    toast({
      title: "Vendor Approved",
      description: `${name} has been approved.`,
    });
    
    setVendors(vendors.map(v =>
      v._id === id ? { ...v, status: "approved" } : v
    ));
  }
};


  const handleReject = async (id, name) => {
  const res = await fetch(
    `http://localhost:3001/api/vendors/reject/${id}`,
    { method: "PUT" }
  );

  if (res.ok) {
    toast({
      title: "Vendor Rejected",
      description: `${name} has been rejected.`,
      variant: "destructive",
    });

    setVendors(vendors.map(v =>
      v._id === id ? { ...v, status: "rejected" } : v
    ));
  }
};


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Vendor Management</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage service providers on the platform
        </p>
      </div>

      <div className="rounded-lg border bg-card shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold">All Vendors</h3>
          <p className="text-sm text-muted-foreground">
            Manage vendor approvals, KYC verification, and status
          </p>

          <div className="flex items-center gap-2 mt-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-md border bg-background px-10 py-2 text-sm"
              />
            </div>
          </div>




          <div className="flex gap-3 mt-4">
  
  {/* Category Filter */}
  <select
  value={categoryFilter}
  onChange={(e) => setCategoryFilter(e.target.value)}
  className="border rounded-md px-3 py-2 text-sm"
>
  <option value="">All Categories</option>

  {categories.map((cat) => (
    <option key={cat} value={cat}>
      {cat}
    </option>
  ))}

</select>


  {/* Status Filter */}
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border rounded-md px-3 py-2 text-sm"
  >
    <option value="">All Status</option>
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </select>

</div>






        </div>

        <div className="p-6 pt-0">
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="h-12 px-4 text-left">Name</th>
                  <th className="h-12 px-4 text-left">Category</th>
                  <th className="h-12 px-4 text-left">Rating</th>
                  <th className="h-12 px-4 text-left">Jobs Completed</th>
                  <th className="h-12 px-4 text-left">KYC Status</th>
                  <th className="h-12 px-4 text-left">Status</th>
                  <th className="h-12 px-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {vendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b hover:bg-muted/50">
                    <td className="p-4 font-medium">{vendor.name}</td>
                    <td className="p-4">{vendor.service}</td>


                    <td className="p-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-accent text-accent" />
                        <span className="font-medium">{vendor.rating}</span>
                      </div>
                    </td>

                    <td className="p-4">{vendor.jobs}</td>

                    <td className="p-4">
                      {vendor.kyc === "Verified" ? (
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-success border-success/20">
                          <CheckCircle className="h-3 w-3 mr-1" /> Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-warning border-warning/20">
                          <Clock className="h-3 w-3 mr-1" /> Pending
                        </span>
                      )}
                    </td>

                    <td className="p-4">{getStatusBadge(vendor.status)}</td>

                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {vendor.status === "pending" && (

                          <>
                            <button
                              onClick={() => handleApprove(vendor._id, vendor.name)}

                              className="inline-flex items-center gap-2 rounded-md text-sm border border-success/20 hover:bg-success/10 text-success h-8 px-3"
                            >
                              <CheckCircle className="h-3 w-3" /> Approve
                            </button>

                            <button
                              onClick={() => handleReject(vendor._id, vendor.name)}

                              className="inline-flex items-center gap-2 rounded-md text-sm border border-destructive/20 hover:bg-destructive/10 text-destructive h-8 px-3"
                            >
                              <XCircle className="h-3 w-3" /> Reject
                            </button>
                          </>
                        )}

                        {vendor.status === "approved" && (

                          <button className="inline-flex items-center gap-2 rounded-md text-sm border hover:bg-accent hover:text-accent-foreground h-8 px-3">
                            View Details
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
