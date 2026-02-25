import { useState, useEffect } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useSaveCallerUserProfile } from '../hooks/useQueries';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, User, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import type { CustomerProfile } from '../backend';

interface ProfileSetupModalProps {
  open: boolean;
  onComplete: () => void;
}

export default function ProfileSetupModal({ open, onComplete }: ProfileSetupModalProps) {
  const { identity } = useInternetIdentity();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const saveMutation = useSaveCallerUserProfile();

  useEffect(() => {
    if (!open) {
      setDisplayName('');
      setEmail('');
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!displayName.trim() || !identity) return;

    const profile: CustomerProfile = {
      principal: identity.getPrincipal(),
      displayName: displayName.trim(),
      email: email.trim() || undefined,
      registrationTimestamp: BigInt(Date.now()) * BigInt(1_000_000),
    };

    try {
      await saveMutation.mutateAsync(profile);
      toast.success('Profile created! Welcome to Himachali Editor.');
      onComplete();
    } catch {
      toast.error('Failed to save profile. Please try again.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="bg-surface-2 border border-gold-dim max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold-dim flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <DialogTitle className="font-serif text-xl text-foreground">
              Welcome to Himachali Editor!
            </DialogTitle>
          </div>
          <DialogDescription className="text-foreground/60">
            Please set up your profile to continue booking our services.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-foreground/80 flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-gold" />
              Your Name <span className="text-destructive">*</span>
            </Label>
            <Input
              id="displayName"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Enter your full name"
              className="bg-surface-3 border-gold-dim focus:border-gold text-foreground placeholder:text-foreground/40"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-foreground/80">
              Email <span className="text-foreground/40 text-xs">(optional)</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="bg-surface-3 border-gold-dim focus:border-gold text-foreground placeholder:text-foreground/40"
            />
          </div>

          <Button
            type="submit"
            disabled={!displayName.trim() || saveMutation.isPending}
            className="w-full bg-gold text-background hover:bg-gold-light font-semibold shadow-gold"
          >
            {saveMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              'Complete Setup'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
