
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, ArrowUpDown, 
  Calendar, ListCheck, ArrowRight, BellRing
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TaskCard from '@/components/ui/task-card';
import { Button } from '@/components/ui/button';
import { AnimatedButton } from '@/components/ui/animated-button';
import { AnimatedInput } from '@/components/ui/animated-input';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AnimatedList from '@/components/animation/AnimatedList';

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
  const [showNotification, setShowNotification] = useState(false);
  
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

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  // Container animation for entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      }
    }
  };

  // Item animation for entrance
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <DashboardLayout>
      <motion.div 
        className="animate-fade-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <motion.h1 
            className="text-2xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Tasks
          </motion.h1>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div 
                className="cursor-pointer"
                onClick={toggleNotification}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={{
                    rotate: showNotification ? [0, -10, 10, -10, 10, 0] : 0
                  }}
                  transition={{
                    duration: 0.5,
                    repeat: showNotification ? 1 : 0
                  }}
                >
                  <BellRing className="w-6 h-6 text-muted-foreground" />
                </motion.div>
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: 1 
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-taskflow-primary rounded-full"
                />
              </motion.div>
              {showNotification && (
                <motion.div 
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute right-0 mt-2 w-64 bg-card rounded-lg shadow-lg p-3 z-50 border"
                >
                  <p className="text-sm font-medium">Recent Notifications</p>
                  <div className="mt-2 space-y-2">
                    <div className="text-xs p-2 bg-gray-50 rounded">
                      <p className="font-medium">Task assigned to you</p>
                      <p className="text-muted-foreground mt-1">Alex assigned "Update API docs" to you</p>
                      <p className="text-xs text-muted-foreground mt-1">10 min ago</p>
                    </div>
                    <div className="text-xs p-2 bg-gray-50 rounded">
                      <p className="font-medium">Task due soon</p>
                      <p className="text-muted-foreground mt-1">Your task "Fix payment bug" is due tomorrow</p>
                      <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
            <AnimatedButton className="mt-4 md:mt-0">
              <Plus className="mr-2 h-4 w-4" /> Create Task
            </AnimatedButton>
          </div>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="md:col-span-2 relative">
            <AnimatedInput
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              icon={<Search className="h-4 w-4" />}
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
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(tasksByStatus).map(([status, tasks], statusIndex) => (
            <motion.div
              key={status}
              variants={itemVariants}
              transition={{ duration: 0.5, delay: statusIndex * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-base capitalize">{status.replace('-', ' ')} ({tasks.length})</CardTitle>
                  {status === 'to-do' && <ListCheck className="h-4 w-4 text-muted-foreground" />}
                  {status === 'in-progress' && <Calendar className="h-4 w-4 text-muted-foreground" />}
                  {status === 'review' && <ArrowRight className="h-4 w-4 text-muted-foreground" />}
                  {status === 'done' && <ListCheck className="h-4 w-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent className="space-y-4 flex-1 overflow-y-auto max-h-[calc(100vh-240px)]">
                  <AnimatePresence>
                    <AnimatedList staggerDelay={0.05}>
                      {tasks.map((task) => (
                        <div key={task.id} className="mb-3">
                          <TaskCard
                            {...task}
                            onCardClick={(id) => navigate(`/tasks/${id}`)}
                          />
                        </div>
                      ))}
                    </AnimatedList>
                  </AnimatePresence>
                  
                  {tasks.length === 0 && (
                    <motion.div 
                      className="text-center py-8 text-sm text-muted-foreground"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      No tasks in this status
                    </motion.div>
                  )}
                  
                  <AnimatedButton variant="outline" className="w-full" 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Plus className="mr-2 h-4 w-4" /> Add Task
                  </AnimatedButton>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
};

export default Tasks;
