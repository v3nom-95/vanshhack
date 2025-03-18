import { Routes, Route, Link } from "react-router-dom";
import Index from "./pages/Index";
import Test from "./pages/Test";
import IoTDashboard from "./pages/IoTDashboard";
import { Web3Provider } from "./contexts/Web3Context";
import WalletConnect from "./components/wallet/WalletConnect";

function App() {
  return (
    <Web3Provider>
      <div className="min-h-screen bg-background">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-ecosync-green-dark">
              EcoSync Harmony
            </Link>
            <div className="flex items-center gap-8">
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/" className="text-foreground hover:text-ecosync-green-dark transition-colors">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/iot-dashboard" className="text-foreground hover:text-ecosync-green-dark transition-colors">
                      IoT Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link to="/test" className="text-foreground hover:text-ecosync-green-dark transition-colors">
                      Test
                    </Link>
                  </li>
                </ul>
              </nav>
              <WalletConnect />
            </div>
          </div>
        </header>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/iot-dashboard" element={<IoTDashboard />} />
            <Route path="/test" element={<Test />} />
          </Routes>
        </main>
      </div>
    </Web3Provider>
  );
}

export default App;
