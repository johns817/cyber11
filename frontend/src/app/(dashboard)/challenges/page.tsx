import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Flag, CheckCircle, Lock } from "lucide-react";

const categories = [
  { name: "Web", count: 156, color: "bg-cyber-blue" },
  { name: "Crypto", count: 89, color: "bg-cyber-purple" },
  { name: "Forensics", count: 67, color: "bg-cyber-green" },
  { name: "Reverse Engineering", count: 54, color: "bg-cyber-orange" },
  { name: "Pwn", count: 43, color: "bg-cyber-red" },
  { name: "Misc", count: 98, color: "bg-muted-foreground" },
];

const challenges = [
  { id: 1, name: "Baby SQL", category: "Web", difficulty: "Easy", points: 10, solves: 12453, solved: true },
  { id: 2, name: "JWT Forgery", category: "Web", difficulty: "Medium", points: 25, solves: 4521, solved: true },
  { id: 3, name: "RSA Basics", category: "Crypto", difficulty: "Easy", points: 15, solves: 8934, solved: false },
  { id: 4, name: "Heap Overflow", category: "Pwn", difficulty: "Hard", points: 40, solves: 876, solved: false },
  { id: 5, name: "Memory Dump", category: "Forensics", difficulty: "Medium", points: 25, solves: 2341, solved: false },
  { id: 6, name: "Obfuscated Binary", category: "Reverse Engineering", difficulty: "Hard", points: 35, solves: 1234, solved: false },
  { id: 7, name: "XSS Playground", category: "Web", difficulty: "Easy", points: 10, solves: 15678, solved: true },
  { id: 8, name: "AES-CBC Attack", category: "Crypto", difficulty: "Hard", points: 40, solves: 567, solved: false },
  { id: 9, name: "Packet Analysis", category: "Forensics", difficulty: "Easy", points: 15, solves: 7654, solved: true },
  { id: 10, name: "Race Condition", category: "Web", difficulty: "Insane", points: 50, solves: 234, locked: true },
];

const difficultyColor = {
  Easy: "success" as const,
  Medium: "warning" as const,
  Hard: "destructive" as const,
  Insane: "purple" as const,
};

export default function ChallengesPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Challenges</h1>
          <p className="text-muted-foreground">Capture the flag across multiple categories</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search challenges..." className="pl-9 w-64" />
        </div>
      </div>

      {/* Categories */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((cat) => (
          <Card key={cat.name} className="cursor-pointer hover:border-cyber-purple/50 transition-colors">
            <CardContent className="p-4 text-center">
              <div className={`mx-auto h-3 w-3 rounded-full ${cat.color} mb-2`} />
              <p className="font-medium text-sm">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.count} challenges</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Challenges List */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center">
                    {challenge.solved ? (
                      <CheckCircle className="h-5 w-5 text-cyber-green" />
                    ) : "locked" in challenge ? (
                      <Lock className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Flag className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{challenge.name}</p>
                    <p className="text-sm text-muted-foreground">{challenge.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">{challenge.solves.toLocaleString()} solves</span>
                  <Badge variant={difficultyColor[challenge.difficulty as keyof typeof difficultyColor]}>
                    {challenge.points} pts
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
