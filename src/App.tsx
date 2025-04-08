import { Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout';
import { lazy } from "react"


const DashboardPage = lazy(() => import("@/pages/DashboardPage"))
const ServicesPage = lazy(() => import("@/pages/ServicesPage"))
const VisualizerPage = lazy(() => import("@/pages/VisualizerPage"))
const RecordingsPage = lazy(() => import("@/pages/RecordingsPage"))
const SensorsPage = lazy(() => import("@/pages/SensorsPage"))

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
