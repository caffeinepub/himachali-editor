import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, User, Loader2 } from 'lucide-react';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';

export default function LoginButton() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { data: profile } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  if (isLoggingIn) {
    return (
      <Button disabled variant="outline" className="border-gold-dim text-gold gap-2">
        <Loader2 className="w-4 h-4 animate-spin" />
        Logging in...
      </Button>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-sm text-foreground/80">
          <div className="w-7 h-7 rounded-full bg-gold/20 border border-gold-dim flex items-center justify-center">
            <User className="w-3.5 h-3.5 text-gold" />
          </div>
          <span className="hidden sm:block font-medium text-gold">
            {profile?.displayName ?? 'Customer'}
          </span>
        </div>
        <Button
          onClick={handleAuth}
          variant="ghost"
          size="sm"
          className="text-foreground/60 hover:text-foreground gap-1.5"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Logout</span>
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={handleAuth}
      className="bg-gold text-background hover:bg-gold-light font-semibold gap-2 shadow-gold"
    >
      <LogIn className="w-4 h-4" />
      Login
    </Button>
  );
}
