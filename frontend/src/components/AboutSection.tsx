import { Award, Clock, Users, MapPin } from 'lucide-react';

const stats = [
  { icon: Award, label: 'Projects Completed', value: '200+' },
  { icon: Clock, label: 'Years Experience', value: '5+' },
  { icon: Users, label: 'Happy Clients', value: '150+' },
  { icon: MapPin, label: 'Based In', value: 'Himachal' },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-surface-1 relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs font-medium tracking-[0.4em] uppercase">About Us</span>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6 leading-tight">
              Crafting Visual Stories
              <br />
              <span className="text-gold">From the Mountains</span>
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed mb-6">
              Himachali Editor is a premier videography and editing studio nestled in the scenic landscapes
              of Himachal Pradesh. We blend the raw beauty of the mountains with cutting-edge production
              techniques to deliver stunning visual content.
            </p>
            <p className="text-foreground/60 leading-relaxed mb-8">
              Whether you need a one-time shoot for a special occasion, product delivery documentation,
              or a comprehensive monthly content package with social media management — we've got you covered
              with professional quality and personal attention.
            </p>
            <div className="flex items-center gap-3">
              <div className="h-px w-8 bg-gold/40" />
              <span className="text-foreground/40 text-sm italic">
                "Every frame tells a story worth remembering."
              </span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="bg-surface-2 border border-gold-dim rounded-sm p-6 text-center card-hover"
              >
                <div className="w-10 h-10 rounded-sm bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <div className="font-display text-4xl text-gold mb-1">{value}</div>
                <div className="text-foreground/50 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
