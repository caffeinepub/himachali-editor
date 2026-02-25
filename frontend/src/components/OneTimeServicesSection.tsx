import ServiceCard from './ServiceCard';

interface OneTimeServicesSectionProps {
  onBookClick: (serviceName: string) => void;
}

const services = [
  {
    name: 'Normal Video Editing + Shoot',
    price: 4000,
    description: 'Professional standard-quality video shoot with editing, color grading, and delivery.',
    icon: 'film' as const,
  },
  {
    name: 'High Video Editing + Shoot',
    price: 5000,
    description: 'Premium cinematic shoot with advanced editing, motion graphics, and high-end post-production.',
    icon: 'zap' as const,
  },
  {
    name: 'Car Delivery Shoot',
    price: 2500,
    description: 'Dedicated car delivery documentation shoot with professional angles and quick turnaround.',
    icon: 'car' as const,
  },
  {
    name: 'Bike Delivery Shoot',
    price: 2000,
    description: 'Dedicated bike delivery documentation shoot with dynamic angles and fast delivery.',
    icon: 'bike' as const,
  },
];

export default function OneTimeServicesSection({ onBookClick }: OneTimeServicesSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8 bg-gold" />
        <span className="text-gold text-xs font-medium tracking-[0.4em] uppercase">One-Time</span>
      </div>
      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
        Service Charges
      </h3>
      <p className="text-foreground/50 mb-8 max-w-xl">
        Book a single session for any of our professional videography and editing services.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service) => (
          <ServiceCard
            key={service.name}
            {...service}
            onBookClick={onBookClick}
          />
        ))}
      </div>
    </div>
  );
}
