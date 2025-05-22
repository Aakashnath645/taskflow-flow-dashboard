
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-9xl font-bold text-taskflow-primary">404</h1>
        <h2 className="text-2xl font-semibold mt-4 mb-2">Page not found</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved. Please check the URL or go back to the home page.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => navigate('/')}>
            Return to Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
