import React, { Suspense, lazy, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "./components/Loading/Loading.tsx";
import { loadUser } from "./app/auth/checkAuthSlice.tsx";
import EMICalculator from "./components/Section/EmiCalculator/EmiCalculator.tsx";

const LoanApplicationForm = lazy(
  () => import("./components/Section/LoanApplication/Main.tsx")
);
const Footer = lazy(() => import("./components/Section/Footer/Footer"));
const Header = lazy(() => import("./components/Section/Header/Header"));
const RegisterPage = lazy(
  () => import("./components/Section/Register/Register")
);
const LoginPage = lazy(() => import("./components/Section/Login/Login.tsx"));
const Home = lazy(() => import("./components/Home/Home"));
const Main = lazy(() => import("./components/Admin/Main.tsx"));
const AboutUs = lazy(() => import("./components/Section/AboutUs/AboutUs.tsx"));
const UserDashboard = lazy(() => import("./components/User/Main.tsx"));

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: any) => state.verify);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      await dispatch<any>(loadUser());
      setLoading(false);
    };
    loadData();
  }, [dispatch]);

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/*" element={<GenralRoute />} />
          <Route path="/user/*" element={<PublicRoute />} />
          <Route
            path="/app/v1/*"
            element={<PrivateRoute isAuthenticated={isAuthenticated} user={user} />}
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

const GenralRoute: React.FC = () => (
  <React.Fragment>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply-form" element={<LoanApplicationForm />} />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="loan-calculator" element={<EMICalculator />} />
    </Routes>
    <Footer />
  </React.Fragment>
);

const PublicRoute: React.FC = () => (
  <React.Fragment>
    <Header />
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
    </Routes>
    <Footer />
  </React.Fragment>
);

interface PrivateRouteProps {
  isAuthenticated: boolean;
  user: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ isAuthenticated, user }) => {
  if (!isAuthenticated) {
    return <Navigate to="/user/login" />;
  }

  return (
    <Routes>
      {user?.role === "admin" ? (
        <Route path="/admin/dashboard" element={<Main />} />
      ) : (
        <Route path="/user/dashboard" element={<UserDashboard />} />
      )}
      <Route path="*" element={<Navigate to="/user/login" />} />
    </Routes>
  );
};

export default App;
