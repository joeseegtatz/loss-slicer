import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function App() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        

      </main>
    </SidebarProvider>
  )
}

export default App