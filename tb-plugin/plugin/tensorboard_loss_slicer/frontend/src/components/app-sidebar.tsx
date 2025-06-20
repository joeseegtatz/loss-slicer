import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar"

import { DataSelector } from "@/components/data-selector"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-lg font-semibold">Loss Slicer</h2>
      </SidebarHeader>
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