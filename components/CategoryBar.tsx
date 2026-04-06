"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "Music",
  "Gaming",
  "Mixes",
  "Live",
  "React routers",
  "Computer programming",
  "Podcasts",
  "News",
  "Web development",
  "Algorithms",
  "Recent",
  "Watched",
  "New to you"
];

export default function CategoryBar() {
  const [activeCategory, setActiveCategory] = useState("All");

  return (
    <div className="flex items-center space-x-3 overflow-x-auto pb-4 pt-2 no-scrollbar px-6 mb-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors",
            activeCategory === category
              ? "bg-white text-black"
              : "bg-neutral-800 text-neutral-200 hover:bg-neutral-700"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
