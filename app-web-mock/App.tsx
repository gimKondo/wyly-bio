import { useState } from "react";
import { Header } from "./components/Header";
import { PostForm } from "./components/PostForm";
import { Feed } from "./components/Feed";
import { MapView } from "./components/MapView";
import { CalendarView } from "./components/CalendarView";
import { ViewSwitcher } from "./components/ViewSwitcher";
import { mockPosts } from "./data/mockPosts";

export default function App() {
  const [currentView, setCurrentView] = useState<"timeline" | "map" | "calendar">("timeline");

  const renderCurrentView = () => {
    switch (currentView) {
      case "timeline":
        return (
          <div className="space-y-6">
            <PostForm />
            <Feed />
          </div>
        );
      case "map":
        return <MapView posts={mockPosts} />;
      case "calendar":
        return <CalendarView posts={mockPosts} />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-6">
        <ViewSwitcher 
          currentView={currentView} 
          onViewChange={setCurrentView}
        />
        
        <div className="max-w-4xl mx-auto">
          {renderCurrentView()}
        </div>
      </main>
    </div>
  );
}