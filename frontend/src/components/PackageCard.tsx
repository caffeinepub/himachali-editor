import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PackageCardProps {
  name: string;
  videoRange: string;
  features: string[];
  price: number;
  isPopular?: boolean;
  onSubscribeClick: (packageName: string) => void;
}

export default function PackageCard({
  name,
  videoRange,
  features,
  price,
  isPopular,
  onSubscribeClick,
}: PackageCardProps) {
  return (
    <div
      className={`relative bg-surface-2 rounded-sm p-6 card-hover flex flex-col ${
        isPopular
          ? 'border-2 border-gold cinematic-shadow'
          : 'border border-gold-dim'
      }`}
    >
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <Badge className="bg-gold text-background font-semibold px-4 py-1 text-xs tracking-wider uppercase flex items-center gap-1 shadow-gold">
            <Star className="w-3 h-3 fill-current" />
            Most Popular
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <h3 className="font-display text-2xl text-gold tracking-widest mb-1">{name.toUpperCase()}</h3>
        <p className="text-foreground/60 text-sm">{videoRange} videos / month</p>
      </div>

      {/* Price */}
      <div className="mb-6 pb-6 border-b border-gold-dim">
        <span className="font-display text-5xl text-foreground tracking-wide">
          ₹{price.toLocaleString('en-IN')}
        </span>
        <span className="text-foreground/50 text-sm ml-1">/ month</span>
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-6 flex-1">
        {features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/80">
            <Check className="w-4 h-4 text-gold mt-0.5 shrink-0" />
            {feature}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Button
        onClick={() => onSubscribeClick(`${name} Package`)}
        className={`w-full font-semibold transition-all duration-300 ${
          isPopular
            ? 'bg-gold text-background hover:bg-gold-light shadow-gold'
            : 'bg-gold/10 border border-gold-dim text-gold hover:bg-gold hover:text-background'
        }`}
        variant={isPopular ? 'default' : 'outline'}
      >
        Subscribe Now
      </Button>
    </div>
  );
}
