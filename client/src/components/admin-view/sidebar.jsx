import { ChartNoAxesCombined } from "lucide-react";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <BadgeCheck />,
  },
];

function MenuItems({setOpen}) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex-col flex gap-2">
      {adminSidebarMenuItems.map((menuItems) => (
        <div
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground text-xl cursor-pointer"
          key={menuItems.id}
          onClick={() => {navigate(menuItems.path)
          setOpen ? setOpen(false)  : null }}
        >
          {menuItems.icons}
          <span>{menuItems.label}</span>
        </div>
      ))}
    </nav>
  );
}
function AdminSidebar({open, setOpen}) {
  return (
    <Fragment>
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full">
                <SheetHeader className="border-b">
                    <SheetTitle className="flex gap-2 mt-5 mb-5">
                        <ChartNoAxesCombined size={30} />
                        <h1 className="text-2xl font-extrabold">Admin Panel</h1>
                    </SheetTitle>
                </SheetHeader>
                <MenuItems setOpen={setOpen}/>
            </div>
        </SheetContent>
    </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/admin/dashboard")}
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSidebar;
