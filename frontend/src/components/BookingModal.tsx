import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateBooking } from '../hooks/useQueries';
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
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Calendar, CheckCircle2, LogIn, Film } from 'lucide-react';
import { toast } from 'sonner';

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
  serviceName: string;
  onLoginRequest: () => void;
}

export default function BookingModal({ open, onClose, serviceName, onLoginRequest }: BookingModalProps) {
  const { identity } = useInternetIdentity();
  const [date, setDate] = useState('');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const createBooking = useCreateBooking();

  const isAuthenticated = !!identity;

  const handleClose = () => {
    setDate('');
    setNotes('');
    setSuccess(false);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;

    try {
      await createBooking.mutateAsync({ serviceName, date });
      setSuccess(true);
    } catch (err: unknown) {
      const error = err as Error;
      if (error?.message?.includes('not registered')) {
        toast.error('Please complete your profile setup first.');
      } else {
        toast.error('Booking failed. Please try again.');
      }
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-surface-2 border border-gold-dim max-w-md">
        {!isAuthenticated ? (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-xl text-foreground flex items-center gap-2">
                <LogIn className="w-5 h-5 text-gold" />
                Login Required
              </DialogTitle>
              <DialogDescription className="text-foreground/60">
                Please log in to book <span className="text-gold font-medium">{serviceName}</span>.
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 mt-4">
              <Button
                onClick={() => { handleClose(); onLoginRequest(); }}
                className="flex-1 bg-gold text-background hover:bg-gold-light font-semibold shadow-gold"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login to Book
              </Button>
              <Button variant="outline" onClick={handleClose} className="border-gold-dim text-foreground/70">
                Cancel
              </Button>
            </div>
          </>
        ) : success ? (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center text-center gap-3 py-4">
                <div className="w-16 h-16 rounded-full bg-gold/20 border-2 border-gold flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-gold" />
                </div>
                <DialogTitle className="font-serif text-2xl text-foreground">
                  Booking Confirmed!
                </DialogTitle>
                <DialogDescription className="text-foreground/60 text-base">
                  Your booking for <span className="text-gold font-semibold">{serviceName}</span> on{' '}
                  <span className="text-gold font-semibold">{date}</span> has been received.
                  We'll confirm shortly.
                </DialogDescription>
              </div>
            </DialogHeader>
            <div className="flex gap-3 mt-2">
              <Button
                onClick={handleClose}
                className="flex-1 bg-gold text-background hover:bg-gold-light font-semibold"
              >
                Done
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-xl text-foreground flex items-center gap-2">
                <Film className="w-5 h-5 text-gold" />
                Book Service
              </DialogTitle>
              <DialogDescription className="text-foreground/60">
                Booking: <span className="text-gold font-medium">{serviceName}</span>
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-foreground/80">
                  Selected Service
                </Label>
                <Input
                  id="service"
                  value={serviceName}
                  readOnly
                  className="bg-surface-3 border-gold-dim text-gold font-medium cursor-default"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-foreground/80 flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  Preferred Date <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={date}
                  min={today}
                  onChange={(e) => setDate(e.target.value)}
                  className="bg-surface-3 border-gold-dim focus:border-gold text-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground/80">
                  Notes <span className="text-foreground/40 text-xs">(optional)</span>
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requirements or details..."
                  className="bg-surface-3 border-gold-dim focus:border-gold text-foreground placeholder:text-foreground/40 resize-none"
                  rows={3}
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={!date || createBooking.isPending}
                  className="flex-1 bg-gold text-background hover:bg-gold-light font-semibold shadow-gold"
                >
                  {createBooking.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Booking...
                    </>
                  ) : (
                    'Confirm Booking'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="border-gold-dim text-foreground/70"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
