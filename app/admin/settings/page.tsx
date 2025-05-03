"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  Settings,
  CreditCard,
  Mail,
  Users,
  Key,
  Globe,
  Clock,
  Image,
  AlertCircle,
  DollarSign,
  Percent,
  Send,
  Eye,
  EyeOff,
  RefreshCw,
  Loader2,
  Bell,
  Shield,
  Database,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { ErrorBoundary } from "@/components/error-boundary";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Validation schemas
const generalSettingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteDescription: z.string(),
  siteUrl: z.string().url('Please enter a valid URL'),
  timezone: z.string(),
  defaultLanguage: z.string(),
  maintenanceMode: z.boolean(),
  allowRegistration: z.boolean(),
  defaultCurrency: z.string(),
  logoUrl: z.string().url('Please enter a valid URL'),
  faviconUrl: z.string().url('Please enter a valid URL'),
});

const paymentSettingsSchema = z.object({
  stripeEnabled: z.boolean(),
  stripePublishableKey: z.string().optional(),
  stripeSecretKey: z.string().optional(),
  paypalEnabled: z.boolean(),
  paypalClientId: z.string().optional(),
  paypalSecretKey: z.string().optional(),
  defaultCurrency: z.string(),
  transactionFee: z.string().regex(/^\d*\.?\d*$/),
  platformFee: z.string().regex(/^\d*\.?\d*$/),
  minimumPayout: z.string().regex(/^\d*\.?\d*$/),
  automaticPayouts: z.boolean(),
  payoutSchedule: z.string(),
  refundWindow: z.string().regex(/^\d+$/),
  allowPartialRefunds: z.boolean(),
  taxEnabled: z.boolean(),
  taxRate: z.string().regex(/^\d*\.?\d*$/),
});

const emailSettingsSchema = z.object({
  provider: z.string(),
  smtpHost: z.string().min(1, 'SMTP host is required'),
  smtpPort: z.string().regex(/^\d+$/),
  smtpUsername: z.string().min(1, 'SMTP username is required'),
  smtpPassword: z.string().min(1, 'SMTP password is required'),
  smtpEncryption: z.string(),
  fromName: z.string().min(1, 'From name is required'),
  fromEmail: z.string().email('Please enter a valid email'),
  replyToEmail: z.string().email('Please enter a valid email'),
  enableEmailQueue: z.boolean(),
});

// Infer types from zod schemas
export type GeneralSettings = z.infer<typeof generalSettingsSchema>;
export type PaymentSettings = z.infer<typeof paymentSettingsSchema>;
export type EmailSettings = z.infer<typeof emailSettingsSchema>;

interface Settings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyReports: boolean;
  twoFactorAuth: boolean;
  apiKey: string;
  maxUploadSize: number;
  backupFrequency: "daily" | "weekly" | "monthly";
  retentionDays: number;
}

