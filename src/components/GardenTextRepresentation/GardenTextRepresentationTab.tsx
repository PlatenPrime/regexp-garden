import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import GardenTextTabIcon from "@public/assets/icons/garden-text-tab.svg";
import { GardenTextRepresentation } from "@/components/GardenTextRepresentation/GardenTextRepresentation";

export const GardenTextRepresentationTab = () => {
  return (
    <Tabs className="w-full">
      <TabList className="tab-list">
        <Tab className="tab single-tab">
          <div className="flex gap-3">
            <GardenTextTabIcon />
            Garden Text Representation
          </div>
        </Tab>
      </TabList>
      <TabPanel className="tabPanel">
        <GardenTextRepresentation />
      </TabPanel>
    </Tabs>
  );
};
