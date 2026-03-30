import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const monthlyRevenue = [
  { month: "Oct", revenue: 1200000 },
  { month: "Nov", revenue: 1800000 },
  { month: "Dec", revenue: 3200000 },
  { month: "Jan", revenue: 2100000 },
  { month: "Feb", revenue: 2600000 },
  { month: "Mar", revenue: 4200000 },
];

const occupancyData = [
  { property: "Lekki Pearl", rate: 78 },
  { property: "VI Flat", rate: 92 },
  { property: "Ikoyi Villa", rate: 65 },
  { property: "B. Island", rate: 45 },
  { property: "Ikeja Apt", rate: 85 },
];

const sourceData = [
  { name: "Direct", value: 42 },
  { name: "Google", value: 28 },
  { name: "Instagram", value: 18 },
  { name: "Referral", value: 12 },
];

const COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--olive))",
  "hsl(var(--warm-sand))",
];

const visitorData = [
  { day: "Mon", visitors: 120 },
  { day: "Tue", visitors: 98 },
  { day: "Wed", visitors: 145 },
  { day: "Thu", visitors: 167 },
  { day: "Fri", visitors: 210 },
  { day: "Sat", visitors: 280 },
  { day: "Sun", visitors: 250 },
];

const kpis = [
  { label: "Avg. Booking Value", value: "₦385K" },
  { label: "Avg. Stay Duration", value: "4.2 nights" },
  { label: "Repeat Guest Rate", value: "34%" },
  { label: "Cancellation Rate", value: "8%" },
];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl md:text-3xl">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Performance insights & trends</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="bg-card border-border">
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{kpi.label}</p>
              <p className="text-display text-xl mt-1">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Chart */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-display text-lg">Revenue (6 months)</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--accent))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--accent))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v / 1000000).toFixed(1)}M`} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 4, fontSize: 12 }} formatter={(value: number) => [`₦${value.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" strokeWidth={2.5} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Occupancy */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-display text-lg">Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={occupancyData} layout="vertical">
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="property" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 4, fontSize: 12 }} formatter={(value: number) => [`${value}%`, "Occupancy"]} />
                <Bar dataKey="rate" fill="hsl(var(--primary))" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-display text-lg">Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={sourceData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {sourceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 4, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Visitors */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-display text-lg">Weekly Visitors</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={visitorData}>
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 4, fontSize: 12 }} />
              <Bar dataKey="visitors" fill="hsl(var(--accent))" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;
