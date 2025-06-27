
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MobileTabsProps {
  activeTab: string;
  onValueChange: (value: string) => void;
}

const MobileTabs = ({ activeTab, onValueChange }: MobileTabsProps) => {
  return (
    <div className="md:hidden mb-6">
      <Tabs value={activeTab} onValueChange={onValueChange}>
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="guests">Guests</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="notifications">Alerts</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default MobileTabs;
