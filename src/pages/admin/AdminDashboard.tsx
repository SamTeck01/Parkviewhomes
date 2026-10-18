import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b border-border px-4 bg-background/80 backdrop-blur-md sticky top-0 z-30">
            <SidebarTrigger className="mr-4" />
            <div className="flex items-center gap-3 border-l-2 border-border/40 pl-4 h-8 ml-2">
              <span className="text-[13px] md:text-[14px] font-bold leading-[1.1] tracking-wide uppercase text-foreground">
                Parkview<br/>Realty
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground bg-muted px-2 py-0.5 rounded-sm">Admin</span>
            </div>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminDashboard;
