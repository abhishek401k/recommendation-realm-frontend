
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calculator, TrendingDown, TrendingUp } from "lucide-react";

const PriceElasticityCalculator = () => {
  const [inputs, setInputs] = useState({
    basePrice: 15,
    baseDemand: 2000,
    elasticity: -1.2,
    marketSize: 50000,
    competitorPrice: 18
  });

  const [results, setResults] = useState({
    elasticityCoefficient: 0,
    optimalPrice: 0,
    maxRevenue: 0,
    demandAtOptimal: 0
  });

  const [elasticityData, setElasticityData] = useState([]);

  const calculateElasticity = () => {
    const { basePrice, baseDemand, elasticity, marketSize } = inputs;
    
    // Generate price elasticity curve data
    const priceRange = [];
    for (let price = 5; price <= 30; price += 0.5) {
      const priceChange = (price - basePrice) / basePrice;
      const demandMultiplier = Math.pow(1 + priceChange, elasticity);
      const demand = Math.max(0, Math.min(marketSize, baseDemand * demandMultiplier));
      const revenue = price * demand;
      
      priceRange.push({
        price: parseFloat(price.toFixed(1)),
        demand: Math.round(demand),
        revenue: Math.round(revenue),
        elasticity: elasticity
      });
    }

    // Find optimal price (maximum revenue)
    const optimalPoint = priceRange.reduce((max, current) => 
      current.revenue > max.revenue ? current : max
    );

    setElasticityData(priceRange);
    setResults({
      elasticityCoefficient: elasticity,
      optimalPrice: optimalPoint.price,
      maxRevenue: optimalPoint.revenue,
      demandAtOptimal: optimalPoint.demand
    });
  };

  useEffect(() => {
    calculateElasticity();
  }, [inputs]);

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const getElasticityInterpretation = (elasticity) => {
    if (elasticity > -1) return { text: "Inelastic", color: "text-red-600", icon: TrendingUp };
    if (elasticity < -2) return { text: "Highly Elastic", color: "text-green-600", icon: TrendingDown };
    return { text: "Unit Elastic", color: "text-blue-600", icon: TrendingDown };
  };

  const interpretation = getElasticityInterpretation(inputs.elasticity);
  const InterpretationIcon = interpretation.icon;

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calculator className="h-5 w-5" />
          <span>Price Elasticity Calculator</span>
        </CardTitle>
        <CardDescription>
          Input market parameters to calculate price elasticity and demand curves
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Input Parameters */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="basePrice">Base Price ($)</Label>
            <Input
              id="basePrice"
              type="number"
              value={inputs.basePrice}
              onChange={(e) => handleInputChange('basePrice', e.target.value)}
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="baseDemand">Base Demand (rides/day)</Label>
            <Input
              id="baseDemand"
              type="number"
              value={inputs.baseDemand}
              onChange={(e) => handleInputChange('baseDemand', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="elasticity">Price Elasticity</Label>
            <Input
              id="elasticity"
              type="number"
              value={inputs.elasticity}
              onChange={(e) => handleInputChange('elasticity', e.target.value)}
              step="0.1"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="marketSize">Market Size</Label>
            <Input
              id="marketSize"
              type="number"
              value={inputs.marketSize}
              onChange={(e) => handleInputChange('marketSize', e.target.value)}
            />
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-600">Optimal Price</div>
            <div className="text-2xl font-bold text-blue-700">${results.optimalPrice}</div>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm text-green-600">Max Revenue</div>
            <div className="text-2xl font-bold text-green-700">${results.maxRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* Elasticity Interpretation */}
        <div className="p-4 border rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <InterpretationIcon className={`h-5 w-5 ${interpretation.color}`} />
            <span className={`font-medium ${interpretation.color}`}>
              {interpretation.text} Demand
            </span>
          </div>
          <div className="text-sm text-slate-600">
            Elasticity coefficient: <span className="font-bold">{inputs.elasticity}</span>
            <br />
            {inputs.elasticity > -1 ? 
              "Demand is relatively insensitive to price changes" :
              "Demand is sensitive to price changes"
            }
          </div>
        </div>

        {/* Elasticity Curve */}
        <div>
          <h4 className="font-medium mb-3">Demand vs Price Curve</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={elasticityData.filter((_, i) => i % 4 === 0)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="price" 
                label={{ value: 'Price ($)', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                label={{ value: 'Demand', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'demand' ? value.toLocaleString() : `$${value.toLocaleString()}`,
                  name === 'demand' ? 'Demand (rides)' : 'Revenue ($)'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="demand" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={false}
                name="demand"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <Button onClick={calculateElasticity} className="w-full">
          Recalculate Analysis
        </Button>
      </CardContent>
    </Card>
  );
};

export default PriceElasticityCalculator;
