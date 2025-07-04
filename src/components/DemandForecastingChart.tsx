
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DemandForecastingChart = () => {
  // Simulated demand forecasting data with actual vs predicted
  const demandData = [
    { hour: "00:00", actual: 1200, predicted: 1180, confidence_upper: 1250, confidence_lower: 1110, weather: "clear" },
    { hour: "01:00", actual: 800, predicted: 820, confidence_upper: 890, confidence_lower: 750, weather: "clear" },
    { hour: "02:00", actual: 450, predicted: 480, confidence_upper: 520, confidence_lower: 440, weather: "clear" },
    { hour: "03:00", actual: 320, predicted: 340, confidence_upper: 380, confidence_lower: 300, weather: "clear" },
    { hour: "04:00", actual: 280, predicted: 290, confidence_upper: 330, confidence_lower: 250, weather: "clear" },
    { hour: "05:00", actual: 450, predicted: 420, confidence_upper: 480, confidence_lower: 360, weather: "clear" },
    { hour: "06:00", actual: 890, predicted: 920, confidence_upper: 980, confidence_lower: 860, weather: "clear" },
    { hour: "07:00", actual: 1450, predicted: 1480, confidence_upper: 1550, confidence_lower: 1410, weather: "clear" },
    { hour: "08:00", actual: 1890, predicted: 1850, confidence_upper: 1920, confidence_lower: 1780, weather: "clear" },
    { hour: "09:00", actual: 1650, predicted: 1680, confidence_upper: 1750, confidence_lower: 1610, weather: "rain" },
    { hour: "10:00", actual: null, predicted: 1420, confidence_upper: 1580, confidence_lower: 1260, weather: "rain" },
    { hour: "11:00", actual: null, predicted: 1380, confidence_upper: 1540, confidence_lower: 1220, weather: "rain" },
    { hour: "12:00", actual: null, predicted: 1650, confidence_upper: 1820, confidence_lower: 1480, weather: "clear" },
    { hour: "13:00", actual: null, predicted: 1720, confidence_upper: 1890, confidence_lower: 1550, weather: "clear" },
    { hour: "14:00", actual: null, predicted: 1580, confidence_upper: 1750, confidence_lower: 1410, weather: "clear" },
    { hour: "15:00", actual: null, predicted: 1680, confidence_upper: 1850, confidence_lower: 1510, weather: "clear" },
    { hour: "16:00", actual: null, predicted: 1850, confidence_upper: 2020, confidence_lower: 1680, weather: "clear" },
    { hour: "17:00", actual: null, predicted: 2100, confidence_upper: 2280, confidence_lower: 1920, weather: "clear" },
    { hour: "18:00", actual: null, predicted: 2250, confidence_upper: 2430, confidence_lower: 2070, weather: "clear" },
    { hour: "19:00", actual: null, predicted: 1980, confidence_upper: 2160, confidence_lower: 1800, weather: "clear" },
  ];

  const modelMetrics = {
    mae: 45.2,
    rmse: 68.1,
    mape: 3.8,
    r_squared: 0.94
  };

  return (
    <div className="space-y-6">
      {/* Model Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{modelMetrics.mae}</div>
            <div className="text-sm text-slate-600">MAE (rides)</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{modelMetrics.rmse}</div>
            <div className="text-sm text-slate-600">RMSE</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">{modelMetrics.mape}%</div>
            <div className="text-sm text-slate-600">MAPE</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">{modelMetrics.r_squared}</div>
            <div className="text-sm text-slate-600">R² Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Forecasting Chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>24-Hour Demand Forecast</CardTitle>
              <CardDescription>
                ARIMA + XGBoost ensemble model with weather and event data
              </CardDescription>
            </div>
            <div className="flex space-x-2">
              <Badge variant="secondary">Live Data</Badge>
              <Badge variant="outline">95% Confidence</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={demandData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="hour" 
                stroke="#64748b"
                fontSize={12}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                label={{ value: 'Ride Requests', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
                formatter={(value, name) => [
                  typeof value === 'number' ? value.toLocaleString() : value,
                  name === 'actual' ? 'Actual Demand' :
                  name === 'predicted' ? 'Predicted Demand' :
                  name === 'confidence_upper' ? 'Upper Bound' : 
                  'Lower Bound'
                ]}
              />
              <Legend />
              
              {/* Confidence interval area */}
              <Line
                type="monotone"
                dataKey="confidence_upper"
                stroke="transparent"
                fill="rgba(59, 130, 246, 0.1)"
                strokeWidth={0}
                dot={false}
                activeDot={false}
              />
              <Line
                type="monotone"
                dataKey="confidence_lower"
                stroke="transparent"
                fill="rgba(59, 130, 246, 0.1)"
                strokeWidth={0}
                dot={false}
                activeDot={false}
              />
              
              {/* Main lines */}
              <Line
                type="monotone"
                dataKey="actual"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
                name="actual"
              />
              <Line
                type="monotone"
                dataKey="predicted"
                stroke="#3b82f6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 3 }}
                activeDot={{ r: 5, stroke: '#3b82f6', strokeWidth: 2 }}
                name="predicted"
              />
              
              {/* Current time reference line */}
              <ReferenceLine x="09:00" stroke="#ef4444" strokeDasharray="2 2" label="Now" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Feature Importance */}
      <Card>
        <CardHeader>
          <CardTitle>Model Feature Importance</CardTitle>
          <CardDescription>Top factors influencing demand predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { feature: "Time of Day", importance: 0.34, description: "Hour and day patterns" },
              { feature: "Weather Conditions", importance: 0.28, description: "Rain, temperature, visibility" },
              { feature: "Historical Demand", importance: 0.18, description: "Previous week same time" },
              { feature: "Special Events", importance: 0.12, description: "Concerts, sports, holidays" },
              { feature: "Day of Week", importance: 0.08, description: "Weekday vs weekend patterns" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-24 text-sm font-medium text-slate-700">{item.feature}</div>
                <div className="flex-1 bg-slate-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                    style={{ width: `${item.importance * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-slate-600">{(item.importance * 100).toFixed(0)}%</div>
                <div className="w-48 text-xs text-slate-500">{item.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DemandForecastingChart;
