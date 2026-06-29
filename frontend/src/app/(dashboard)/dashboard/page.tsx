import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Trophy,
  Flame,
  Target,
  Clock,
  TrendingUp,
  Star,
  Zap,
  BookOpen,
} from "lucide-react";

const userStats = {
  level: 42,
  xp: 15750,
  xpToNext: 18000,
  rank: 1247,
  streak: 15,
  machinesOwned: 87,
  challengesSolved: 234,
  hoursLearned: 312,
};

const recentActivity = [
  { type: "machine", name: "Cerberus", points: 30, time: "2 hours ago" },
  { type: "challenge", name: "SQL Injection Advanced", points: 25, time: "5 hours ago" },
  { type: "path", name: "Web Security - Module 12", points: 10, time: "1 day ago" },
  { type: "machine", name: "Phoenix", points: 40, time: "2 days ago" },
  { type: "achievement", name: "First Blood: Cerberus", points: 50, time: "2 days ago" },
];

const activeLabs = [
  { name: "HackBox Pro", os: "Linux", difficulty: "Hard", timeLeft: "1h 23m" },
  { name: "WinDomain", os: "Windows", difficulty: "Insane", timeLeft: "45m" },
];

export default function DashboardPage() {
  const xpProgress = (userStats.xp / userStats.xpToNext) * 100;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Hacker</p>
        </div>
        <Badge variant="purple" className="text-base px-4 py-1">
          Level {userStats.level}
        </Badge>
      </div>

      {/* XP Progress */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Level {userStats.level}</span>
            <span className="text-sm text-muted-foreground">
              {userStats.xp.toLocaleString()} / {userStats.xpToNext.toLocaleString()} XP
            </span>
          </div>
          <Progress value={xpProgress} />
          <p className="mt-2 text-xs text-muted-foreground">
            {(userStats.xpToNext - userStats.xp).toLocaleString()} XP to Level {userStats.level + 1}
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-orange/10">
              <Flame className="h-6 w-6 text-cyber-orange" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userStats.streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-green/10">
              <Target className="h-6 w-6 text-cyber-green" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userStats.machinesOwned}</p>
              <p className="text-sm text-muted-foreground">Machines Owned</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-blue/10">
              <Zap className="h-6 w-6 text-cyber-blue" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userStats.challengesSolved}</p>
              <p className="text-sm text-muted-foreground">Challenges Solved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyber-purple/10">
              <Trophy className="h-6 w-6 text-cyber-purple" />
            </div>
            <div>
              <p className="text-2xl font-bold">#{userStats.rank}</p>
              <p className="text-sm text-muted-foreground">Global Rank</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Active Labs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-cyber-blue" />
              Active Labs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {activeLabs.map((lab) => (
              <div key={lab.name} className="flex items-center justify-between rounded-lg border border-border p-4">
                <div>
                  <p className="font-medium">{lab.name}</p>
                  <p className="text-sm text-muted-foreground">{lab.os}</p>
                </div>
                <div className="text-right">
                  <Badge variant={lab.difficulty === "Insane" ? "destructive" : "warning"}>
                    {lab.difficulty}
                  </Badge>
                  <p className="mt-1 text-sm text-muted-foreground">{lab.timeLeft} left</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyber-green" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                    {activity.type === "machine" && <Target className="h-4 w-4 text-cyber-green" />}
                    {activity.type === "challenge" && <Zap className="h-4 w-4 text-cyber-blue" />}
                    {activity.type === "path" && <BookOpen className="h-4 w-4 text-cyber-purple" />}
                    {activity.type === "achievement" && <Star className="h-4 w-4 text-cyber-orange" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.name}</p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-cyber-green">+{activity.points} XP</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
