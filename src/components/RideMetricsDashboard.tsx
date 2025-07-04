
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, Clock, MapPin, Users } from "lucide-react";

const RideMetricsDashboard = () => {
  // Real-time ride completion data
  const rideCompletionData = [
    { time: "00:00", completed: 1200, cancelled: 80, no_show: 45 },
    { time: "04:00", completed: 340, cancelled: 25, no_show: 12 },
    { time: "08:00", completed: 2890, cancelled: 180, no_show: 95 },
    { time: "12:00", completed: 2340, cancelled: 145, no_show: 78 },
    { time: "16:00", completed: 2650, cancelled: 160, no_show: 85 },
    { time: "20:00", completed: 2100, cancelled: 135, no_show: 68 },
    { time: "23:00", completed: 1450, cancelled: 95, no_show: 52 },
  ];

  // Average trip metrics by hour
  const tripMetrics = [
    { hour: "06:00", distance: 3.2, duration: 12.5, fare: 14.50 },
    { hour: "08:00", distance: 4.8, duration: 18.2, fare: 21.30 },
    { hour: "12:00", distance: 2.9, duration: 11.8, fare: 13.20 },
    { hour: "17:00", distance: 5.1, duration: 22.4, fare: 24.80 },
    { hour: "19:00", distance: 3.7, duration: 15.6, fare: 18.90 },
    { hour: "22:00", distance: 4.2, duration: 16.8, fare: 19.70 },
  ];

  // Geographic distribution of rides
  const geographicData = [
    { area: "Manhattan", rides: 8420, revenue: 142360, avg_fare: 16.90 },
    { area: "Brooklyn", rides: 5680, revenue: 79520, avg_fare: 14.00 },
    { area: "Queens", rides: 3290, revenue: 49350, avg_fare: 15.00 },
    { area: "Bronx", rides: 2110, revenue: 27430, avg_fare: 13.00 },
    { area: "Staten Island", rides: 890, revenue: 12460, avg_fare: 14.00 },
  ];

  return (
    <div className="space-y-6">
      {/* Ride Completion Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Ride Completion Trends</span>
          </CardTitle>
          <CardDescription>
            Hourly breakdown of completed, cancelled, and no-show rides
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={rideCompletionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip 
                formatter={(value, name) => [
                  value.toLocaleString(),
                  name === 'completed' ? 'Completed' :
                  name === 'cancelled' ? 'Cancelled' : 'No Show'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="completed" 
                stackId="1" 
                stroke="#10b981" 
                fill="#10b981" 
                fillOpacity={0.8}
                name="completed"
              />
              <Area 
                type="monotone" 
                dataKey="cancelled" 
                stackId="1" 
                stroke="#f59e0b" 
                fill="#f59e0b" 
                fillOpacity={0.8}
                name="cancelled"
              />
              <Area 
                type="monotone" 
                dataKey="no_show" 
                stackId="1" 
                stroke="#ef4444" 
                fill="#ef4444" 
                fillOpacity={0.8}
                name="no_show"
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trip Metrics by Hour */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Trip Metrics Analysis</span>
            </CardTitle>
            <CardDescription>
              Average distance, duration, and fare by time of day
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {tripMetrics.map((metric, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="font-medium">{metric.hour}</div>
                  <div className="flex space-x-6 text-sm">
                    <div>
                      <div className="text-slate-600">Distance</div>
                      <div className="font-bold">{metric.distance} mi</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Duration</div>
                      <div className="font-bold">{metric.duration} min</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Avg Fare</div>
                      <div className="font-bold">${metric.fare}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Geographic Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Geographic Performance</span>
            </CardTitle>
            <CardDescription>
              Ride volume and revenue by borough
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={geographicData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="area" type="category" width={80} />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'rides' ? value.toLocaleString() : `$${value.toLocaleString()}`,
                    name === 'rides' ? 'Rides' : 'Revenue'
                  ]}
                />
                <Bar dataKey="rides" fill="#3b82f6" name="rides" />
              </BarChart>
            </ResponsiveContainer>
            
            <div className="mt-4 space-y-2">
              {geographicData.map((area, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="font-medium">{area.area}</span>
                  <div className="flex space-x-4">
                    <span>{area.rides.toLocaleString()} rides</span>
                    <span className="text-green-600">${area.revenue.toLocaleString()}</span>
                    <span className="text-slate-600">${area.avg_fare}/ride</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Operational Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Operational Insights</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-lg font-bold text-blue-700">Peak Efficiency Hours</div>
              <div className="text-sm text-blue-600">8 AM - 10 AM, 5 PM - 7 PM</div>
              <div className="text-xs text-blue-500 mt-1">Optimal driver deployment window</div>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-700">High Revenue Areas</div>
              <div className="text-sm text-green-600">Manhattan, Brooklyn Central</div>
              <div className="text-xs text-green-500 mt-1">Focus zones for surge pricing</div>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="text-lg font-bold text-orange-700">Optimization Opportunity</div>
              <div className="text-sm text-orange-600">Reduce 6.2% cancellation rate</div>
              <div className="text-xs text-orange-500 mt-1">Better ETA accuracy needed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RideMetricsDashboard;
