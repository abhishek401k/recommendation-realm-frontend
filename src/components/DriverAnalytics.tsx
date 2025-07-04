
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { User, Star, Clock, DollarSign, TrendingUp, Car } from "lucide-react";

const DriverAnalytics = () => {
  // Driver performance data
  const driverPerformance = [
    { metric: "Acceptance Rate", weekday: 89, weekend: 85, target: 90 },
    { metric: "Completion Rate", weekday: 96, weekend: 94, target: 95 },
    { metric: "Cancellation Rate", weekday: 4, weekend: 6, target: 5 },
    { metric: "Rating Average", weekday: 4.7, weekend: 4.6, target: 4.5 },
  ];

  // Driver earnings analysis
  const earningsData = [
    { hour: "06:00", earnings: 28, rides: 3.2, efficiency: 8.75 },
    { hour: "08:00", earnings: 45, rides: 4.8, efficiency: 9.38 },
    { hour: "12:00", earnings: 38, rides: 4.1, efficiency: 9.27 },
    { hour: "17:00", earnings: 52, rides: 5.3, efficiency: 9.81 },
    { hour: "19:00", earnings: 41, rides: 4.6, efficiency: 8.91 },
    { hour: "22:00", earnings: 35, rides: 3.8, efficiency: 9.21 },
  ];

  // Driver retention analysis
  const retentionData = [
    { segment: "New Drivers (<30 days)", active: 1240, churned: 380, retention: 76.6 },
    { segment: "Regular Drivers (30-180 days)", active: 2890, churned: 210, retention: 93.2 },
    { segment: "Veteran Drivers (>180 days)", active: 3250, churned: 95, retention: 97.2 },
  ];

  // Top performing drivers
  const topDrivers = [
    { name: "Michael Chen", rides: 847, rating: 4.94, earnings: 3420, efficiency: 4.04, badge: "Diamond" },
    { name: "Sarah Johnson", rides: 792, rating: 4.91, earnings: 3180, efficiency: 4.01, badge: "Diamond" },
    { name: "Robert Wilson", rides: 734, rating: 4.88, earnings: 2950, efficiency: 4.02, badge: "Gold" },
    { name: "Emily Davis", rides: 689, rating: 4.85, earnings: 2760, efficiency: 3.98, badge: "Gold" },
    { name: "James Martinez", rides: 656, rating: 4.82, earnings: 2630, efficiency: 4.01, badge: "Gold" },
  ];

  // Driver utilization patterns
  const utilizationData = [
    { name: "Optimal (>80%)", value: 45, color: "#10b981" },
    { name: "Good (60-80%)", value: 35, color: "#3b82f6" },
    { name: "Fair (40-60%)", value: 15, color: "#f59e0b" },
    { name: "Poor (<40%)", value: 5, color: "#ef4444" },
  ];

  const getBadgeColor = (badge) => {
    switch (badge) {
      case "Diamond": return "bg-purple-100 text-purple-800";
      case "Gold": return "bg-yellow-100 text-yellow-800";
      case "Silver": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Driver KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">8,934</div>
                <div className="text-sm text-slate-600">Active Drivers</div>
                <div className="text-xs text-green-600">+5.2% vs last week</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">4.78</div>
                <div className="text-sm text-slate-600">Avg Driver Rating</div>
                <div className="text-xs text-green-600">+0.03 vs last month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">$287</div>
                <div className="text-sm text-slate-600">Avg Daily Earnings</div>
                <div className="text-xs text-green-600">+12.8% vs last month</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">7.2h</div>
                <div className="text-sm text-slate-600">Avg Online Time</div>
                <div className="text-xs text-red-600">-0.3h vs last week</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Driver Performance Metrics</CardTitle>
            <CardDescription>
              Key performance indicators comparing weekday vs weekend
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {driverPerformance.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    <span className="text-sm text-slate-600">Target: {metric.target}{metric.metric.includes('Rate') ? '%' : ''}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Weekday</div>
                      <Progress 
                        value={metric.weekday} 
                        className="h-2"
                      />
                      <div className="text-sm font-medium mt-1">{metric.weekday}{metric.metric.includes('Rate') ? '%' : ''}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-600 mb-1">Weekend</div>
                      <Progress 
                        value={metric.weekend} 
                        className="h-2"
                      />
                      <div className="text-sm font-medium mt-1">{metric.weekend}{metric.metric.includes('Rate') ? '%' : ''}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Driver Utilization Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Driver Utilization Distribution</CardTitle>
            <CardDescription>
              Distribution of drivers by utilization efficiency
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={utilizationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {utilizationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              <div className="text-sm font-medium">Optimization Opportunities:</div>
              <div className="text-sm text-slate-600">
                20% of drivers (Fair + Poor utilization) could benefit from route optimization and peak hour incentives.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Earnings Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Driver Earnings Analysis by Hour</CardTitle>
          <CardDescription>
            Hourly earnings, ride volume, and efficiency trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" label={{ value: 'Earnings ($)', angle: -90, position: 'insideLeft' }} />
              <YAxis yAxisId="right" orientation="right" label={{ value: 'Rides/Hour', angle: 90, position: 'insideRight' }} />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'earnings' ? `$${value}` : 
                  name === 'rides' ? `${value} rides` : 
                  `$${value}/ride`,
                  name === 'earnings' ? 'Hourly Earnings' :
                  name === 'rides' ? 'Rides per Hour' :
                  'Earnings per Ride'
                ]}
              />
              <Line yAxisId="left" type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={3} name="earnings" />
              <Line yAxisId="right" type="monotone" dataKey="rides" stroke="#3b82f6" strokeWidth={2} name="rides" />
              <Line yAxisId="left" type="monotone" dataKey="efficiency" stroke="#f59e0b" strokeWidth={2} name="efficiency" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Drivers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Drivers</CardTitle>
            <CardDescription>
              Drivers with highest performance scores this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topDrivers.map((driver, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium">{driver.name}</div>
                      <div className="text-sm text-slate-600">
                        {driver.rides} rides • ⭐ {driver.rating}
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge className={getBadgeColor(driver.badge)}>
                      {driver.badge}
                    </Badge>
                    <div className="text-sm font-bold">${driver.earnings}</div>
                    <div className="text-xs text-slate-600">${driver.efficiency}/ride</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Driver Retention Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Driver Retention Analysis</CardTitle>
            <CardDescription>
              Retention rates by driver experience level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {retentionData.map((segment, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{segment.segment}</span>
                    <span className="text-sm font-bold text-green-600">{segment.retention}%</span>
                  </div>
                  <Progress value={segment.retention} className="h-2" />
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>{segment.active} active</span>
                    <span>{segment.churned} churned</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-3 bg-yellow-50 rounded-lg">
              <div className="text-sm font-medium text-yellow-800">Retention Insight</div>
              <div className="text-sm text-yellow-700">
                New driver retention can be improved by 15% with enhanced onboarding and first-week support programs.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DriverAnalytics;
