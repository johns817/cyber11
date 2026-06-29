import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal, Crown } from "lucide-react";

const topPlayers = [
  { rank: 1, username: "z3r0day", level: 99, xp: 985200, country: "US", streak: 365 },
  { rank: 2, username: "sh4d0w", level: 97, xp: 941000, country: "DE", streak: 230 },
  { rank: 3, username: "r00tk1t", level: 95, xp: 912500, country: "JP", streak: 180 },
  { rank: 4, username: "cyb3rn1nja", level: 92, xp: 876000, country: "GB", streak: 145 },
  { rank: 5, username: "h4ckqu33n", level: 90, xp: 845000, country: "CA", streak: 120 },
  { rank: 6, username: "ph4nt0m", level: 88, xp: 812000, country: "AU", streak: 98 },
  { rank: 7, username: "byt3_m3", level: 86, xp: 789000, country: "FR", streak: 87 },
  { rank: 8, username: "n3tw0rk3r", level: 84, xp: 756000, country: "BR", streak: 76 },
  { rank: 9, username: "3xpl01t", level: 82, xp: 723000, country: "IN", streak: 65 },
  { rank: 10, username: "d4rk_m4tt3r", level: 80, xp: 698000, country: "KR", streak: 54 },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
  return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>;
}

export default function LeaderboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leaderboard</h1>
        <p className="text-muted-foreground">Top hackers ranked by experience points</p>
      </div>

      {/* Top 3 Podium */}
      <div className="grid gap-4 sm:grid-cols-3">
        {topPlayers.slice(0, 3).map((player) => (
          <Card key={player.rank} className={player.rank === 1 ? "border-yellow-500/50 shadow-lg" : ""}>
            <CardContent className="p-6 text-center">
              <div className="flex justify-center mb-3">
                {getRankIcon(player.rank)}
              </div>
              <Avatar className="h-16 w-16 mx-auto">
                <AvatarFallback className="text-lg bg-gradient-to-br from-cyber-purple to-cyber-blue text-white">
                  {player.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <h3 className="mt-3 font-bold">{player.username}</h3>
              <p className="text-sm text-muted-foreground">Level {player.level}</p>
              <p className="mt-2 text-lg font-semibold text-cyber-purple">
                {player.xp.toLocaleString()} XP
              </p>
              <Badge variant="outline" className="mt-2">
                {player.country}
              </Badge>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Full Rankings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-cyber-orange" />
            Global Rankings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {topPlayers.map((player) => (
              <div key={player.rank} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center">
                    {getRankIcon(player.rank)}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-gradient-to-br from-cyber-purple to-cyber-blue text-white text-sm">
                      {player.username.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{player.username}</p>
                    <p className="text-sm text-muted-foreground">Level {player.level}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-sm font-medium">{player.streak} day streak</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{player.xp.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">XP</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
