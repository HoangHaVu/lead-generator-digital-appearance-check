import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LeadProvider } from './context/LeadContext';
import Welcome from './pages/Welcome';
import Input from './pages/Input';
import Scanning from './pages/Scanning';
import Questions from './pages/Questions';
import ScoreResult from './pages/ScoreResult';
import Recommendations from './pages/Recommendations';
import Booking from './pages/Booking';
import ThankYou from './pages/ThankYou';
import LeadClose from './pages/LeadClose';
import Admin from './pages/Admin';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';

function App() {
  return (
    <LeadProvider>
    <Router>
      <div className="min-h-screen bg-[#ECFEFF]">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/input" element={<Input />} />
          <Route path="/scan" element={<Scanning />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/result" element={<ScoreResult />} />
          <Route path="/recommendations" element={<Recommendations />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/thanks" element={<ThankYou />} />
          <Route path="/close" element={<LeadClose />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
      </div>
    </Router>
    </LeadProvider>
  );
}

export default App;
