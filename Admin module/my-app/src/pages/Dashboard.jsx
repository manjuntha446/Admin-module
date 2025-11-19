import { StatCard } from "@/components/StatCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Users,
  UserCheck,
  CreditCard,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react";
import logo from "@/assets/convenzlogo.png"; // ✅ adjust if your path differs

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "12,458",
      icon: Users,
      trend: { value: "12.5%", isPositive: true },
    },
    {
      title: "Active Vendors",
      value: "842",
      icon: UserCheck,
      trend: { value: "8.2%", isPositive: true },
    },
    {
      title: "Active Packs",
      value: "5,234",
      icon: CreditCard,
      trend: { value: "3.1%", isPositive: false },
    },
    {
      title: "Live Jobs",
      value: "127",
      icon: Calendar,
      description: "Currently active",
    },
  ];

  const recentBookings = [
    {
      id: 1,
      customer: "Manjuntha",
      service: "Painting",
      vendor: "CleanPro",
      status: "In Progress",
      time: "2 mins ago",
    },
    {
      id: 2,
      customer: "Darshu",
      service: "Salon",
      vendor: "Beauty Hub",
      status: "Completed",
      time: "15 mins ago",
    },
    {
      id: 3,
      customer: "Mike Johnson",
      service: "Plumbing",
      vendor: "QuickFix",
      status: "Assigned",
      time: "23 mins ago",
    },
    {
      id: 4,
      customer: "Emma Wilson",
      service: "AC Repair",
      vendor: "CoolTech",
      status: "Pending",
      time: "45 mins ago",
    },
  ];

  const getProgressColor = (percent) => {
    if (percent < 40) return "bg-red-500";
    if (percent < 70) return "bg-yellow-400";
    return "bg-[#00A389]";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "text-green-700 bg-green-100";
      case "In Progress":
        return "text-blue-700 bg-blue-100";
      case "Assigned":
        return "text-purple-700 bg-purple-100";
      case "Pending":
        return "text-yellow-700 bg-yellow-100";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1C4452] text-white ml-4 md:ml-6 lg:ml-8 transition-all">
      {/* Header Section */}
      <div className="bg-[#DDEEF3] px-8 py-8 shadow-md rounded-tl-3xl text-center">
        {/* ✅ Centered Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Dashboard Logo"
            className="h-16 w-auto object-contain"
          />
        </div>

        <h1 className="text-3xl font-bold text-[#1C4452]">
          Dashboard Overview
        </h1>
        <p className="text-[#1C4452]/80 mt-1">
          Monitor your platform performance and key metrics
        </p>
      </div>

      {/* Main Section */}
      <div className="flex-1 p-8 bg-[#1C4452] space-y-8 overflow-auto rounded-tl-3xl">
        {/* Stats Grid */}
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.title}
              {...stat}
              className="bg-white text-[#1C4452] shadow-md border border-[#DDEEF3]/40 hover:shadow-lg transition"
            />
          ))}
        </div>

        {/* Revenue Insights & Recent Bookings */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Revenue Insights */}
          <Card className="bg-white text-[#1C4452] shadow-lg border border-[#DDEEF3]/50 rounded-2xl hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#00A389]">
                <TrendingUp className="h-5 w-5 text-[#00A389]" />
                Revenue Insights
              </CardTitle>
              <CardDescription className="text-[#1C4452]/70">
                Performance metrics for the current month
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {[ 
                { label: "Daily Revenue", value: "₹45,280", percent: 75 },
                { label: "Active Subscriptions", value: "3,000", percent: 60 },
                { label: "Vendor Response Rate", value: "92%", percent: 92 },
              ].map((item) => (
                <div key={item.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#1C4452]/80">
                      {item.label}
                    </span>
                    <span className="text-lg font-semibold text-[#1C4452]">
                      {item.value}
                    </span>
                  </div>

                  <div className="w-full h-2 bg-[#DDEEF3] rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(
                        item.percent
                      )} rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${item.percent}%`, minWidth: "5%" }}
                    ></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card className="bg-white text-[#1C4452] shadow-lg border border-[#DDEEF3]/50 rounded-2xl hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#00A389]">
                <Clock className="h-5 w-5 text-[#00A389]" />
                Recent Bookings
              </CardTitle>
              <CardDescription className="text-[#1C4452]/70">
                Latest service requests and their status
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#DDEEF3] pb-3 last:border-0 last:pb-0"
                  >
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium text-[#1C4452]">
                        {booking.customer}
                      </p>
                      <p className="text-xs text-[#1C4452]/70">
                        {booking.service} • {booking.vendor}
                      </p>
                      <p className="text-xs text-[#1C4452]/60">
                        {booking.time}
                      </p>
                    </div>
                    <span
                      className={`text-xs font-medium px-2 py-1 mt-2 sm:mt-0 rounded-full ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
