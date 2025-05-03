"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy, Code, Megaphone, Award } from "lucide-react";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Activity = {
  id: string;
  title: string;
  description: string;
  type: "event" | "result" | "hackathon" | "announcement" | "achievement";
  date: string;
  image_url?: string;
  link_url?: string;
  is_featured: boolean;
};

const typeIcons = {
  event: Calendar,
  result: Trophy,
  hackathon: Code,
  announcement: Megaphone,
  achievement: Award,
};

export function RecentActivities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeType, setActiveType] = useState<string>("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const { data, error } = await supabase
          .from("activities")
          .select("*")
          .eq("status", "active")
          .order("date", { ascending: false })
          .limit(10);

        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error("Error fetching activities:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchActivities();
  }, []);

  const filteredActivities = activeType === "all"
    ? activities
    : activities.filter(activity => activity.type === activeType);

  const ActivityCard = ({ activity }: { activity: Activity }) => {
    const Icon = typeIcons[activity.type];
    return (
      <Card className="group hover:shadow-md transition-shadow">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <Badge variant="default">{activity.type}</Badge>
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <CardTitle className="text-xl">{activity.title}</CardTitle>
          <CardDescription>
            {format(new Date(activity.date), "PPP")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{activity.description}</p>
          {activity.link_url && (
            <Button variant="outline" size="sm" asChild>
              <Link href={activity.link_url}>Learn More</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return <div>Loading activities...</div>;
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Recent Activities</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest events, achievements, and announcements from our institution.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="flex justify-center mb-8">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="event">Events</TabsTrigger>
            <TabsTrigger value="result">Results</TabsTrigger>
            <TabsTrigger value="hackathon">Hackathons</TabsTrigger>
            <TabsTrigger value="achievement">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredActivities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </TabsContent>

          {["event", "result", "hackathon", "achievement"].map((type) => (
            <TabsContent key={type} value={type} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activities
                  .filter((activity) => activity.type === type)
                  .map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
} 