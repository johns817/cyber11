import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Terminal,
  Shield,
  Trophy,
  Users,
  Zap,
  BookOpen,
  Target,
  Globe,
  Lock,
  Server,
  Code,
  Brain,
} from "lucide-react";

const features = [
  {
    icon: Terminal,
    title: "Hands-On Labs",
    description: "Attack real machines in isolated environments. Linux, Windows, Active Directory, and cloud labs.",
  },
  {
    icon: Zap,
    title: "CTF Challenges",
    description: "Capture flags across web, crypto, forensics, reverse engineering, and more categories.",
  },
  {
    icon: BookOpen,
    title: "Learning Paths",
    description: "Structured courses from beginner to expert. Web security, pentesting, SOC analyst, and beyond.",
  },
  {
    icon: Trophy,
    title: "Gamification",
    description: "Earn XP, level up, climb leaderboards, unlock achievements, and compete globally.",
  },
  {
    icon: Users,
    title: "Team Battles",
    description: "Form teams, compete in events, collaborate on challenges, and build your reputation.",
  },
  {
    icon: Shield,
    title: "Real-World Scenarios",
    description: "Practice against environments that mirror actual enterprise networks and vulnerabilities.",
  },
];

const stats = [
  { label: "Active Learners", value: "150K+" },
  { label: "Lab Machines", value: "500+" },
  { label: "Challenges", value: "2,000+" },
  { label: "Learning Paths", value: "50+" },
];

const paths = [
  { name: "Web Security", icon: Globe, level: "Beginner", modules: 24 },
  { name: "Network Pentesting", icon: Server, level: "Intermediate", modules: 32 },
  { name: "Red Teaming", icon: Target, level: "Advanced", modules: 40 },
  { name: "Reverse Engineering", icon: Code, level: "Advanced", modules: 28 },
  { name: "Digital Forensics", icon: Brain, level: "Intermediate", modules: 22 },
  { name: "Cloud Security", icon: Lock, level: "Intermediate", modules: 18 },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-cyber-purple/5 via-background to-cyber-blue/5" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyber-purple/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <Badge variant="purple" className="mb-6">
              New: Active Directory Attack Labs Now Available
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Master{" "}
              <span className="bg-gradient-to-r from-cyber-purple via-cyber-blue to-cyber-green bg-clip-text text-transparent">
                Cybersecurity
              </span>
              <br />
              Through Practice
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
              Hack real machines, solve challenges, and level up your skills in the
              most immersive cybersecurity training platform. From beginner to expert.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register">
                <Button variant="cyber" size="xl">
                  Start Hacking Free
                </Button>
              </Link>
              <Link href="/labs">
                <Button variant="outline" size="xl">
                  Explore Labs
                </Button>
              </Link>
            </div>
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Everything You Need to{" "}
                <span className="text-cyber-purple">Level Up</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A complete platform designed for aspiring and experienced security professionals.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className="border-border/50 hover:border-cyber-purple/50 transition-colors">
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-purple/10">
                        <Icon className="h-6 w-6 text-cyber-purple" />
                      </div>
                      <CardTitle className="mt-4">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Learning Paths Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Structured <span className="text-cyber-blue">Learning Paths</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Follow guided tracks from fundamentals to mastery.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {paths.map((path) => {
                const Icon = path.icon;
                return (
                  <Card key={path.name} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyber-blue/10 group-hover:bg-cyber-blue/20 transition-colors">
                          <Icon className="h-5 w-5 text-cyber-blue" />
                        </div>
                        <Badge variant={
                          path.level === "Beginner" ? "success" :
                          path.level === "Intermediate" ? "warning" : "destructive"
                        }>
                          {path.level}
                        </Badge>
                      </div>
                      <h3 className="mt-4 font-semibold">{path.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {path.modules} modules
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
            <div className="mt-12 text-center">
              <Link href="/paths">
                <Button variant="outline" size="lg">
                  View All Paths
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-20 bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Professional <span className="text-cyber-green">Certifications</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                100% practical, hands-on exams. No multiple choice. Prove your skills in real environments.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { code: "SEC0", name: "Foundational", color: "bg-green-500" },
                { code: "SEC1", name: "Cyber Security 101", color: "bg-blue-500" },
                { code: "SAL1", name: "SOC Analyst L1", color: "bg-purple-500" },
                { code: "PT1", name: "Jr Pentester", color: "bg-red-500" },
                { code: "AI1", name: "AI Security", color: "bg-yellow-500" },
              ].map((cert) => (
                <Card key={cert.code} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`w-12 h-12 rounded-full ${cert.color} mx-auto mb-3 flex items-center justify-center`}>
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold">{cert.code}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{cert.name}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-12 text-center">
              <Link href="/certifications">
                <Button variant="outline" size="lg">View All Certifications</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Compete Section */}
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold sm:text-4xl">
                Compete <span className="text-cyber-purple">Against Others</span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                King of the Hill, CTFs, team battles, and real-time competitions.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-3">
              <Card className="border-yellow-500/30">
                <CardContent className="p-6 text-center">
                  <Trophy className="h-10 w-10 text-yellow-500 mx-auto mb-3" />
                  <h3 className="font-bold text-lg">King of the Hill</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Attack the same machine as other players. Hold the flag for 60 seconds to score.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-cyber-purple/30">
                <CardContent className="p-6 text-center">
                  <Target className="h-10 w-10 text-cyber-purple mx-auto mb-3" />
                  <h3 className="font-bold text-lg">Networks</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Multi-machine environments. Pivot through networks like a real pentester.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-cyber-blue/30">
                <CardContent className="p-6 text-center">
                  <Zap className="h-10 w-10 text-cyber-blue mx-auto mb-3" />
                  <h3 className="font-bold text-lg">Live CTFs</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Weekly competitions with prizes, rankings, and team battles.
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className="mt-12 text-center">
              <Link href="/compete">
                <Button variant="outline" size="lg">View Competitions</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-cyber-purple/10 via-cyber-blue/10 to-cyber-green/10">
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Start Your Cyber Journey?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Join thousands of hackers learning and growing together.
              Free tier available with no credit card required.
            </p>
            <div className="mt-8">
              <Link href="/register">
                <Button variant="cyber" size="xl">
                  Create Free Account
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
