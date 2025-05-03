"use client";

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
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
import { Badge } from "@/components/ui/badge";
import { ErrorBoundary } from "@/components/error-boundary";
import { LoadingState } from "@/components/loading-state";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Download, Filter, Plus, UserPlus, Shield, User } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface User {
  id: string;
  email: string;
  role: "admin" | "teacher" | "student";
  status: "active" | "inactive";
  created_at: string;
  last_sign_in_at: string | null;
}

interface FilterState {
  search: string;
  role: string;
  status: string;
}

interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  role: z.enum(["admin", "teacher", "student"]),
  status: z.enum(["active", "inactive"]).default("active"),
});

type FormValues = z.infer<typeof formSchema>;

const roleColors = {
  admin: "error",
  teacher: "warning",
  student: "info",
} as const;

export default function UsersAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    role: "all",
    status: "all",
  });
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0,
  });
  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      role: "student",
      status: "active",
    },
  });

  useEffect(() => {
    fetchUsers();
  }, [filters, pagination.page, pagination.pageSize]);

  async function fetchUsers() {
    try {
      setLoading(true);
      let query = supabase
        .from("users")
        .select("*", { count: "exact" });

      if (filters.search) {
        query = query.ilike("email", `%${filters.search}%`);
      }
      if (filters.role !== "all") {
        query = query.eq("role", filters.role);
      }
      if (filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      const start = (pagination.page - 1) * pagination.pageSize;
      query = query
        .order("created_at", { ascending: false })
        .range(start, start + pagination.pageSize - 1);

      const { data, error, count } = await query;

      if (error) throw error;
      setUsers(data || []);
      setPagination(prev => ({ ...prev, total: count || 0 }));
    } catch (error) {
      toast.error("Error fetching users");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const { error } = selectedUser
        ? await supabase
            .from("users")
            .update(values)
            .eq("id", selectedUser.id)
        : await supabase.from("users").insert([values]);

      if (error) throw error;

      toast.success(selectedUser ? "User updated" : "User created");
      setDialogOpen(false);
      fetchUsers();
      form.reset();
      setSelectedUser(null);
    } catch (error) {
      toast.error("Error saving user");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  async function handleExport() {
    try {
      setIsExporting(true);
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `users-${format(new Date(), "yyyy-MM-dd")}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      toast.error("Error exporting users");
      console.error("Error:", error);
    } finally {
      setIsExporting(false);
    }
  }

  function convertToCSV(data: User[]) {
    const headers = ["Email", "Role", "Status", "Created At", "Last Sign In"];
    const rows = data.map(item => [
      item.email,
      item.role,
      item.status,
      format(new Date(item.created_at), "yyyy-MM-dd"),
      item.last_sign_in_at ? format(new Date(item.last_sign_in_at), "yyyy-MM-dd") : ""
    ]);
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(","))
      .join("\n");
  }

  return (
    <ErrorBoundary>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExport}
              disabled={isExporting}
            >
              <Download className="mr-2 h-4 w-4" />
              Export Users
            </Button>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
                <Button
                  variant="default"
                  onClick={() => {
                    setSelectedUser(null);
                    form.reset();
                  }}
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add New User
            </Button>
          </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                    {selectedUser ? "Edit User" : "Create User"}
              </DialogTitle>
            </DialogHeader>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input {...field} type="email" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                  <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                            </FormControl>
                    <SelectContent>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="inactive">Inactive</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={loading}>
                        {loading ? "Saving..." : "Save Changes"}
                      </Button>
              </div>
            </form>
                </Form>
          </DialogContent>
        </Dialog>
          </div>
      </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1">
        <Input
          placeholder="Search users..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
          className="max-w-sm"
        />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Shield className="mr-2 h-4 w-4" />
                Role
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setFilters(prev => ({ ...prev, role: "all" }))}
              >
                All Roles
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters(prev => ({ ...prev, role: "admin" }))}
              >
                Admin
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters(prev => ({ ...prev, role: "teacher" }))}
              >
                Teacher
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setFilters(prev => ({ ...prev, role: "student" }))}
              >
                Student
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" />
                Status
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
                onClick={() => setFilters(prev => ({ ...prev, status: "inactive" }))}
              >
                Inactive
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>

        <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Last Sign In</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
              {loading ? (
                <LoadingState variant="table" />
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
              <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={roleColors[user.role]}>
                        {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === "active" ? "success" : "default"}>
                        {user.status}
                      </Badge>
                </TableCell>
                <TableCell>
                      {format(new Date(user.created_at), "PPP")}
                </TableCell>
                <TableCell>
                      {user.last_sign_in_at
                        ? format(new Date(user.last_sign_in_at), "PPP")
                        : "Never"}
                </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.pageSize) + 1} to{" "}
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} of{" "}
            {pagination.total} users
          </p>
          <div className="flex gap-2">
                  <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
              disabled={pagination.page === 1}
            >
              Previous
                  </Button>
                  <Button
              variant="outline"
              size="sm"
              onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
              disabled={pagination.page * pagination.pageSize >= pagination.total}
            >
              Next
                  </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
} 