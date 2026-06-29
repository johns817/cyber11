import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Users,
  Server,
  DollarSign,
  TrendingUp,
  Activity,
  AlertTriangle,
  BookOpen,
  Shield,
} from "lucide-react";

const adminStats = [
  { label: "Total Users", value: "154,892", change: "+12.5%", icon: Users, color: "text-cyber-blue" },
  { label: "Active Labs", value: "2,341", change: "+8.3%", icon: Server, color: "text-cyber-green" },
  { label: "Monthly Revenue", value: "$284,500", change: "+15.2%", icon: DollarSign, color: "text-cyber-orange" },
  { label: "Active Subscriptions", value: "23,456", change: "+5.7%", icon: TrendingUp, color: "text-cyber-purple" },
];

const recentAlerts = [
  { type: "warning", message: "High CPU usage on lab cluster 3", time: "5 min ago" },
  { type: "info", message: "New user registration spike detected", time: "15 min ago" },
  { type: "error", message: "Failed health check on node lab-eu-2", time: "1 hour ago" },
  { type: "info", message: "Daily backup completed successfully", time: "3 hours ago" },
];

export default function AdminDashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-cyber-purple" />
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform overview and management</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-sm text-cyber-green font-medium">{stat.change}</span>
                </div>
                <p className="mt-4 text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-cyber-green" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "API Gateway", status: "healthy", uptime: "99.99%" },
              { name: "Lab Orchestrator", status: "healthy", uptime: "99.95%" },
              { name: "Database Cluster", status: "healthy", uptime: "99.99%" },
              { name: "Redis Cache", status: "healthy", uptime: "100%" },
              { name: "CDN", status: "degraded", uptime: "99.8%" },
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${service.status === "healthy" ? "bg-cyber-green" : "bg-cyber-orange"}`} />
                  <span className="text-sm font-medium">{service.name}</span>
                </div>
                <span className="text-sm text-muted-foreground">{service.uptime}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-cyber-orange" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full ${
                  alert.type === "error" ? "bg-cyber-red" :
                  alert.type === "warning" ? "bg-cyber-orange" : "bg-cyber-blue"
                }`} />
                <div className="flex-1">
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-cyber-blue" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            {[
              "Manage Users",
              "Deploy Lab",
              "View Logs",
              "Edit Content",
              "Run Reports",
              "Feature Flags",
            ].map((action) => (
              <button
                key={action}
                className="rounded-lg border border-border p-3 text-sm font-medium hover:bg-muted transition-colors text-left"
              >
                {action}
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
