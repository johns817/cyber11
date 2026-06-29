"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Award, Clock, Shield, Terminal, Brain, Cpu, ChevronRight } from "lucide-react";

const certifications = [
  {
    id: "sec0",
    name: "SEC0",
    title: "Foundational Security",
    level: "Beginner",
    description: "Validates foundational IT literacy — how computers work, basic networking, basic OS knowledge. For complete beginners with no technical background.",
    format: "Hands-on practical tasks in a live environment",
    icon: Shield,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    path: "Pre-Security",
  },
  {
    id: "sec1",
    name: "SEC1",
    title: "Cyber Security 101",
    level: "Beginner",
    description: "Core cyber security fundamentals across offensive and defensive domains. Scenario-based tasks covering all foundational areas.",
    format: "100% practical, 24-hour exam window",
    icon: Shield,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    path: "Cyber Security 101",
  },
  {
    id: "sal1",
    name: "SAL1",
    title: "Security Analyst Level 1",
    level: "Entry",
    description: "Real-world SOC operations — alert triage, phishing investigation, malware analysis, escalation decisions. Backed by Accenture and Salesforce.",
    format: "Immersive SOC simulator with real-time alert handling",
    icon: Terminal,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    path: "SOC Level 1",
    backedBy: ["Accenture", "Salesforce"],
  },
  {
    id: "pt1",
    name: "PT1",
    title: "Junior Penetration Tester",
    level: "Entry",
    description: "Full penetration test lifecycle — reconnaissance, exploitation, post-exploitation, Active Directory attacks, and formal reporting.",
    format: "Complete pentest simulator with written report submission",
    icon: Brain,
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    path: "Jr Penetration Tester",
  },
  {
    id: "ai1",
    name: "AI1",
    title: "AI Security Level 1",
    level: "Intermediate",
    description: "Identifying, exploiting, and remediating risks across AI systems, applications, and supply chains.",
    format: "Hands-on AI vulnerability exploitation & remediation",
    icon: Cpu,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    path: "AI Security",
  },
];

export default function CertificationsPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Professional Certifications</h1>
        <p className="mt-2 text-muted-foreground">
          100% practical, hands-on exams in live lab environments. No multiple choice — prove your skills by doing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-cyber-purple">5</div>
            <div className="text-sm text-muted-foreground">Certifications</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-cyber-blue">100%</div>
            <div className="text-sm text-muted-foreground">Practical Exams</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-cyber-green">Industry</div>
            <div className="text-sm text-muted-foreground">Backed</div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        {certifications.map((cert) => {
          const Icon = cert.icon;
          return (
            <Card key={cert.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl ${cert.bgColor} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`h-7 w-7 ${cert.color}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold">{cert.name}</h3>
                        <Badge variant={cert.level === "Beginner" ? "green" : cert.level === "Entry" ? "blue" : "purple"}>
                          {cert.level}
                        </Badge>
                      </div>
                      <p className="text-lg font-medium text-muted-foreground">{cert.title}</p>
                      <p className="mt-2 text-sm text-muted-foreground max-w-xl">{cert.description}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> {cert.format}
                        </span>
                        {cert.backedBy && (
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3" /> Backed by {cert.backedBy.join(" & ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 lg:items-end">
                    <Button variant="cyber" size="sm">
                      Start Path <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    <span className="text-xs text-muted-foreground">
                      Requires: {cert.path} path
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
