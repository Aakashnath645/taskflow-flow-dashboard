
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { 
  Bell, CreditCard, Lock, User, Mail, Shield, 
  LogOut, Moon, Sun, Laptop
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, CardContent, CardDescription, 
  CardFooter, CardHeader, CardTitle 
} from '@/components/ui/card';
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const [theme, setTheme] = useState('system');
  
  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved."
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification Settings Saved",
      description: "Your notification preferences have been updated."
    });
  };
  
  const handleSaveSecurity = () => {
    toast({
      title: "Security Settings Saved",
      description: "Your security settings have been updated successfully."
    });
  };

  const handleSaveTheme = (value: string) => {
    setTheme(value);
    toast({
      title: "Theme Changed",
      description: `Theme has been changed to ${value}.`
    });
  };
  
  return (
    <DashboardLayout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        
        <Tabs defaultValue="profile">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="display-name">Display Name</Label>
                    <Input id="display-name" defaultValue="John" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Input id="bio" defaultValue="Product Manager with 5+ years of experience" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="utc-8">
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc-12">UTC-12:00</SelectItem>
                      <SelectItem value="utc-11">UTC-11:00</SelectItem>
                      <SelectItem value="utc-10">UTC-10:00</SelectItem>
                      <SelectItem value="utc-9">UTC-09:00</SelectItem>
                      <SelectItem value="utc-8">UTC-08:00</SelectItem>
                      <SelectItem value="utc-7">UTC-07:00</SelectItem>
                      <SelectItem value="utc-6">UTC-06:00</SelectItem>
                      <SelectItem value="utc-5">UTC-05:00</SelectItem>
                      <SelectItem value="utc-4">UTC-04:00</SelectItem>
                      <SelectItem value="utc-3">UTC-03:00</SelectItem>
                      <SelectItem value="utc-2">UTC-02:00</SelectItem>
                      <SelectItem value="utc-1">UTC-01:00</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="utc+1">UTC+01:00</SelectItem>
                      <SelectItem value="utc+2">UTC+02:00</SelectItem>
                      <SelectItem value="utc+3">UTC+03:00</SelectItem>
                      <SelectItem value="utc+4">UTC+04:00</SelectItem>
                      <SelectItem value="utc+5">UTC+05:00</SelectItem>
                      <SelectItem value="utc+5:30">UTC+05:30</SelectItem>
                      <SelectItem value="utc+6">UTC+06:00</SelectItem>
                      <SelectItem value="utc+7">UTC+07:00</SelectItem>
                      <SelectItem value="utc+8">UTC+08:00</SelectItem>
                      <SelectItem value="utc+9">UTC+09:00</SelectItem>
                      <SelectItem value="utc+10">UTC+10:00</SelectItem>
                      <SelectItem value="utc+11">UTC+11:00</SelectItem>
                      <SelectItem value="utc+12">UTC+12:00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveProfile}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Theme</CardTitle>
                <CardDescription>Customize your interface preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    onClick={() => handleSaveTheme('light')}
                    className="flex flex-col items-center justify-center h-24"
                  >
                    <Sun className="h-6 w-6 mb-2" />
                    <span>Light</span>
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    onClick={() => handleSaveTheme('dark')}
                    className="flex flex-col items-center justify-center h-24"
                  >
                    <Moon className="h-6 w-6 mb-2" />
                    <span>Dark</span>
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'} 
                    onClick={() => handleSaveTheme('system')}
                    className="flex flex-col items-center justify-center h-24"
                  >
                    <Laptop className="h-6 w-6 mb-2" />
                    <span>System</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" />
                </div>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="w-full">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Two-factor Authentication</h4>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-sm">Protect your account with 2FA</p>
                      <p className="text-xs text-muted-foreground">
                        Adding an extra layer of security by requiring an additional verification step.
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveSecurity}>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Connected Accounts</CardTitle>
                <CardDescription>Manage your connected accounts and services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#4285F4] rounded-full flex items-center justify-center text-white font-bold">G</div>
                    <div>
                      <p className="font-medium">Google</p>
                      <p className="text-sm text-muted-foreground">Calendar and Contacts</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#0a66c2] rounded-full flex items-center justify-center text-white font-bold">in</div>
                    <div>
                      <p className="font-medium">LinkedIn</p>
                      <p className="text-sm text-muted-foreground">Profile and Connections</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold">X</div>
                    <div>
                      <p className="font-medium">Twitter</p>
                      <p className="text-sm text-muted-foreground">Social Feed</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-500">Danger Zone</CardTitle>
                <CardDescription>Irreversible and destructive actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Log out from all devices</p>
                    <p className="text-sm text-muted-foreground">This will end all of your active sessions</p>
                  </div>
                  <Button variant="outline">
                    <LogOut className="h-4 w-4 mr-2" /> Log out
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Delete Account</p>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium mb-3">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Task assignments</p>
                        <p className="text-xs text-muted-foreground">When someone assigns you a task</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Task comments</p>
                        <p className="text-xs text-muted-foreground">When someone comments on your task</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Project updates</p>
                        <p className="text-xs text-muted-foreground">Updates about projects you are part of</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Task deadline reminders</p>
                        <p className="text-xs text-muted-foreground">Reminders for approaching task deadlines</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Push Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Task status changes</p>
                        <p className="text-xs text-muted-foreground">When your task changes status</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">New team member</p>
                        <p className="text-xs text-muted-foreground">When someone joins your team</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Direct messages</p>
                        <p className="text-xs text-muted-foreground">When you receive a direct message</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-3">Frequency</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm">Email digest</p>
                        <p className="text-xs text-muted-foreground">How often to receive email summaries</p>
                      </div>
                      <Select defaultValue="daily">
                        <SelectTrigger className="w-36">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="real-time">Real-time</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="never">Never</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveNotifications}>Save Preferences</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan</CardTitle>
                <CardDescription>Manage your subscription plan</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Premium Plan</h3>
                      <p className="text-sm text-muted-foreground">$29/month, billed monthly</p>
                    </div>
                    <Badge variant="secondary">Current Plan</Badge>
                  </div>
                  <div className="mt-4 border-t pt-4">
                    <p className="text-sm font-medium">Features included:</p>
                    <ul className="mt-2 text-sm space-y-1">
                      <li className="flex items-center">
                        <div className="mr-2 text-taskflow-primary">✓</div>
                        Unlimited projects
                      </li>
                      <li className="flex items-center">
                        <div className="mr-2 text-taskflow-primary">✓</div>
                        Up to 20 team members
                      </li>
                      <li className="flex items-center">
                        <div className="mr-2 text-taskflow-primary">✓</div>
                        Advanced analytics
                      </li>
                      <li className="flex items-center">
                        <div className="mr-2 text-taskflow-primary">✓</div>
                        Priority support
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button className="sm:flex-1" variant="outline">Change Plan</Button>
                  <Button className="sm:flex-1" variant="outline">Cancel Subscription</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Manage your payment information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-muted/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-10 h-6 bg-blue-600 rounded mr-4"></div>
                      <div>
                        <p className="font-medium">Visa ending in 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <Badge>Default</Badge>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button className="flex-1" variant="outline">
                    <CreditCard className="h-4 w-4 mr-2" /> Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View your past invoices</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Invoice #1235</p>
                      <p className="text-sm text-muted-foreground">May 1, 2025</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium">$29.00</p>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <div>
                      <p className="font-medium">Invoice #1234</p>
                      <p className="text-sm text-muted-foreground">April 1, 2025</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium">$29.00</p>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-t">
                    <div>
                      <p className="font-medium">Invoice #1233</p>
                      <p className="text-sm text-muted-foreground">March 1, 2025</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium">$29.00</p>
                      <Button variant="outline" size="sm">Download</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" className="mx-auto">View All Invoices</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
