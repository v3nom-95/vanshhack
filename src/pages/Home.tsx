import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Leaf, 
  Navigation, 
  AlertTriangle, 
  Activity,
  LineChart,
  Shield,
  Globe,
  Newspaper,
  TrendingUp,
  Droplet,
  Wind,
  Thermometer,
  ChevronRight,
  Info,
  AlertCircle,
  Zap,
  Clock,
  Target,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  RefreshCw,
  Download,
  Share2,
  MoreVertical,
  Globe2,
  Cloud,
  Sun,
  Moon,
  Waves,
  TreePine,
  Factory,
  Car,
  Building2,
  Users,
  Map,
  AlertOctagon,
  Calendar,
  BarChart,
  PieChart as PieChartIcon,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
  Maximize2,
  Minimize2,
  RotateCcw,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Recycle
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid,
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tooltip as TooltipComponent, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { useTheme } from '@/contexts/ThemeContext';

interface SustainabilityMetrics {
  renewableEnergy: number;
  carbonEmissions: number;
  forestCover: number;
  oceanHealth: number;
  airQuality: number;
  historicalData: Array<{
    timestamp: string;
    renewableEnergy: number;
    carbonEmissions: number;
    forestCover: number;
    oceanHealth: number;
    airQuality: number;
  }>;
  regionalData: Array<{
    region: string;
    renewableEnergy: number;
    carbonEmissions: number;
    forestCover: number;
    oceanHealth: number;
    airQuality: number;
  }>;
  predictions: Array<{
    year: number;
    renewableEnergy: number;
    carbonEmissions: number;
    forestCover: number;
  }>;
}

interface SustainabilityNews {
  id: string;
  title: string;
  source: string;
  timestamp: string;
  category: 'renewable' | 'climate' | 'conservation' | 'technology' | 'policy' | 'research';
  impact: 'high' | 'medium' | 'low';
  description: string;
  region: string;
  tags: string[];
  sentiment: 'positive' | 'neutral' | 'negative';
}

interface ClimateAlert {
  id: string;
  type: 'extreme_weather' | 'pollution' | 'deforestation' | 'ocean' | 'air_quality';
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  description: string;
  timestamp: string;
  affectedArea: number;
  trend: 'increasing' | 'stable' | 'decreasing';
}

const COLORS = ['#4CAF50', '#FFC107', '#2196F3', '#9C27B0', '#FF5722', '#795548'];

// Update the trend comparison logic with proper type definitions
type TrendType = 'increasing' | 'decreasing' | 'stable';

const getTrendIcon = (trend: TrendType) => {
  switch (trend) {
    case 'increasing':
      return <ArrowUpRight className="h-4 w-4" />;
    case 'decreasing':
      return <ArrowDownRight className="h-4 w-4" />;
    case 'stable':
      return <span className="h-4 w-4">-</span>;
  }
};

const getTrendColor = (trend: TrendType) => {
  switch (trend) {
    case 'increasing':
      return 'text-red-500';
    case 'decreasing':
      return 'text-green-500';
    case 'stable':
      return 'text-gray-500';
  }
};

