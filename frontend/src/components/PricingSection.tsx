import { useState } from 'react';
import OneTimeServicesSection from './OneTimeServicesSection';
import MonthlyPackagesSection from './MonthlyPackagesSection';
import BookingModal from './BookingModal';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface PricingSectionProps {
  onLoginRequest: () => void;
}

export default function PricingSection({ onLoginRequest }: PricingSectionProps) {
  const [bookingService, setBookingService] = useState<string | null>(null);
  const { identity } = useInternetIdentity();

  const handleBook = (serviceName: string) => {
    setBookingService(serviceName);
  };

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{
        backgroundImage: "url('/assets/generated/pricing-bg.dim_1920x600.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/92" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-5xl sm:text-6xl text-foreground tracking-widest mb-3">
            PRICING &amp; <span className="text-gold">PACKAGES</span>
          </h2>
          <p className="text-foreground/50 max-w-2xl mx-auto">
            Transparent pricing for every need — from single sessions to full monthly content management.
          </p>
        </div>

        {/* One-time services */}
        <div id="packages" className="mb-20">
          <OneTimeServicesSection onBookClick={handleBook} />
        </div>

        {/* Monthly packages */}
        <div>
          <MonthlyPackagesSection onSubscribeClick={handleBook} />
        </div>
      </div>

      {/* Booking modal */}
      <BookingModal
        open={!!bookingService}
        onClose={() => setBookingService(null)}
        serviceName={bookingService ?? ''}
        onLoginRequest={onLoginRequest}
      />
    </section>
  );
}
