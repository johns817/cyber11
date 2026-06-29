"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Clock,
  Award,
  CheckCircle,
  Lock,
  ChevronRight,
  Shield,
  Terminal,
  Globe,
  Server,
  Monitor,
  Cloud,
  Search,
  Bug,
  Brain,
} from "lucide-react";

const pathsData: Record<string, {
  title: string;
  description: string;
  level: string;
  modules: { title: string; rooms: number; completed: boolean; locked: boolean }[];
  totalHours: number;
  certification?: string;
  prerequisites?: string;
}> = {
  "pre-security": {
    title: "Pre-Security",
    description: "Understand how computers, networks, and the web work before touching security concepts. Designed for absolute beginners with zero IT knowledge.",
    level: "Beginner",
    totalHours: 40,
    certification: "SEC0",
    modules: [
      { title: "Introduction to Cyber Security", rooms: 3, completed: true, locked: false },
      { title: "Network Fundamentals", rooms: 5, completed: true, locked: false },
      { title: "How The Web Works", rooms: 4, completed: false, locked: false },
      { title: "Linux Fundamentals (Parts 1-3)", rooms: 3, completed: false, locked: false },
      { title: "Windows Fundamentals (Parts 1-3)", rooms: 3, completed: false, locked: true },
    ],
  },
  "cyber-security-101": {
    title: "Cyber Security 101",
    description: "A solid, all-round foundation covering offensive, defensive, and foundational topics so you can choose a specialization. Replaces the old Complete Beginner path.",
    level: "Beginner",
    totalHours: 80,
    certification: "SEC1",
    prerequisites: "Pre-Security",
    modules: [
      { title: "Start Your Cyber Security Journey", rooms: 3, completed: true, locked: false },
      { title: "Linux Fundamentals (Parts 1-3)", rooms: 3, completed: true, locked: false },
      { title: "Windows & AD Fundamentals", rooms: 4, completed: true, locked: false },
      { title: "Shells and Command Lines", rooms: 3, completed: false, locked: false },
      { title: "Networking", rooms: 7, completed: false, locked: false },
      { title: "Cryptography", rooms: 4, completed: false, locked: false },
      { title: "Exploitation Basics", rooms: 3, completed: false, locked: true },
      { title: "Web Hacking", rooms: 5, completed: false, locked: true },
      { title: "Defensive Security", rooms: 3, completed: false, locked: true },
      { title: "Security Solutions", rooms: 4, completed: false, locked: true },
      { title: "Defensive Security Tooling", rooms: 4, completed: false, locked: true },
      { title: "Build Your Cyber Security Career", rooms: 3, completed: false, locked: true },
    ],
  },
  "jr-penetration-tester": {
    title: "Jr Penetration Tester",
    description: "Become an entry-level penetration tester. Rebuilt for 2026 with new Active Directory coverage and current real-world CVEs.",
    level: "Intermediate",
    totalHours: 120,
    certification: "PT1",
    prerequisites: "Cyber Security 101",
    modules: [
      { title: "Introduction — Methodologies & Ethics", rooms: 3, completed: true, locked: false },
      { title: "Network Reconnaissance — Nmap", rooms: 4, completed: true, locked: false },
      { title: "Web Application Security Fundamentals", rooms: 5, completed: false, locked: false },
      { title: "Burp Suite Full Series", rooms: 5, completed: false, locked: false },
      { title: "Web Application Vulnerabilities I", rooms: 6, completed: false, locked: false },
      { title: "Vulnerability Knowledge & CVE Deep-Dives", rooms: 5, completed: false, locked: true },
      { title: "Metasploit & Exploitation", rooms: 7, completed: false, locked: true },
      { title: "Active Directory (Revamped 2026)", rooms: 8, completed: false, locked: true },
      { title: "Privilege Escalation (Linux & Windows)", rooms: 4, completed: false, locked: true },
      { title: "Specialized Domains (Cloud, Mobile, Container)", rooms: 3, completed: false, locked: true },
    ],
  },
  "red-teaming": {
    title: "Red Teaming",
    description: "Advanced adversarial simulation for experienced pentesters. Cover evasion, C2 infrastructure, AD exploitation at scale, and purple team exercises.",
    level: "Advanced",
    totalHours: 100,
    prerequisites: "Jr Penetration Tester",
    modules: [
      { title: "Advanced Evasion Techniques (AV/EDR Bypass)", rooms: 5, completed: false, locked: false },
      { title: "C2 Infrastructure Deployment", rooms: 4, completed: false, locked: false },
      { title: "Active Directory Exploitation at Scale", rooms: 6, completed: false, locked: true },
      { title: "Physical Security & Social Engineering", rooms: 3, completed: false, locked: true },
      { title: "Advanced Persistence & Lateral Movement", rooms: 5, completed: false, locked: true },
      { title: "Purple Team Exercises", rooms: 4, completed: false, locked: true },
    ],
  },
  "soc-level-1": {
    title: "SOC Level 1",
    description: "Become a Security Operations Center analyst. Learn alert triage, phishing analysis, network monitoring, and threat intelligence. Backed by Accenture and Salesforce.",
    level: "Intermediate",
    totalHours: 110,
    certification: "SAL1",
    prerequisites: "Cyber Security 101",
    modules: [
      { title: "Blue Team Introduction", rooms: 4, completed: true, locked: false },
      { title: "Cyber Defence Frameworks", rooms: 4, completed: true, locked: false },
      { title: "Phishing Analysis", rooms: 6, completed: false, locked: false },
      { title: "Network Traffic Analysis", rooms: 5, completed: false, locked: false },
      { title: "Network Security Monitoring", rooms: 3, completed: false, locked: false },
      { title: "Web Security Monitoring", rooms: 4, completed: false, locked: true },
      { title: "Windows Security Monitoring", rooms: 4, completed: false, locked: true },
      { title: "Linux Security Monitoring", rooms: 4, completed: false, locked: true },
      { title: "Malware Concepts for SOC", rooms: 3, completed: false, locked: true },
      { title: "SOC Team Internals", rooms: 4, completed: false, locked: true },
      { title: "Core SOC Solutions (SIEM, EDR, SOAR)", rooms: 5, completed: false, locked: true },
      { title: "Threat Intelligence", rooms: 4, completed: false, locked: true },
      { title: "SOC Level 1 Capstone Challenges", rooms: 3, completed: false, locked: true },
    ],
  },
  "soc-level-2": {
    title: "SOC Level 2",
    description: "Advance to senior SOC roles. Cover log analysis, detection engineering, threat hunting, threat emulation, incident response, and malware analysis.",
    level: "Advanced",
    totalHours: 130,
    prerequisites: "SOC Level 1",
    modules: [
      { title: "Log Analysis", rooms: 3, completed: false, locked: false },
      { title: "Advanced Splunk (SPL, Dashboards)", rooms: 4, completed: false, locked: false },
      { title: "Advanced Elastic Stack (Wazuh, Logstash)", rooms: 4, completed: false, locked: true },
      { title: "Detection Engineering (Sigma, SOAR)", rooms: 6, completed: false, locked: true },
      { title: "Threat Hunting", rooms: 5, completed: false, locked: true },
      { title: "Threat Emulation (CALDERA, Atomic Red Team)", rooms: 6, completed: false, locked: true },
      { title: "Incident Response (Full Lifecycle)", rooms: 6, completed: false, locked: true },
      { title: "Malware Analysis (Static & Dynamic)", rooms: 8, completed: false, locked: true },
    ],
  },
};

