import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AppLayout from '../layouts/AppLayout';
import ClientsPage from '../pages/ClientsPage';
import DashboardPage from '../pages/DashboardPage';
import JobsInvoicesPage from '../pages/JobsInvoicesPage';
import LiveQuotePage from '../pages/LiveQuotePage';
import LoginPage from '../pages/LoginPage';
import QuotesPage from '../pages/QuotesPage';

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/quotes/live/:token" element={<LiveQuotePage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path="clients" element={<ClientsPage />} />
      <Route path="quotes" element={<QuotesPage />} />
      <Route path="jobs-invoices" element={<JobsInvoicesPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRouter;
