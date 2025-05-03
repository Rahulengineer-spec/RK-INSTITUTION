'use client';

import { useState, useEffect, TouchEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  Server,
  AlertCircle,
  Download,
  FileText,
  Database,
  Cpu,
  HardDrive,
  Network,
  Settings,
  Bell,
  Star,
  Palette,
  Layout,
  Pin,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Megaphone,
  MessageCircle,
  Send,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Search,
  Filter,
  BellRing,
  Bot,
  BarChart2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

// Sample data for charts
const revenueData = [
  { month: 'Jan', actual: 4500, projected: 4000 },
  { month: 'Feb', actual: 5200, projected: 4800 },
  { month: 'Mar', actual: 4800, projected: 5000 },
  { month: 'Apr', actual: 6000, projected: 5500 },
  { month: 'May', actual: 5700, projected: 5800 },
  { month: 'Jun', actual: 6500, projected: 6000 },
];

const systemMetrics = [
  { time: '12:00', cpu: 45, memory: 62, network: 85 },
  { time: '13:00', cpu: 55, memory: 65, network: 75 },
  { time: '14:00', cpu: 65, memory: 70, network: 80 },
  { time: '15:00', cpu: 50, memory: 68, network: 90 },
  { time: '16:00', cpu: 60, memory: 75, network: 85 },
  { time: '17:00', cpu: 70, memory: 80, network: 70 },
];

const themes = [
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' },
  { name: 'High Contrast', value: 'high-contrast' },
];

const defaultWidgets = [
  { id: 'system-health', title: 'System Health Metrics', enabled: true },
  { id: 'performance', title: 'System Performance', enabled: true },
  { id: 'revenue', title: 'Revenue Analytics', enabled: true },
  { id: 'engagement', title: 'User Engagement', enabled: true },
  { id: 'activity', title: 'Activity Logs', enabled: true },
];

const defaultNotificationPreferences = {
  systemAlerts: true,
  userActivity: true,
  revenueUpdates: false,
  performanceAlerts: true,
  securityAlerts: true,
};

// Sample data for communication features
const sampleMessages = [
  {
    id: 1,
    sender: "John Doe",
    avatar: "/avatars/john.jpg",
    content: "When will the new feature be released?",
    timestamp: "10:30 AM",
    unread: true,
  },
  {
    id: 2,
    sender: "Jane Smith",
    avatar: "/avatars/jane.jpg",
    content: "The latest update is working great!",
    timestamp: "Yesterday",
    unread: false,
  },
];

const sampleAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "System Maintenance",
    content: "Scheduled maintenance on Saturday 10 PM EST",
    priority: "high",
    date: "2024-02-25",
  },
  {
    id: 2,
    title: "New Feature Release",
    content: "Introducing enhanced analytics dashboard",
    priority: "medium",
    date: "2024-02-24",
  },
];

const sampleFeedback = [
  {
    id: 1,
    user: "Mike Wilson",
    type: "feature",
    content: "Would love to see dark mode support",
    rating: 4,
    date: "2024-02-23",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    type: "bug",
    content: "Export button not working in Firefox",
    rating: 2,
    date: "2024-02-22",
  },
];

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  unread: boolean;
}

interface Announcement {
  id: number;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  date: string;
}

interface FeedbackItem {
  id: number;
  user: string;
  type: string;
  content: string;
  rating: number;
  date: string;
}

interface PinnedItem {
  title: string;
  description: string;
}

