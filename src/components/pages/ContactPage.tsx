import React, { useRef, useState } from 'react';
import { ArrowUpRight, Check } from 'lucide-react';
import { saveLead } from '../../utils/leadsStorage';
import { useScrollFx } from '../../hooks/useScrollFx';
import { MEDIA } from '../../data/media';
import { Img } from '../ui';

interface ContactPageProps {
  /** Preselects the "I'm interested in" field, e.g. when arriving from a project CTA. */
  presetInterest?: string;
}

const INTEREST_OPTIONS = [
  'Buying a MYSA Luxe Villa (ECR)',
  'Scheduling an ECR Site Visit',
  'Upcoming enclaves — early access',
  'Joint Venture / Turnkey Plot Build',
  'Architectural Consultancy',
  'General Inquiry'
];

const TIME_SLOTS = ['11:00 AM — Morning', '2:00 PM — Afternoon', '4:30 PM — Golden Hour'];

const emptyForm = (interest: string) => ({
  name: '',
  phone: '',
  email: '',
  interest,
  preferredDate: '',
  preferredTime: TIME_SLOTS[0],
  chauffeurPickUp: true,
  pickupLocation: '',
  message: ''
});

const Chip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-left text-[13px] transition-colors duration-300 ${
      active ? 'border-ink bg-ink text-paper' : 'border-line-strong text-graphite hover:border-ink hover:text-ink'
    }`}
  >
    {active && <Check className="h-3.5 w-3.5 shrink-0" />}
    {children}
  </button>
);

export const ContactPage: React.FC<ContactPageProps> = ({ presetInterest }) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const interestOptions =
    presetInterest && !INTEREST_OPTIONS.includes(presetInterest) ? [presetInterest, ...INTEREST_OPTIONS] : INTEREST_OPTIONS;

  const [formData, setFormData] = useState(() => emptyForm(presetInterest || INTEREST_OPTIONS[0]));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useScrollFx(pageRef, [isSubmitted]);

  const wantsVisit = formData.interest === 'Scheduling an ECR Site Visit';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setSubmitting(true);
    const notes = [
      formData.message,
      wantsVisit || formData.preferredDate
        ? `Preferred visit: ${formData.preferredDate || 'flexible'} • ${formData.preferredTime}.`
        : '',
      formData.chauffeurPickUp && (wantsVisit || formData.preferredDate)
        ? `Chauffeur pick-up: Yes${formData.pickupLocation ? ` (${formData.pickupLocation})` : ''}.`
        : ''
    ]
      .filter(Boolean)
      .join(' ');

    saveLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@lead.unifra.in`,
      interestedUnit: formData.interest,
      source: 'Contact Page — Unified Inquiry Form',
      notes,
      status: wantsVisit ? 'VIP Visit Scheduled' : 'New Lead'
    });

    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div ref={pageRef} className="bg-paper pb-32 pt-36 text-ink sm:pt-44">
      <header className="shell">
        <p className="meta text-graphite" data-reveal="load">
          Private inquiries, visits & advisory
        </p>
        <h1 className="mt-8 font-display text-display">
          <span className="block" data-split="load">
            Let’s find your
          </span>
          <span className="block serif-italic" data-split="load" data-delay="0.12">
            sanctuary.
          </span>
        </h1>
      </header>

      <div className="shell mt-20 grid gap-16 lg:grid-cols-12 lg:gap-8">
        {/* Details */}
        <aside className="lg:col-span-4">
          <div className="space-y-10 lg:sticky lg:top-32">
            <div className="relative aspect-[4/3] overflow-hidden bg-stone" data-clip="up" data-clip-mode="load">
              <Img media={MEDIA.bedroomGround} alt="Garden suite opening onto the courtyard" sizes="(min-width: 1024px) 30vw, 100vw" className="img-cover" />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1" data-stagger="load">
              <div>
                <p className="meta mb-3 text-ash">Direct line</p>
                <a href="tel:+917358222445" className="u-draw font-display text-3xl tabular-nums">
                  +91 73582 22445
                </a>
              </div>
              <div>
                <p className="meta mb-3 text-ash">Concierge</p>
                <a href="mailto:info@unifra.in" className="u-draw font-display text-3xl">
                  info@unifra.in
                </a>
              </div>
              <div>
                <p className="meta mb-3 text-ash">Corporate office</p>
                <p className="text-[15px] leading-relaxed">
                  4/11, G R Mansion, 2nd Floor, Srinivasa Rd, T. Nagar, Chennai 600017
                  <br />
                  <span className="text-graphite">Mon – Sat · 9:30 AM – 6:30 PM</span>
                </p>
              </div>
              <div>
                <p className="meta mb-3 text-ash">ECR Experience Pavilion</p>
                <p className="text-[15px] leading-relaxed">
                  MYSA Enclave, 122 East Coast Road, Vettuvankeni, Chennai 600115
                  <br />
                  <span className="text-graphite">Daily · 10:00 AM – 6:00 PM, by appointment</span>
                </p>
                <p className="mt-3 text-[14px] text-graphite">Sample villa walkthrough, material library & 3D flythrough.</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="group mt-4 inline-flex items-center gap-2 text-[14px] font-medium">
                  <span className="u-draw">Open in Google Maps</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Form */}
        <section id="inquiry-form" className="lg:col-span-7 lg:col-start-6">
          {isSubmitted ? (
            <div className="border-t border-ink pt-12" data-reveal>
              <img src="/images/unifra-emblem-gold.png" alt="" className="h-16 w-16 object-contain" />
              <h2 className="mt-8 font-display text-headline">
                Thank you, <span className="serif-italic">{formData.name || 'valued client'}.</span>
              </h2>
              <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-graphite">
                Your inquiry regarding <strong className="font-medium text-ink">{formData.interest}</strong> has been received.
                {formData.preferredDate || wantsVisit
                  ? ` We will confirm your visit for ${formData.preferredDate || 'an upcoming day'} at ${formData.preferredTime.split(' — ')[0]} on `
                  : ' Our senior advisory team will call you on '}
                <strong className="font-medium text-ink tabular-nums">{formData.phone}</strong> shortly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(emptyForm(INTEREST_OPTIONS[0]));
                }}
                className="btn btn-line mt-10"
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="border-t border-ink pt-10">
              <p className="text-[15px] text-graphite" data-reveal="load" data-delay="0.3">
                One form for everything. Our senior advisory team responds within two business hours.
              </p>

              <fieldset className="mt-12" data-reveal="load" data-delay="0.4">
                <legend className="text-[13px] font-medium">I’m interested in</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {interestOptions.map((opt) => (
                    <Chip key={opt} active={formData.interest === opt} onClick={() => setFormData({ ...formData, interest: opt })}>
                      {opt}
                    </Chip>
                  ))}
                </div>
              </fieldset>

              <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2" data-stagger>
                <label className="block">
                  <span className="text-[13px] font-medium">Your name *</span>
                  <input
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Anand Kumar"
                    className="field"
                  />
                </label>
                <label className="block">
                  <span className="text-[13px] font-medium">Phone number *</span>
                  <input
                    type="tel"
                    required
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98400 12345"
                    className="field tabular-nums"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[13px] font-medium text-graphite">Email address</span>
                  <input
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="field"
                  />
                </label>
              </div>

              <div className="mt-14 bg-mist p-6 sm:p-10" data-reveal>
                <p className="text-[13px] font-medium">
                  Preferred visit{' '}
                  <span className="font-normal text-graphite">— {wantsVisit ? 'required for site visits' : 'optional'}</span>
                </p>
                <div className="mt-6 grid gap-8 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[13px] text-graphite">Date</span>
                    <input
                      type="date"
                      required={wantsVisit}
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      className="field tabular-nums"
                    />
                  </label>
                  <div>
                    <span className="text-[13px] text-graphite">Time</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TIME_SLOTS.map((t) => (
                        <Chip key={t} active={formData.preferredTime === t} onClick={() => setFormData({ ...formData, preferredTime: t })}>
                          {t.split(' — ')[0]}
                          <span className={formData.preferredTime === t ? 'text-paper/60' : 'text-ash'}>{t.split(' — ')[1]}</span>
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  role="switch"
                  aria-checked={formData.chauffeurPickUp}
                  onClick={() => setFormData({ ...formData, chauffeurPickUp: !formData.chauffeurPickUp })}
                  className="mt-8 flex cursor-pointer items-center gap-4 text-[14px]"
                >
                  <span className={`relative h-6 w-11 rounded-full transition-colors duration-500 ${formData.chauffeurPickUp ? 'bg-ink' : 'bg-line-strong'}`}>
                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-paper transition-transform duration-500 ease-luxe ${
                        formData.chauffeurPickUp ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </span>
                  Arrange complimentary chauffeur pick-up
                </button>

                {formData.chauffeurPickUp && (
                  <label className="mt-6 block">
                    <span className="text-[13px] text-graphite">Pick-up location</span>
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                      placeholder="Residence, hotel, or Chennai International Airport"
                      className="field"
                    />
                  </label>
                )}
              </div>

              <label className="mt-12 block" data-reveal>
                <span className="text-[13px] font-medium">Message</span>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your inquiry, preferred villa size, or timeline…"
                  className="field resize-none"
                />
              </label>

              <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 sm:flex-row sm:items-center" data-reveal>
                <p className="max-w-xs text-[12px] leading-relaxed text-ash">Your details are used only to respond to this inquiry.</p>
                <button type="submit" disabled={submitting} className="btn btn-ink h-16 px-10 disabled:opacity-60">
                  {submitting ? 'Sending…' : 'Submit inquiry'}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
};
