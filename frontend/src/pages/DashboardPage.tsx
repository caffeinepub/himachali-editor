import { Link, useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useGetCustomerBookings } from '../hooks/useQueries';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingHistoryCard from '../components/BookingHistoryCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LogIn, Film, CalendarX, User, ArrowLeft } from 'lucide-react';

export default function DashboardPage() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading } = useGetCallerUserProfile();
  const { data: bookings, isLoading: bookingsLoading } = useGetCustomerBookings();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const goToServices = () => {
    navigate({ to: '/' }).then(() => {
      setTimeout(() => {
        document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold-dim flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-9 h-9 text-gold" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-foreground mb-3">
              Login Required
            </h1>
            <p className="text-foreground/60 mb-8">
              Please log in to access your dashboard and view your booking history.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="bg-gold text-background hover:bg-gold-light font-semibold shadow-gold gap-2"
              >
                <LogIn className="w-4 h-4" />
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </Button>
              <Link to="/">
                <Button variant="outline" className="border-gold-dim text-foreground/70 gap-2 w-full sm:w-auto">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs font-medium tracking-[0.4em] uppercase">My Account</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="font-serif text-4xl font-bold text-foreground mb-1">
                  {profileLoading ? (
                    <Skeleton className="h-10 w-48 bg-surface-3" />
                  ) : (
                    <>Welcome, <span className="text-gold">{profile?.displayName ?? 'Customer'}</span></>
                  )}
                </h1>
                <p className="text-foreground/50">Manage your bookings and account details.</p>
              </div>
              <Link to="/">
                <Button variant="outline" className="border-gold-dim text-foreground/70 gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>

          {/* Profile card */}
          {!profileLoading && profile && (
            <div className="bg-surface-2 border border-gold-dim rounded-sm p-5 mb-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gold/20 border border-gold-dim flex items-center justify-center shrink-0">
                <User className="w-6 h-6 text-gold" />
              </div>
              <div>
                <p className="font-medium text-foreground">{profile.displayName}</p>
                {profile.email && (
                  <p className="text-foreground/50 text-sm">{profile.email}</p>
                )}
                <p className="text-foreground/30 text-xs mt-0.5">
                  Member since{' '}
                  {new Date(Number(profile.registrationTimestamp) / 1_000_000).toLocaleDateString('en-IN', {
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>
          )}

          {/* Bookings section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl font-semibold text-foreground flex items-center gap-2">
                <Film className="w-5 h-5 text-gold" />
                My Bookings
              </h2>
              <Button
                size="sm"
                onClick={goToServices}
                className="bg-gold/10 border border-gold-dim text-gold hover:bg-gold hover:text-background text-xs"
                variant="outline"
              >
                + New Booking
              </Button>
            </div>

            {bookingsLoading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-36 bg-surface-2 rounded-sm" />
                ))}
              </div>
            ) : !bookings || bookings.length === 0 ? (
              <div className="text-center py-20 bg-surface-2 border border-gold-dim rounded-sm">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold-dim flex items-center justify-center mx-auto mb-4">
                  <CalendarX className="w-7 h-7 text-gold/60" />
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">No Bookings Yet</h3>
                <p className="text-foreground/50 text-sm mb-6 max-w-xs mx-auto">
                  You haven't made any bookings yet. Explore our services and book your first session!
                </p>
                <Button
                  onClick={goToServices}
                  className="bg-gold text-background hover:bg-gold-light font-semibold shadow-gold"
                >
                  Browse Services
                </Button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {bookings.map((booking) => (
                  <BookingHistoryCard key={booking.id.toString()} booking={booking} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
