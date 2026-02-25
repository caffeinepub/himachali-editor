import { Camera, Car, Bike, Film, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ServiceCardProps {
  name: string;
  price: number;
  description: string;
  icon: 'film' | 'zap' | 'car' | 'bike';
  onBookClick: (serviceName: string) => void;
}

const iconMap = {
  film: Film,
  zap: Zap,
  car: Car,
  bike: Bike,
};

export default function ServiceCard({ name, price, description, icon, onBookClick }: ServiceCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="relative bg-surface-2 border border-gold-dim rounded-sm p-6 card-hover group flex flex-col">
      {/* Icon */}
      <div className="w-12 h-12 rounded-sm bg-gold/10 border border-gold-dim flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
        <Icon className="w-6 h-6 text-gold" />
      </div>

      {/* Content */}
      <h3 className="font-serif text-lg font-semibold text-foreground mb-2 leading-tight">{name}</h3>
      <p className="text-sm text-foreground/60 mb-4 flex-1">{description}</p>

      {/* Price */}
      <div className="mb-5">
        <span className="font-display text-4xl text-gold tracking-wide">₹{price.toLocaleString('en-IN')}</span>
        <span className="text-foreground/50 text-sm ml-1">/ session</span>
      </div>

      {/* CTA */}
      <Button
        onClick={() => onBookClick(name)}
        className="w-full bg-gold/10 border border-gold-dim text-gold hover:bg-gold hover:text-background font-semibold transition-all duration-300"
        variant="outline"
      >
        Book Now
      </Button>
    </div>
  );
}
