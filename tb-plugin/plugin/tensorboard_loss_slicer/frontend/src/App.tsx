import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SliceDataProvider } from "@/contexts/slice-data-context"
import { SliceChart } from "@/components/slice-chart"

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
      <SliceDataProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto p-4">
            <SliceChart />
          </main>
        </SidebarProvider>
      </SliceDataProvider>
    </QueryClientProvider>
  )
}

export default App