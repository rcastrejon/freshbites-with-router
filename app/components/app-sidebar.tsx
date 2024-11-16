import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Icon } from "lucide-react";
import { appleCore } from "@lucide/lab";

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
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
