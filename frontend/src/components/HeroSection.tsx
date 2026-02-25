import { ArrowDown, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {
  const scrollToPricing = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/generated/hero-bg.dim_1920x1080.png')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/50 to-background" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-gold/60" />
          <span className="text-gold text-xs font-medium tracking-[0.4em] uppercase">
            Professional Videography
          </span>
          <div className="h-px w-12 bg-gold/60" />
        </div>

        {/* Main headline */}
        <h1 className="font-display text-6xl sm:text-8xl md:text-9xl text-foreground mb-4 leading-none tracking-wider">
          HIMACHALI
          <br />
          <span className="gold-text-gradient">EDITOR</span>
        </h1>

        {/* Tagline */}
        <p className="font-serif text-xl sm:text-2xl text-foreground/70 mb-3 italic">
          Capturing Stories, Crafting Memories
        </p>
        <p className="text-foreground/50 text-base sm:text-lg max-w-2xl mx-auto mb-10">
          Premium videography shoot & editing services — from cinematic productions to social media content.
          Based in the heart of Himachal Pradesh.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={scrollToPricing}
            className="bg-gold text-background hover:bg-gold-light font-semibold px-8 py-6 text-base shadow-gold gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            View Services & Pricing
          </Button>
          <Button
            variant="outline"
            onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
            className="border-gold-dim text-foreground/70 hover:text-gold hover:border-gold px-8 py-6 text-base"
          >
            Learn More
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground/40 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
