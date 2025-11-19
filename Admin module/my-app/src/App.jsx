import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Booking from "./pages/Booking";
import Subscription from "./pages/Subscription";
import NotFound from "./pages/NotFound";
import Vendor from "./pages/Vendor";
import { DashboardLayout } from "./components/DashboardLayout";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* protected routes with sidebar */}
      <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/vendor" element={<Vendor />} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<NotFound />} />
       



      

    </Routes>

  );
}

export default App;
