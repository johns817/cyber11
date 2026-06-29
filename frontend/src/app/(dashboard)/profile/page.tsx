import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Flame,
  Target,
  Calendar,
  MapPin,
  GitFork,
  Globe,
  Star,
  Shield,
  Award,
} from "lucide-react";

const user = {
  username: "cyberh4cker",
  displayName: "Cyber Hacker",
  bio: "Security researcher | CTF player | Bug bounty hunter. Passionate about offensive security and red teaming.",
  location: "San Francisco, CA",
  website: "https://cyberhacker.dev",
  github: "cyberh4cker",
  joinDate: "March 2024",
  level: 42,
  xp: 15750,
  xpToNext: 18000,
  rank: 1247,
  streak: 15,
  machinesOwned: 87,
  challengesSolved: 234,
  badges: 28,
  reputation: 4520,
};

const achievements = [
  { name: "First Blood", description: "First to own a machine", icon: Target, rarity: "Legendary" },
  { name: "Streak Master", description: "30-day streak", icon: Flame, rarity: "Epic" },
  { name: "Century Club", description: "Own 100 machines", icon: Shield, rarity: "Rare" },
  { name: "Bug Hunter", description: "Report a valid vulnerability", icon: Star, rarity: "Epic" },
  { name: "Team Player", description: "Complete 10 team challenges", icon: Trophy, rarity: "Common" },
  { name: "Scholar", description: "Complete 5 learning paths", icon: Award, rarity: "Rare" },
];

const rarityColor = {
  Common: "secondary" as const,
  Rare: "info" as const,
  Epic: "purple" as const,
  Legendary: "warning" as const,
};

export default function ProfilePage() {
  const xpProgress = (user.xp / user.xpToNext) * 100;

  return (
    <div className="p-6 space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl bg-gradient-to-br from-cyber-purple to-cyber-blue text-white">
                CH
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <h1 className="text-2xl font-bold">{user.displayName}</h1>
                <Badge variant="purple">Level {user.level}</Badge>
                <Badge variant="outline">#{user.rank}</Badge>
              </div>
              <p className="text-muted-foreground mt-1">@{user.username}</p>
              <p className="mt-3 text-sm max-w-lg">{user.bio}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{user.location}</span>
                <span className="flex items-center gap-1"><Globe className="h-4 w-4" />{user.website}</span>
                <span className="flex items-center gap-1"><GitFork className="h-4 w-4" />{user.github}</span>
                <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Joined {user.joinDate}</span>
              </div>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </div>

          {/* XP Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-1">
              <span>Level {user.level}</span>
              <span className="text-muted-foreground">{user.xp.toLocaleString()} / {user.xpToNext.toLocaleString()} XP</span>
            </div>
            <Progress value={xpProgress} />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.machinesOwned}</p>
            <p className="text-sm text-muted-foreground">Machines Owned</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.challengesSolved}</p>
            <p className="text-sm text-muted-foreground">Challenges Solved</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.streak}</p>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold">{user.reputation.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Reputation</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cyber-orange" />
            Achievements ({user.badges})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return (
                <div key={achievement.name} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyber-orange/10">
                    <Icon className="h-5 w-5 text-cyber-orange" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-muted-foreground">{achievement.description}</p>
                  </div>
                  <Badge variant={rarityColor[achievement.rarity as keyof typeof rarityColor]}>
                    {achievement.rarity}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
