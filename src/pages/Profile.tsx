
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import AnimatedForm from '@/components/animation/AnimatedForm';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AnimatedInput } from '@/components/ui/animated-input';
import { Mail, User, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedButton } from '@/components/ui/animated-button';

// Mock user data, would typically come from Supabase auth
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  avatar: '',
};

const ProfilePage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground">
              Update your personal information and how we can reach you
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center text-3xl font-medium text-muted-foreground">
                  {mockUser.name.split(' ').map(word => word[0]).join('')}
                </div>
                <AnimatedButton
                  size="sm"
                  className="absolute bottom-0 right-0 rounded-full"
                  variant="default"
                  whileHover={{ scale: 1.1 }}
                >
                  <Save size={16} />
                </AnimatedButton>
              </div>
              <p className="text-sm text-muted-foreground">
                JPG, PNG or GIF. Max size: 2MB
              </p>
            </div>

            <AnimatedForm 
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitText="Save Changes"
              className="space-y-6"
            >
              <div className="form-field space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <AnimatedInput 
                  id="name"
                  name="name"
                  icon={<User size={16} />}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-field space-y-2">
                <Label htmlFor="email">Email</Label>
                <AnimatedInput 
                  id="email"
                  name="email"
                  type="email"
                  icon={<Mail size={16} />}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </AnimatedForm>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
