'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Pencil,
  Trash2,
  Search,
  Filter,
  Upload,
  Download,
  BarChart2,
  FileText,
  Video,
  Settings,
  ChevronDown,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  instructor: string;
  category: string;
  status: 'published' | 'draft';
  enrollments: number;
  rating: number;
  revenue: number;
  lastUpdated: string;
}

export default function AdminCourses() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('details');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priceRange: [0, 1000],
    rating: 'all',
  });

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    instructor: '',
    category: '',
    status: 'draft' as 'published' | 'draft',
    content: [] as { title: string; type: 'video' | 'text'; url: string }[],
  });

  // This would normally come from an API
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: 'Complete Web Development Bootcamp',
      description: 'Learn full-stack web development from scratch.',
      price: 499.99,
      instructor: 'Dr. Sarah Johnson',
      category: 'Development',
      status: 'published',
      enrollments: 250,
      rating: 4.8,
      revenue: 124997.50,
      lastUpdated: '2024-03-15',
    },
    {
      id: '2',
      title: 'Machine Learning A-Z',
      description: 'Master machine learning and AI concepts.',
      price: 599.99,
      instructor: 'Dr. David Kim',
      category: 'Data Science',
      status: 'published',
      enrollments: 180,
      rating: 4.9,
      revenue: 107998.20,
      lastUpdated: '2024-03-10',
    },
  ]);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      filters.category === 'all' || course.category === filters.category;
    const matchesStatus =
      filters.status === 'all' || course.status === filters.status;
    const matchesPrice =
      course.price >= filters.priceRange[0] &&
      course.price <= filters.priceRange[1];
    const matchesRating =
      filters.rating === 'all' ||
      (filters.rating === '4+' && course.rating >= 4) ||
      (filters.rating === '3+' && course.rating >= 3);

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus &&
      matchesPrice &&
      matchesRating
    );
  });

  const handleBatchAction = async (action: 'publish' | 'unpublish' | 'delete') => {
    if (selectedCourses.length === 0) {
      toast({
        title: 'No courses selected',
        description: 'Please select at least one course to perform this action.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // This would normally be an API call
      toast({
        title: 'Batch action completed',
        description: `Successfully ${action}ed ${selectedCourses.length} courses.`,
      });
      setSelectedCourses([]);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${action} courses. Please try again.`,
        variant: 'destructive',
      });
    }
  };

  const handleExport = async (format: 'csv' | 'pdf') => {
    try {
      // This would normally be an API call
      toast({
        title: 'Export started',
        description: `Your ${format.toUpperCase()} export will be ready shortly.`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to export courses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // This would normally be an API call
      toast({
        title: 'Import successful',
        description: 'Courses have been imported successfully.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to import courses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight dark:text-gray-100">
          Courses
        </h2>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleExport('csv')}>
                Export as CSV
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleExport('pdf')}>
                Export as PDF
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="outline" onClick={() => document.getElementById('import-file')?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Import
          </Button>
          <input
            id="import-file"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleImport}
          />
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>
                  {selectedCourse ? 'Edit Course' : 'Add New Course'}
                </DialogTitle>
                <DialogDescription>
                  Fill in the details below to {selectedCourse ? 'update' : 'create'}{' '}
                  a course.
                </DialogDescription>
              </DialogHeader>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="details">Course Details</TabsTrigger>
                  <TabsTrigger value="content">Course Content</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  {/* Course Details Form */}
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="price">Price</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) =>
                          setFormData({ ...formData, price: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="instructor">Instructor</Label>
                      <Input
                        id="instructor"
                        value={formData.instructor}
                        onChange={(e) =>
                          setFormData({ ...formData, instructor: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="content">
                  {/* Course Content Management */}
                  <div className="space-y-4">
                    <Button onClick={() => {/* Add content section */}}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Section
                    </Button>
                    {formData.content.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {item.type === 'video' ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                        <Input value={item.title} readOnly />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {/* Remove content */}}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="settings">
                  {/* Course Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="published"
                        checked={formData.status === 'published'}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            status: checked ? 'published' : 'draft',
                          })
                        }
                      />
                      <Label htmlFor="published">Published</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              <DialogFooter>
                <Button type="submit">
                  {selectedCourse ? 'Update Course' : 'Create Course'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleBatchAction('publish')}
            disabled={selectedCourses.length === 0}
          >
            Publish Selected
          </Button>
          <Button
            variant="outline"
            onClick={() => handleBatchAction('delete')}
            disabled={selectedCourses.length === 0}
          >
            Delete Selected
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="grid gap-4 rounded-lg border p-4 dark:border-gray-700 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Label>Category</Label>
            <Select
              value={filters.category}
              onValueChange={(value) =>
                setFilters({ ...filters, category: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Development">Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Status</Label>
            <Select
              value={filters.status}
              onValueChange={(value) =>
                setFilters({ ...filters, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Rating</Label>
            <Select
              value={filters.rating}
              onValueChange={(value) =>
                setFilters({ ...filters, rating: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ratings</SelectItem>
                <SelectItem value="4+">4+ Stars</SelectItem>
                <SelectItem value="3+">3+ Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedCourses.length === filteredCourses.length &&
                    filteredCourses.length > 0
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCourses(filteredCourses.map((c) => c.id));
                    } else {
                      setSelectedCourses([]);
                    }
                  }}
                />
              </TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Enrollments</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCourses.map((course) => (
              <TableRow key={course.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCourses.includes(course.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCourses([...selectedCourses, course.id]);
                      } else {
                        setSelectedCourses(
                          selectedCourses.filter((id) => id !== course.id)
                        );
                      }
                    }}
                  />
                </TableCell>
                <TableCell className="font-medium dark:text-gray-100">
                  {course.title}
                </TableCell>
                <TableCell>{course.instructor}</TableCell>
                <TableCell>{course.category}</TableCell>
                <TableCell>
                  ${course.price.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      course.status === 'published'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}
                  >
                    {course.status}
                  </span>
                </TableCell>
                <TableCell>{course.enrollments}</TableCell>
                <TableCell>
                  ${course.revenue.toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                  })}
                </TableCell>
                <TableCell>{course.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsAnalyticsOpen(true)}
                  >
                    <BarChart2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {/* Edit course */}}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {/* Delete course */}}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Course Analytics Dialog */}
      <Dialog open={isAnalyticsOpen} onOpenChange={setIsAnalyticsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Course Analytics</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$124,997.50</div>
                  <p className="text-xs text-muted-foreground">+12.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">250</div>
                  <p className="text-xs text-muted-foreground">+8.2% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Average Rating</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Based on 150 reviews</p>
                </CardContent>
              </Card>
            </div>
            {/* Add charts and graphs here */}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 