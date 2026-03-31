import { Building2, CalendarCheck, DollarSign, TrendingUp, Key, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const stats = [
  { label: "Occupied Units", value: "18/24", icon: Building2, change: "75% Occupancy Rate" },
  { label: "Check-ins Today", value: "5", icon: Key, change: "3 Pending, 2 Completed" },
  { label: "Revenue (₦)", value: "4.2M", icon: DollarSign, change: "This month to date" },
  { label: "Needs Cleaning", value: "3", icon: Sparkles, change: "Schedule cleaners ASAP" },
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

const urgentTasks = [
  { property: "Ajah Beach House", task: "Deep Clean Required", status: "Urgent", time: "Before 2 PM" },
  { property: "Lekki Pearl Suite", task: "Keypad Battery Low", status: "Maintenance", time: "Today" },
  { property: "VI Luxury Flat", task: "Check-in Inspection", status: "Pending", time: "11 AM" },
];

const recentBookings = [
  { guest: "Adaeze Okafor", property: "Lekki Pearl Suite", checkIn: "Today", status: "Checking In" },
  { guest: "David Mensah", property: "VI Luxury Flat", checkIn: "Today", status: "Checking Out" },
  { guest: "Fatima Al-Hassan", property: "Ikoyi Grand Villa", checkIn: "Tomorrow", status: "Confirmed" },
  { guest: "James Obi", property: "Banana Island Penthouse", checkIn: "Apr 5", status: "Pending Payment" },
];

const OverviewPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl md:text-3xl">Operations Overview</h1>
        <p className="text-muted-foreground text-[14px] mt-1">Real-time pulse on your shortlet portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="bg-card border border-border/60 shadow-sm rounded-lg">
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                  <p className="text-display text-2xl mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">
                    {stat.change}
                  </p>
                </div>
                <div className="h-10 w-10 border border-border rounded-full flex items-center justify-center">
                  <stat.icon className="h-4 w-4 text-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
        <Card className="bg-card border border-border/60 shadow-sm rounded-lg">
          <CardHeader className="pb-2">
            <CardTitle className="text-[16px] font-bold">Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 4, opacity: 0.9 }}
                  formatter={(value: number) => [`₦${value.toLocaleString()}`, "Revenue"]}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--foreground))" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--foreground))" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-card border border-border/60 shadow-sm rounded-lg flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-[16px] font-bold">Action items today</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col gap-3">
             {urgentTasks.map((task, i) => (
                <div key={i} className="flex justify-between items-center p-3 rounded-md bg-muted/40 border border-border/40">
                  <div>
                    <p className="font-semibold text-[13px]">{task.property}</p>
                    <p className="text-xs text-muted-foreground leading-tight">{task.task}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-[11px] uppercase tracking-wider font-bold ${task.status === "Urgent" ? "text-destructive" : "text-foreground"}`}>{task.status}</p>
                    <p className="text-[11px] text-muted-foreground">{task.time}</p>
                  </div>
                </div>
             ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card className="bg-card border border-border/60 shadow-sm rounded-lg">
        <CardHeader className="pb-3 border-b border-border/40">
          <CardTitle className="text-[16px] font-bold">Today's Moves</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr className="border-b border-border/40">
                  <th className="text-left py-3 px-5 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Guest</th>
                  <th className="text-left py-3 px-5 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Property</th>
                  <th className="text-left py-3 px-5 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Check-in</th>
                  <th className="text-left py-3 px-5 text-[11px] text-muted-foreground uppercase tracking-wider font-bold">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b, i) => (
                  <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/10">
                    <td className="py-4 px-5 font-semibold text-[14px]">{b.guest}</td>
                    <td className="py-4 px-5 text-muted-foreground text-[14px]">{b.property}</td>
                    <td className="py-4 px-5 font-medium text-[14px]">{b.checkIn}</td>
                    <td className="py-4 px-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-[3px] text-[11px] uppercase tracking-wider font-bold border ${
                        b.status === "Checking In" ? "bg-muted text-foreground border-border" :
                        b.status === "Checking Out" ? "bg-muted text-muted-foreground border-border" :
                        b.status === "Confirmed" ? "bg-accent/10 text-accent border-accent/20" :
                        "bg-destructive/10 text-destructive border-destructive/20"
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
