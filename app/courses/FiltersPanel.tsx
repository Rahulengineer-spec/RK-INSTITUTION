import { Button } from "@/components/ui/button";
import React from "react";

interface FiltersPanelProps {
  category: string;
  setCategory: (val: string) => void;
  level: string;
  setLevel: (val: string) => void;
  price: string;
  setPrice: (val: string) => void;
  language: string;
  setLanguage: (val: string) => void;
  rating: string;
  setRating: (val: string) => void;
  duration: string;
  setDuration: (val: string) => void;
  feature: string;
  setFeature: (val: string) => void;
  clearAll: () => void;
  categories: string[];
  levels: string[];
  prices: string[];
  languages: string[];
  ratings: string[];
  durations: string[];
  features: string[];
}

export const FiltersPanel: React.FC<FiltersPanelProps> = ({
  category,
  setCategory,
  level,
  setLevel,
  price,
  setPrice,
  language,
  setLanguage,
  rating,
  setRating,
  duration,
  setDuration,
  feature,
  setFeature,
  clearAll,
  categories,
  levels,
  prices,
  languages,
  ratings,
  durations,
  features,
}) => {
  return (
    <div className="bg-card rounded-xl shadow p-6 max-h-[80vh] overflow-y-auto scrollbar-thin scrollbar-thumb-primary scrollbar-track-background sticky top-32">
      <div className="font-semibold mb-4">Filters</div>
      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-primary">Category</div>
        {categories.slice(1).map((cat) => (
          <Button
            key={cat}
            variant={cat === category ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start mb-1"
            onClick={() => setCategory(cat)}
          >
            {cat}
          </Button>
        ))}
      </div>
      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-primary">Level</div>
        {levels.slice(1).map((lvl) => (
          <Button
            key={lvl}
            variant={lvl === level ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start mb-1"
            onClick={() => setLevel(lvl)}
          >
            {lvl}
          </Button>
        ))}
      </div>
      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-primary">Price</div>
        {prices.slice(1).map((p) => (
          <Button
            key={p}
            variant={p === price ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start mb-1"
            onClick={() => setPrice(p)}
          >
            {p}
          </Button>
        ))}
      </div>
      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-primary">Language</div>
        {languages.slice(1).map((lang) => (
          <Button
            key={lang}
            variant={lang === language ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start mb-1"
            onClick={() => setLanguage(lang)}
          >
            {lang}
          </Button>
        ))}
      </div>
      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-primary">Ratings</div>
        {ratings.slice(1).map((r) => (
          <Button
            key={r}
            variant={r === rating ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start mb-1"
            onClick={() => setRating(r)}
          >
            {r} Stars
          </Button>
        ))}
      </div>
      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-primary">Duration</div>
        {durations.slice(1).map((d) => (
          <Button
            key={d}
            variant={d === duration ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start mb-1"
            onClick={() => setDuration(d)}
          >
            {d}
          </Button>
        ))}
      </div>
      <div className="mb-6">
        <div className="text-lg font-bold mb-2 text-primary">Features</div>
        {features.slice(1).map((f) => (
          <Button
            key={f}
            variant={f === feature ? "default" : "ghost"}
            size="sm"
            className="w-full justify-start mb-1"
            onClick={() => setFeature(f)}
          >
            {f}
          </Button>
        ))}
      </div>
      <Button variant="outline" size="sm" className="w-full mt-2" onClick={clearAll}>Clear All</Button>
    </div>
  );
}; 