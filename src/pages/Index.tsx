
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import PriceElasticityCalculator from "@/components/PriceElasticityCalculator";
import RevenueOptimizer from "@/components/RevenueOptimizer";
import MarketInsights from "@/components/MarketInsights";
import { TrendingUp, DollarSign, Calculator, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Price Elasticity & Revenue Optimizer
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Advanced analytics platform for ride-sharing price optimization using machine learning and economic modeling
          </p>
          <div className="flex items-center justify-center space-x-6 text-sm text-slate-500">
            <div className="flex items-center space-x-2">
              <Calculator className="h-4 w-4" />
              <span>Real-time Calculations</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4" />
              <span>ML Predictions</span>
            </div>
            <div className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Interactive Visualizations</span>
            </div>
          </div>
        </div>

        {/* Key Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <DollarSign className="h-5 w-5 text-blue-600" />
                <span>Price Elasticity</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Calculate demand sensitivity to price changes with real-time adjustments
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span>Revenue Optimization</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Find optimal pricing strategies to maximize revenue and profitability
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <Calculator className="h-5 w-5 text-purple-600" />
                <span>Dynamic Modeling</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                Interactive models that respond to market conditions and user inputs
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow border-l-4 border-l-orange-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center space-x-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <span>Market Intelligence</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600">
                AI-powered insights for competitive positioning and market analysis
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PriceElasticityCalculator />
          <RevenueOptimizer />
        </div>

        {/* Market Insights */}
        <MarketInsights />
      </div>
    </div>
  );
};

export default Index;