export default function AdminDashboard() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [pinnedItems, setPinnedItems] = useState<PinnedItem[]>([]);
  const [widgets, setWidgets] = useState(defaultWidgets);
  const [notificationPrefs, setNotificationPrefs] = useState(defaultNotificationPreferences);
  const [isMobile, setIsMobile] = useState(false);
  const [currentWidgetIndex, setCurrentWidgetIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [activeChat, setActiveChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newAnnouncement, setNewAnnouncement] = useState({ title: "", content: "", priority: "medium" });
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [announcements, setAnnouncements] = useState<Announcement[]>(sampleAnnouncements);
  const [feedback, setFeedback] = useState<FeedbackItem[]>(sampleFeedback);
  const [showSupportChat, setShowSupportChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([]);
  const [feedbackAnalytics, setFeedbackAnalytics] = useState({
    averageRating: 0,
    totalFeedback: 0,
    categoryBreakdown: {} as Record<string, number>,
  });
  const { toast } = useToast();

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle swipe gestures
  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    const enabledWidgets = widgets.filter(w => w.enabled);

    if (isLeftSwipe && currentWidgetIndex < enabledWidgets.length - 1) {
      setCurrentWidgetIndex(prev => prev + 1);
    }
    if (isRightSwipe && currentWidgetIndex > 0) {
      setCurrentWidgetIndex(prev => prev - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mobile navigation component
  const MobileNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-between items-center md:hidden">
      <Button
        variant="outline"
        size="icon"
        disabled={currentWidgetIndex === 0}
        onClick={() => setCurrentWidgetIndex(prev => prev - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="text-sm font-medium">
        {currentWidgetIndex + 1} / {widgets.filter(w => w.enabled).length}
      </span>
      <Button
        variant="outline"
        size="icon"
        disabled={currentWidgetIndex === widgets.filter(w => w.enabled).length - 1}
        onClick={() => setCurrentWidgetIndex(prev => prev + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );

  // Message search and filtering
  useEffect(() => {
    const filtered = messages.filter(
      message =>
        message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        message.sender.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMessages(filtered);
  }, [searchQuery, messages]);

  // Calculate feedback analytics
  useEffect(() => {
    const analytics = {
      averageRating: feedback.reduce((acc, item) => acc + item.rating, 0) / feedback.length,
      totalFeedback: feedback.length,
      categoryBreakdown: feedback.reduce((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {} as Record<string, number>),
    };
    setFeedbackAnalytics(analytics);
  }, [feedback]);

  // Enhanced message handling with notifications
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      sender: "Admin",
      avatar: "/avatars/admin.jpg",
      content: newMessage,
      timestamp: "Just now",
      unread: false,
    };
    
    setMessages([newMsg, ...messages]);
    setNewMessage("");
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });
  };

  // AI support chat responses
  const generateAIResponse = async (message: string) => {
    // Simulate AI response
    const responses = [
      "I understand your question. Let me help you with that.",
      "Based on your query, here's what I suggest...",
      "I've analyzed your request. Here's the solution...",
      "Let me provide you with more information about that.",
    ];
    
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(responses[Math.floor(Math.random() * responses.length)]);
      }, 1000);
    });
  };  // Function to broadcast a new announcement
  const handleBroadcastAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content) return;
    
    setAnnouncements([
      {
        id: announcements.length + 1,
        title: newAnnouncement.title,
        content: newAnnouncement.content,
        priority: newAnnouncement.priority as 'low' | 'medium' | 'high',
        date: new Date().toISOString().split('T')[0],
      },
      ...announcements,
    ]);
    setNewAnnouncement({ title: "", content: "", priority: "medium" });
  };

  // Communication Features Component
  const CommunicationFeatures = () => (
    <div className="space-y-6">
      {/* Message Search and Notifications */}
      <div className="flex items-center justify-between">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Popover open={showNotifications} onOpenChange={setShowNotifications}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="relative">
              <BellRing className="h-4 w-4" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-xs text-white flex items-center justify-center">
                  {notifications.length}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <ScrollArea className="h-[300px]">
              {notifications.map((notification, index) => (
                <div key={index} className="p-2 hover:bg-accent rounded-lg">
                  <p className="text-sm">{notification}</p>
                </div>
              ))}
            </ScrollArea>
          </PopoverContent>
        </Popover>
      </div>

      {/* Existing Messaging System with Search Results */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Messages
            </CardTitle>
            <CardDescription>
              {searchQuery ? `Search results for "${searchQuery}"` : "Internal communication system"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px] pr-4">
              <div className="space-y-4">
                {(searchQuery ? filteredMessages : messages).map((message) => (
                  <div key={message.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-accent">
                    <Avatar>
                      <AvatarImage src={message.avatar} />
                      <AvatarFallback>{message.sender[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{message.sender}</p>
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{message.content}</p>
                    </div>
                    {message.unread && (
                      <Badge variant="info">New</Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button size="icon" onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Feedback Analytics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="h-5 w-5" />
              Feedback Analytics
            </CardTitle>
            <CardDescription>Feedback insights and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Average Rating</span>
                  <span className="text-sm">{feedbackAnalytics.averageRating.toFixed(1)}/5.0</span>
                </div>
                <Progress value={feedbackAnalytics.averageRating * 20} />
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Category Breakdown</h4>
                {Object.entries(feedbackAnalytics.categoryBreakdown).map(([category, count]) => (
                  <div key={category} className="flex justify-between items-center mb-2">
                    <span className="text-sm">{category}</span>
                    <Badge variant="info">{count}</Badge>
                  </div>
                ))}
              </div>
              
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  Total Feedback: {feedbackAnalytics.totalFeedback}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Support Chat with AI */}
        <div className="fixed bottom-4 right-4 z-50">
          <Popover open={showSupportChat} onOpenChange={setShowSupportChat}>
            <PopoverTrigger asChild>
              <Button className="rounded-full h-12 w-12" size="icon">
                <Bot className="h-6 w-6" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4" />
                    <h4 className="font-medium">AI Support Chat</h4>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setShowSupportChat(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <ScrollArea className="h-[300px]">
                  <div className="space-y-4">
                    {/* AI chat messages would go here */}
                    <p className="text-center text-sm text-muted-foreground">
                      AI assistant is ready to help you
                    </p>
                  </div>
                </ScrollArea>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const input = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
                    const message = input.value;
                    if (!message) return;
                    
                    // Add user message
                    // Add loading state
                    // Get AI response
                    const response = await generateAIResponse(message);
                    // Add AI response
                    // Clear input
                    input.value = '';
                  }}
                  className="flex gap-2"
                >
                  <Input name="message" placeholder="Type your message..." />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      className="space-y-6 pb-16 md:pb-0"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1 text-sm md:text-base">System overview and analytics</p>
        </div>
        <div className="flex gap-2 md:gap-4">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Dashboard Settings</SheetTitle>
                <SheetDescription>Customize your dashboard experience</SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                <div className="space-y-6">
                  {/* Theme Settings */}
                  <div>
                    <h3 className="font-medium mb-4">Theme</h3>
                    <div className="grid gap-4">
                      {themes.map((theme) => (
                        <div key={theme.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={`mobile-${theme.value}`}
                            name="mobile-theme"
                            value={theme.value}
                            checked={currentTheme === theme.value}
                            onChange={(e) => setCurrentTheme(e.target.value)}
                            className="w-4 h-4"
                          />
                          <Label htmlFor={`mobile-${theme.value}`}>{theme.name}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Widget Settings */}
                  <div>
                    <h3 className="font-medium mb-4">Widgets</h3>
                    <div className="grid gap-4">
                      {widgets.map((widget) => (
                        <div key={widget.id} className="flex items-center space-x-2">
                          <Switch
                            id={`mobile-${widget.id}`}
                            checked={widget.enabled}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setWidgets(widgets.map(w =>
                                w.id === widget.id ? { ...w, enabled: e.target.checked } : w
                              ));
                            }}
                          />
                          <Label htmlFor={`mobile-${widget.id}`}>{widget.title}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notification Settings */}
                  <div>
                    <h3 className="font-medium mb-4">Notifications</h3>
                    <div className="grid gap-4">
                      {Object.entries(notificationPrefs).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Switch
                            id={`mobile-${key}`}
                            checked={value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setNotificationPrefs({ ...notificationPrefs, [key]: e.target.checked });
                            }}
                          />
                          <Label htmlFor={`mobile-${key}`}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>

          {/* Desktop Controls */}
          <div className="hidden md:flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Personalize
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Dashboard Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Palette className="w-4 h-4 mr-2" />
                      Theme Settings
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Choose Theme</DialogTitle>
                      <DialogDescription>Select your preferred dashboard theme</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {themes.map((theme) => (
                        <div key={theme.value} className="flex items-center space-x-2">
                          <input
                            type="radio"
                            id={theme.value}
                            name="theme"
                            value={theme.value}
                            checked={currentTheme === theme.value}
                            onChange={(e) => setCurrentTheme(e.target.value)}
                          />
                          <Label htmlFor={theme.value}>{theme.name}</Label>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Layout className="w-4 h-4 mr-2" />
                      Widget Layout
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Customize Widgets</DialogTitle>
                      <DialogDescription>Choose which widgets to display</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {widgets.map((widget) => (
                        <div key={widget.id} className="flex items-center space-x-2">
                          <Switch
                            id={widget.id}
                            checked={widget.enabled}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setWidgets(widgets.map(w =>
                                w.id === widget.id ? { ...w, enabled: e.target.checked } : w
                              ));
                            }}
                          />
                          <Label htmlFor={widget.id}>{widget.title}</Label>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <DropdownMenuItem>
                      <Bell className="w-4 h-4 mr-2" />
                      Notification Preferences
                    </DropdownMenuItem>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Notification Settings</DialogTitle>
                      <DialogDescription>Customize your notification preferences</DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      {Object.entries(notificationPrefs).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Switch
                            id={key}
                            checked={value}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setNotificationPrefs({ ...notificationPrefs, [key]: e.target.checked });
                            }}
                          />
                          <Label htmlFor={key}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>
              <Activity className="w-4 h-4 mr-2" />
              Live Monitoring
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Widget View */}
      {isMobile ? (
        <div className="space-y-4">
          {widgets
            .filter(w => w.enabled)
            .map((widget, index) => (
              <div
                key={widget.id}
                className={`transition-all duration-300 ${
                  index === currentWidgetIndex ? 'block' : 'hidden'
                }`}
              >
                {widget.id === 'system-health' && (
                  <div className="grid grid-cols-2 gap-4">
                    {/* Simplified system health metrics for mobile */}
                    <Card className="col-span-2">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Overview</CardTitle>
                        <Server className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>CPU Load</span>
                              <span>67%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full">
                              <div className="h-2 bg-green-500 rounded-full" style={{ width: "67%" }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Memory</span>
                              <span>82%</span>
                            </div>
                            <div className="h-2 w-full bg-gray-200 rounded-full">
                              <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "82%" }} />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                {widget.id === 'performance' && (
                  <Card>
                    <CardHeader>
                      <CardTitle>System Performance</CardTitle>
                      <CardDescription>Real-time metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={systemMetrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU" />
                            <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* ... Similar mobile-optimized versions for other widgets ... */}
              </div>
            ))}
          <MobileNavigation />
        </div>
      ) : (
        /* Desktop Layout */
        <div className="space-y-6">
          {/* Pinned Content Section */}
          {pinnedItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="w-4 h-4 mr-2" />
                  Pinned Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  {pinnedItems.map((item, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="text-sm">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Render widgets based on user preferences */}
          {widgets.find(w => w.id === 'system-health')?.enabled && (
            <div className="grid gap-4 md:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Load</CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">67%</div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-2 bg-green-500 rounded-full" style={{ width: "67%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Normal operating range</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">82%</div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-full bg-gray-200 rounded-full">
                      <div className="h-2 bg-yellow-500 rounded-full" style={{ width: "82%" }} />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">High usage warning</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,234</div>
                  <p className="text-xs text-green-500">↑ 12% from last hour</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Server Status</CardTitle>
                  <Server className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">Healthy</div>
                  <p className="text-xs text-muted-foreground">All systems operational</p>
                </CardContent>
              </Card>
            </div>
          )}

          {widgets.find(w => w.id === 'performance')?.enabled && (
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time system metrics monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={systemMetrics}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cpu" stroke="#8884d8" name="CPU" />
                      <Line type="monotone" dataKey="memory" stroke="#82ca9d" name="Memory" />
                      <Line type="monotone" dataKey="network" stroke="#ffc658" name="Network" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          )}

          {widgets.find(w => w.id === 'revenue')?.enabled && (
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Monthly revenue and projections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="actual" stroke="#8884d8" fill="#8884d8" name="Actual Revenue" />
                        <Area type="monotone" dataKey="projected" stroke="#82ca9d" fill="#82ca9d" name="Projected Revenue" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div>
                      <p className="text-sm font-medium">Total Revenue</p>
                      <p className="text-2xl font-bold">$32,700</p>
                    </div>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                  <CardDescription>Active users and interaction metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Daily Active Users</p>
                        <p className="text-2xl font-bold">2,845</p>
                      </div>
                      <Badge variant="info">+15% ↑</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Course Completion Rate</span>
                        <span>78%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: "78%" }} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Session Duration</span>
                        <span>24 minutes</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 rounded-full">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: "65%" }} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {widgets.find(w => w.id === 'activity')?.enabled && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>System Activity Logs</CardTitle>
                    <CardDescription>Recent system events and user activities</CardDescription>
                  </div>
                  <Button variant="outline">Export Logs</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>IP Address</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        timestamp: "2024-02-20 14:23:01",
                        event: "User Login",
                        user: "john.doe@example.com",
                        ip: "192.168.1.100",
                        status: "success"
                      },
                      {
                        timestamp: "2024-02-20 14:20:15",
                        event: "Course Creation",
                        user: "instructor.jane@example.com",
                        ip: "192.168.1.101",
                        status: "success"
                      },
                      {
                        timestamp: "2024-02-20 14:15:30",
                        event: "Failed Login Attempt",
                        user: "unknown",
                        ip: "192.168.1.102",
                        status: "error"
                      },
                      {
                        timestamp: "2024-02-20 14:10:05",
                        event: "System Backup",
                        user: "system",
                        ip: "localhost",
                        status: "success"
                      },
                      {
                        timestamp: "2024-02-20 14:05:22",
                        event: "Payment Processing",
                        user: "payment.system",
                        ip: "192.168.1.103",
                        status: "success"
                      },
                    ].map((log, i) => (
                      <TableRow key={i}>
                        <TableCell>{log.timestamp}</TableCell>
                        <TableCell>{log.event}</TableCell>
                        <TableCell>{log.user}</TableCell>
                        <TableCell>{log.ip}</TableCell>
                        <TableCell>
                          <Badge variant={log.status === "success" ? "success" : "error"}>
                            {log.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Add CommunicationFeatures component */}
      <CommunicationFeatures />
    </div>
  );
} 