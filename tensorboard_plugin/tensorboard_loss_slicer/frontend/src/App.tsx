import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SliceDataProvider, useSliceDataContext, SliceType } from "@/contexts/slice-data-context"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { LinearInterpolationDashboard } from "@/components/dashboards/linear-interpolation-dashboard"
import { RandomDirectionDashboard } from "@/components/dashboards/random-direction-dashboard"
import { AxisParallelDashboard } from "@/components/dashboards/axis-parallel-dashboard"

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: Infinity,           // Never consider data stale
      gcTime: 60 * 60 * 1000,     // 1 hour in memory
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  }
})

function MainContent() {
  const { activeSliceType, setActiveSliceType } = useSliceDataContext();

  return (
    <main className="flex-1 overflow-auto p-4 space-y-4">
      <Tabs 
        value={activeSliceType} 
        onValueChange={(value) => setActiveSliceType(value as SliceType)}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="linear-interpolation">Linear Interpolation</TabsTrigger>
          <TabsTrigger value="random-direction">Random Direction</TabsTrigger>
          <TabsTrigger value="axis-parallel">Axis Parallel</TabsTrigger>
        </TabsList>
        
        <TabsContent value="linear-interpolation" className="mt-4">
          <LinearInterpolationDashboard />
        </TabsContent>
        
        <TabsContent value="random-direction" className="mt-4">
          <RandomDirectionDashboard />
        </TabsContent>
        
        <TabsContent value="axis-parallel" className="mt-4">
          <AxisParallelDashboard />
        </TabsContent>
      </Tabs>
    </main>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SliceDataProvider>
        <SidebarProvider>
          <AppSidebar />
          <MainContent />
        </SidebarProvider>
      </SliceDataProvider>
    </QueryClientProvider>
  )
}

export default App