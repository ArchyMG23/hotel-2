import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Layout from './components/Layout';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Restaurant from './pages/Restaurant';
import Events from './pages/Events';
import Blog from './pages/Blog';
import About from './pages/About';
import Reservation from './pages/Reservation';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import { SiteDataProvider, useSiteData } from './hooks/useSiteData';

function AppContent() {
  const { isLoading } = useSiteData();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-royal-silk flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-royal-gold"></div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="chambres" element={<Rooms />} />
          <Route path="restaurant" element={<Restaurant />} />
          <Route path="evenements" element={<Events />} />
          <Route path="blog" element={<Blog />} />
          <Route path="a-propos" element={<About />} />
          <Route path="reservation" element={<Reservation />} />
        </Route>
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <SiteDataProvider>
      <AppContent />
    </SiteDataProvider>
  );
}
