
import { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FacilityStats {
  [key: string]: string;
}

interface FacilityCardProps {
  name: string;
  icon: ReactNode;
  stats: FacilityStats;
  status: string;
}

const FacilityCard = ({ name, icon, stats, status }: FacilityCardProps) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary-50 pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          {icon}
        </div>
        <CardDescription>
          Status: <span className="text-green-500">{status}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key}>
              <p className="text-sm text-gray-500 capitalize">{key}</p>
              <p className="font-medium">{value}</p>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="border-t bg-gray-50 p-2">
        <Button variant="link" className="text-primary-600 p-0 h-auto w-full text-center">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FacilityCard;
