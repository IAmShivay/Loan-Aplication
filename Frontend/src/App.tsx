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
import FAQSection from "./components/Section/faq/faq.tsx";
import ProfileComponent from "./components/User/profile.tsx";
import CreditScoreComponent from "./components/Section/CreditScore/CreditScore.tsx";
// import SessionExpiredPopup from "./components/Section/Error/Error.tsx";
import PrivacyAndTermsComponent from "./components/privacy/privacy.tsx";
import TermsAndConditions from "./components/privacy/terms-condition.tsx";
import PrivacyPolicy from "./components/privacy/privacy-policy.tsx";
import ReturnRefundPolicy from "./components/privacy/return-policy.tsx";
import NotFound from "./notFound.tsx";

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
  const { isAuthenticated, user} = useSelector(
    (state: any) => state.verify
  );
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
  // const warning = localStorage.getItem("warning");
  // if (error && warning === null) {
  //   return <SessionExpiredPopup />;
  // }
  return (
    <Router>
      <Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/*" element={<GenralRoute />} />
          <Route path="/user/*" element={<PublicRoute />} />
          <Route
            path="/app/v1/*"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated} user={user} />
            }
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
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/Loan-calculator" element={<EMICalculator />} />
      <Route path="/our-policy" element={<PrivacyAndTermsComponent />} />
      <Route path="/terms-of-use" element={<TermsAndConditions />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/refund-policy" element={<ReturnRefundPolicy />} />
      <Route path="/faq" element={<FAQSection />} />
      <Route path="*" element={<NotFound />} />
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
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
  </React.Fragment>
);

interface PrivateRouteProps {
  isAuthenticated: boolean;
  user: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  isAuthenticated,
  user,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/user/login" />;
  }

  return (
    <React.Fragment>
      <Routes>
        {user?.role === "lendingPartner" ? (
          <Route path="/admin/dashboard" element={<Main />} />
        ) : (
          <Route path="/user/dashboard" element={<UserDashboard />} />
        )}
        <Route path="/user/credit-report" element={<CreditScoreComponent />} />
        <Route path="/user/profile" element={<ProfileComponent />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;
