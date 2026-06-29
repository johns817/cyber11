import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Server, Monitor, Cloud, Network } from "lucide-react";

const labs = [
  {
    id: "cerberus",
    name: "Cerberus",
    os: "Linux",
    difficulty: "Medium",
    points: 30,
    description: "Enumerate a web application, exploit an SSRF vulnerability, and escalate privileges via a cron job.",
    tags: ["Web", "SSRF", "Privilege Escalation"],
    users: 4521,
    rating: 4.7,
  },
  {
    id: "fortress",
    name: "Fortress",
    os: "Windows",
    difficulty: "Hard",
    points: 40,
    description: "Attack a Windows domain controller, abuse Kerberos delegation, and obtain domain admin.",
    tags: ["Active Directory", "Kerberos", "Domain"],
    users: 2103,
    rating: 4.9,
  },
  {
    id: "phantom",
    name: "Phantom",
    os: "Linux",
    difficulty: "Easy",
    points: 20,
    description: "Discover hidden directories, exploit a file upload vulnerability, and read the root flag.",
    tags: ["Web", "File Upload", "Linux"],
    users: 8932,
    rating: 4.3,
  },
  {
    id: "nexus",
    name: "Nexus",
    os: "Linux",
    difficulty: "Insane",
    points: 50,
    description: "Multi-stage attack involving container escape, pivot through internal services, and kernel exploitation.",
    tags: ["Docker", "Pivot", "Kernel"],
    users: 892,
    rating: 4.8,
  },
  {
    id: "skyfall",
    name: "Skyfall",
    os: "Windows",
    difficulty: "Medium",
    points: 30,
    description: "Exploit a vulnerable .NET application and abuse Windows privileges for system access.",
    tags: [".NET", "Windows", "SeImpersonate"],
    users: 3412,
    rating: 4.5,
  },
  {
    id: "cloudstrike",
    name: "CloudStrike",
    os: "Cloud",
    difficulty: "Hard",
    points: 40,
    description: "Enumerate AWS resources, exploit misconfigured IAM roles, and access sensitive S3 buckets.",
    tags: ["AWS", "IAM", "Cloud"],
    users: 1567,
    rating: 4.6,
  },
];

const difficultyColor = {
  Easy: "success" as const,
  Medium: "warning" as const,
  Hard: "destructive" as const,
  Insane: "purple" as const,
};

const osIcon = {
  Linux: Server,
  Windows: Monitor,
  Cloud: Cloud,
};

export default function LabsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Labs</h1>
          <p className="text-muted-foreground">Attack real machines in isolated environments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search labs..." className="pl-9 w-64" />
          </div>
        </div>
      </div>

      {/* Filter Badges */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">All</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Linux</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Windows</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Cloud</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Easy</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Medium</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Hard</Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">Active Directory</Badge>
      </div>

      {/* Labs Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {labs.map((lab) => {
          const OsIcon = osIcon[lab.os as keyof typeof osIcon] || Network;
          return (
            <Card key={lab.id} className="group hover:border-cyber-purple/50 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted group-hover:bg-cyber-purple/10 transition-colors">
                    <OsIcon className="h-6 w-6 text-muted-foreground group-hover:text-cyber-purple" />
                  </div>
                  <Badge variant={difficultyColor[lab.difficulty as keyof typeof difficultyColor]}>
                    {lab.difficulty}
                  </Badge>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{lab.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{lab.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {lab.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{lab.users.toLocaleString()} users</span>
                    <span>{lab.points} pts</span>
                  </div>
                  <Button size="sm" variant="cyber">
                    Spawn
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
