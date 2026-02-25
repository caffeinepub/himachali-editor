import PackageCard from './PackageCard';

interface MonthlyPackagesSectionProps {
  onSubscribeClick: (packageName: string) => void;
}

const packages = [
  {
    name: 'Basic',
    videoRange: '8–12',
    features: [
      '8 to 12 videos per month',
      'Normal video editing',
      'Professional shoot',
      'Color grading included',
      'HD delivery',
    ],
    price: 12000,
    isPopular: false,
  },
  {
    name: 'Premium',
    videoRange: '10–15',
    features: [
      '10 to 15 videos per month',
      'High-quality video editing',
      'Professional shoot',
      'Advanced color grading',
      'Motion graphics',
      '4K delivery',
    ],
    price: 15000,
    isPopular: false,
  },
  {
    name: 'Pro',
    videoRange: '10–15',
    features: [
      '10 to 15 videos per month',
      'High-quality video editing',
      'Professional shoot',
      'Advanced color grading',
      'Motion graphics',
      'Social media management',
      'Content strategy',
      '4K delivery',
    ],
    price: 18000,
    isPopular: true,
  },
];

export default function MonthlyPackagesSection({ onSubscribeClick }: MonthlyPackagesSectionProps) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-8 bg-gold" />
        <span className="text-gold text-xs font-medium tracking-[0.4em] uppercase">Monthly</span>
      </div>
      <h3 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
        Subscription Packages
      </h3>
      <p className="text-foreground/50 mb-10 max-w-xl">
        Get consistent, high-quality content every month with our flexible subscription plans.
      </p>

      <div className="grid sm:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <PackageCard
            key={pkg.name}
            {...pkg}
            onSubscribeClick={onSubscribeClick}
          />
        ))}
      </div>
    </div>
  );
}
