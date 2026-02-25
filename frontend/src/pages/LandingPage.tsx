import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import ProfileSetupModal from '../components/ProfileSetupModal';
import LoginButton from '../components/LoginButton';

export default function LandingPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [loginTrigger, setLoginTrigger] = useState(false);

  const isAuthenticated = !!identity;

  // Show profile setup modal when user logs in for the first time
  useEffect(() => {
    if (isAuthenticated && !profileLoading && isFetched && profile === null) {
      setShowProfileSetup(true);
    }
  }, [isAuthenticated, profileLoading, isFetched, profile]);

  const handleLoginRequest = () => {
    login();
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <HeroSection />
        <AboutSection />
        <PricingSection onLoginRequest={handleLoginRequest} />
      </main>

      <Footer />

      {/* Profile setup modal for first-time users */}
      <ProfileSetupModal
        open={showProfileSetup}
        onComplete={() => setShowProfileSetup(false)}
      />
    </div>
  );
}
