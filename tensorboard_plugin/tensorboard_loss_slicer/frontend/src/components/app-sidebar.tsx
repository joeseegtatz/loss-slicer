import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
} from "@/components/ui/sidebar"

import { RunSelector } from "./run-selector"
import { AxisControls } from "./axis-controls"
import { useSliceDataContext } from "@/contexts/slice-data-context"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function AppSidebar() {
  const { activeSliceType } = useSliceDataContext();

  const getAxisConfig = () => {
    switch (activeSliceType) {
      case 'linear-interpolation':
        return { 
          axes: ['x', 'y'] as ('x' | 'y' | 'z')[], 
          labels: { x: 'Alpha', y: 'Loss' } 
        };
      case 'random-direction':
        return { 
          axes: ['x', 'y', 'z'] as ('x' | 'y' | 'z')[], 
          labels: { x: 'Direction 1', y: 'Direction 2', z: 'Loss' } 
        };
      case 'axis-parallel':
        return { 
          axes: ['x', 'y'] as ('x' | 'y' | 'z')[], 
          labels: { x: 'Parameter Value', y: 'Loss' } 
        };
      default:
        return { 
          axes: ['x', 'y'] as ('x' | 'y' | 'z')[], 
          labels: { x: 'X', y: 'Y' } 
        };
    }
  };

  const axisConfig = getAxisConfig();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <div className="space-y-4 p-2">
            <RunSelector />
            
            <Separator />
            

            {/* Axis Controls Start */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="axis-controls">
                <AccordionTrigger className="text-sm font-medium">
                  Axis Range Controls
                </AccordionTrigger>
                <AccordionContent>
                  <AxisControls 
                    sliceType={activeSliceType}
                    availableAxes={axisConfig.axes}
                    axisLabels={axisConfig.labels}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* Axis Controls End */}

            
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