export default function AdminSettings() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showSmtpPassword, setShowSmtpPassword] = useState(false);
  const [testEmailAddress, setTestEmailAddress] = useState('');
  const [settings, setSettings] = useState<Settings>({
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    twoFactorAuth: false,
    apiKey: "sk_test_...",
    maxUploadSize: 10,
    backupFrequency: "daily",
    retentionDays: 30,
  });

  // Form initialization
  const generalForm = useForm({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      siteName: '',
      siteDescription: '',
      siteUrl: '',
      timezone: 'UTC',
      defaultLanguage: 'en',
      maintenanceMode: false,
      allowRegistration: true,
      defaultCurrency: 'USD',
      logoUrl: '',
      faviconUrl: '',
    },
  });

  const paymentForm = useForm({
    resolver: zodResolver(paymentSettingsSchema),
    defaultValues: {
      stripeEnabled: false,
      stripePublishableKey: '',
      stripeSecretKey: '',
      paypalEnabled: false,
      paypalClientId: '',
      paypalSecretKey: '',
      defaultCurrency: 'USD',
      transactionFee: '2.9',
      platformFee: '5',
      minimumPayout: '50',
      automaticPayouts: true,
      payoutSchedule: 'monthly',
      refundWindow: '30',
      allowPartialRefunds: true,
      taxEnabled: false,
      taxRate: '0',
    },
  });

  const emailForm = useForm({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {
      provider: 'smtp',
      smtpHost: '',
      smtpPort: '587',
      smtpUsername: '',
      smtpPassword: '',
      smtpEncryption: 'tls',
      fromName: '',
      fromEmail: '',
      replyToEmail: '',
      enableEmailQueue: true,
    },
  });

  // Load settings on mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/admin/settings');
        if (!response.ok) throw new Error('Failed to load settings');
        const data = await response.json();
        
        generalForm.reset(data.general);
        paymentForm.reset(data.payment);
        emailForm.reset(data.email);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load settings',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, []);

  // Warn about unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const onSubmit = async (
    data: GeneralSettings | PaymentSettings | EmailSettings,
    type: 'general' | 'payment' | 'email'
  ) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/settings/${type}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update settings');

      toast({
        title: 'Success',
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} settings updated successfully`,
      });
      setHasUnsavedChanges(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to update ${type} settings`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleTestEmail = async () => {
    if (!testEmailAddress) {
      toast({
        title: 'Error',
        description: 'Please enter a test email address',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch('/api/admin/settings/test-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: testEmailAddress }),
      });

      if (!response.ok) throw new Error('Failed to send test email');

      toast({
        title: 'Success',
        description: `Test email sent to ${testEmailAddress}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send test email',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // This would normally be an API call to save settings
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({ title: "Success", description: "Settings saved successfully" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to save settings", variant: "destructive" });
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
      </div>

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
          </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
          </TabsTrigger>
            <TabsTrigger value="storage">
              <Database className="h-4 w-4 mr-2" />
              Storage
          </TabsTrigger>
        </TabsList>

          <TabsContent value="notifications">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Email Notifications</CardTitle>
                  <CardDescription>
                    Configure how you receive email notifications.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive email notifications for important updates
                      </p>
                    </div>
                    <Switch
                      checked={settings.emailNotifications}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          emailNotifications: e.target.checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive push notifications for important updates
                      </p>
                          </div>
                            <Switch
                      checked={settings.pushNotifications}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          pushNotifications: e.target.checked,
                        }))
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                      <Label>Weekly Reports</Label>
                      <p className="text-sm text-muted-foreground">
                        Receive weekly summary reports
                      </p>
                          </div>
                            <Switch
                      checked={settings.weeklyReports}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          weeklyReports: e.target.checked,
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
        </TabsContent>

          <TabsContent value="security">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage your security preferences and API access.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                      <Label>Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                            <Switch
                      checked={settings.twoFactorAuth}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          twoFactorAuth: e.target.checked,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>API Key</Label>
                    <div className="flex gap-2">
                      <Input
                        type="password"
                        value={settings.apiKey}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            apiKey: e.target.value,
                          }))
                        }
                      />
                      <Button variant="outline">
                        <Key className="h-4 w-4 mr-2" />
                        Generate New Key
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
        </TabsContent>

          <TabsContent value="storage">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage Settings</CardTitle>
                  <CardDescription>
                    Configure storage limits and backup preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Maximum Upload Size (MB)</Label>
                    <Input
                      type="number"
                      value={settings.maxUploadSize}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          maxUploadSize: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Backup Frequency</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={settings.backupFrequency}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          backupFrequency: e.target.value as "daily" | "weekly" | "monthly",
                        }))
                      }
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Data Retention (days)</Label>
                        <Input
                      type="number"
                      value={settings.retentionDays}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          retentionDays: parseInt(e.target.value),
                        }))
                      }
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
        </TabsContent>
      </Tabs>
    </div>
    </ErrorBoundary>
  );
} 