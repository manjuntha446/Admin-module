import { useState } from "react";
import { Search, Star, CheckCircle, XCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Vendors = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  const vendors = [
    { id: 1, name: "CleanPro Services", category: "Cleaning", rating: 4.8, jobs: 342, status: "Active", kyc: "Verified" },
    { id: 2, name: "Beauty Hub", category: "Salon", rating: 4.9, jobs: 567, status: "Active", kyc: "Verified" },
    { id: 3, name: "QuickFix Plumbing", category: "Plumbing", rating: 4.6, jobs: 289, status: "Active", kyc: "Verified" },
    { id: 4, name: "CoolTech AC", category: "AC Repair", rating: 4.7, jobs: 198, status: "Active", kyc: "Verified" },
    { id: 5, name: "HomeHelp Services", category: "Cleaning", rating: 4.5, jobs: 124, status: "Pending", kyc: "Pending" },
    { id: 6, name: "Sparkle Shine", category: "Cleaning", rating: 4.3, jobs: 67, status: "Suspended", kyc: "Verified" },
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
      case "Suspended":
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

  const handleApprove = (vendorName) => {
    toast({
      title: "Vendor Approved",
      description: `${vendorName} has been activated successfully.`,
    });
  };

  const handleReject = (vendorName) => {
    toast({
      title: "Vendor Rejected",
      description: `${vendorName}'s application has been rejected.`,
      variant: "destructive",
    });
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
                    <td className="p-4">{vendor.category}</td>

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
                        {vendor.status === "Pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(vendor.name)}
                              className="inline-flex items-center gap-2 rounded-md text-sm border border-success/20 hover:bg-success/10 text-success h-8 px-3"
                            >
                              <CheckCircle className="h-3 w-3" /> Approve
                            </button>

                            <button
                              onClick={() => handleReject(vendor.name)}
                              className="inline-flex items-center gap-2 rounded-md text-sm border border-destructive/20 hover:bg-destructive/10 text-destructive h-8 px-3"
                            >
                              <XCircle className="h-3 w-3" /> Reject
                            </button>
                          </>
                        )}

                        {vendor.status === "Active" && (
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
