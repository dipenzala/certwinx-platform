import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

/**
 * NOTE: Testimonials are only populated when genuine, verified testimonials exist.
 * Until then, this section renders a soft placeholder — never fabricated reviews.
 */
const TESTIMONIALS = [
  // Add entries in this shape only when verified:
  // { name: 'Client Name', company: 'Company', role: 'Founder', quote: 'Verified quote.', service: 'Service' },
];

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const hasTestimonials = TESTIMONIALS.length > 0;

  useEffect(() => {
    if (!hasTestimonials) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(t);
  }, [hasTestimonials]);

  if (!hasTestimonials) {
    return (
      <section className="py-section bg-paper border-y border-line">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
          <SectionHeading
            eyebrow="Testimonials"
            title="Client voices will appear here."
            subtitle="We only publish verified testimonials from real clients with consent. None fabricated, ever."
            align="center"
          />
          <div className="mt-14 max-w-2xl mx-auto bg-canvas border border-line rounded-3xl p-10 text-center">
            <Quote size={22} className="text-ink/25 mx-auto mb-5" />
            <p className="text-sm text-graphite leading-relaxed">
              As engagements complete and clients consent to sharing their experience, verified
              testimonials will be added here.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const t = TESTIMONIALS[index];

  return (
    <section className="py-section bg-paper border-y border-line">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <SectionHeading eyebrow="Testimonials" title="Client voices." align="center" />

        <div className="mt-14 max-w-3xl mx-auto">
          <div className="bg-canvas border border-line rounded-3xl p-10 lg:p-14 text-center">
            <Quote size={22} className="text-ink/30 mx-auto mb-6" />
            <p className="font-display text-xl lg:text-2xl text-ink leading-snug mb-8">
              "{t.quote}"
            </p>
            <p className="text-sm font-medium text-ink">{t.name}</p>
            <p className="text-xs text-muted mt-1">
              {t.role} · {t.company}
            </p>

            {TESTIMONIALS.length > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                <button
                  onClick={() => setIndex((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:border-ink/40 transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <div className="flex gap-1.5">
                  {TESTIMONIALS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-1 rounded-full transition-all ${
                        i === index ? 'w-6 bg-ink' : 'w-2 bg-line'
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setIndex((index + 1) % TESTIMONIALS.length)}
                  className="w-10 h-10 rounded-full border border-line flex items-center justify-center hover:border-ink/40 transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}