import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SliceDataProvider, useSliceDataContext, SliceType } from "@/contexts/slice-data-context"
import { SimpleTabs } from "@/components/ui/simple-tabs"
import { LinearInterpolationDashboard } from "@/components/dashboards/linear-interpolation-dashboard"
import { RandomDirectionDashboard } from "@/components/dashboards/random-direction-dashboard"
import { AxisParallelDashboard } from "@/components/dashboards/axis-parallel-dashboard"

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

function MainContent() {
  const { setActiveSliceType } = useSliceDataContext();

  const slicingMethodTabs = [
    {
      id: "linear-interpolation",
      label: "Linear Interpolation",
      content: (
        <div className="pt-4">
          <LinearInterpolationDashboard />
        </div>
      ),
    },
    {
      id: "random-direction",
      label: "Random Direction",
      content: (
        <div className="pt-4">
          <RandomDirectionDashboard />
        </div>
      ),
    },
    {
      id: "axis-parallel",
      label: "Axis Parallel",
      content: (
        <div className="pt-4">
          <AxisParallelDashboard />
        </div>
      ),
    },
  ];

  const handleTabChange = (tabId: string) => {
    setActiveSliceType(tabId as SliceType);
  };
  
  return (
    <main className="flex-1 overflow-auto p-4">
      <SimpleTabs 
        defaultValue="linear-interpolation" 
        tabs={slicingMethodTabs} 
        className="mb-4"
        onTabChange={handleTabChange}
      />
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