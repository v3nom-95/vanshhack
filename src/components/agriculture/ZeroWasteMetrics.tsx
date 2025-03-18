
import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import GlassCard from '@/components/ui/GlassCard';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Leaf, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ZeroWasteScoreData, FarmData } from '@/types/agriculture';

interface ZeroWasteMetricsProps {
  zeroWasteScore: ZeroWasteScoreData | null;
  farmData: FarmData | null;
  isLoading: boolean;
}

const ZeroWasteMetrics: React.FC<ZeroWasteMetricsProps> = ({ zeroWasteScore, farmData, isLoading }) => {
  if (isLoading) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">Loading zero waste metrics...</p>
      </GlassCard>
    );
  }

  if (!zeroWasteScore || !farmData) {
    return (
      <GlassCard className="h-full flex items-center justify-center">
        <p className="text-muted-foreground">No data available</p>
      </GlassCard>
    );
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'declining':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Minus className="h-5 w-5 text-gray-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-blue-600';
    if (score >= 40) return 'bg-amber-600';
    return 'bg-red-600';
  };

  const radarData = Object.entries(zeroWasteScore.categories).map(([key, value]) => ({
    category: key,
    value,
    fullMark: 100
  }));

  const COLORS = ['#4CBB17', '#3182CE', '#DD6B20', '#38A169', '#4299E1', '#D69E2E'];

  const pieData = Object.entries(zeroWasteScore.categories).map(([key, value], index) => ({
    name: key,
    value,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <GlassCard className="p-5">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
        <div>
          <h3 className="text-lg md:text-xl font-semibold flex items-center">
            <Leaf className="mr-2 h-5 w-5 text-green-600" />
            Zero Waste Farm Score: {farmData.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            AI-calculated sustainability metrics for your agricultural operation
          </p>
        </div>
        
        <div className="mt-2 md:mt-0 flex items-center">
          <Badge
            className={`mr-2 ${
              zeroWasteScore.ranking <= zeroWasteScore.totalFarms * 0.1
                ? 'bg-green-500'
                : zeroWasteScore.ranking <= zeroWasteScore.totalFarms * 0.3
                ? 'bg-blue-500'
                : 'bg-amber-500'
            }`}
          >
            Rank #{zeroWasteScore.ranking} of {zeroWasteScore.totalFarms}
          </Badge>
          
          <div className="flex items-center gap-1 text-sm">
            <span className="text-muted-foreground mr-1">Trend:</span>
            {getTrendIcon(zeroWasteScore.trend)}
            <span className={`capitalize ${
              zeroWasteScore.trend === 'improving' ? 'text-green-600' : 
              zeroWasteScore.trend === 'declining' ? 'text-red-600' : 
              'text-gray-600'
            }`}>
              {zeroWasteScore.trend}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col">
          <div className="text-center mb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center rounded-full bg-green-50 dark:bg-green-900/30 p-3"
            >
              <div className={`text-5xl font-bold ${getScoreColor(zeroWasteScore.overall)}`}>
                {zeroWasteScore.overall}
              </div>
            </motion.div>
            <p className="text-sm text-muted-foreground mt-1">Overall Score</p>
          </div>
          
          <div className="space-y-3 mt-4">
            {Object.entries(zeroWasteScore.categories).map(([key, value]) => (
              <div key={key} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                  <span className={getScoreColor(value)}>{value}</span>
                </div>
                <Progress value={value} className={`h-2 ${getProgressColor(value)}`} />
              </div>
            ))}
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="category" 
                tick={{ fontSize: 10 }}
                tickFormatter={(value) => value.replace(/([A-Z])/g, ' $1').charAt(0).toUpperCase() + value.replace(/([A-Z])/g, ' $1').slice(1)}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#4CBB17"
                fill="#4CBB17"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="flex flex-col">
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  innerRadius={40}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
            {pieData.map((entry, index) => (
              <div key={index} className="flex items-center text-xs">
                <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                <span className="capitalize">{entry.name.replace(/([A-Z])/g, ' $1')}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-2 border-t text-xs text-muted-foreground">
            <p>Based on real-time IoT sensor data and AI analysis</p>
            <p>Integrated with blockchain for verified carbon credits</p>
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default ZeroWasteMetrics;
