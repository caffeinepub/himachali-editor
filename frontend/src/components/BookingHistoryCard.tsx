import { Booking, BookingStatus } from '../backend';
import { Calendar, Clock, Film } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BookingHistoryCardProps {
  booking: Booking;
}

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  [BookingStatus.pending]: {
    label: 'Pending',
    className: 'bg-foreground/10 text-foreground/60 border-foreground/20',
  },
  [BookingStatus.confirmed]: {
    label: 'Confirmed',
    className: 'bg-gold/10 text-gold border-gold-dim',
  },
  [BookingStatus.completed]: {
    label: 'Completed',
    className: 'bg-green-500/10 text-green-400 border-green-500/20',
  },
};

export default function BookingHistoryCard({ booking }: BookingHistoryCardProps) {
  const status = statusConfig[booking.status] ?? statusConfig[BookingStatus.pending];

  const formattedTimestamp = new Date(Number(booking.timestamp) / 1_000_000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="bg-surface-2 border border-gold-dim rounded-sm p-5 card-hover">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-sm bg-gold/10 border border-gold-dim flex items-center justify-center shrink-0">
            <Film className="w-4 h-4 text-gold" />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-sm leading-tight">{booking.serviceName}</h3>
            <p className="text-foreground/40 text-xs mt-0.5">Booking #{booking.id.toString()}</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`text-xs font-medium shrink-0 ${status.className}`}
        >
          {status.label}
        </Badge>
      </div>

      {/* Details */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Calendar className="w-3.5 h-3.5 text-gold/60" />
          <span>Preferred date: <span className="text-foreground/80">{booking.date}</span></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-foreground/60">
          <Clock className="w-3.5 h-3.5 text-gold/60" />
          <span>Booked on: <span className="text-foreground/80">{formattedTimestamp}</span></span>
        </div>
      </div>
    </div>
  );
}
