import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Server,
  Target,
  Code,
  Brain,
  Lock,
  Shield,
  Cloud,
  Search as SearchIcon,
  Eye,
  Bug,
  Wifi,
  Database,
  Fingerprint,
  Network,
  Monitor,
  Cpu,
} from "lucide-react";

const learningPaths = [
  { id: "web-security", name: "Web Security", icon: Globe, level: "Beginner", modules: 24, hours: 40, enrolled: 45230, progress: 65 },
  { id: "network-security", name: "Network Security", icon: Wifi, level: "Intermediate", modules: 32, hours: 55, enrolled: 23100, progress: 30 },
  { id: "linux-fundamentals", name: "Linux Fundamentals", icon: Server, level: "Beginner", modules: 18, hours: 25, enrolled: 67890, progress: 100 },
  { id: "windows-fundamentals", name: "Windows Fundamentals", icon: Monitor, level: "Beginner", modules: 20, hours: 30, enrolled: 34560, progress: 45 },
  { id: "privilege-escalation", name: "Privilege Escalation", icon: Target, level: "Intermediate", modules: 28, hours: 45, enrolled: 19870, progress: 0 },
  { id: "active-directory", name: "Active Directory", icon: Network, level: "Advanced", modules: 36, hours: 60, enrolled: 12450, progress: 0 },
  { id: "cloud-security", name: "Cloud Security", icon: Cloud, level: "Intermediate", modules: 22, hours: 35, enrolled: 15670, progress: 15 },
  { id: "digital-forensics", name: "Digital Forensics", icon: Brain, level: "Intermediate", modules: 26, hours: 42, enrolled: 11230, progress: 0 },
  { id: "reverse-engineering", name: "Reverse Engineering", icon: Code, level: "Advanced", modules: 30, hours: 50, enrolled: 8900, progress: 0 },
  { id: "malware-analysis", name: "Malware Analysis", icon: Bug, level: "Advanced", modules: 24, hours: 40, enrolled: 7650, progress: 0 },
  { id: "red-teaming", name: "Red Teaming", icon: Target, level: "Expert", modules: 40, hours: 70, enrolled: 6540, progress: 0 },
  { id: "blue-teaming", name: "Blue Teaming", icon: Shield, level: "Intermediate", modules: 28, hours: 45, enrolled: 14320, progress: 0 },
  { id: "soc-analyst", name: "SOC Analyst", icon: Eye, level: "Beginner", modules: 22, hours: 35, enrolled: 21450, progress: 0 },
  { id: "threat-hunting", name: "Threat Hunting", icon: SearchIcon, level: "Advanced", modules: 26, hours: 42, enrolled: 5430, progress: 0 },
  { id: "bug-bounty", name: "Bug Bounty", icon: Bug, level: "Intermediate", modules: 30, hours: 50, enrolled: 28900, progress: 10 },
  { id: "devsecops", name: "DevSecOps", icon: Cpu, level: "Intermediate", modules: 24, hours: 38, enrolled: 9870, progress: 0 },
  { id: "cryptography", name: "Cryptography", icon: Lock, level: "Advanced", modules: 20, hours: 32, enrolled: 6780, progress: 0 },
  { id: "osint", name: "OSINT", icon: Fingerprint, level: "Beginner", modules: 16, hours: 22, enrolled: 18900, progress: 0 },
  { id: "iot-security", name: "IoT Security", icon: Database, level: "Advanced", modules: 18, hours: 30, enrolled: 4320, progress: 0 },
];

const levelColor = {
  Beginner: "success" as const,
  Intermediate: "warning" as const,
  Advanced: "destructive" as const,
  Expert: "purple" as const,
};

export default function PathsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Paths</h1>
        <p className="text-muted-foreground">Structured tracks from beginner to expert</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {learningPaths.map((path) => {
          const Icon = path.icon;
          return (
            <Card key={path.id} className="group hover:border-cyber-purple/50 transition-all hover:shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-purple/10 group-hover:bg-cyber-purple/20 transition-colors">
                    <Icon className="h-6 w-6 text-cyber-purple" />
                  </div>
                  <Badge variant={levelColor[path.level as keyof typeof levelColor]}>
                    {path.level}
                  </Badge>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{path.name}</h3>
                <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{path.modules} modules</span>
                  <span>{path.hours}h</span>
                  <span>{path.enrolled.toLocaleString()} enrolled</span>
                </div>
                {path.progress > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{path.progress}%</span>
                    </div>
                    <Progress value={path.progress} />
                  </div>
                )}
                <div className="mt-4">
                  <Button
                    variant={path.progress > 0 ? "cyber" : "outline"}
                    size="sm"
                    className="w-full"
                  >
                    {path.progress === 100 ? "Completed" : path.progress > 0 ? "Continue" : "Start Path"}
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
