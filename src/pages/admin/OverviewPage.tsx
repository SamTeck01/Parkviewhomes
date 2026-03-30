import { Building2, CalendarCheck, DollarSign, TrendingUp, Users, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Total Properties", value: "24", icon: Building2, change: "+3 this month" },
  { label: "Active Bookings", value: "18", icon: CalendarCheck, change: "+5 this week" },
  { label: "Revenue (₦)", value: "4.2M", icon: DollarSign, change: "+12% vs last month" },
  { label: "Site Visitors", value: "1,847", icon: Eye, change: "+23% this week" },
];

const revenueData = [
  { month: "Jan", revenue: 1800000 },
  { month: "Feb", revenue: 2200000 },
  { month: "Mar", revenue: 1900000 },
  { month: "Apr", revenue: 3100000 },
  { month: "May", revenue: 2800000 },
  { month: "Jun", revenue: 4200000 },
];

const bookingsData = [
  { week: "W1", bookings: 4 },
  { week: "W2", bookings: 7 },
  { week: "W3", bookings: 5 },
  { week: "W4", bookings: 9 },
  { week: "W5", bookings: 6 },
  { week: "W6", bookings: 11 },
];

const recentBookings = [
  { guest: "Adaeze Okafor", property: "Lekki Pearl Suite", checkIn: "Mar 28", status: "Confirmed" },
  { guest: "David Mensah", property: "VI Luxury Flat", checkIn: "Mar 30", status: "Pending" },
  { guest: "Fatima Al-Hassan", property: "Ikoyi Grand Villa", checkIn: "Apr 2", status: "Confirmed" },
  { guest: "James Obi", property: "Banana Island Penthouse", checkIn: "Apr 5", status: "Pending" },
];

const OverviewPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl md:text-3xl">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">Welcome back. Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border-border">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-display text-2xl mt-1">{stat.value}</p>
                  <p className="text-xs text-accent mt-2 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.change}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-sm bg-primary/5 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-display text-lg">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 4, fontSize: 12 }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, "Revenue"]}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--accent))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-display text-lg">Weekly Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={bookingsData}>
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 4, fontSize: 12 }}
                />
                <Bar dataKey="bookings" fill="hsl(var(--primary))" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-display text-lg">Recent Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2.5 text-xs text-muted-foreground uppercase tracking-wider font-medium">Guest</th>
                  <th className="text-left py-2.5 text-xs text-muted-foreground uppercase tracking-wider font-medium">Property</th>
                  <th className="text-left py-2.5 text-xs text-muted-foreground uppercase tracking-wider font-medium">Check-in</th>
                  <th className="text-left py-2.5 text-xs text-muted-foreground uppercase tracking-wider font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-3 font-medium">{b.guest}</td>
                    <td className="py-3 text-muted-foreground">{b.property}</td>
                    <td className="py-3 text-muted-foreground">{b.checkIn}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-sm text-xs font-medium ${
                        b.status === "Confirmed"
                          ? "bg-accent/10 text-accent"
                          : "bg-muted text-muted-foreground"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewPage;
