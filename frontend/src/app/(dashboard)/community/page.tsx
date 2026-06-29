import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Eye, Plus, Pin } from "lucide-react";

const forumCategories = [
  { name: "General Discussion", posts: 4521, color: "bg-cyber-blue" },
  { name: "Writeups", posts: 2103, color: "bg-cyber-green" },
  { name: "Help & Questions", posts: 3456, color: "bg-cyber-orange" },
  { name: "News & Events", posts: 876, color: "bg-cyber-purple" },
  { name: "Off-Topic", posts: 1234, color: "bg-muted-foreground" },
];

const recentPosts = [
  {
    id: 1, title: "How I Passed OSCP on My First Attempt", author: "z3r0day", category: "Writeups",
    replies: 87, likes: 342, views: 5621, pinned: true, time: "2 hours ago"
  },
  {
    id: 2, title: "Tips for Active Directory Enumeration", author: "sh4d0w", category: "General Discussion",
    replies: 34, likes: 156, views: 2341, pinned: false, time: "5 hours ago"
  },
  {
    id: 3, title: "Need help with buffer overflow challenge", author: "n00b_h4cker", category: "Help & Questions",
    replies: 12, likes: 8, views: 345, pinned: false, time: "1 day ago"
  },
  {
    id: 4, title: "New CTF Event: HackFest 2025", author: "admin", category: "News & Events",
    replies: 56, likes: 234, views: 8901, pinned: true, time: "2 days ago"
  },
  {
    id: 5, title: "My journey from zero to security engineer", author: "cyb3rn1nja", category: "General Discussion",
    replies: 98, likes: 567, views: 12340, pinned: false, time: "3 days ago"
  },
];

export default function CommunityPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-muted-foreground">Connect, share, and learn with fellow hackers</p>
        </div>
        <Button variant="cyber">
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Categories */}
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
        {forumCategories.map((cat) => (
          <Card key={cat.name} className="cursor-pointer hover:border-cyber-purple/50 transition-colors">
            <CardContent className="p-4">
              <div className={`h-2 w-8 rounded-full ${cat.color} mb-3`} />
              <p className="font-medium text-sm">{cat.name}</p>
              <p className="text-xs text-muted-foreground">{cat.posts.toLocaleString()} posts</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Discussions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {recentPosts.map((post) => (
              <div key={post.id} className="flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors">
                <Avatar>
                  <AvatarFallback className="bg-gradient-to-br from-cyber-purple to-cyber-blue text-white text-sm">
                    {post.author.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    {post.pinned && <Pin className="h-3 w-3 text-cyber-orange" />}
                    <h3 className="font-medium truncate">{post.title}</h3>
                  </div>
                  <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{post.author}</span>
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span>{post.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" />{post.replies}</span>
                  <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" />{post.likes}</span>
                  <span className="flex items-center gap-1 hidden sm:flex"><Eye className="h-3 w-3" />{post.views.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
