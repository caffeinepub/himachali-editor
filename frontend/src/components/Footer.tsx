import { Video, Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(window.location.hostname || 'himachali-editor');

  return (
    <footer className="bg-surface-1 border-t border-gold-dim py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-sm bg-gold flex items-center justify-center shadow-gold">
                <Video className="w-4 h-4 text-background" strokeWidth={2.5} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-display text-lg text-gold tracking-widest">HIMACHALI</span>
                <span className="font-display text-xs text-foreground/50 tracking-[0.3em]">EDITOR</span>
              </div>
            </div>
            <p className="text-foreground/50 text-sm leading-relaxed">
              Professional videography shoot & editing services from the heart of Himachal Pradesh.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-gold font-medium text-sm tracking-widest uppercase mb-4">Services</h4>
            <ul className="space-y-2 text-foreground/50 text-sm">
              <li>Normal Video Editing + Shoot</li>
              <li>High Video Editing + Shoot</li>
              <li>Car Delivery Shoot</li>
              <li>Bike Delivery Shoot</li>
            </ul>
          </div>

          {/* Packages */}
          <div>
            <h4 className="text-gold font-medium text-sm tracking-widest uppercase mb-4">Packages</h4>
            <ul className="space-y-2 text-foreground/50 text-sm">
              <li>Basic Package — ₹12,000/mo</li>
              <li>Premium Package — ₹15,000/mo</li>
              <li>Pro Package — ₹18,000/mo</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold-dim pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-foreground/40 text-sm">
          <p>© {year} Himachali Editor. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Built with{' '}
            <Heart className="w-3.5 h-3.5 text-gold fill-gold" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
