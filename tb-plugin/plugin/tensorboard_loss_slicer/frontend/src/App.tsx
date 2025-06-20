import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30000,
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 overflow-auto p-4">
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground text-center">
              Select a run and tag from the sidebar to view your data
            </p>
          </div>
        </main>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default App