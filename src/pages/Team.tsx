
import React from 'react';
import { 
  Users, Mail, UserPlus, Search,
  Calendar, ListCheck, BarChart, Settings
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

// Mock data
const teamMembers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Product Manager',
    tasks: 12,
    projects: 4,
    joinDate: 'Jan 15, 2025',
    avatar: '',
    status: 'online',
  },
  {
    id: '2',
    name: 'Alice Smith',
    email: 'alice@example.com',
    role: 'UI/UX Designer',
    tasks: 8,
    projects: 3,
    joinDate: 'Feb 3, 2025',
    avatar: '',
    status: 'offline',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Full Stack Developer',
    tasks: 15,
    projects: 2,
    joinDate: 'Dec 10, 2024',
    avatar: '',
    status: 'online',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@example.com',
    role: 'Project Manager',
    tasks: 10,
    projects: 2,
    joinDate: 'Mar 5, 2025',
    avatar: '',
    status: 'busy',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Frontend Developer',
    tasks: 7,
    projects: 2,
    joinDate: 'Feb 21, 2025',
    avatar: '',
    status: 'away',
  },
  {
    id: '6',
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'Content Writer',
    tasks: 9,
    projects: 1,
    joinDate: 'Apr 12, 2025',
    avatar: '',
    status: 'online',
  },
  {
    id: '7',
    name: 'Frank Castle',
    email: 'frank@example.com',
    role: 'Backend Developer',
    tasks: 11,
    projects: 3,
    joinDate: 'Jan 30, 2025',
    avatar: '',
    status: 'offline',
  },
];

const Team = () => {
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Team</h1>
          <Button className="mt-4 md:mt-0">
            <UserPlus className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        </div>
        
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Search team members..." className="pl-10 max-w-md" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card 
              key={member.id}
              className="animate-fade-in overflow-hidden border-l-4 border-l-taskflow-primary"
              style={{ animationDelay: `${0.05 * index}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <Avatar className="h-12 w-12 mr-4">
                      <div className="bg-taskflow-primary text-white flex items-center justify-center w-full h-full text-xl font-medium">
                        {member.name.split(' ').map(name => name[0]).join('')}
                      </div>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={
                      member.status === 'online' ? 'default' :
                      member.status === 'busy' ? 'destructive' :
                      member.status === 'away' ? 'secondary' : 'outline'
                    }
                    className="capitalize"
                  >
                    {member.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mr-3">
                      <ListCheck className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Tasks</p>
                      <p className="font-medium">{member.tasks}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mr-3">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Projects</p>
                      <p className="font-medium">{member.projects}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mr-3">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Joined</p>
                      <p className="font-medium">{member.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center mr-3">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="font-medium truncate" title={member.email}>
                        {member.email}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" /> Message
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Settings className="mr-2 h-4 w-4" /> Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Team;
