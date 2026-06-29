import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Users, Trophy, Shield, Plus } from "lucide-react";

const teams = [
  { id: 1, name: "Shadow Ops", members: 12, rank: 3, points: 145000, tag: "SHDW", region: "NA" },
  { id: 2, name: "Zero Day Squad", members: 8, rank: 7, points: 112000, tag: "0DAY", region: "EU" },
  { id: 3, name: "Binary Bandits", members: 15, rank: 12, points: 98500, tag: "BNRY", region: "APAC" },
  { id: 4, name: "Packet Storm", members: 10, rank: 21, points: 76000, tag: "PKTM", region: "NA" },
  { id: 5, name: "Cipher Collective", members: 6, rank: 35, points: 54000, tag: "CPHR", region: "EU" },
  { id: 6, name: "Root Access", members: 9, rank: 45, points: 43000, tag: "ROOT", region: "SA" },
];

export default function TeamsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Teams</h1>
          <p className="text-muted-foreground">Collaborate, compete, and conquer together</p>
        </div>
        <Button variant="cyber">
          <Plus className="h-4 w-4 mr-2" />
          Create Team
        </Button>
      </div>

      {/* My Team */}
      <Card className="border-cyber-purple/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyber-purple" />
            Your Team
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="text-lg bg-gradient-to-br from-cyber-purple to-cyber-blue text-white">
                  SO
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">Shadow Ops</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Users className="h-3 w-3" /> 12 members</span>
                  <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> Rank #3</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-cyber-purple">145,000</p>
              <p className="text-sm text-muted-foreground">Team Points</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Teams */}
      <Card>
        <CardHeader>
          <CardTitle>Team Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {teams.map((team) => (
              <div key={team.id} className="flex items-center justify-between py-4">
                <div className="flex items-center gap-4">
                  <span className="w-8 text-center font-bold text-muted-foreground">#{team.rank}</span>
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-br from-cyber-purple to-cyber-blue text-white text-sm">
                      {team.tag}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{team.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{team.members} members</span>
                      <Badge variant="outline">{team.region}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{team.points.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">points</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
