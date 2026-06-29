"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Terminal,
  Users,
  Clock,
  CheckCircle,
  Play,
  Flag,
  BookOpen,
  Monitor,
} from "lucide-react";

const difficultyColors: Record<string, string> = {
  "Very Easy": "bg-green-500",
  Easy: "bg-green-400",
  Medium: "bg-yellow-500",
  Hard: "bg-red-500",
  Insane: "bg-gray-900 text-white",
};

const roomTypes = ["All", "Walkthrough", "Challenge", "CTF", "SOC Simulator", "Pentest Simulator"];

const rooms = [
  {
    title: "Linux Fundamentals Part 1",
    type: "Walkthrough",
    difficulty: "Very Easy",
    tasks: 8,
    users: 245000,
    duration: "1 hr",
    description: "Learn the basics of Linux — navigating the filesystem, running commands, and understanding permissions.",
    tags: ["Linux", "Fundamentals"],
    completed: true,
  },
  {
    title: "OWASP Top 10 - 2025",
    type: "Walkthrough",
    difficulty: "Easy",
    tasks: 12,
    users: 89000,
    duration: "2 hr",
    description: "Walk through the latest OWASP Top 10 web application security risks with hands-on exploitation examples.",
    tags: ["Web", "OWASP"],
    completed: true,
  },
  {
    title: "Active Directory Basics",
    type: "Walkthrough",
    difficulty: "Medium",
    tasks: 10,
    users: 56000,
    duration: "3 hr",
    description: "Introduction to Active Directory concepts, enumeration techniques, and basic attack vectors.",
    tags: ["Active Directory", "Windows"],
    completed: false,
  },
  {
    title: "Buffer Overflow Prep",
    type: "Challenge",
    difficulty: "Hard",
    tasks: 6,
    users: 23000,
    duration: "4 hr",
    description: "Practice exploiting buffer overflows on a variety of vulnerable applications. Game-based approach.",
    tags: ["Binary", "Exploitation"],
    completed: false,
  },
  {
    title: "HackPark",
    type: "CTF",
    difficulty: "Medium",
    tasks: 5,
    users: 67000,
    duration: "2 hr",
    description: "Bruteforce a websites login with Hydra, identify and use a public exploit, escalate privileges on Windows.",
    tags: ["Web", "Windows", "PrivEsc"],
    completed: false,
  },
  {
    title: "SOC Alert Triage",
    type: "SOC Simulator",
    difficulty: "Medium",
    tasks: 15,
    users: 12000,
    duration: "3 hr",
    description: "Triage real-time security alerts in an immersive SOC environment. Investigate phishing, malware, and suspicious network activity.",
    tags: ["Blue Team", "SOC", "SIEM"],
    completed: false,
  },
  {
    title: "Corporate Pentest Engagement",
    type: "Pentest Simulator",
    difficulty: "Hard",
    tasks: 8,
    users: 8900,
    duration: "6 hr",
    description: "Full-scope penetration test from reconnaissance to reporting. Multiple attack vectors, Active Directory, and lateral movement.",
    tags: ["Red Team", "AD", "Pentest"],
    completed: false,
  },
  {
    title: "Reverse Engineering 101",
    type: "Walkthrough",
    difficulty: "Medium",
    tasks: 9,
    users: 34000,
    duration: "3 hr",
    description: "Learn the basics of reverse engineering using Ghidra and x64dbg. Analyze simple binaries and crack serial key checks.",
    tags: ["Reverse Engineering", "Ghidra"],
    completed: false,
  },
  {
    title: "Volatility Memory Forensics",
    type: "Challenge",
    difficulty: "Hard",
    tasks: 7,
    users: 15000,
    duration: "3 hr",
    description: "Analyze memory dumps using Volatility framework. Extract credentials, identify malware, and reconstruct attack timelines.",
    tags: ["Forensics", "Memory"],
    completed: false,
  },
  {
    title: "Internal Network Pivoting",
    type: "Challenge",
    difficulty: "Insane",
    tasks: 4,
    users: 3400,
    duration: "5 hr",
    description: "Chain multiple exploits across a segmented network. Pivot through proxychains, use ligolo-ng, and compromise the domain.",
    tags: ["Pivoting", "Network", "AD"],
    completed: false,
  },
];

export default function RoomsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRooms = rooms.filter((room) => {
    const matchesType = selectedType === "All" || room.type === selectedType;
    const matchesSearch = room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesType && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Rooms</h1>
        <p className="mt-2 text-muted-foreground">
          Self-contained hands-on labs. Deploy target machines, complete tasks, capture flags.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search rooms by name or tag..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {roomTypes.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "cyber" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        {filteredRooms.map((room) => (
          <Card key={room.title} className={room.completed ? "border-green-500/30" : ""}>
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                  {room.type === "SOC Simulator" ? (
                    <Monitor className="h-6 w-6 text-blue-500" />
                  ) : room.type === "Pentest Simulator" ? (
                    <Terminal className="h-6 w-6 text-red-500" />
                  ) : room.type === "CTF" ? (
                    <Flag className="h-6 w-6 text-yellow-500" />
                  ) : (
                    <BookOpen className="h-6 w-6 text-cyber-purple" />
                  )}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold">{room.title}</h3>
                  {room.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{room.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {room.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4 flex-shrink-0 text-sm text-muted-foreground">
                <div className="hidden lg:flex flex-col items-center gap-0.5">
                  <span className={`px-2 py-0.5 rounded text-xs text-white ${difficultyColors[room.difficulty]}`}>
                    {room.difficulty}
                  </span>
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  <Flag className="h-3 w-3" /> {room.tasks} tasks
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  <Users className="h-3 w-3" /> {(room.users / 1000).toFixed(0)}K
                </div>
                <div className="hidden lg:flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {room.duration}
                </div>
                <Button variant="cyber" size="sm">
                  <Play className="h-3 w-3 mr-1" /> Deploy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
