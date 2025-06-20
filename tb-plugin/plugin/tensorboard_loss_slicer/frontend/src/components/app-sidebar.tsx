import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar"

import { DataSelector } from "@/components/data-selector"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="space-y-1">
            <DataSelector />
          </div>
          
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}