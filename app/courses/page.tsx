"use client"
import { Metadata } from "next"
import { CoursesGrid } from "@/components/courses/courses-grid"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { Icons } from "@/components/icons"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FiltersPanel } from "./FiltersPanel"

const categories = ["all", "Development", "Data Science", "Design"];
const levels = ["all", "Beginner", "Intermediate", "Advanced"];
const prices = ["all", "Free", "Paid"];
const languages = ["all", "English", "Hindi"];
const ratings = ["all", "4.5+", "4.0+", "3.5+", "3.0+"];
const durations = ["all", "< 2 hours", "2-10 hours", "> 10 hours"];
const features = ["all", "Certificate", "Preview Available"];

export default function CoursesPage() {
  // State for search and filters (to be wired up in next steps)
  const [search, setSearch] = useState("")
  const [sort, setSort] = useState("popular")
  const [category, setCategory] = useState("all")
  const [level, setLevel] = useState("all")
  const [price, setPrice] = useState("all")
  const [language, setLanguage] = useState("all")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)
  const [rating, setRating] = useState("all")
  const [duration, setDuration] = useState("all")
  const [feature, setFeature] = useState("all")

  // Helper for filter chip active state
  const isActive = (val: string, current: string) => val === current

  // Clear all filters
  const clearAll = () => {
    setCategory("all");
    setLevel("all");
    setPrice("all");
    setLanguage("all");
    setRating("all");
    setDuration("all");
    setFeature("all");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="container flex flex-col md:flex-row md:items-center gap-4 py-6">
          {/* Search Bar */}
          <div className="flex-1 flex items-center gap-2">
            <Input
              type="text"
              placeholder="Search for anything..."
              className="w-full md:w-[400px] h-12 text-lg"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search courses"
            />
            <Button size="lg" className="h-12 px-6">
              <Icons.search className="h-5 w-5" />
            </Button>
          </div>
          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-sm hidden md:inline">Sort by:</span>
            <Select value={sort} onValueChange={setSort} aria-label="Sort courses">
              <SelectTrigger className="w-[180px] h-12">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
            {/* Mobile Filters Button */}
            <Button
              variant="default"
              size="lg"
              className="flex items-center gap-2 h-12 px-5 ml-2 lg:hidden"
              onClick={() => setMobileFilterOpen(true)}
              aria-label="Open filters"
            >
              <Icons.filter className="h-5 w-5" />
              <span className="font-semibold">Filters</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="container flex gap-8 py-10">
        {/* Sidebar (desktop only) */}
        <aside className="hidden lg:block w-64 shrink-0">
          <FiltersPanel
            category={category}
            setCategory={setCategory}
            level={level}
            setLevel={setLevel}
            price={price}
            setPrice={setPrice}
            language={language}
            setLanguage={setLanguage}
            rating={rating}
            setRating={setRating}
            duration={duration}
            setDuration={setDuration}
            feature={feature}
            setFeature={setFeature}
            clearAll={clearAll}
            categories={categories}
            levels={levels}
            prices={prices}
            languages={languages}
            ratings={ratings}
            durations={durations}
            features={features}
          />
        </aside>
        {/* Main Content: Course Grid/List */}
        <main className="flex-1 min-w-0">
          <CoursesGrid
            searchQuery={search}
            selectedCategory={category}
            selectedLevel={level}
            selectedPrice={price}
            selectedLanguage={language}
            sortBy={sort}
          />
        </main>
      </div>
      {/* Drawer for mobile filters */}
      <Dialog open={mobileFilterOpen} onOpenChange={setMobileFilterOpen}>
        <DialogContent className="max-w-xs left-0 top-0 h-full fixed rounded-none p-0 lg:hidden">
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Filters</DialogTitle>
          </DialogHeader>
          <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
            <FiltersPanel
              category={category}
              setCategory={setCategory}
              level={level}
              setLevel={setLevel}
              price={price}
              setPrice={setPrice}
              language={language}
              setLanguage={setLanguage}
              rating={rating}
              setRating={setRating}
              duration={duration}
              setDuration={setDuration}
              feature={feature}
              setFeature={setFeature}
              clearAll={clearAll}
              categories={categories}
              levels={levels}
              prices={prices}
              languages={languages}
              ratings={ratings}
              durations={durations}
              features={features}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}