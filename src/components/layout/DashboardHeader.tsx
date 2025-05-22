
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DashboardHeader = () => {
  const { toast } = useToast();

  const showNotification = () => {
    toast({
      title: "Notifications",
      description: "You have no unread notifications",
    });
  };

  return (
    <header className="h-14 border-b border-border bg-background flex items-center justify-between px-6">
      <div className="lg:w-96 w-64">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-1.5 text-sm w-full rounded-md border border-input bg-transparent focus:outline-none focus:ring-2 focus:ring-ring focus:border-input transition-all"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={showNotification}
          className="p-1.5 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <Bell className="w-5 h-5" />
        </button>
        <div className="text-sm font-medium">
          Welcome back, <span className="text-taskflow-primary">John</span>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
