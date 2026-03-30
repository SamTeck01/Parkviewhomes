import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Booking {
  id: string;
  guest: string;
  email: string;
  property: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  total: string;
  status: "Confirmed" | "Pending" | "Checked In" | "Completed" | "Cancelled";
}

const initialBookings: Booking[] = [
  { id: "BK-001", guest: "Adaeze Okafor", email: "adaeze@mail.com", property: "Lekki Pearl Suite", checkIn: "Mar 28, 2026", checkOut: "Apr 2, 2026", nights: 5, total: "₦425,000", status: "Confirmed" },
  { id: "BK-002", guest: "David Mensah", email: "david.m@mail.com", property: "VI Luxury Flat", checkIn: "Mar 30, 2026", checkOut: "Apr 3, 2026", nights: 4, total: "₦480,000", status: "Pending" },
  { id: "BK-003", guest: "Fatima Al-Hassan", email: "fatima@mail.com", property: "Ikoyi Grand Villa", checkIn: "Apr 2, 2026", checkOut: "Apr 7, 2026", nights: 5, total: "₦1,250,000", status: "Confirmed" },
  { id: "BK-004", guest: "James Obi", email: "james.obi@mail.com", property: "Banana Island Penthouse", checkIn: "Apr 5, 2026", checkOut: "Apr 10, 2026", nights: 5, total: "₦2,250,000", status: "Pending" },
  { id: "BK-005", guest: "Chioma Eze", email: "chioma@mail.com", property: "Ikeja City Apartment", checkIn: "Mar 20, 2026", checkOut: "Mar 25, 2026", nights: 5, total: "₦275,000", status: "Completed" },
  { id: "BK-006", guest: "Emeka Nwosu", email: "emeka@mail.com", property: "Lekki Pearl Suite", checkIn: "Mar 15, 2026", checkOut: "Mar 18, 2026", nights: 3, total: "₦255,000", status: "Completed" },
  { id: "BK-007", guest: "Sarah Johnson", email: "sarah.j@mail.com", property: "VI Luxury Flat", checkIn: "Apr 8, 2026", checkOut: "Apr 12, 2026", nights: 4, total: "₦480,000", status: "Confirmed" },
  { id: "BK-008", guest: "Kwame Asante", email: "kwame@mail.com", property: "Ajah Beach House", checkIn: "Mar 10, 2026", checkOut: "Mar 13, 2026", nights: 3, total: "₦285,000", status: "Cancelled" },
];

const statusColors: Record<Booking["status"], string> = {
  Confirmed: "bg-accent/10 text-accent border-accent/20",
  Pending: "bg-amber/10 text-amber border-amber/20",
  "Checked In": "bg-olive/10 text-olive border-olive/20",
  Completed: "bg-muted text-muted-foreground border-border",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

const BookingsPage = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const { toast } = useToast();

  const filtered = bookings.filter((b) => {
    const matchesSearch = b.guest.toLowerCase().includes(search.toLowerCase()) ||
      b.property.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const updateStatus = (id: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    toast({ title: "Booking updated", description: `Status changed to ${newStatus}` });
  };

  const summaryStats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === "Confirmed").length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-2xl md:text-3xl">Bookings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage guest reservations</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: summaryStats.total },
          { label: "Confirmed", value: summaryStats.confirmed },
          { label: "Pending", value: summaryStats.pending },
          { label: "Completed", value: summaryStats.completed },
        ].map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className="text-display text-2xl mt-1">{s.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Checked In">Checked In</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bookings Table */}
      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">ID</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Guest</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider font-medium hidden md:table-cell">Property</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider font-medium hidden lg:table-cell">Dates</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Total</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Status</th>
                  <th className="text-left p-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((booking) => (
                  <tr key={booking.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-mono text-xs text-muted-foreground">{booking.id}</td>
                    <td className="p-4">
                      <p className="font-medium">{booking.guest}</p>
                      <p className="text-xs text-muted-foreground">{booking.email}</p>
                    </td>
                    <td className="p-4 text-muted-foreground hidden md:table-cell">{booking.property}</td>
                    <td className="p-4 text-muted-foreground hidden lg:table-cell">
                      <p className="text-xs">{booking.checkIn}</p>
                      <p className="text-xs">→ {booking.checkOut}</p>
                      <p className="text-xs text-accent">{booking.nights} nights</p>
                    </td>
                    <td className="p-4 font-semibold">{booking.total}</td>
                    <td className="p-4">
                      <span className={`inline-flex px-2 py-0.5 rounded-sm text-xs font-medium border ${statusColors[booking.status]}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {booking.status === "Pending" && (
                        <Button size="sm" variant="outline" className="text-xs h-7 rounded-sm" onClick={() => updateStatus(booking.id, "Confirmed")}>
                          Confirm
                        </Button>
                      )}
                      {booking.status === "Confirmed" && (
                        <Button size="sm" variant="outline" className="text-xs h-7 rounded-sm" onClick={() => updateStatus(booking.id, "Checked In")}>
                          Check In
                        </Button>
                      )}
                      {booking.status === "Checked In" && (
                        <Button size="sm" variant="outline" className="text-xs h-7 rounded-sm" onClick={() => updateStatus(booking.id, "Completed")}>
                          Complete
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">No bookings found.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingsPage;
