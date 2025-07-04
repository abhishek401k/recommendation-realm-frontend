
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, Cell } from "recharts";
import { MapPin, Users, Car, Clock, AlertCircle } from "lucide-react";

const SupplyDemandHeatmap = () => {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("current");

  // Simulated heatmap data for different city zones
  const heatmapData = [
    { zone: "Downtown", lat: 40.7589, lng: -73.9851, demand: 95, supply: 45, ratio: 2.1, rides_completed: 234, avg_wait: 8.2 },
    { zone: "Midtown", lat: 40.7505, lng: -73.9934, demand: 88, supply: 52, ratio: 1.7, rides_completed: 198, avg_wait: 6.1 },
    { zone: "Financial District", lat: 40.7074, lng: -74.0113, demand: 76, supply: 38, ratio: 2.0, rides_completed: 167, avg_wait: 7.8 },
    { zone: "Chelsea", lat: 40.7466, lng: -74.0014, demand: 82, supply: 61, ratio: 1.3, rides_completed: 145, avg_wait: 4.2 },
    { zone: "SoHo", lat: 40.7230, lng: -74.0030, demand: 71, supply: 34, ratio: 2.1, rides_completed: 128, avg_wait: 7.9 },
    { zone: "Upper East Side", lat: 40.7736, lng: -73.9566, demand: 64, supply: 48, ratio: 1.3, rides_completed: 112, avg_wait: 5.1 },
    { zone: "Brooklyn Heights", lat: 40.6962, lng: -73.9942, demand: 58, supply: 42, ratio: 1.4, rides_completed: 98, avg_wait: 5.8 },
    { zone: "Williamsburg", lat: 40.7081, lng: -73.9571, demand: 72, supply: 29, ratio: 2.5, rides_completed: 156, avg_wait: 9.3 },
    { zone: "LES", lat: 40.7154, lng: -73.9857, demand: 69, supply: 31, ratio: 2.2, rides_completed: 143, avg_wait: 8.7 },
    { zone: "Tribeca", lat: 40.7195, lng: -74.0089, demand: 54, supply: 38, ratio: 1.4, rides_completed: 89, avg_wait: 5.4 },
    { zone: "Hell's Kitchen", lat: 40.7648, lng: -73.9808, demand: 77, supply: 41, ratio: 1.9, rides_completed: 134, avg_wait: 7.2 },
    { zone: "East Village", lat: 40.7264, lng: -73.9818, demand: 66, supply: 35, ratio: 1.9, rides_completed: 121, avg_wait: 6.9 },
  ];

  // Time-based demand patterns
  const demandPatterns = [
    { hour: "00:00", weekday_demand: 25, weekend_demand: 45, supply: 60 },
    { hour: "06:00", weekday_demand: 85, weekend_demand: 35, supply: 70 },
    { hour: "08:00", weekday_demand: 95, weekend_demand: 45, supply: 80 },
    { hour: "12:00", weekday_demand: 75, weekend_demand: 80, supply: 85 },
    { hour: "17:00", weekday_demand: 90, weekend_demand: 70, supply: 75 },
    { hour: "20:00", weekday_demand: 65, weekend_demand: 90, supply: 70 },
    { hour: "23:00", weekday_demand: 40, weekend_demand: 85, supply: 65 },
  ];

  // Supply-demand imbalance alerts
  const imbalanceAlerts = [
    { zone: "Williamsburg", severity: "high", message: "250% demand-supply ratio", action: "Deploy 12 more drivers" },
    { zone: "SoHo", severity: "high", message: "210% demand-supply ratio", action: "Deploy 8 more drivers" },
    { zone: "Downtown", severity: "medium", message: "110% demand-supply ratio", action: "Deploy 5 more drivers" },
    { zone: "LES", severity: "medium", message: "220% demand-supply ratio", action: "Deploy 7 more drivers" },
  ];

  const getRatioColor = (ratio) => {
    if (ratio >= 2.0) return "#ef4444"; // High demand - red
    if (ratio >= 1.5) return "#f97316"; // Medium demand - orange  
    if (ratio >= 1.2) return "#eab308"; // Balanced - yellow
    return "#10b981"; // Oversupply - green
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "secondary";
      default: return "outline";
    }
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-slate-600">Active Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">1.8x</div>
                <div className="text-sm text-slate-600">Avg D/S Ratio</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <div className="text-2xl font-bold">6.8m</div>
                <div className="text-sm text-slate-600">Avg Wait Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">4</div>
                <div className="text-sm text-slate-600">High Priority Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTimeSlot} onValueChange={setSelectedTimeSlot}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">Current Status</TabsTrigger>
          <TabsTrigger value="patterns">Time Patterns</TabsTrigger>
          <TabsTrigger value="alerts">Rebalancing Alerts</TabsTrigger>
        </TabsList>

        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Zone Heatmap Visualization */}
            <Card>
              <CardHeader>
                <CardTitle>Supply-Demand Heatmap</CardTitle>
                <CardDescription>
                  Real-time supply-demand ratios across city zones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <ScatterChart data={heatmapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      type="number" 
                      dataKey="supply" 
                      name="Supply"
                      label={{ value: 'Available Drivers', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="demand" 
                      name="Demand"
                      label={{ value: 'Ride Requests', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload;
                          return (
                            <div className="bg-white p-3 border rounded-lg shadow-lg">
                              <div className="font-medium">{data.zone}</div>
                              <div className="text-sm space-y-1">
                                <div>Demand: {data.demand}</div>
                                <div>Supply: {data.supply}</div>
                                <div>Ratio: {data.ratio}x</div>
                                <div>Wait Time: {data.avg_wait}m</div>
                              </div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Scatter name="Zones" dataKey="demand" fill="#8884d8">
                      {heatmapData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getRatioColor(entry.ratio)} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
                
                <div className="mt-4 flex justify-center space-x-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>Balanced (≤1.2x)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>Moderate (1.2-1.5x)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>High (1.5-2.0x)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>Critical (≥2.0x)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Zone Details Table */}
            <Card>
              <CardHeader>
                <CardTitle>Zone Performance Details</CardTitle>
                <CardDescription>
                  Detailed metrics for each operational zone
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {heatmapData
                    .sort((a, b) => b.ratio - a.ratio)
                    .map((zone, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-slate-50">
                      <div>
                        <div className="font-medium">{zone.zone}</div>
                        <div className="text-sm text-slate-600">
                          {zone.rides_completed} rides completed
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className={`text-lg font-bold`} style={{ color: getRatioColor(zone.ratio) }}>
                          {zone.ratio}x
                        </div>
                        <div className="text-sm text-slate-600">
                          {zone.avg_wait}m wait
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Demand Patterns by Time</CardTitle>
              <CardDescription>
                Weekday vs Weekend demand patterns and supply optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={demandPatterns}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis label={{ value: 'Demand Index', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Bar dataKey="weekday_demand" fill="#3b82f6" name="Weekday Demand" />
                  <Bar dataKey="weekend_demand" fill="#ef4444" name="Weekend Demand" />
                  <Bar dataKey="supply" fill="#10b981" name="Available Supply" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supply Rebalancing Alerts</CardTitle>
              <CardDescription>
                Automated recommendations for driver deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {imbalanceAlerts.map((alert, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className={`h-5 w-5 ${
                        alert.severity === 'high' ? 'text-red-500' : 'text-orange-500'
                      }`} />
                      <div>
                        <div className="font-medium">{alert.zone}</div>
                        <div className="text-sm text-slate-600">{alert.message}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge variant={getSeverityColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <Button size="sm" variant="outline">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="font-medium text-blue-900">Optimization Suggestion</div>
                <div className="text-sm text-blue-700 mt-1">
                  Deploy 32 drivers from oversupplied zones (Chelsea, Upper East Side) to high-demand zones. 
                  Expected wait time reduction: 35%, Revenue increase: $12,400/hour.
                </div>
                <Button className="mt-3" size="sm">
                  Execute Rebalancing
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SupplyDemandHeatmap;
