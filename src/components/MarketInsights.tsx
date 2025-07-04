
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Brain, TrendingUp, Users, MapPin, Clock, Zap } from "lucide-react";

const MarketInsights = () => {
  const [insights, setInsights] = useState({
    priceRecommendations: [],
    competitiveAnalysis: [],
    demandPatterns: [],
    marketSegments: []
  });

  useEffect(() => {
    // Simulate AI-generated insights
    const generateInsights = () => {
      const priceRecommendations = [
        { zone: "Downtown", currentPrice: 18, recommendedPrice: 21, reason: "High demand, low supply", impact: "+15%" },
        { zone: "Airport", currentPrice: 15, recommendedPrice: 16.5, reason: "Premium service expectation", impact: "+8%" },
        { zone: "Suburbs", currentPrice: 12, recommendedPrice: 11, reason: "Price-sensitive market", impact: "+12%" },
        { zone: "Business District", currentPrice: 16, recommendedPrice: 19, reason: "Corporate expense accounts", impact: "+18%" }
      ];

      const competitiveAnalysis = [
        { competitor: "Competitor A", marketShare: 35, avgPrice: 16.2, strength: "Brand recognition" },
        { competitor: "Competitor B", marketShare: 28, avgPrice: 14.8, strength: "Lower prices" },
        { competitor: "Our Platform", marketShare: 25, avgPrice: 15.5, strength: "Service quality" },
        { competitor: "Others", marketShare: 12, avgPrice: 17.1, strength: "Niche markets" }
      ];

      const demandPatterns = [
        { hour: "6 AM", demand: 450, elasticity: -0.8, surge: 1.0 },
        { hour: "8 AM", demand: 1200, elasticity: -1.2, surge: 1.4 },
        { hour: "12 PM", demand: 800, elasticity: -1.0, surge: 1.1 },
        { hour: "5 PM", demand: 1500, elasticity: -1.5, surge: 1.8 },
        { hour: "8 PM", demand: 900, elasticity: -1.1, surge: 1.2 },
        { hour: "11 PM", demand: 600, elasticity: -0.9, surge: 1.3 }
      ];

      const marketSegments = [
        { segment: "Business", value: 40, color: "#3b82f6", elasticity: -0.7, avgSpend: 24 },
        { segment: "Leisure", value: 35, color: "#10b981", elasticity: -1.8, avgSpend: 16 },
        { segment: "Tourism", value: 15, color: "#f59e0b", elasticity: -1.2, avgSpend: 28 },
        { segment: "Emergency", value: 10, color: "#ef4444", elasticity: -0.3, avgSpend: 32 }
      ];

      setInsights({
        priceRecommendations,
        competitiveAnalysis,
        demandPatterns,
        marketSegments
      });
    };

    generateInsights();
  }, []);

  const getImpactColor = (impact) => {
    const value = parseFloat(impact.replace('%', '').replace('+', ''));
    if (value > 15) return "bg-green-100 text-green-800";
    if (value > 8) return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="h-5 w-5" />
          <span>AI-Powered Market Insights</span>
        </CardTitle>
        <CardDescription>
          Machine learning analysis of market conditions and optimization opportunities
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Price Recommendations by Zone */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Zone-based Price Recommendations</span>
          </h3>
          <div className="space-y-3">
            {insights.priceRecommendations.map((rec, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                <div>
                  <div className="font-medium">{rec.zone}</div>
                  <div className="text-sm text-slate-600">{rec.reason}</div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Current</div>
                    <div className="font-bold">${rec.currentPrice}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-slate-600">Recommended</div>
                    <div className="font-bold text-blue-600">${rec.recommendedPrice}</div>
                  </div>
                  <Badge className={getImpactColor(rec.impact)}>
                    {rec.impact} Revenue
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Competitive Analysis */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Competitive Landscape</span>
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={insights.competitiveAnalysis}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="competitor" />
                <YAxis />
                <Tooltip 
                  formatter={(value, name) => [
                    name === 'marketShare' ? `${value}%` : `$${value}`,
                    name === 'marketShare' ? 'Market Share' : 'Avg Price'
                  ]}
                />
                <Bar dataKey="marketShare" fill="#3b82f6" name="marketShare" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Market Segments */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <Zap className="h-4 w-4" />
              <span>Customer Segments</span>
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={insights.marketSegments}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ segment, value }) => `${segment}: ${value}%`}
                >
                  {insights.marketSegments.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demand Patterns */}
        <div>
          <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
            <Clock className="h-4 w-4" />
            <span>Hourly Demand Patterns & Elasticity</span>
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={insights.demandPatterns}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'demand' ? value.toLocaleString() : value,
                  name === 'demand' ? 'Demand (rides)' : 'Price Elasticity'
                ]}
              />
              <Bar yAxisId="left" dataKey="demand" fill="#10b981" name="demand" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* AI Insights Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">Revenue Opportunity</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">+$2.4M</div>
            <div className="text-sm text-blue-600">Annual potential with optimized pricing</div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="h-4 w-4 text-green-600" />
              <span className="font-medium text-green-900">Market Share Growth</span>
            </div>
            <div className="text-2xl font-bold text-green-700">+3.2%</div>
            <div className="text-sm text-green-600">Projected increase with strategy</div>
          </div>

          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Brain className="h-4 w-4 text-orange-600" />
              <span className="font-medium text-orange-900">Price Optimization</span>
            </div>
            <div className="text-2xl font-bold text-orange-700">94%</div>
            <div className="text-sm text-orange-600">Confidence in recommendations</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketInsights;
