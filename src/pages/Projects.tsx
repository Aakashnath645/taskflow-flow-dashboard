
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Search, Filter, ArrowUpDown, Calendar, Users, ArrowRight 
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ProjectCard from '@/components/ui/project-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';

// Mock data
const projectsData = [
  {
    id: '1',
    title: 'Website Redesign',
    description: 'Complete overhaul of the company website with modern design and improved user experience based on customer feedback.',
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
    description: 'Creating a cross-platform mobile application with React Native to complement our web services.',
    progress: 42,
    dueDate: 'Jul 30, 2025',
    members: [
      { name: 'John Doe' },
      { name: 'Charlie Brown' },
      { name: 'Diana Prince' },
    ],
    status: 'active' as const,
  },
  {
    id: '3',
    title: 'API Integration',
    description: 'Integrate third-party APIs to expand platform functionality and data sources.',
    progress: 95,
    dueDate: 'May 28, 2025',
    members: [
      { name: 'Bob Johnson' },
      { name: 'Emily Davis' },
    ],
    status: 'completed' as const,
  },
  {
    id: '4',
    title: 'Marketing Campaign',
    description: 'Q2 marketing campaign to increase user acquisition through targeted ads and content marketing.',
    progress: 25,
    dueDate: 'Aug 10, 2025',
    members: [
      { name: 'Alice Smith' },
      { name: 'Diana Prince' },
      { name: 'Frank Castle' },
    ],
    status: 'on-hold' as const,
  },
  {
    id: '5',
    title: 'User Research',
    description: 'Conduct user interviews and surveys to gather feedback on the beta product.',
    progress: 50,
    dueDate: 'Jun 22, 2025',
    members: [
      { name: 'Emily Davis' },
      { name: 'Charlie Brown' },
    ],
    status: 'active' as const,
  },
  {
    id: '6',
    title: 'Database Migration',
    description: 'Migrate legacy database to a new cloud infrastructure with improved performance.',
    progress: 80,
    dueDate: 'Jun 05, 2025',
    members: [
      { name: 'John Doe' },
      { name: 'Bob Johnson' },
    ],
    status: 'active' as const,
  },
];

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('progress');
  
  const filteredProjects = projectsData
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        project.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title);
      } else if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      } else if (sortBy === 'progress') {
        return b.progress - a.progress;
      }
      return 0;
    });

  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Button className="mt-4 md:mt-0">
            <Plus className="mr-2 h-4 w-4" /> Create Project
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <div className="flex items-center">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
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
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="dueDate">Due Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <ProjectCard
                {...project}
                onClick={(id) => navigate(`/projects/${id}`)}
              />
            </div>
          ))}
          
          {filteredProjects.length === 0 && (
            <div className="col-span-full flex items-center justify-center p-12">
              <div className="text-center">
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
                <Button onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}>
                  Clear filters
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;
