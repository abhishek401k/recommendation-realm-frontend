
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ComposedChart, Bar } from "recharts";
import { DollarSign, Target, AlertCircle, CheckCircle } from "lucide-react";

const RevenueOptimizer = () => {
  const [params, setParams] = useState({
    currentPrice: 16,
    operatingCost: 8,
    fixedCosts: 50000,
    targetMargin: 0.3,
    seasonalFactor: 1.0,
    competitionLevel: 0.5
  });

  const [optimization, setOptimization] = useState({
    recommendedPrice: 0,
    projectedRevenue: 0,
    projectedProfit: 0,
    marginImprovement: 0,
    riskLevel: 'low'
  });

  const [revenueData, setRevenueData] = useState([]);

  const optimizeRevenue = () => {
    const { currentPrice, operatingCost, fixedCosts, targetMargin, seasonalFactor, competitionLevel } = params;
    
    // Generate revenue optimization data
    const optimizationData = [];
    let maxRevenue = 0;
    let optimalPrice = currentPrice;
    
    for (let price = 8; price <= 30; price += 0.5) {
      // Demand model considering competition and seasonality
      const baseDemand = 2500;
      const elasticity = -1.3 - (competitionLevel * 0.5); // More competition = higher elasticity
      const priceRatio = price / currentPrice;
      const demandMultiplier = Math.pow(priceRatio, elasticity) * seasonalFactor;
      const demand = Math.max(0, baseDemand * demandMultiplier);
      
      const revenue = price * demand;
      const variableCosts = operatingCost * demand;
      const totalCosts = variableCosts + fixedCosts;
      const profit = revenue - totalCosts;
      const margin = revenue > 0 ? profit / revenue : 0;
      
      optimizationData.push({
        price: parseFloat(price.toFixed(1)),
        demand: Math.round(demand),
        revenue: Math.round(revenue),
        profit: Math.round(profit),
        margin: parseFloat((margin * 100).toFixed(1)),
        costs: Math.round(totalCosts)
      });

      if (revenue > maxRevenue && margin >= targetMargin) {
        maxRevenue = revenue;
        optimalPrice = price;
      }
    }

    const optimalPoint = optimizationData.find(d => d.price === optimalPrice) || optimizationData[0];
    const currentPoint = optimizationData.find(d => Math.abs(d.price - currentPrice) < 0.1) || optimizationData[0];
    
    const marginImprovement = ((optimalPoint.profit - currentPoint.profit) / Math.max(currentPoint.profit, 1)) * 100;
    
    // Risk assessment
    let riskLevel = 'low';
    if (Math.abs(optimalPrice - currentPrice) > 5) riskLevel = 'high';
    else if (Math.abs(optimalPrice - currentPrice) > 2) riskLevel = 'medium';

    setRevenueData(optimizationData);
    setOptimization({
      recommendedPrice: optimalPrice,
      projectedRevenue: optimalPoint.revenue,
      projectedProfit: optimalPoint.profit,
      marginImprovement: marginImprovement,
      riskLevel: riskLevel
    });
  };

  useEffect(() => {
    optimizeRevenue();
  }, [params]);

  const handleParamChange = (field, value) => {
    setParams(prev => ({
      ...prev,
      [field]: typeof value === 'number' ? value : parseFloat(value) || 0
    }));
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'low': return CheckCircle;
      case 'medium': return AlertCircle;
      case 'high': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const RiskIcon = getRiskIcon(optimization.riskLevel);

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Target className="h-5 w-5" />
          <span>Revenue Optimizer</span>
        </CardTitle>
        <CardDescription>
          Advanced revenue optimization with cost modeling and risk assessment
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Parameters */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPrice">Current Price ($)</Label>
              <Input
                id="currentPrice"
                type="number"
                value={params.currentPrice}
                onChange={(e) => handleParamChange('currentPrice', e.target.value)}
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="operatingCost">Operating Cost per Ride ($)</Label>
              <Input
                id="operatingCost"
                type="number"
                value={params.operatingCost}
                onChange={(e) => handleParamChange('operatingCost', e.target.value)}
                step="0.1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Target Profit Margin: {(params.targetMargin * 100).toFixed(0)}%</Label>
            <Slider
              value={[params.targetMargin]}
              onValueChange={(value) => handleParamChange('targetMargin', value[0])}
              max={0.5}
              min={0.1}
              step={0.05}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label>Competition Level: {(params.competitionLevel * 100).toFixed(0)}%</Label>
            <Slider
              value={[params.competitionLevel]}
              onValueChange={(value) => handleParamChange('competitionLevel', value[0])}
              max={1}
              min={0}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>

        {/* Optimization Results */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <DollarSign className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-600">Recommended Price</span>
            </div>
            <div className="text-2xl font-bold text-blue-700">${optimization.recommendedPrice}</div>
            <div className="text-xs text-blue-600">
              {optimization.recommendedPrice > params.currentPrice ? '+' : ''}
              {(optimization.recommendedPrice - params.currentPrice).toFixed(1)} vs current
            </div>
          </div>

          <div className="p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-600">Projected Profit</span>
            </div>
            <div className="text-2xl font-bold text-green-700">${optimization.projectedProfit.toLocaleString()}</div>
            <div className="text-xs text-green-600">
              {optimization.marginImprovement > 0 ? '+' : ''}
              {optimization.marginImprovement.toFixed(1)}% improvement
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="flex items-center justify-between p-3 border rounded-lg">
          <div className="flex items-center space-x-2">
            <RiskIcon className="h-5 w-5" />
            <span className="font-medium">Implementation Risk</span>
          </div>
          <Badge className={getRiskColor(optimization.riskLevel)}>
            {optimization.riskLevel.toUpperCase()} RISK
          </Badge>
        </div>

        {/* Revenue Optimization Chart */}
        <div>
          <h4 className="font-medium mb-3">Revenue & Profit Optimization</h4>
          <ResponsiveContainer width="100%" height={250}>
            <ComposedChart data={revenueData.filter((_, i) => i % 6 === 0)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="price" 
                label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                yAxisId="left"
                label={{ value: 'Revenue ($)', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right"
                label={{ value: 'Profit ($)', angle: 90, position: 'insideRight' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `$${value.toLocaleString()}`,
                  name === 'revenue' ? 'Revenue' : 'Profit'
                ]}
              />
              <Bar 
                yAxisId="left"
                dataKey="revenue" 
                fill="#3b82f6" 
                fillOpacity={0.3}
                name="revenue"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="profit" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={false}
                name="profit"
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <Button onClick={optimizeRevenue} className="w-full">
          Optimize Revenue Strategy
        </Button>
      </CardContent>
    </Card>
  );
};

export default RevenueOptimizer;
