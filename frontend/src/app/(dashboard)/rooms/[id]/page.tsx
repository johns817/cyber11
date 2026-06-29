"use client";

import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Terminal,
  Flag,
  CheckCircle,
  Circle,
  Play,
  RotateCcw,
  Clock,
  HelpCircle,
  Send,
  ChevronDown,
  ChevronRight,
  Users,
  Award,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const roomData = {
  title: "Active Directory Basics",
  description: "Introduction to Active Directory concepts, enumeration techniques, and basic attack vectors.",
  difficulty: "Medium",
  type: "Walkthrough",
  duration: "3 hours",
  author: "CyberQuest Team",
  users: 56000,
  tasks: [
    {
      id: 1,
      title: "Introduction to Active Directory",
      description: "Learn what Active Directory is, why it's used in enterprises, and understand its core components.",
      questions: [
        { text: "What service does Windows Server use to manage domain resources?", answer: "Active Directory", completed: true },
        { text: "What protocol does AD use for authentication by default?", answer: "Kerberos", completed: true },
      ],
      completed: true,
    },
    {
      id: 2,
      title: "AD Components and Structure",
      description: "Understand forests, domains, trees, organizational units, and Group Policy Objects.",
      questions: [
        { text: "What is the top-level container in Active Directory called?", answer: "Forest", completed: true },
        { text: "What AD object is used to apply security settings to users and computers?", answer: "GPO", completed: false },
      ],
      completed: false,
    },
    {
      id: 3,
      title: "Enumeration with BloodHound",
      description: "Use BloodHound and SharpHound to map attack paths in an Active Directory environment.",
      questions: [
        { text: "What tool collects data for BloodHound to analyze?", answer: "", completed: false },
        { text: "What is the name of the shortest path attack where a low-priv user can reach Domain Admin?", answer: "", completed: false },
      ],
      completed: false,
    },
    {
      id: 4,
      title: "Credential Harvesting",
      description: "Extract credentials from memory, the registry, and network traffic using tools like Mimikatz and Responder.",
      questions: [
        { text: "What tool can dump cleartext passwords from LSASS memory?", answer: "", completed: false },
        { text: "What attack captures NTLMv2 hashes from the network?", answer: "", completed: false },
        { text: "Submit the root flag", answer: "", completed: false },
      ],
      completed: false,
    },
  ],
};

export default function RoomDetailPage() {
  const [expandedTask, setExpandedTask] = useState<number | null>(1);
  const [flagInput, setFlagInput] = useState("");

  const completedTasks = roomData.tasks.filter((t) => t.completed).length;
  const progress = Math.round((completedTasks / roomData.tasks.length) * 100);

  return (
    <div className="p-6 lg:p-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant={roomData.difficulty === "Medium" ? "blue" : "green"}>
            {roomData.difficulty}
          </Badge>
          <Badge variant="outline">{roomData.type}</Badge>
        </div>
        <h1 className="text-3xl font-bold">{roomData.title}</h1>
        <p className="mt-2 text-muted-foreground">{roomData.description}</p>
        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {roomData.duration}</span>
          <span className="flex items-center gap-1"><Users className="h-4 w-4" /> {roomData.users.toLocaleString()} users</span>
          <span>By {roomData.author}</span>
        </div>
      </div>

      {/* Machine Controls */}
      <Card className="mb-6 border-cyber-purple/30">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <div>
              <div className="font-medium">Target Machine</div>
              <div className="text-sm text-muted-foreground">10.10.45.123 · Windows Server 2019</div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4 mr-1" /> Reset
            </Button>
            <Button variant="cyber" size="sm">
              <Terminal className="h-4 w-4 mr-1" /> Attack Box
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Room Progress</span>
          <span className="text-sm text-muted-foreground">{completedTasks}/{roomData.tasks.length} tasks</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {roomData.tasks.map((task) => (
          <Card key={task.id} className={task.completed ? "border-green-500/30" : ""}>
            <CardContent className="p-0">
              <button
                className="w-full p-4 flex items-center justify-between text-left"
                onClick={() => setExpandedTask(expandedTask === task.id ? null : task.id)}
              >
                <div className="flex items-center gap-3">
                  {task.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <div>
                    <div className="font-medium">Task {task.id}: {task.title}</div>
                    <div className="text-xs text-muted-foreground">{task.questions.length} questions</div>
                  </div>
                </div>
                {expandedTask === task.id ? (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              {expandedTask === task.id && (
                <div className="px-4 pb-4 border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-4">{task.description}</p>
                  <div className="space-y-3">
                    {task.questions.map((q, qi) => (
                      <div key={qi} className="flex items-center gap-3">
                        {q.completed ? (
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <div className="text-sm">{q.text}</div>
                          {!q.completed && (
                            <div className="flex gap-2 mt-2">
                              <Input
                                placeholder="Enter your answer..."
                                className="h-8 text-sm"
                                value={flagInput}
                                onChange={(e) => setFlagInput(e.target.value)}
                              />
                              <Button size="sm" variant="cyber" className="h-8">
                                <Send className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="ghost" className="h-8">
                                <Lightbulb className="h-3 w-3" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
