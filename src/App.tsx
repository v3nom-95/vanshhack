import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Web3Provider } from '@/contexts/Web3Context';
import Home from '@/pages/Home';
import ZeroWasteAgriculture from '@/pages/ZeroWasteAgriculture';
import SmartRoads from '@/pages/SmartRoads';
import DisasterPrevention from '@/pages/DisasterPrevention';
import IoTDashboard from '@/pages/IoTDashboard';
import FinePayment from '@/components/iot/FinePayment';
import WalletConnect from '@/components/wallet/WalletConnect';
import ModeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

function App() {
  const { theme } = useTheme();

  return (
    <Web3Provider>
      <Router>
        <div className={`min-h-screen ${theme === 'dark' ? 'dark' : ''}`}>
          <nav className="border-b">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Link to="/" className="text-xl font-bold">
                    Smart City
                  </Link>
                  <div className="hidden md:flex space-x-2">
                    <Link to="/">
                      <Button variant="ghost">Home</Button>
                    </Link>
                    <Link to="/zero-waste-agriculture">
                      <Button variant="ghost">Zero Waste Agriculture</Button>
                    </Link>
                    <Link to="/smart-roads">
                      <Button variant="ghost">Smart Roads</Button>
                    </Link>
                    <Link to="/disaster-prevention">
                      <Button variant="ghost">Disaster Prevention</Button>
                    </Link>
                    <Link to="/iot-dashboard">
                      <Button variant="ghost">IoT Dashboard</Button>
                    </Link>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <WalletConnect />
                  <ModeToggle />
                </div>
              </div>
            </div>
          </nav>

          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/zero-waste-agriculture" element={<ZeroWasteAgriculture />} />
              <Route path="/smart-roads" element={<SmartRoads />} />
              <Route path="/disaster-prevention" element={<DisasterPrevention />} />
              <Route path="/iot-dashboard" element={<IoTDashboard />} />
              <Route path="/fine-payment" element={<FinePayment />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Web3Provider>
  );
}

export default App;
