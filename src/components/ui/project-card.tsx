
import React from 'react';
import { Calendar, Users } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  id: string;
  title: string;
  description?: string;
  progress: number;
  dueDate?: string;
  members?: Array<{ name: string; avatar?: string }>;
  status: 'active' | 'completed' | 'on-hold';
  onClick?: (id: string) => void;
}

const ProjectCard = ({
  id,
  title,
  description,
  progress,
  dueDate,
  members = [],
  status,
  onClick,
}: ProjectCardProps) => {

  const statusStyles = {
    'active': 'bg-green-100 text-green-800',
    'completed': 'bg-blue-100 text-blue-800',
    'on-hold': 'bg-yellow-100 text-yellow-800',
  };

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  return (
    <Card 
      onClick={handleClick} 
      className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow border-l-4 border-l-taskflow-primary"
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className={cn("text-xs px-2 py-1 rounded-full", statusStyles[status])}>
            {status.replace('-', ' ')}
          </div>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        )}
      </CardHeader>
      
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm mb-1">
          <span>Progress</span>
          <span className="font-medium">{progress}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardContent>
      
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center text-xs text-muted-foreground">
          {dueDate && (
            <div className="flex items-center mr-4">
              <Calendar className="w-3 h-3 mr-1" />
              {dueDate}
            </div>
          )}
          
          {members.length > 0 && (
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              {members.length} members
            </div>
          )}
        </div>
        
        <div className="flex -space-x-1">
          {members.slice(0, 3).map((member, index) => (
            <Avatar key={index} className="w-6 h-6 border-2 border-background">
              <div className="bg-taskflow-primary text-white flex items-center justify-center w-full h-full text-xs font-medium">
                {member.name.split(' ').map(name => name[0]).join('')}
              </div>
            </Avatar>
          ))}
          {members.length > 3 && (
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs font-medium border-2 border-background">
              +{members.length - 3}
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