export default function PathDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const path = pathsData[slug];

  if (!path) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Path not found</h1>
        <p className="text-muted-foreground mt-2">The learning path &quot;{slug}&quot; does not exist.</p>
      </div>
    );
  }

  const completedModules = path.modules.filter((m) => m.completed).length;
  const progress = Math.round((completedModules / path.modules.length) * 100);
  const totalRooms = path.modules.reduce((sum, m) => sum + m.rooms, 0);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Badge variant={path.level === "Beginner" ? "green" : path.level === "Intermediate" ? "blue" : "purple"}>
            {path.level}
          </Badge>
          {path.certification && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Award className="h-3 w-3" /> {path.certification} Certification
            </Badge>
          )}
        </div>
        <h1 className="text-3xl font-bold">{path.title}</h1>
        <p className="mt-2 text-muted-foreground max-w-3xl">{path.description}</p>
        {path.prerequisites && (
          <p className="mt-2 text-sm text-muted-foreground">
            Prerequisites: <span className="text-foreground font-medium">{path.prerequisites}</span>
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-cyber-purple" />
            <div>
              <div className="text-xl font-bold">{path.modules.length}</div>
              <div className="text-xs text-muted-foreground">Modules</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Terminal className="h-5 w-5 text-cyber-blue" />
            <div>
              <div className="text-xl font-bold">{totalRooms}</div>
              <div className="text-xs text-muted-foreground">Rooms</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Clock className="h-5 w-5 text-cyber-green" />
            <div>
              <div className="text-xl font-bold">{path.totalHours}h</div>
              <div className="text-xs text-muted-foreground">Est. Duration</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-xl font-bold">{progress}%</div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Path Progress</span>
          <span className="text-sm text-muted-foreground">{completedModules}/{path.modules.length} modules</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      <div className="space-y-3 mt-8">
        <h2 className="text-xl font-bold mb-4">Modules</h2>
        {path.modules.map((mod, index) => (
          <Card key={index} className={mod.locked ? "opacity-60" : ""}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  mod.completed ? "bg-green-500/20 text-green-500" : mod.locked ? "bg-muted text-muted-foreground" : "bg-primary/20 text-primary"
                }`}>
                  {mod.completed ? <CheckCircle className="h-4 w-4" /> : mod.locked ? <Lock className="h-4 w-4" /> : index + 1}
                </div>
                <div>
                  <div className="font-medium">{mod.title}</div>
                  <div className="text-sm text-muted-foreground">{mod.rooms} rooms</div>
                </div>
              </div>
              <Button variant={mod.completed ? "ghost" : mod.locked ? "ghost" : "cyber"} size="sm" disabled={mod.locked}>
                {mod.completed ? "Review" : mod.locked ? "Locked" : "Start"}
                {!mod.locked && <ChevronRight className="h-4 w-4 ml-1" />}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
