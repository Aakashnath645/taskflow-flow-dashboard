
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChartBar, 
  FolderOpen, 
  ListCheck, 
  Users, 
  Settings, 
  ChevronRight, 
  Plus,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarItemProps = {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
  isCollapsed?: boolean;
};

const SidebarItem = ({ icon, label, path, isActive = false, isCollapsed = false }: SidebarItemProps) => {
  return (
    <Link
      to={path}
      className={cn(
        "flex items-center py-2 px-3 rounded-md text-sm font-medium transition-all",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground" 
          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground",
        isCollapsed && "justify-center"
      )}
    >
      <div className="w-5 h-5 mr-2">{icon}</div>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

type SidebarSectionProps = {
  title: string;
  children: React.ReactNode;
  isCollapsed?: boolean;
};

const SidebarSection = ({ title, children, isCollapsed = false }: SidebarSectionProps) => {
  return (
    <div className="mb-6">
      {!isCollapsed && (
        <h3 className="px-3 mb-1 text-xs uppercase tracking-wider text-sidebar-foreground/50">
          {title}
        </h3>
      )}
      <div className="space-y-1">{children}</div>
    </div>
  );
};

const DashboardSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div 
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-14 px-3 border-b border-sidebar-border">
        {!isCollapsed && (
          <Link to="/" className="font-semibold text-lg flex items-center space-x-2 text-sidebar-foreground">
            <span className="text-taskflow-primary">Task</span>
            <span>Flow</span>
          </Link>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "p-1 rounded-md text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all",
            isCollapsed && "mx-auto"
          )}
        >
          <ChevronRight className={`w-5 h-5 transition-all ${isCollapsed ? "rotate-180" : ""}`} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3">
        <SidebarSection title="General" isCollapsed={isCollapsed}>
          <SidebarItem
            icon={<ChartBar className="w-5 h-5" />}
            label="Dashboard"
            path="/"
            isActive={currentPath === "/"}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<FolderOpen className="w-5 h-5" />}
            label="Projects"
            path="/projects"
            isActive={currentPath === "/projects"}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<ListCheck className="w-5 h-5" />}
            label="Tasks"
            path="/tasks"
            isActive={currentPath === "/tasks"}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<Users className="w-5 h-5" />}
            label="Team"
            path="/team"
            isActive={currentPath === "/team"}
            isCollapsed={isCollapsed}
          />
        </SidebarSection>

        <SidebarSection title="Settings" isCollapsed={isCollapsed}>
          <SidebarItem
            icon={<User className="w-5 h-5" />}
            label="Profile"
            path="/profile"
            isActive={currentPath === "/profile"}
            isCollapsed={isCollapsed}
          />
          <SidebarItem
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            path="/settings"
            isActive={currentPath === "/settings"}
            isCollapsed={isCollapsed}
          />
        </SidebarSection>
      </div>

      {!isCollapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <button className="w-full bg-taskflow-primary hover:bg-taskflow-primary-dark text-white rounded-md py-2 flex items-center justify-center font-medium transition-colors">
            <Plus className="w-4 h-4 mr-2" /> New Project
          </button>
        </div>
      )}

      <div className="p-3 border-t border-sidebar-border flex items-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-taskflow-primary to-taskflow-primary-light flex items-center justify-center text-white font-medium">
          JD
        </div>
        {!isCollapsed && (
          <div className="ml-3 flex-1 flex justify-between items-center">
            <div>
              <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
              <p className="text-xs text-sidebar-foreground/60">john@example.com</p>
            </div>
            <button className="text-sidebar-foreground/60 hover:text-sidebar-foreground p-1 rounded-md hover:bg-sidebar-accent/50 transition-colors">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
