
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChartBar, ListCheck, FolderOpen, Users, ArrowRight } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/ui/stat-card';
import TaskCard from '@/components/ui/task-card';
import ProjectCard from '@/components/ui/project-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Mock data
const recentTasks = [
  {
    id: '1',
    title: 'Update landing page design',
    description: 'Make the hero section more appealing with better visuals.',
    priority: 'high' as const,
    dueDate: 'May 24, 2025',
    assignee: { name: 'John Doe' },
    status: 'in-progress' as const,
  },
  {
    id: '2',
    title: 'Fix payment integration',
    description: 'Debug the issue with Stripe payment processing.',
    priority: 'high' as const,
    dueDate: 'May 23, 2025',
    assignee: { name: 'Alice Smith' },
    status: 'to-do' as const,
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints for the developer portal.',
    priority: 'medium' as const,
    dueDate: 'May 25, 2025',
    assignee: { name: 'Bob Johnson' },
    status: 'review' as const,
  },
];

const projects = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design.',
    progress: 68,
    dueDate: 'Jun 15, 2025',
    members: [
      { name: 'John Doe' },
      { name: 'Alice Smith' },
      { name: 'Bob Johnson' },
      { name: 'Emily Davis' },
    ],
    status: 'active' as const,
  },
  {
    id: '2',
    title: 'Mobile App Development',
    description: 'Creating a cross-platform mobile application.',
    progress: 42,
    dueDate: 'Jul 30, 2025',
    members: [
      { name: 'John Doe' },
      { name: 'Charlie Brown' },
      { name: 'Diana Prince' },
    ],
    status: 'active' as const,
  },
];

const activities = [
  { id: '1', user: 'John Doe', action: 'completed task', target: 'Create mockups', time: '2 hours ago' },
  { id: '2', user: 'Alice Smith', action: 'commented on', target: 'API Documentation', time: '3 hours ago' },
  { id: '3', user: 'Bob Johnson', action: 'created project', target: 'Q3 Marketing Campaign', time: '5 hours ago' },
  { id: '4', user: 'Emily Davis', action: 'assigned task to', target: 'Charlie Brown', time: '6 hours ago' },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <StatCard
            title="Total Projects"
            value="12"
            icon={<FolderOpen />}
            trend={{ value: 8, isPositive: true }}
            description="vs last month"
          />
          <StatCard
            title="Pending Tasks"
            value="24"
            icon={<ListCheck />}
            trend={{ value: 12, isPositive: false }}
            description="vs last month"
          />
          <StatCard
            title="Team Members"
            value="8"
            icon={<Users />}
            trend={{ value: 2, isPositive: true }}
            description="vs last month"
          />
          <StatCard
            title="Completion Rate"
            value="76%"
            icon={<ChartBar />}
            trend={{ value: 5, isPositive: true }}
            description="vs last month"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Recent Projects</CardTitle>
                <Button onClick={() => navigate('/projects')} variant="ghost" className="text-sm flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4">
                {projects.map(project => (
                  <ProjectCard
                    key={project.id}
                    {...project}
                    onClick={(id) => navigate(`/projects/${id}`)}
                  />
                ))}
              </CardContent>
            </Card>
            
            <Card className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg">Recent Tasks</CardTitle>
                <Button onClick={() => navigate('/tasks')} variant="ghost" className="text-sm flex items-center">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4">
                {recentTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onCardClick={(id) => navigate(`/tasks/${id}`)}
                  />
                ))}
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start">
                      <div className="mr-4">
                        <div className="w-7 h-7 rounded-full bg-taskflow-primary flex items-center justify-center text-white text-xs">
                          {activity.user.split(' ')[0][0] + activity.user.split(' ')[1][0]}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>{' '}
                          <span className="text-muted-foreground">{activity.action}</span>{' '}
                          <span className="font-medium">{activity.target}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
