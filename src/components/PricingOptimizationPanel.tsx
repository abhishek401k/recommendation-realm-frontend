
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { DollarSign, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const PricingOptimizationPanel = () => {
  const [surgeMultiplier, setSurgeMultiplier] = useState([1.5]);
  
  // Price elasticity data
  const elasticityData = [
    { price: 8, demand: 2400, revenue: 19200 },
    { price: 10, demand: 2100, revenue: 21000 },
    { price: 12, demand: 1850, revenue: 22200 },
    { price: 14, demand: 1620, revenue: 22680 },
    { price: 16, demand: 1420, revenue: 22720 },
    { price: 18, demand: 1250, revenue: 22500 },
    { price: 20, demand: 1100, revenue: 22000 },
    { price: 22, demand: 980, revenue: 21560 },
    { price: 24, demand: 880, revenue: 21120 },
    { price: 26, demand: 800, revenue: 20800 },
  ];

  // Surge pricing zones
  const surgeZones = [
    { zone: "Downtown Core", currentSurge: 2.1, demand: "Very High", supply: "Low", optimalSurge: 2.3, revenue: 45200 },
    { zone: "Airport", currentSurge: 1.8, demand: "High", supply: "Medium", optimalSurge: 1.9, revenue: 32100 },
    { zone: "Business District", currentSurge: 1.4, demand: "Medium", supply: "High", optimalSurge: 1.2, revenue: 28900 },
    { zone: "University Area", currentSurge: 1.2, demand: "Medium", supply: "Medium", optimalSurge: 1.3, revenue: 18700 },
    { zone: "Residential North", currentSurge: 1.0, demand: "Low", supply: "High", optimalSurge: 1.0, revenue: 12400 },
    { zone: "Shopping Mall", currentSurge: 1.6, demand: "High", supply: "Low", optimalSurge: 1.8, revenue: 22800 },
  ];

  const getDemandColor = (demand) => {
    switch (demand) {
      case "Very High": return "bg-red-500";
      case "High": return "bg-orange-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getSupplyColor = (supply) => {
    switch (supply) {
      case "Low": return "text-red-600";
      case "Medium": return "text-yellow-600";
      case "High": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Pricing Strategy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">$16.40</div>
                <div className="text-sm text-slate-600">Avg Price/Ride</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">1.6x</div>
                <div className="text-sm text-slate-600">Avg Surge</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-slate-600">High Demand Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="text-sm text-slate-600">Price Acceptance</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Elasticity Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Price Elasticity & Revenue Optimization</CardTitle>
            <CardDescription>
              Revenue maximization analysis across different price points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={elasticityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="price" 
                  label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
                />
                <YAxis 
                  yAxisId="left"
                  label={{ value: 'Demand', angle: -90, position: 'insideLeft' }}
                />
                <YAxis 
                  yAxisId="right" 
                  orientation="right"
                  label={{ value: 'Revenue ($)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip 
                  formatter={(value, name) => [
                    typeof value === 'number' ? value.toLocaleString() : value,
                    name === 'demand' ? 'Demand (rides)' : 'Revenue ($)'
                  ]}
                />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="demand" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  name="demand"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  name="revenue"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900">Optimal Price Point</div>
              <div className="text-lg font-bold text-blue-700">$16.00</div>
              <div className="text-sm text-blue-600">Maximizes revenue at $22,720</div>
            </div>
          </CardContent>
        </Card>

        {/* Surge Multiplier Simulator */}
        <Card>
          <CardHeader>
            <CardTitle>Dynamic Pricing Simulator</CardTitle>
            <CardDescription>
              Test surge multiplier impact on demand and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Surge Multiplier</label>
                <div className="mt-2">
                  <Slider
                    value={surgeMultiplier}
                    onValueChange={setSurgeMultiplier}
                    max={3}
                    min={1}
                    step={0.1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>1.0x</span>
                    <span className="font-medium">{surgeMultiplier[0]}x</span>
                    <span>3.0x</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">Predicted Demand</div>
                  <div className="text-xl font-bold">
                    {Math.round(2000 - (surgeMultiplier[0] - 1) * 800).toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500">rides/hour</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-sm text-slate-600">Est. Revenue</div>
                  <div className="text-xl font-bold">
                    ${Math.round((2000 - (surgeMultiplier[0] - 1) * 800) * 12 * surgeMultiplier[0]).toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500">per hour</div>
                </div>
              </div>

              <div className="p-3 bg-green-50 rounded-lg">
                <div className="text-sm font-medium text-green-800">Price Recommendation</div>
                <div className="text-lg font-bold text-green-700">
                  {surgeMultiplier[0] > 2.0 ? "Consider reducing surge" : 
                   surgeMultiplier[0] < 1.3 ? "Room for price increase" : "Optimal range"}
                </div>
              </div>

              <Button className="w-full">Apply Pricing Strategy</Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Surge Zones */}
      <Card>
        <CardHeader>
          <CardTitle>Real-time Surge Pricing by Zone</CardTitle>
          <CardDescription>
            Current pricing strategy and optimization recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {surgeZones.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-medium">{zone.zone}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${getDemandColor(zone.demand)}`}></div>
                      <span className="text-sm text-slate-600">Demand: {zone.demand}</span>
                      <span className={`text-sm ${getSupplyColor(zone.supply)}`}>
                        Supply: {zone.supply}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Current</div>
                    <div className="text-lg font-bold">{zone.currentSurge}x</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Optimal</div>
                    <div className={`text-lg font-bold ${
                      zone.optimalSurge > zone.currentSurge ? 'text-red-600' : 
                      zone.optimalSurge < zone.currentSurge ? 'text-green-600' : 'text-slate-700'
                    }`}>
                      {zone.optimalSurge}x
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Revenue</div>
                    <div className="text-lg font-bold">${zone.revenue.toLocaleString()}</div>
                  </div>
                  <div>
                    {zone.optimalSurge !== zone.currentSurge && (
                      <Badge variant={zone.optimalSurge > zone.currentSurge ? "destructive" : "default"}>
                        {zone.optimalSurge > zone.currentSurge ? "Increase" : "Decrease"}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingOptimizationPanel;
