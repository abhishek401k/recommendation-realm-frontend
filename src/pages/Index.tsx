
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DemandForecastingChart from "@/components/DemandForecastingChart";
import PricingOptimizationPanel from "@/components/PricingOptimizationPanel";
import SupplyDemandHeatmap from "@/components/SupplyDemandHeatmap";
import DriverAnalytics from "@/components/DriverAnalytics";
import RideMetricsDashboard from "@/components/RideMetricsDashboard";
import { TrendingUp, Car, Users, DollarSign, MapPin, BarChart3 } from "lucide-react";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Simulated real-time metrics
  const [metrics, setMetrics] = useState({
    activeRides: 12847,
    totalDrivers: 8934,
    averageWaitTime: 4.2,
    totalRevenue: 284736,
    completionRate: 94.8,
    surgeAreas: 23
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeRides: prev.activeRides + Math.floor(Math.random() * 100) - 50,
        averageWaitTime: Math.max(1, prev.averageWaitTime + (Math.random() - 0.5) * 0.5),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metricCards = [
    {
      title: "Active Rides",
      value: metrics.activeRides.toLocaleString(),
      icon: Car,
      change: "+12.3%",
      description: "vs last hour"
    },
    {
      title: "Online Drivers",
      value: metrics.totalDrivers.toLocaleString(),
      icon: Users,
      change: "+8.7%",
      description: "vs last hour"
    },
    {
      title: "Avg Wait Time",
      value: `${metrics.averageWaitTime.toFixed(1)}m`,
      icon: TrendingUp,
      change: "-15.2%",
      description: "vs last week"
    },
    {
      title: "Revenue Today",
      value: `$${metrics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: "+23.1%",
      description: "vs yesterday"
    },
    {
      title: "Completion Rate",
      value: `${metrics.completionRate}%`,
      icon: BarChart3,
      change: "+2.1%",
      description: "vs last week"
    },
    {
      title: "Surge Areas",
      value: metrics.surgeAreas.toString(),
      icon: MapPin,
      change: "+43.5%",
      description: "vs typical Friday"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ride-Share Analytics Platform
          </h1>
          <p className="text-lg text-slate-600">
            Advanced Data Science Dashboard for Transportation Optimization
          </p>
          <div className="text-sm text-slate-500">
            Built for Uber Data Scientist Role • Real-time Analytics & ML Insights
          </div>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {metricCards.map((metric, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-600">
                  {metric.title}
                </CardTitle>
                <metric.icon className="h-4 w-4 text-slate-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900">{metric.value}</div>
                <div className="flex items-center space-x-1 text-xs">
                  <span className="text-green-600 font-medium">{metric.change}</span>
                  <span className="text-slate-500">{metric.description}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="demand">Demand Forecasting</TabsTrigger>
            <TabsTrigger value="pricing">Dynamic Pricing</TabsTrigger>
            <TabsTrigger value="supply-demand">Supply & Demand</TabsTrigger>
            <TabsTrigger value="drivers">Driver Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <RideMetricsDashboard />
          </TabsContent>

          <TabsContent value="demand" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Demand Forecasting Model</span>
                </CardTitle>
                <CardDescription>
                  ML-powered ride demand prediction using time series analysis and external factors
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DemandForecastingChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <PricingOptimizationPanel />
          </TabsContent>

          <TabsContent value="supply-demand" className="space-y-6">
            <SupplyDemandHeatmap />
          </TabsContent>

          <TabsContent value="drivers" className="space-y-6">
            <DriverAnalytics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
