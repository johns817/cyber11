"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Crown,
  Swords,
  Shield,
  Terminal,
  Users,
  Clock,
  Trophy,
  Zap,
  Server,
  Globe,
} from "lucide-react";

const kothGames = [
  { name: "Fortress Siege", players: 12, maxPlayers: 16, timeLeft: "23:45", difficulty: "Medium", status: "active" },
  { name: "Domain Blitz", players: 8, maxPlayers: 8, timeLeft: "45:12", difficulty: "Hard", status: "active" },
  { name: "Cloud Conquest", players: 5, maxPlayers: 12, timeLeft: "--:--", difficulty: "Easy", status: "waiting" },
];

const networks = [
  {
    name: "Corporate Breach",
    machines: 8,
    description: "Simulate a full corporate network pentest. Pivot through DMZ, internal network, and domain controllers.",
    difficulty: "Hard",
    players: 234,
  },
  {
    name: "Hospital Network",
    machines: 6,
    description: "Healthcare environment with HIPAA-sensitive systems. Chain vulnerabilities from web app to domain admin.",
    difficulty: "Medium",
    players: 456,
  },
  {
    name: "Financial Services",
    machines: 10,
    description: "Banking infrastructure with segmented networks, firewalls, and critical transaction systems.",
    difficulty: "Insane",
    players: 89,
  },
];

const events = [
  { name: "Summer CTF 2026", date: "Jul 15-17", participants: 2340, type: "CTF", status: "upcoming" },
  { name: "Red vs Blue Battle", date: "Jul 22", participants: 890, type: "Team Battle", status: "upcoming" },
  { name: "SOC Challenge Week", date: "Aug 1-7", participants: 1200, type: "SOC", status: "registration" },
];

export default function CompetePage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Compete</h1>
        <p className="mt-2 text-muted-foreground">
          Test your skills against other hackers in real-time competitions, persistent networks, and simulated environments.
        </p>
      </div>

      {/* King of the Hill */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Crown className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">King of the Hill</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Real-time competitive hacking. Multiple players attack the same machine. Hold the king flag for 60 consecutive seconds to score 10 points.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {kothGames.map((game) => (
            <Card key={game.name}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <Badge variant={game.status === "active" ? "green" : "outline"}>
                    {game.status === "active" ? "Live" : "Waiting"}
                  </Badge>
                  <Badge variant={game.difficulty === "Easy" ? "green" : game.difficulty === "Medium" ? "blue" : "destructive"}>
                    {game.difficulty}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold">{game.name}</h3>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {game.players}/{game.maxPlayers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {game.timeLeft}
                  </span>
                </div>
                <Button variant="cyber" size="sm" className="w-full mt-4">
                  {game.status === "active" ? "Spectate" : "Join Game"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Networks */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Server className="h-6 w-6 text-cyber-purple" />
          <h2 className="text-2xl font-bold">Networks</h2>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Persistent multi-machine attack networks. Full internal network pentest methodology — pivot, lateral movement, chain exploitation.
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {networks.map((network) => (
            <Card key={network.name}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant={network.difficulty === "Medium" ? "blue" : network.difficulty === "Hard" ? "destructive" : "purple"}>
                    {network.difficulty}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{network.machines} machines</span>
                </div>
                <h3 className="text-lg font-bold">{network.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{network.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs text-muted-foreground">{network.players} active players</span>
                  <Button variant="outline" size="sm">Connect</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SOC & Pentest Simulators */}
      <section className="mb-10">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-cyber-blue" />
          <h2 className="text-2xl font-bold">Simulators</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border-cyber-blue/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">SOC Simulator</h3>
                  <Badge variant="blue">SAL1 Exam Environment</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Immersive Security Operations Center environment. Triage live alerts, investigate phishing,
                analyze malware, and make escalation decisions in real time.
              </p>
              <Button variant="cyber" className="w-full">Launch SOC Simulator</Button>
            </CardContent>
          </Card>
          <Card className="border-red-500/30">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <Terminal className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold">Pentest Simulator</h3>
                  <Badge variant="destructive">PT1 Exam Environment</Badge>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Full-scope penetration testing simulation. Reconnaissance to exploitation to post-exploitation
                to professional report writing.
              </p>
              <Button variant="cyber" className="w-full">Launch Pentest Simulator</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="h-6 w-6 text-yellow-500" />
          <h2 className="text-2xl font-bold">Upcoming Events</h2>
        </div>
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.name}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <Zap className="h-5 w-5 text-cyber-purple" />
                  </div>
                  <div>
                    <div className="font-medium">{event.name}</div>
                    <div className="text-sm text-muted-foreground">{event.date} · {event.participants.toLocaleString()} participants</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="outline">{event.type}</Badge>
                  <Button variant={event.status === "registration" ? "cyber" : "outline"} size="sm">
                    {event.status === "registration" ? "Register" : "Remind Me"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
