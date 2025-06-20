import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SliceDataProvider } from "@/contexts/slice-data-context"
import { SliceChart } from "@/components/slice-chart"
import { SimpleTabs } from "@/components/ui/simple-tabs"
import { LinearInterpolationSlicingMethod } from "@/components/slicing-methods/linear-interpolation"
import { RandomDirectionSlicingMethod } from "@/components/slicing-methods/random-direction"
import { AxisParallelSlicingMethod } from "@/components/slicing-methods/axis-parallel"

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
  const slicingMethodTabs = [
    {
      id: "linear-interpolation",
      label: "Linear Interpolation",
      content: (
        <div className="pt-4">
          <LinearInterpolationSlicingMethod />
          <SliceChart />
        </div>
      ),
    },
    {
      id: "random-direction",
      label: "Random Direction",
      content: (
        <div className="pt-4">
          <RandomDirectionSlicingMethod />
          <SliceChart />
        </div>
      ),
    },
    {
      id: "axis-parallel",
      label: "Axis Parallel",
      content: (
        <div className="pt-4">
          <AxisParallelSlicingMethod />
          <SliceChart />
        </div>
      ),
    },
  ];
  
  return (
    <QueryClientProvider client={queryClient}>
      <SliceDataProvider>
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-auto p-4">
            <SimpleTabs 
              defaultValue="linear-interpolation" 
              tabs={slicingMethodTabs} 
              className="mb-4" 
            />
          </main>
        </SidebarProvider>
      </SliceDataProvider>
    </QueryClientProvider>
  )
}

export default App