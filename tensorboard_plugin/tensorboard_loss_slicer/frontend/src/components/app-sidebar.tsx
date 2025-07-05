import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar"


import { RunSelector } from "./run-selector"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="space-y-1 p-2">
            <RunSelector />
          </div>
          
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
