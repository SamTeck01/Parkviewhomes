import { useState } from "react";
import { Plus, Search, MoreVertical, Edit, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  status: "Active" | "Draft" | "Inactive";
  image: string;
  occupancy: number;
}

const initialProperties: Property[] = [
  { id: "1", title: "Lekki Pearl Suite", location: "Lekki Phase 1, Lagos", price: "₦85,000", bedrooms: 2, status: "Active", image: "/placeholder.svg", occupancy: 78 },
  { id: "2", title: "VI Luxury Flat", location: "Victoria Island, Lagos", price: "₦120,000", bedrooms: 3, status: "Active", image: "/placeholder.svg", occupancy: 92 },
  { id: "3", title: "Ikoyi Grand Villa", location: "Ikoyi, Lagos", price: "₦250,000", bedrooms: 5, status: "Active", image: "/placeholder.svg", occupancy: 65 },
  { id: "4", title: "Banana Island Penthouse", location: "Banana Island, Lagos", price: "₦450,000", bedrooms: 4, status: "Draft", image: "/placeholder.svg", occupancy: 0 },
  { id: "5", title: "Ikeja City Apartment", location: "Ikeja GRA, Lagos", price: "₦55,000", bedrooms: 1, status: "Active", image: "/placeholder.svg", occupancy: 85 },
  { id: "6", title: "Ajah Beach House", location: "Ajah, Lagos", price: "₦95,000", bedrooms: 3, status: "Inactive", image: "/placeholder.svg", occupancy: 0 },
];

const PropertiesPage = () => {
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const filtered = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "all" || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    toast({ title: "Property deleted", description: "The property has been removed." });
  };

  const handleAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const newProp: Property = {
      id: String(Date.now()),
      title: form.get("title") as string,
      location: form.get("location") as string,
      price: `₦${Number(form.get("price")).toLocaleString()}`,
      bedrooms: Number(form.get("bedrooms")),
      status: "Draft",
      image: "/placeholder.svg",
      occupancy: 0,
    };
    setProperties((prev) => [newProp, ...prev]);
    setDialogOpen(false);
    toast({ title: "Property added", description: `${newProp.title} has been added as draft.` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-display text-2xl md:text-3xl">Properties</h1>
          <p className="text-muted-foreground text-sm mt-1">{properties.length} total properties</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm gap-2">
              <Plus className="h-4 w-4" /> Add Property
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-display text-xl">Add New Property</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="title">Property Name</Label>
                <Input id="title" name="title" placeholder="e.g. Lekki Pearl Suite" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" name="location" placeholder="e.g. Lekki Phase 1, Lagos" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price per night (₦)</Label>
                  <Input id="price" name="price" type="number" placeholder="85000" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bedrooms">Bedrooms</Label>
                  <Input id="bedrooms" name="bedrooms" type="number" placeholder="2" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" name="description" placeholder="Describe the property..." rows={3} />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                <Button type="submit" className="bg-primary text-primary-foreground rounded-sm">Save Property</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((property) => (
          <Card key={property.id} className="bg-card border-border overflow-hidden">
            <div className="h-40 bg-muted relative">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <span className={`absolute top-3 left-3 px-2 py-0.5 rounded-sm text-xs font-medium ${
                property.status === "Active" ? "bg-accent/90 text-accent-foreground" :
                property.status === "Draft" ? "bg-muted text-muted-foreground" :
                "bg-destructive/90 text-destructive-foreground"
              }`}>
                {property.status}
              </span>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0">
                  <h3 className="font-heading text-base font-medium truncate">{property.title}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{property.location}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="gap-2"><Eye className="h-3.5 w-3.5" /> View</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Edit className="h-3.5 w-3.5" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive" onClick={() => handleDelete(property.id)}>
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                <div>
                  <p className="text-sm font-semibold">{property.price}<span className="text-xs text-muted-foreground font-normal">/night</span></p>
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{property.bedrooms} bed{property.bedrooms > 1 ? "s" : ""}</span>
                  {property.occupancy > 0 && (
                    <span className="text-accent font-medium">{property.occupancy}% occ.</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No properties found.</p>
        </div>
      )}
    </div>
  );
};

export default PropertiesPage;
