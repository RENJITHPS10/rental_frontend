import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './redux/store';
import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminUserEdit from './pages/AdminUserEdit';
import AdminVehicles from './pages/AdminVehicles';
import AdminBookings from './pages/AdminBookings';
import AdminFraud from './pages/AdminFraud';
import AdminSupport from './pages/AdminSupport';
import CustomerDashboard from './pages/CustomerDashboard';
import CustomerVehicleList from './pages/CustomerVehicleList';
import CustomerBookingForm from './pages/CustomerBookingForm';
import CustomerBookings from './pages/CustomerBookings';
import CustomerSupport from './pages/CustomerSupport';
import CustomerProfile from './pages/CustomerProfile';
import CustomerConditionReport from './pages/CustomerConditionReport';
import CustomerPayment from './pages/CustomerPayment';
import CustomerRating from './pages/CustomerRating';
import OwnerDashboard from './pages/OwnerDashboard';
import OwnerAddVehicle from './pages/OwnerAddVehicle';
import OwnerVehicles from './pages/OwnerVehicles';
import OwnerEarnings from './pages/OwnerEarnings';
import OwnerEditVehicle from './pages/OwnerEditVehicle';
import OwnerBookingApproval from './pages/OwnerBookingApproval';
import OwnerReviews from './pages/OwnerReviews';
import DriverDashboard from './pages/DriverDashboard';
import DriverBookings from './pages/DriverBookings';
import DriverEarnings from './pages/DriverEarnings';
import DriverConditionReport from './pages/DriverConditionReport';
import DriverCarLocation from './pages/DriverCarLocation';
import DriverReviews from './pages/DriverReviews';
import Forbidden from './pages/Forbidden';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import AdminAssignDriver from './pages/AdminAssignDriver';
import AdminLicenseApproval from './pages/AdminLicenseApproval';

import DriverProfile from './pages/DriverProfile';
import DriverLocation from './pages/DriverLocation';
import AdminCondition from './pages/AdminCondtion';


const queryClient = new QueryClient();

const App = () => {

  return (

    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forbidden" element={<Forbidden />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
            <Route path="/admin/users/:userId/edit" element={<ProtectedRoute allowedRoles={['admin']}><AdminUserEdit /></ProtectedRoute>} />
            <Route path="/admin/vehicles" element={<ProtectedRoute allowedRoles={['admin']}><AdminVehicles /></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute allowedRoles={['admin']}><AdminBookings /></ProtectedRoute>} />
            <Route path="/admin/fraud" element={<ProtectedRoute allowedRoles={['admin']}><AdminFraud /></ProtectedRoute>} />
            <Route path="/admin/support" element={<ProtectedRoute allowedRoles={['admin']}><AdminSupport /></ProtectedRoute>} />
            <Route path="/admin/assign-drivers" element={<ProtectedRoute allowedRoles={['admin']}>    <AdminAssignDriver />  </ProtectedRoute>} />
            <Route path="/admin/license-approval" element={<ProtectedRoute allowedRoles={['admin']}>        <AdminLicenseApproval />      </ProtectedRoute>} />
            <Route path="/admin/conditionreport" element={<ProtectedRoute allowedRoles={['admin']}>        <AdminCondition/>      </ProtectedRoute>} />
            {/* Customer Routes */}
            <Route path="/customer" element={<ProtectedRoute allowedRoles={['customer']}><CustomerDashboard /></ProtectedRoute>} />
            <Route path="/customer/vehicles" element={<ProtectedRoute allowedRoles={['customer']}><CustomerVehicleList /></ProtectedRoute>} />
            <Route path="/customer/book/:vehicleId" element={<ProtectedRoute allowedRoles={['customer']}><CustomerBookingForm /></ProtectedRoute>} />
            <Route path="/customer/bookings" element={<ProtectedRoute allowedRoles={['customer']}><CustomerBookings /></ProtectedRoute>} />
            <Route path="/customer/support" element={<ProtectedRoute allowedRoles={['customer']}><CustomerSupport /></ProtectedRoute>} />
            <Route path="/customer/profile" element={<ProtectedRoute allowedRoles={['customer']}><CustomerProfile /></ProtectedRoute>} />
            <Route path="/customer/condition-report/:bookingId" element={<ProtectedRoute allowedRoles={['customer']}><CustomerConditionReport /></ProtectedRoute>} />
            <Route path="/customer/payment/:bookingId" element={<ProtectedRoute allowedRoles={['customer']}><CustomerPayment /></ProtectedRoute>} />
            <Route path="/customer/rating/:bookingId" element={<ProtectedRoute allowedRoles={['customer']}><CustomerRating /></ProtectedRoute>} />
            <Route
              path="/customer/booking/:bookingId/driver-location"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <DriverLocation />
                </ProtectedRoute>
              }/>

              {/* Owner Routes */}
            <Route path="/owner" element={<ProtectedRoute allowedRoles={['owner']}><OwnerDashboard /></ProtectedRoute>} />
            <Route path="/owner/add-vehicle" element={<ProtectedRoute allowedRoles={['owner']}><OwnerAddVehicle /></ProtectedRoute>} />
            <Route path="/owner/vehicles" element={<ProtectedRoute allowedRoles={['owner']}><OwnerVehicles /></ProtectedRoute>} />
            <Route path="/owner/earnings" element={<ProtectedRoute allowedRoles={['owner']}><OwnerEarnings /></ProtectedRoute>} />
            <Route path="/owner/edit-vehicle/:vehicleId" element={<ProtectedRoute allowedRoles={['owner']}><OwnerEditVehicle /></ProtectedRoute>} />
            <Route path="/owner/booking-approval" element={<ProtectedRoute allowedRoles={['owner']}><OwnerBookingApproval /></ProtectedRoute>} />
            <Route path="/owner/reviews" element={<ProtectedRoute allowedRoles={['owner']}><OwnerReviews /></ProtectedRoute>} />

            {/* Driver Routes */}
            <Route path="/driver" element={<ProtectedRoute allowedRoles={['driver']}><DriverDashboard /></ProtectedRoute>} />
            <Route path="/driver/bookings" element={<ProtectedRoute allowedRoles={['driver']}><DriverBookings /></ProtectedRoute>} />
            <Route path="/driver/earnings" element={<ProtectedRoute allowedRoles={['driver']}><DriverEarnings /></ProtectedRoute>} />
            <Route path="/driver/condition-report/:bookingId" element={<ProtectedRoute allowedRoles={['driver']}><DriverConditionReport /></ProtectedRoute>} />
            <Route path="/driver/car-location/:bookingId" element={<ProtectedRoute allowedRoles={['driver']}><DriverCarLocation /></ProtectedRoute>} />
            <Route path="/driver/reviews" element={<ProtectedRoute allowedRoles={['driver']}><DriverReviews /></ProtectedRoute>} />
            <Route path="/driver/profile" element={<ProtectedRoute allowedRoles={['driver']}>       <DriverProfile />     </ProtectedRoute>
            }
            />
          </Routes>
        </Router>
      </QueryClientProvider>

    </Provider>
  )
}
  ;

export default App;