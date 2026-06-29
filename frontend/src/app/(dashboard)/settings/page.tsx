"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Shield, Bell, Key, Monitor, Globe, Trash2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Account Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Account
          </CardTitle>
          <CardDescription>Update your account information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Display Name</label>
              <Input defaultValue="Cyber Hacker" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Username</label>
              <Input defaultValue="cyberh4cker" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input defaultValue="hacker@cyberquest.io" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input defaultValue="San Francisco, CA" className="mt-1" />
            </div>
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your security settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Badge variant="success">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
            </div>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <div className="flex items-center justify-between rounded-lg border border-border p-4">
            <div>
              <p className="font-medium">Active Sessions</p>
              <p className="text-sm text-muted-foreground">3 devices currently logged in</p>
            </div>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Choose what notifications you receive</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            "New lab machines",
            "Challenge announcements",
            "Team invitations",
            "Leaderboard updates",
            "System maintenance",
          ].map((item) => (
            <div key={item} className="flex items-center justify-between rounded-lg border border-border p-3">
              <span className="text-sm">{item}</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* API Keys */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            API Keys
          </CardTitle>
          <CardDescription>Manage your API access tokens</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border p-4 flex items-center justify-between">
            <div>
              <p className="font-medium font-mono text-sm">cq_live_****_****_7x9f</p>
              <p className="text-xs text-muted-foreground">Created 14 days ago</p>
            </div>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Button variant="outline" className="mt-4">Generate New Key</Button>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-3">
            <button className="rounded-lg border-2 border-cyber-purple p-4 text-center text-sm font-medium">
              Dark
            </button>
            <button className="rounded-lg border border-border p-4 text-center text-sm font-medium hover:border-muted-foreground">
              Light
            </button>
            <button className="rounded-lg border border-border p-4 text-center text-sm font-medium hover:border-muted-foreground">
              System
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive">Delete Account</Button>
        </CardContent>
      </Card>
    </div>
  );
}
