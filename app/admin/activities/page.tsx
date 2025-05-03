"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trophy, Code, Megaphone, Award, Plus, Pencil, Trash2, ChevronDown, Download, Filter } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { ErrorBoundary } from "@/components/error-boundary";
import { LoadingState } from "@/components/loading-state";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion } from "framer-motion";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Activity {
  id: string;
  title: string;
  description: string;
  type: "event" | "result" | "hackathon" | "announcement" | "achievement";
  date: string;
  imageUrl?: string;
  image_url?: string;
  link_url?: string;
  is_featured: boolean;
  status: "active" | "archived";
  createdAt: string;
  updatedAt: string;
}

interface FilterState {
  search: string;
  type: string;
  status: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

const formSchema = z.object({
  title: z.string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z.string()
    .min(1, "Description is required")
    .max(1000, "Description must be less than 1000 characters"),
  type: z.enum(["event", "result", "hackathon", "announcement", "achievement"], {
    required_error: "Please select an activity type",
  }),
  date: z.string({
    required_error: "Please select a date",
  }),
  image: z.any()
    .refine((file) => {
      if (!file || !file[0]) return true;
      return file[0].size <= 5000000;
    }, "Image must be less than 5MB")
    .refine((file) => {
      if (!file || !file[0]) return true;
      return ['image/jpeg', 'image/png', 'image/webp'].includes(file[0].type);
    }, "Only .jpg, .png, and .webp formats are supported"),
  image_url: z.string().url("Must be a valid URL").optional(),
  link_url: z.string().url("Must be a valid URL").optional(),
  is_featured: z.boolean(),
  status: z.enum(["active", "archived"], {
    required_error: "Please select a status",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const typeIcons = {
  event: Calendar,
  result: Trophy,
  hackathon: Code,
  announcement: Megaphone,
  achievement: Award,
};

export default function ActivitiesAdmin() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    type: "all",
    status: "all",
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      type: "event",
      date: new Date().toISOString(),
      image_url: "",
      link_url: "",
      is_featured: false,
      status: "active",
    },
  });

  useEffect(() => {
    fetchActivities();
  }, [filters, pagination.page, pagination.pageSize]);

  async function fetchActivities() {
    try {
      setError(null);
      setLoading(true);
      let query = supabase
        .from("activities")
        .select("*", { count: "exact" });

      if (filters.search) {
        query = query.ilike("title", `%${filters.search}%`);
      }
      if (filters.type !== "all") {
        query = query.eq("type", filters.type);
      }
      if (filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      const start = (pagination.page - 1) * pagination.pageSize;
      query = query
        .order("date", { ascending: false })
        .range(start, start + pagination.pageSize - 1);

      const { data, error, count } = await query;

      if (error) throw error;
      setActivities(data || []);
      setPagination(prev => ({ ...prev, total: count || 0 }));
    } catch (error) {
      setError(error as Error);
      toast.error("Failed to fetch activities. Please try again.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      
      // Validate image size and type before upload
      if (values.image?.[0] && values.image[0].size > 5000000) {
        toast.error("Image must be less than 5MB");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("type", values.type);
      formData.append("date", values.date);
      formData.append("is_featured", String(values.is_featured));
      formData.append("status", values.status);
      if (values.image) {
        formData.append("image", values.image);
      }
      if (values.link_url) {
        formData.append("link_url", values.link_url);
      }

      let imageUrl = selectedActivity?.imageUrl;

      if (values.image && values.image[0]) {
        const file = values.image[0];
        const fileExt = file.name.split(".").pop();
        const fileName = Math.random().toString() + Date.now() + "." + fileExt;
        const { data, error } = await supabase.storage
          .from("activity-images")
          .upload(fileName, file);

        if (error) throw error;
        imageUrl = process.env.NEXT_PUBLIC_SUPABASE_URL + "/storage/v1/object/public/activity-images/" + fileName;
      }

      const activityData = {
        ...values,
        image_url: imageUrl,
      };

      const { error } = selectedActivity
        ? await supabase
            .from("activities")
            .update(activityData)
            .eq("id", selectedActivity.id)
        : await supabase.from("activities").insert([activityData]);

      if (error) throw error;

      toast.success(selectedActivity ? "Activity updated" : "Activity created");
      setDialogOpen(false);
      fetchActivities();
      form.reset();
      setSelectedActivity(null);
    } catch (error) {
      toast.error("Error saving activity");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  async function handleDelete(id: string) {
    if (!window.confirm("Are you sure you want to delete this activity?")) return;

    try {
      const { error } = await supabase.from("activities").delete().eq("id", id);
      if (error) throw error;
      toast.success("Activity deleted");
      fetchActivities();
    } catch (error) {
      toast.error("Error deleting activity");
      console.error("Error:", error);
    }
  }

  function handleEdit(activity: Activity) {
    setSelectedActivity(activity);
    form.reset({
      ...activity,
      date: new Date(activity.date).toISOString().split("T")[0],
    });
    setDialogOpen(true);
  }

  async function handleExport() {
    try {
      setIsExporting(true);
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `activities-${format(new Date(), "yyyy-MM-dd")}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Error exporting activities");
      console.error("Error:", error);
    } finally {
      setIsExporting(false);
    }
  }

  function convertToCSV(data: Activity[]) {
    const headers = ["Title", "Type", "Date", "Status", "Description", "Link"];
    const rows = data.map(item => [
      item.title,
      item.type,
      format(new Date(item.date), "yyyy-MM-dd"),
      item.status,
      item.description,
      item.link_url || ""
    ]);
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");
  }

  if (loading && !activities.length) {
    return (
      <div className="container py-10">
        <LoadingState message="Loading activities..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-10">
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-4">
          <h2 className="font-semibold mb-2">Error Loading Activities</h2>
          <p>{error.message}</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => fetchActivities()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="container py-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center"
        >
          <h1 className="text-3xl font-bold">Manage Activities</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isExporting}
              className="relative"
            >
              {isExporting ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                </div>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </>
              )}
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add New Activity
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 w-full md:w-auto">
            <Input
              placeholder="Search activities..."
              value={filters.search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setFilters(prev => ({ ...prev, search: e.target.value }))
              }
              className="max-w-sm"
            />
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  <Filter className="mr-2 h-4 w-4" />
                  {filters.type === 'all' ? 'All Types' : filters.type}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem
                  onClick={() => setFilters(prev => ({ ...prev, type: "all" }))}
                >
                  All Types
                </DropdownMenuItem>
                {Object.keys(typeIcons).map((type) => (
                  <DropdownMenuItem
                    key={type}
                    onClick={() => setFilters(prev => ({ ...prev, type }))}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto">
                  {filters.status === 'all' ? 'All Status' : filters.status}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setFilters(prev => ({ ...prev, status: "all" }))}
                >
                  All Status
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilters(prev => ({ ...prev, status: "active" }))}
                >
                  Active
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFilters(prev => ({ ...prev, status: "archived" }))}
                >
                  Archived
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading activities...</p>
            </div>
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No activities found</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setFilters({ search: "", type: "all", status: "all" });
                fetchActivities();
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell className="font-medium">{activity.title}</TableCell>
                    <TableCell>
                      <Badge variant="default">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(activity.date), "PPP")}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={activity.status === "active" ? "success" : "default"}
                        className="ml-2"
                      >
                        {activity.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(activity)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {activities.length} of {pagination.total} activities
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={pagination.page === 1}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              disabled={pagination.page * pagination.pageSize >= pagination.total}
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 