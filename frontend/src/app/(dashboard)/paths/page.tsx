"use client";

import Link from "next/link";
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
  Award,
  ChevronRight,
  BookOpen,
} from "lucide-react";

const structuredPaths = [
  {
    slug: "pre-security",
    name: "Pre-Security",
    level: "Beginner",
    modules: 5,
    hours: 40,
    description: "Understand computers, networks, and the web before touching security.",
    certification: "SEC0",
    progress: 40,
  },
  {
    slug: "cyber-security-101",
    name: "Cyber Security 101",
    level: "Beginner",
    modules: 13,
    hours: 80,
    description: "Solid foundation across offensive, defensive, and core security topics.",
    certification: "SEC1",
    progress: 25,
  },
  {
    slug: "jr-penetration-tester",
    name: "Jr Penetration Tester",
    level: "Intermediate",
    modules: 10,
    hours: 120,
    description: "Become an entry-level pentester with AD, web, and network exploitation skills.",
    certification: "PT1",
    progress: 20,
  },
  {
    slug: "red-teaming",
    name: "Red Teaming",
    level: "Advanced",
    modules: 6,
    hours: 100,
    description: "Advanced adversarial simulation — evasion, C2, and enterprise AD exploitation.",
    progress: 0,
  },
  {
    slug: "soc-level-1",
    name: "SOC Level 1",
    level: "Intermediate",
    modules: 13,
    hours: 110,
    description: "Become a SOC analyst. Alert triage, phishing analysis, threat intelligence.",
    certification: "SAL1",
    progress: 15,
  },
  {
    slug: "soc-level-2",
    name: "SOC Level 2",
    level: "Advanced",
    modules: 8,
    hours: 130,
    description: "Senior SOC roles — detection engineering, threat hunting, incident response.",
    progress: 0,
  },
];

const skillPaths = [
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
  { id: "cryptography", name: "Cryptography", icon: Lock, level: "Advanced", modules: 20, hours: 32, enrolled: 6780, progress: 0 },
  { id: "osint", name: "OSINT", icon: Fingerprint, level: "Beginner", modules: 16, hours: 22, enrolled: 18900, progress: 0 },
  { id: "bug-bounty", name: "Bug Bounty", icon: Bug, level: "Intermediate", modules: 30, hours: 50, enrolled: 28900, progress: 10 },
  { id: "devsecops", name: "DevSecOps", icon: Cpu, level: "Intermediate", modules: 24, hours: 38, enrolled: 9870, progress: 0 },
  { id: "threat-hunting", name: "Threat Hunting", icon: SearchIcon, level: "Advanced", modules: 26, hours: 42, enrolled: 5430, progress: 0 },
  { id: "iot-security", name: "IoT Security", icon: Database, level: "Advanced", modules: 18, hours: 30, enrolled: 4320, progress: 0 },
];

const levelColor = {
  Beginner: "green" as const,
  Intermediate: "blue" as const,
  Advanced: "purple" as const,
  Expert: "destructive" as const,
};

export default function PathsPage() {
  return (
    <div className="p-6 lg:p-8 space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Learning Paths</h1>
        <p className="text-muted-foreground">Structured tracks from absolute beginner to expert</p>
      </div>

      {/* Structured Career Paths */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-cyber-purple" /> Career Paths
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Curated progressions aligned with professional certifications. Follow these for a structured journey.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {structuredPaths.map((path) => (
            <Link key={path.slug} href={`/paths/${path.slug}`}>
              <Card className="h-full group hover:border-cyber-purple/50 transition-all hover:shadow-lg cursor-pointer">
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant={levelColor[path.level as keyof typeof levelColor]}>
                      {path.level}
                    </Badge>
                    {path.certification && (
                      <Badge variant="outline" className="text-xs">
                        <Award className="h-3 w-3 mr-1" /> {path.certification}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-bold">{path.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{path.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{path.modules} modules</span>
                    <span>{path.hours}h</span>
                  </div>
                  {path.progress > 0 && (
                    <div className="mt-3">
                      <Progress value={path.progress} className="h-2" />
                      <span className="text-xs text-muted-foreground mt-1">{path.progress}% complete</span>
                    </div>
                  )}
                  <div className="mt-3 flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Path <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Skill-Based Paths */}
      <section>
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-cyber-blue" /> Skill Paths
        </h2>
        <p className="text-sm text-muted-foreground mb-4">
          Focused tracks for building expertise in specific domains.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skillPaths.map((path) => {
            const Icon = path.icon;
            return (
              <Card key={path.id} className="group hover:border-cyber-purple/50 transition-all">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-purple/10">
                      <Icon className="h-5 w-5 text-cyber-purple" />
                    </div>
                    <Badge variant={levelColor[path.level as keyof typeof levelColor]} className="text-xs">
                      {path.level}
                    </Badge>
                  </div>
                  <h3 className="mt-3 font-semibold">{path.name}</h3>
                  <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{path.modules} modules</span>
                    <span>{path.hours}h</span>
                    <span>{(path.enrolled / 1000).toFixed(0)}K enrolled</span>
                  </div>
                  {path.progress > 0 && (
                    <div className="mt-3">
                      <Progress value={path.progress} className="h-1.5" />
                    </div>
                  )}
                  <Button
                    variant={path.progress > 0 ? "cyber" : "outline"}
                    size="sm"
                    className="w-full mt-3"
                  >
                    {path.progress === 100 ? "Completed" : path.progress > 0 ? "Continue" : "Start"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
