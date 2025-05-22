
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, ArrowUpDown, 
  Calendar, ListCheck, ArrowRight 
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskCard from '@/components/ui/task-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data
const tasksData = [
  {
    id: '1',
    title: 'Update landing page design',
    description: 'Make the hero section more appealing with better visuals and clearer call-to-action buttons.',
    priority: 'high' as const,
    dueDate: 'May 24, 2025',
    assignee: { name: 'John Doe' },
    status: 'in-progress' as const,
    projectId: '1',
    projectName: 'Website Redesign'
  },
  {
    id: '2',
    title: 'Fix payment integration',
    description: 'Debug the issue with Stripe payment processing in the checkout flow.',
    priority: 'high' as const,
    dueDate: 'May 23, 2025',
    assignee: { name: 'Alice Smith' },
    status: 'to-do' as const,
    projectId: '2',
    projectName: 'Mobile App Development'
  },
  {
    id: '3',
    title: 'Write API documentation',
    description: 'Document all API endpoints for the developer portal with examples and use cases.',
    priority: 'medium' as const,
    dueDate: 'May 25, 2025',
    assignee: { name: 'Bob Johnson' },
    status: 'review' as const,
    projectId: '3',
    projectName: 'API Integration'
  },
  {
    id: '4',
    title: 'Create onboarding flow',
    description: 'Design and implement user onboarding sequence for new sign-ups.',
    priority: 'medium' as const,
    dueDate: 'May 27, 2025',
    assignee: { name: 'Emily Davis' },
    status: 'to-do' as const,
    projectId: '1',
    projectName: 'Website Redesign'
  },
  {
    id: '5',
    title: 'Setup analytics tracking',
    description: 'Integrate Google Analytics and set up custom events for key user actions.',
    priority: 'low' as const,
    dueDate: 'May 26, 2025',
    assignee: { name: 'Charlie Brown' },
    status: 'done' as const,
    projectId: '4',
    projectName: 'Marketing Campaign'
  },
  {
    id: '6',
    title: 'Design email templates',
    description: 'Create responsive email templates for the marketing automation system.',
    priority: 'medium' as const,
    dueDate: 'May 29, 2025',
    assignee: { name: 'Diana Prince' },
    status: 'in-progress' as const,
    projectId: '4',
    projectName: 'Marketing Campaign'
  },
  {
    id: '7',
    title: 'User testing sessions',
    description: 'Conduct user testing sessions with the beta testers to gather feedback.',
    priority: 'high' as const,
    dueDate: 'May 30, 2025',
    assignee: { name: 'Emily Davis' },
    status: 'to-do' as const,
    projectId: '5',
    projectName: 'User Research'
  },
  {
    id: '8',
    title: 'Data migration script',
    description: 'Write the data migration script to transfer data to the new database.',
    priority: 'high' as const,
    dueDate: 'May 31, 2025',
    assignee: { name: 'Bob Johnson' },
    status: 'in-progress' as const,
    projectId: '6',
    projectName: 'Database Migration'
  },
];

const Tasks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('dueDate');
  
  const filteredTasks = tasksData
    .filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'priority') {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  
  // Group by status for kanban view
  const tasksByStatus = {
    'to-do': filteredTasks.filter(task => task.status === 'to-do'),
    'in-progress': filteredTasks.filter(task => task.status === 'in-progress'),
    'review': filteredTasks.filter(task => task.status === 'review'),
    'done': filteredTasks.filter(task => task.status === 'done'),
  };

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" /> Create Task
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="to-do">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Priority" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <div className="flex items-center">
                  <ArrowUpDown className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dueDate">Due Date</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {Object.entries(tasksByStatus).map(([status, tasks], statusIndex) => (
            <Card key={status} className="animate-fade-in" style={{ animationDelay: `${0.1 * statusIndex}s` }}>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle className="text-base capitalize">{status.replace('-', ' ')} ({tasks.length})</CardTitle>
                {status === 'to-do' && <ListCheck className="h-4 w-4 text-muted-foreground" />}
                {status === 'in-progress' && <Calendar className="h-4 w-4 text-muted-foreground" />}
                {status === 'review' && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                {status === 'done' && <ListCheck className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent className="space-y-4">
                {tasks.map((task, taskIndex) => (
                  <TaskCard
                    key={task.id}
                    {...task}
                    onCardClick={(id) => navigate(`/tasks/${id}`)}
                  />
                ))}
                
                {tasks.length === 0 && (
                  <div className="text-center py-8 text-sm text-muted-foreground">
                    No tasks in this status
                  </div>
                )}
                
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Task
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Tasks;