const Home: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [metrics, setMetrics] = useState<SustainabilityMetrics>({
    renewableEnergy: 35,
    carbonEmissions: 65,
    forestCover: 45,
    oceanHealth: 75,
    airQuality: 60,
    historicalData: [],
    regionalData: [],
    predictions: []
  });

  const [news, setNews] = useState<SustainabilityNews[]>([
    {
      id: '1',
      title: 'Global Renewable Energy Capacity Reaches New Milestone',
      source: 'Climate News',
      timestamp: new Date().toISOString(),
      category: 'renewable',
      impact: 'high',
      description: 'Global renewable energy capacity has reached a new record, with solar and wind leading the growth.',
      region: 'global',
      tags: ['renewable', 'climate'],
      sentiment: 'positive'
    },
    {
      id: '2',
      title: 'New AI Technology Helps Reduce Carbon Emissions',
      source: 'Tech Sustainability',
      timestamp: new Date().toISOString(),
      category: 'technology',
      impact: 'medium',
      description: 'AI-powered systems are helping industries optimize their energy consumption and reduce emissions.',
      region: 'global',
      tags: ['technology', 'climate'],
      sentiment: 'neutral'
    },
    {
      id: '3',
      title: 'Major Breakthrough in Ocean Cleanup Technology',
      source: 'Environmental Science',
      timestamp: new Date().toISOString(),
      category: 'conservation',
      impact: 'high',
      description: 'New technology has successfully removed 99% of ocean plastic in pilot tests.',
      region: 'global',
      tags: ['conservation', 'climate'],
      sentiment: 'positive'
    }
  ]);

  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [showNewsDetails, setShowNewsDetails] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [timeRange, setTimeRange] = useState('24h');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedAlert, setSelectedAlert] = useState<ClimateAlert | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showPredictions, setShowPredictions] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    impact: [] as string[],
    regions: [] as string[],
    dateRange: { from: null, to: null }
  });

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const scale = useTransform(scrollY, [0, 100], [1, 0.95]);
  const springConfig = { damping: 15, stiffness: 100 };
  const springScale = useSpring(scale, springConfig);

  // Add new state for real-time updates
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [updateInterval, setUpdateInterval] = useState(5000); // 5 seconds

  // Generate random data within a range
  const generateRandomData = (min: number, max: number, current: number) => {
    const change = (Math.random() - 0.5) * (max - min) * 0.1;
    return Math.max(min, Math.min(max, current + change));
  };

  // Update metrics in real-time
  useEffect(() => {
    const updateMetrics = () => {
      setMetrics(prev => {
        const newMetrics = {
          renewableEnergy: generateRandomData(30, 40, prev.renewableEnergy),
          carbonEmissions: generateRandomData(60, 70, prev.carbonEmissions),
          forestCover: generateRandomData(40, 50, prev.forestCover),
          oceanHealth: generateRandomData(70, 80, prev.oceanHealth),
          airQuality: generateRandomData(55, 65, prev.airQuality),
          historicalData: [...prev.historicalData, {
            timestamp: new Date().toISOString(),
            renewableEnergy: prev.renewableEnergy,
            carbonEmissions: prev.carbonEmissions,
            forestCover: prev.forestCover,
            oceanHealth: prev.oceanHealth,
            airQuality: prev.airQuality
          }].slice(-20),
          regionalData: prev.regionalData.map(region => ({
            ...region,
            renewableEnergy: generateRandomData(20, 50, region.renewableEnergy),
            carbonEmissions: generateRandomData(30, 80, region.carbonEmissions),
            forestCover: generateRandomData(20, 60, region.forestCover),
            oceanHealth: generateRandomData(60, 90, region.oceanHealth),
            airQuality: generateRandomData(40, 80, region.airQuality)
          })),
          predictions: prev.predictions.map(pred => ({
            ...pred,
            renewableEnergy: generateRandomData(40, 50, pred.renewableEnergy),
            carbonEmissions: generateRandomData(40, 60, pred.carbonEmissions),
            forestCover: generateRandomData(50, 70, pred.forestCover)
          }))
        };
        return newMetrics;
      });
      setLastUpdate(new Date());
    };

    const interval = setInterval(updateMetrics, updateInterval);
    return () => clearInterval(interval);
  }, [updateInterval]);

  // Update news in real-time
  useEffect(() => {
    const updateNews = () => {
      setNews(prev => {
        const newNews = [...prev];
        // Randomly update or add new news
        if (Math.random() < 0.3) { // 30% chance to add new news
          const categories: SustainabilityNews['category'][] = ['renewable', 'climate', 'conservation', 'technology', 'policy', 'research'];
          const impacts: SustainabilityNews['impact'][] = ['high', 'medium', 'low'];
          const sentiments: SustainabilityNews['sentiment'][] = ['positive', 'neutral', 'negative'];
          const regions = ['global', 'north_america', 'europe', 'asia', 'south_america', 'africa'];
          
          const newItem: SustainabilityNews = {
            id: Date.now().toString(),
            title: `New ${categories[Math.floor(Math.random() * categories.length)]} Development`,
            source: ['Climate News', 'Tech Sustainability', 'Environmental Science'][Math.floor(Math.random() * 3)],
            timestamp: new Date().toISOString(),
            category: categories[Math.floor(Math.random() * categories.length)],
            impact: impacts[Math.floor(Math.random() * impacts.length)],
            description: `Latest updates on ${categories[Math.floor(Math.random() * categories.length)]} initiatives.`,
            region: regions[Math.floor(Math.random() * regions.length)],
            tags: ['climate', 'sustainability', 'innovation'],
            sentiment: sentiments[Math.floor(Math.random() * sentiments.length)]
          };
          newNews.unshift(newItem);
        }
        return newNews.slice(0, 6); // Keep only the latest 6 news items
      });
    };

    const interval = setInterval(updateNews, 10000); // Update news every 10 seconds
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: SustainabilityNews['category']) => {
    switch (category) {
      case 'renewable': return '#4CAF50';
      case 'climate': return '#2196F3';
      case 'conservation': return '#9C27B0';
      case 'technology': return '#FF5722';
      default: return '#9E9E9E';
    }
  };

  const getImpactColor = (impact: SustainabilityNews['impact']) => {
    switch (impact) {
      case 'high': return '#F44336';
      case 'medium': return '#FF9800';
      case 'low': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  const MetricCard: React.FC<{
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
    onClick: () => void;
    trend?: number;
    target?: number;
    prediction?: number;
    regionalData?: Array<{ region: string; value: number }>;
  }> = ({ title, value, icon, color, onClick, trend, target, prediction, regionalData }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card 
        className="p-6 cursor-pointer hover:shadow-lg transition-all relative overflow-hidden group dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_15px_rgba(59,130,246,0.2)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10"
        onClick={onClick}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <div className="flex items-center gap-2">
              {icon}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Data
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    Export Data
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Maximize2 className="mr-2 h-4 w-4" />
                    Full Screen
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Value', value: value },
                    { name: 'Remaining', value: 100 - value }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={color} />
                  <Cell fill="#E5E7EB" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <div className="text-2xl font-bold">{value.toFixed(1)}%</div>
            <div className="text-sm text-gray-500">Current Value</div>
            {trend && (
              <div className={`flex items-center justify-center gap-1 mt-2 text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                <TrendingUp className="h-4 w-4" />
                <span>{Math.abs(trend).toFixed(1)}%</span>
                <span className="text-gray-500">vs last period</span>
              </div>
            )}
            {target && (
              <div className="flex items-center justify-center gap-1 mt-2 text-sm text-blue-500">
                <Target className="h-4 w-4" />
                <span>Target: {target}%</span>
              </div>
            )}
            {prediction && (
              <div className="flex items-center justify-center gap-1 mt-2 text-sm text-purple-500">
                <Target className="h-4 w-4" />
                <span>Prediction: {prediction}%</span>
              </div>
            )}
            {regionalData && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Regional Breakdown</div>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={regionalData}>
                      <Bar dataKey="value" fill={color} />
                      <Tooltip />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );

  // Add real-time update indicator
  const UpdateIndicator = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 dark:bg-gray-700 dark:shadow-[0_0_10px_rgba(59,130,246,0.2)]"
    >
      <RefreshCw className="h-4 w-4 animate-spin" />
      <span>Last updated: {lastUpdate.toLocaleTimeString()}</span>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="fixed inset-0 -z-10 dark:bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)] animate-pulse-slow" />
      
      <motion.div 
        style={{ opacity, scale: springScale }}
        className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b dark:border-gray-800 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10"
      >
        <div className="container mx-auto p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">Global Climate Dashboard</h1>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-4 w-4 text-yellow-500" />
                Live Updates
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search metrics..."
                  className="pl-10 w-[300px]"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                onClick={toggleTheme}
                className="relative"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {theme === 'dark' ? (
                    <Moon className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Sun className="h-4 w-4 text-orange-500" />
                  )}
                </motion.div>
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto p-6 space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <LineChart className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="alerts" className="flex items-center gap-2">
              <AlertOctagon className="h-4 w-4" />
              Alerts
            </TabsTrigger>
            <TabsTrigger value="predictions" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              Predictions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Global Climate Status */}
            <Card className="p-6 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Globe2 className="h-6 w-6 text-blue-500" />
                  Global Climate Status
                </h2>
                <div className="flex items-center gap-4">
                  <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="global">Global</SelectItem>
                      <SelectItem value="north_america">North America</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="south_america">South America</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: <Cloud className="h-5 w-5 text-blue-500" />, label: 'Global Temperature', value: 1.2, trend: 0.3, target: 1.5, unit: '°C' },
                  { icon: <Wind className="h-5 w-5 text-gray-500" />, label: 'CO2 Levels', value: 415, trend: 2.1, target: 400, unit: 'ppm' },
                  { icon: <Waves className="h-5 w-5 text-blue-500" />, label: 'Sea Level Rise', value: 3.3, trend: 0.2, target: 2.0, unit: 'mm/year' },
                  { icon: <TreePine className="h-5 w-5 text-green-500" />, label: 'Forest Cover', value: 31, trend: -0.5, target: 35, unit: '%' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-md transition-all group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {stat.icon}
                          <div>
                            <div className="text-sm text-gray-500">{stat.label}</div>
                            <div className="text-xl font-bold">
                              {stat.value.toFixed(1)}
                              <span className="text-sm text-gray-500 ml-1">{stat.unit}</span>
                            </div>
                          </div>
                        </div>
                        <div className={`text-sm ${stat.trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
                          {stat.trend > 0 ? '+' : ''}{stat.trend}
                          <span className="text-xs text-gray-500 ml-1">{stat.unit}/year</span>
                        </div>
                      </div>
                      <Progress 
                        value={(stat.value / stat.target) * 100} 
                        className="mt-2"
                      />
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Target: {stat.target}{stat.unit}</span>
                        <span>Last updated: <Clock className="inline-block h-3 w-3 mr-1" />2m ago</span>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>

            {/* Main Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <MetricCard
                title="Renewable Energy"
                value={metrics.renewableEnergy}
                icon={<Leaf className="h-5 w-5 text-green-500 dark:text-green-400 dark:drop-shadow-[0_0_5px_rgba(76,175,80,0.5)] dark:animate-pulse-slow" />}
                color="#4CAF50"
                onClick={() => setSelectedMetric('renewable')}
                trend={2.5}
                target={40}
                prediction={45}
                regionalData={[
                  { region: 'NA', value: 35 },
                  { region: 'EU', value: 45 },
                  { region: 'AS', value: 25 },
                  { region: 'SA', value: 30 }
                ]}
              />

              <MetricCard
                title="Carbon Emissions"
                value={metrics.carbonEmissions}
                icon={<Factory className="h-5 w-5 text-red-500 dark:text-red-400 dark:drop-shadow-[0_0_5px_rgba(244,67,54,0.5)] dark:animate-pulse-slow" />}
                color="#F44336"
                onClick={() => setSelectedMetric('carbon')}
                trend={-1.2}
                target={50}
                prediction={45}
                regionalData={[
                  { region: 'NA', value: 60 },
                  { region: 'EU', value: 40 },
                  { region: 'AS', value: 70 },
                  { region: 'SA', value: 50 }
                ]}
              />

              <MetricCard
                title="Forest Cover"
                value={metrics.forestCover}
                icon={<TreePine className="h-5 w-5 text-green-700 dark:text-green-500 dark:drop-shadow-[0_0_5px_rgba(46,125,50,0.5)] dark:animate-pulse-slow" />}
                color="#2E7D32"
                onClick={() => setSelectedMetric('forest')}
                trend={1.8}
                target={60}
                prediction={65}
                regionalData={[
                  { region: 'NA', value: 45 },
                  { region: 'EU', value: 35 },
                  { region: 'AS', value: 25 },
                  { region: 'SA', value: 55 }
                ]}
              />
            </div>

            {/* Historical Data Chart */}
            <AnimatePresence>
              {selectedMetric && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6"
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <h3 className="text-lg font-semibold">Historical Data</h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          Last 24 hours
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedMetric(null)}>
                          Close
                        </Button>
                      </div>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={metrics.historicalData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="timestamp" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey={selectedMetric === 'renewable' ? 'renewableEnergy' : 
                                    selectedMetric === 'carbon' ? 'carbonEmissions' : 'forestCover'} 
                            stroke={selectedMetric === 'renewable' ? '#4CAF50' : 
                                    selectedMetric === 'carbon' ? '#F44336' : '#2E7D32'} 
                            strokeWidth={2}
                            dot={false}
                          />
                          <Area
                            type="monotone"
                            dataKey={selectedMetric === 'renewable' ? 'renewableEnergy' : 
                                    selectedMetric === 'carbon' ? 'carbonEmissions' : 'forestCover'}
                            fill={selectedMetric === 'renewable' ? '#4CAF50' : 
                                  selectedMetric === 'carbon' ? '#F44336' : '#2E7D32'}
                            fillOpacity={0.1}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Regional Impact Analysis */}
            <Card className="p-6 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300 dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Map className="h-6 w-6 text-blue-500" />
                Regional Impact Analysis
              </h2>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={metrics.regionalData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="region" />
                    <PolarRadiusAxis />
                    <Radar
                      name="Renewable Energy"
                      dataKey="renewableEnergy"
                      stroke="#4CAF50"
                      fill="#4CAF50"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Carbon Emissions"
                      dataKey="carbonEmissions"
                      stroke="#F44336"
                      fill="#F44336"
                      fillOpacity={0.6}
                    />
                    <Radar
                      name="Forest Cover"
                      dataKey="forestCover"
                      stroke="#2E7D32"
                      fill="#2E7D32"
                      fillOpacity={0.6}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Climate Alerts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                  <AlertOctagon className="h-6 w-6 text-red-500 dark:text-red-400 dark:drop-shadow-[0_0_5px_rgba(244,67,54,0.5)] dark:animate-pulse-slow" />
                  Climate Alerts
                </h2>
                <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-700/50 dark:hover:border-gray-600 dark:shadow-[0_0_10px_rgba(59,130,246,0.1)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
                  View All Alerts
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    id: '1',
                    type: 'extreme_weather' as const,
                    severity: 'critical' as const,
                    location: 'Southeast Asia',
                    description: 'Extreme heat wave affecting multiple countries',
                    timestamp: new Date().toISOString(),
                    affectedArea: 1500000,
                    trend: 'increasing' as TrendType
                  },
                  {
                    id: '2',
                    type: 'pollution' as const,
                    severity: 'high' as const,
                    location: 'North India',
                    description: 'Air quality index reaching hazardous levels',
                    timestamp: new Date().toISOString(),
                    affectedArea: 800000,
                    trend: 'stable' as TrendType
                  },
                  {
                    id: '3',
                    type: 'deforestation' as const,
                    severity: 'medium' as const,
                    location: 'Amazon Basin',
                    description: 'Increased deforestation rate detected',
                    timestamp: new Date().toISOString(),
                    affectedArea: 500000,
                    trend: 'increasing' as TrendType
                  }
                ].map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="p-4 hover:shadow-md transition-all cursor-pointer dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_15px_rgba(59,130,246,0.2)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10"
                      onClick={() => setSelectedAlert(alert)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ 
                              backgroundColor: alert.severity === 'critical' ? '#F44336' :
                                           alert.severity === 'high' ? '#FF9800' :
                                           alert.severity === 'medium' ? '#FFC107' : '#4CAF50'
                            }}
                          />
                          <span className="text-sm font-medium capitalize">{alert.type.replace('_', ' ')}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(alert.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <h3 className="mt-2 font-semibold">{alert.location}</h3>
                      <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Map className="h-4 w-4" />
                          <span>{alert.affectedArea.toLocaleString()} km²</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className={getTrendColor(alert.trend)}>
                            {getTrendIcon(alert.trend)}
                          </span>
                          <span className="capitalize">{alert.trend}</span>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sustainability News */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-2 dark:text-white">
                  <Newspaper className="h-6 w-6 text-blue-500 dark:text-blue-400 dark:drop-shadow-[0_0_5px_rgba(33,150,243,0.5)] dark:animate-pulse-slow" />
                  Sustainability News
                </h2>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="dark:border-gray-700 dark:hover:bg-gray-700/50 dark:hover:border-gray-600 dark:shadow-[0_0_10px_rgba(59,130,246,0.1)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="dark:border-gray-700 dark:hover:bg-gray-700/50 dark:hover:border-gray-600 dark:shadow-[0_0_10px_rgba(59,130,246,0.1)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
                    View All News
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card 
                      className="p-4 hover:shadow-md transition-all cursor-pointer group dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_15px_rgba(59,130,246,0.2)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10"
                      onClick={() => setShowNewsDetails(showNewsDetails === item.id ? null : item.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getCategoryColor(item.category) }}
                          />
                          <span className="text-sm font-medium capitalize">{item.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getImpactColor(item.impact) }}
                          />
                          <span className="text-xs text-gray-500">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                      <h3 className="mt-2 font-semibold group-hover:text-blue-500 transition-colors">{item.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.source}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags.map((tag, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <AnimatePresence>
                        {showNewsDetails === item.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t"
                          >
                            <p className="text-sm text-gray-600">{item.description}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <AlertCircle className="h-4 w-4" />
                                <span>Impact: {item.impact}</span>
                              </div>
                              <Button variant="ghost" size="sm" className="h-8">
                                Read More
                              </Button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: <Leaf className="h-8 w-8 text-green-500" />,
                  title: 'Zero Waste Agriculture',
                  description: 'Monitor and optimize agricultural sustainability',
                  link: '/zero-waste-agriculture',
                  stats: { value: '92%', label: 'Efficiency' }
                },
                {
                  icon: <Navigation className="h-8 w-8 text-blue-500" />,
                  title: 'Smart Roads',
                  description: 'Intelligent traffic and infrastructure management',
                  link: '/smart-roads',
                  stats: { value: '85%', label: 'Traffic Flow' }
                },
                {
                  icon: <Shield className="h-8 w-8 text-red-500" />,
                  title: 'Disaster Prevention',
                  description: 'Early warning and prevention systems',
                  link: '/disaster-prevention',
                  stats: { value: '98%', label: 'Accuracy' }
                },
                {
                  icon: <Activity className="h-8 w-8 text-purple-500" />,
                  title: 'IoT Dashboard',
                  description: 'Real-time sensor data and analytics',
                  link: '/iot-dashboard',
                  stats: { value: '95%', label: 'Uptime' }
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link to={feature.link}>
                    <Card className="p-6 hover:shadow-lg transition-all group dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_15px_rgba(59,130,246,0.2)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="dark:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                          {feature.icon}
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors dark:text-gray-500 dark:group-hover:text-gray-300" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 dark:text-white">{feature.title}</h3>
                      <p className="text-sm text-gray-500 mb-4 dark:text-gray-400">{feature.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-500 dark:text-gray-400">{feature.stats.label}</div>
                        <div className="text-lg font-bold text-blue-500 dark:text-blue-400 dark:drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">{feature.stats.value}</div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-8">
            {/* Analytics Overview */}
            <Card className="p-6 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                  Analytics Dashboard
                </h2>
                <div className="flex items-center gap-4">
                  <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24h">Last 24 Hours</SelectItem>
                      <SelectItem value="7d">Last 7 Days</SelectItem>
                      <SelectItem value="30d">Last 30 Days</SelectItem>
                      <SelectItem value="1y">Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>

              {/* Key Performance Indicators */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Total Carbon Reduction', value: '2.4M', unit: 'tons', trend: '+12%', icon: <Leaf className="h-5 w-5 text-green-500" /> },
                  { label: 'Energy Efficiency', value: '87%', unit: 'target', trend: '+5%', icon: <Zap className="h-5 w-5 text-yellow-500" /> },
                  { label: 'Waste Management', value: '92%', unit: 'recycled', trend: '+8%', icon: <Recycle className="h-5 w-5 text-blue-500" /> },
                  { label: 'Water Conservation', value: '45%', unit: 'saved', trend: '+15%', icon: <Droplet className="h-5 w-5 text-blue-500" /> }
                ].map((kpi, index) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {kpi.icon}
                          <div>
                            <div className="text-sm text-gray-500">{kpi.label}</div>
                            <div className="text-xl font-bold">
                              {kpi.value}
                            </div>
                          </div>
                        </div>
                        <div className="text-sm text-green-500">{kpi.trend}</div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Trend Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Carbon Emissions Trend</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={metrics.historicalData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="timestamp" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="carbonEmissions" stroke="#F44336" strokeWidth={2} />
                        <Area type="monotone" dataKey="carbonEmissions" fill="#F44336" fillOpacity={0.1} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Regional Distribution</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: 'North America', value: 25 },
                            { name: 'Europe', value: 20 },
                            { name: 'Asia', value: 35 },
                            { name: 'Others', value: 20 }
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {COLORS.map((color, index) => (
                            <Cell key={`cell-${index}`} fill={color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Detailed Analytics */}
            <Card className="p-6 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
              <h3 className="text-lg font-semibold mb-4">Detailed Analysis</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium mb-2">Resource Utilization</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Energy', value: 75 },
                      { label: 'Water', value: 60 },
                      { label: 'Materials', value: 85 },
                      { label: 'Waste', value: 40 }
                    ].map((item, index) => (
                      <div key={item.label}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">{item.label}</span>
                          <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Efficiency Metrics</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={[
                        { metric: 'Energy', value: 85 },
                        { metric: 'Water', value: 75 },
                        { metric: 'Waste', value: 90 },
                        { metric: 'Materials', value: 80 },
                        { metric: 'Transport', value: 70 },
                        { metric: 'Process', value: 85 }
                      ]}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="metric" />
                        <PolarRadiusAxis />
                        <Radar name="Efficiency" dataKey="value" stroke="#4CAF50" fill="#4CAF50" fillOpacity={0.6} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-8">
            {/* Alerts Overview */}
            <Card className="p-6 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <AlertOctagon className="h-6 w-6 text-red-500" />
                  Climate Alerts
                </h2>
                <div className="flex items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Alerts</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Settings
                  </Button>
                </div>
              </div>

              {/* Alert Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'Critical Alerts', value: '3', color: '#F44336' },
                  { label: 'High Priority', value: '7', color: '#FF9800' },
                  { label: 'Medium Priority', value: '12', color: '#FFC107' },
                  { label: 'Low Priority', value: '5', color: '#4CAF50' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-500">{stat.label}</div>
                          <div className="text-2xl font-bold" style={{ color: stat.color }}>
                            {stat.value}
                          </div>
                        </div>
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: stat.color }} />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Alert Timeline */}
              <div className="space-y-4">
                {[
                  {
                    id: '1',
                    type: 'extreme_weather' as const,
                    severity: 'critical' as const,
                    location: 'Southeast Asia',
                    description: 'Extreme heat wave affecting multiple countries',
                    timestamp: new Date().toISOString(),
                    affectedArea: 1500000,
                    trend: 'increasing' as TrendType
                  },
                  {
                    id: '2',
                    type: 'pollution' as const,
                    severity: 'high' as const,
                    location: 'North India',
                    description: 'Air quality index reaching hazardous levels',
                    timestamp: new Date().toISOString(),
                    affectedArea: 800000,
                    trend: 'stable' as TrendType
                  },
                  {
                    id: '3',
                    type: 'deforestation' as const,
                    severity: 'medium' as const,
                    location: 'Amazon Basin',
                    description: 'Increased deforestation rate detected',
                    timestamp: new Date().toISOString(),
                    affectedArea: 500000,
                    trend: 'increasing' as TrendType
                  }
                ].map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-start gap-4">
                        <div className="w-2 h-2 rounded-full mt-2" style={{ 
                          backgroundColor: alert.severity === 'critical' ? '#F44336' :
                                       alert.severity === 'high' ? '#FF9800' :
                                       alert.severity === 'medium' ? '#FFC107' : '#4CAF50'
                        }} />
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold capitalize">{alert.type.replace('_', ' ')}</span>
                              <Badge variant="outline" className="capitalize">{alert.severity}</Badge>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(alert.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <h3 className="mt-2 font-medium">{alert.location}</h3>
                          <p className="text-sm text-gray-500 mt-1">{alert.description}</p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Map className="h-4 w-4" />
                              <span>{alert.affectedArea.toLocaleString()} km²</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                              <span className={getTrendColor(alert.trend)}>
                                {getTrendIcon(alert.trend)}
                              </span>
                              <span className="capitalize">{alert.trend}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="predictions" className="space-y-8">
            {/* Predictions Overview */}
            <Card className="p-6 dark:bg-gray-800/50 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_15px_rgba(59,130,246,0.1)] hover:dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Target className="h-6 w-6 text-purple-500" />
                  Climate Predictions
                </h2>
                <div className="flex items-center gap-4">
                  <Select>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time Horizon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="5y">5 Years</SelectItem>
                      <SelectItem value="10y">10 Years</SelectItem>
                      <SelectItem value="20y">20 Years</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              {/* Prediction Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  {
                    title: 'Temperature Rise',
                    current: '1.2°C',
                    prediction: '1.5°C',
                    trend: 'increasing' as TrendType,
                    confidence: 85
                  },
                  {
                    title: 'Sea Level Rise',
                    current: '3.3mm',
                    prediction: '4.2mm',
                    trend: 'increasing' as TrendType,
                    confidence: 90
                  },
                  {
                    title: 'Carbon Emissions',
                    current: '415ppm',
                    prediction: '450ppm',
                    trend: 'increasing' as TrendType,
                    confidence: 75
                  }
                ].map((metric, index) => (
                  <motion.div
                    key={metric.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <h3 className="text-lg font-semibold mb-4">{metric.title}</h3>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Current</span>
                          <span className="font-medium">{metric.current}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">Prediction</span>
                          <span className="font-medium">{metric.prediction}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">Trend</span>
                          <div className="flex items-center gap-2">
                            <span className={getTrendColor(metric.trend)}>
                              {getTrendIcon(metric.trend)}
                            </span>
                            <span className="capitalize">{metric.trend}</span>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm text-gray-500">Confidence</span>
                            <span className="text-sm font-medium">{metric.confidence}%</span>
                          </div>
                          <Progress value={metric.confidence} className="h-2" />
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Prediction Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Temperature Projections</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={[
                        { year: 2020, value: 1.2 },
                        { year: 2025, value: 1.3 },
                        { year: 2030, value: 1.4 },
                        { year: 2035, value: 1.5 },
                        { year: 2040, value: 1.6 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#9C27B0" strokeWidth={2} />
                        <Area type="monotone" dataKey="value" fill="#9C27B0" fillOpacity={0.1} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Emission Scenarios</h3>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={[
                        { year: 2020, optimistic: 415, realistic: 420, pessimistic: 425 },
                        { year: 2025, optimistic: 420, realistic: 430, pessimistic: 440 },
                        { year: 2030, optimistic: 425, realistic: 440, pessimistic: 455 },
                        { year: 2035, optimistic: 430, realistic: 450, pessimistic: 470 },
                        { year: 2040, optimistic: 435, realistic: 460, pessimistic: 485 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="optimistic" stroke="#4CAF50" strokeWidth={2} />
                        <Line type="monotone" dataKey="realistic" stroke="#FF9800" strokeWidth={2} />
                        <Line type="monotone" dataKey="pessimistic" stroke="#F44336" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Alert Details Dialog */}
      <Dialog open={!!selectedAlert} onOpenChange={() => setSelectedAlert(null)}>
        <DialogContent className="max-w-2xl dark:bg-gray-800/95 dark:backdrop-blur-sm dark:border dark:border-gray-700 dark:shadow-[0_0_20px_rgba(59,130,246,0.2)] dark:before:absolute dark:before:inset-0 dark:before:bg-gradient-to-r dark:before:from-blue-500/10 dark:before:to-purple-500/10 dark:before:animate-shimmer dark:before:-z-10">
          <DialogHeader>
            <DialogTitle>Climate Alert Details</DialogTitle>
            <DialogDescription>
              Detailed information about the selected climate alert
            </DialogDescription>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: selectedAlert.severity === 'critical' ? '#F44336' :
                                   selectedAlert.severity === 'high' ? '#FF9800' :
                                   selectedAlert.severity === 'medium' ? '#FFC107' : '#4CAF50'
                    }}
                  />
                  <span className="text-lg font-semibold capitalize">{selectedAlert.type.replace('_', ' ')}</span>
                </div>
                <Badge variant="outline">
                  {selectedAlert.severity.toUpperCase()}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Location</div>
                  <div className="font-medium">{selectedAlert.location}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Affected Area</div>
                  <div className="font-medium">{selectedAlert.affectedArea.toLocaleString()} km²</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Trend</div>
                  <div className="font-medium capitalize">{selectedAlert.trend}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Timestamp</div>
                  <div className="font-medium">{new Date(selectedAlert.timestamp).toLocaleString()}</div>
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Description</div>
                <div className="mt-1">{selectedAlert.description}</div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setSelectedAlert(null)}>
                  Close
                </Button>
                <Button>
                  View Details
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add UpdateIndicator */}
      <UpdateIndicator />
    </div>
  );
};

export default Home; 