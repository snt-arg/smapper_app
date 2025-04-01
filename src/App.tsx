import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';
import SensorsPage from './pages/SensorsPage';
import RecordingsPage from './pages/RecordingsPage';
import VisualizerPage from './pages/VisualizerPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
        <Route path="/recordings" element={<RecordingsPage />} />
        <Route path="/sensors" element={<SensorsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
