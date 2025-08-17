import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { Calendar, Map, Clock } from "lucide-react";

interface ViewSwitcherProps {
  currentView: "timeline" | "map" | "calendar";
  onViewChange: (view: "timeline" | "map" | "calendar") => void;
}

export function ViewSwitcher({ currentView, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <Tabs value={currentView} onValueChange={onViewChange as (value: string) => void}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            タイムライン
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            地図
          </TabsTrigger>
          <TabsTrigger value="calendar" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            カレンダー
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}