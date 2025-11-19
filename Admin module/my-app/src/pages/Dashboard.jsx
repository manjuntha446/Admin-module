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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#01060F] via-[#031226] to-[#041B37] text-white">
      {/* ambient glow layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/3 h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute bottom-0 right-5 h-80 w-80 rounded-full bg-sky-500/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 pb-16 pt-10 sm:px-6 lg:px-10">
        {/* Header Section */}
        <section className="rounded-[32px] border border-white/10 bg-white/5 px-6 py-10 text-center shadow-2xl shadow-black/30 backdrop-blur">
          <div className="flex justify-center">
            <div className="rounded-full border border-white/20 bg-white/10 p-4">
              <img
                src={logo}
                alt="Dashboard Logo"
                className="h-12 w-12 object-contain"
              />
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Dashboard Overview
          </h1>
          <p className="mt-2 text-base text-white/70">
            Monitor your platform performance and key metrics
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-semibold uppercase tracking-widest text-white/60">
            <span className="rounded-full border border-white/20 px-4 py-1">
              Real-time sync
            </span>
            <span className="rounded-full border border-white/20 px-4 py-1">
              Secure workspace
            </span>
            <span className="rounded-full border border-white/20 px-4 py-1">
              Live KPIs
            </span>
          </div>
        </section>

        {/* Main Section */}
        <section className="space-y-10">
          {/* Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                {...stat}
                className="rounded-3xl border border-white/15 bg-white/90 text-slate-900 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:shadow-2xl"
              />
            ))}
          </div>

          {/* Revenue Insights & Recent Bookings */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Revenue Insights */}
            <Card className="rounded-3xl border border-white/10 bg-white/95 text-[#0F172A] shadow-2xl shadow-black/15">
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
                  <div key={item.label} className="space-y-3 rounded-2xl border border-slate-100/80 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-[#1C4452]/80">
                        {item.label}
                      </span>
                      <span className="text-lg font-semibold text-[#1C4452]">
                        {item.value}
                      </span>
                    </div>

                    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E3EEF6]">
                      <div
                        className={`h-full ${getProgressColor(
                          item.percent
                        )} rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${item.percent}%`, minWidth: "5%" }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Bookings */}
            <Card className="rounded-3xl border border-white/10 bg-white/95 text-[#0F172A] shadow-2xl shadow-black/15">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[#00A389]">
                  <Clock className="h-5 w-5 text-[#00A389]" />
                  Recent Bookings
                </CardTitle>
                <CardDescription className="text-[#1C4452]/70">
                  Latest service requests and their status
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex flex-col gap-3 rounded-2xl border border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-[#0F172A]">
                        {booking.customer}
                      </p>
                      <p className="text-xs text-[#1C4452]/70">
                        {booking.service} • {booking.vendor}
                      </p>
                      <p className="text-xs text-[#1C4452]/60">{booking.time}</p>
                    </div>
                    <span
                      className={`self-start rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {booking.status}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
