
import React from 'react';
import { cn } from '@/lib/utils';
import { Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';

export type TaskPriority = 'low' | 'medium' | 'high';

interface TaskCardProps {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  status: 'to-do' | 'in-progress' | 'review' | 'done';
  onCardClick?: (id: string) => void;
}

const TaskCard = ({
  id,
  title,
  description,
  priority,
  dueDate,
  assignee,
  status,
  onCardClick,
}: TaskCardProps) => {
  
  const priorityColor = {
    low: 'bg-priority-low text-white',
    medium: 'bg-priority-medium text-white',
    high: 'bg-priority-high text-white',
  };

  const statusColor = {
    'to-do': 'bg-gray-100 text-gray-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'review': 'bg-yellow-100 text-yellow-800',
    'done': 'bg-green-100 text-green-800',
  };

  const handleClick = () => {
    if (onCardClick) {
      onCardClick(id);
    }
  };

  return (
    <Card 
      onClick={handleClick} 
      className="p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="font-medium">{title}</div>
        <div className={cn("text-xs px-2 py-1 rounded-full font-medium", statusColor[status])}>
          {status.replace('-', ' ')}
        </div>
      </div>
      
      {description && (
        <div className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {description}
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center space-x-2">
          {dueDate && (
            <div className="flex items-center text-xs text-muted-foreground">
              <Calendar className="w-3 h-3 mr-1" />
              {dueDate}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className={cn("text-xs px-2 py-0.5 rounded-full", priorityColor[priority])}>
            {priority}
          </div>
          
          {assignee && (
            <div className="flex items-center">
              <Avatar className="w-6 h-6">
                <div className="bg-taskflow-primary text-white flex items-center justify-center w-full h-full text-xs font-medium">
                  {assignee.name.split(' ').map(name => name[0]).join('')}
                </div>
              </Avatar>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default TaskCard;
