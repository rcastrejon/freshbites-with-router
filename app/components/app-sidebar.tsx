import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Book, House, Icon } from "lucide-react";
import { appleCore } from "@lucide/lab";
import { Link } from "@tanstack/react-router";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center">
          <h2 className="font-serif text-3xl font-bold md:text-2xl">
            FreshB
            <Icon
              iconNode={appleCore}
              className="mb-1.5 inline h-6 w-6 md:h-5 md:w-5"
            />
            tes
          </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/"
                    activeOptions={{ includeSearch: false }}
                    activeProps={{ "data-active": "true" }}
                  >
                    <House />
                    Inicio
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    to="/recipes"
                    search={{ page: 1 }}
                    activeOptions={{ includeSearch: false }}
                    activeProps={{ "data-active": "true" }}
                  >
                    <Book />
                    Recetas
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
