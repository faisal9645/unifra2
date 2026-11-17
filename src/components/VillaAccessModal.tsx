import React, { useEffect, useRef, useState } from 'react';
import { X, ArrowUpRight, Check } from 'lucide-react';
import { ProjectItem } from '../types';
import { saveLead } from '../utils/leadsStorage';
import { validateVillaAccessInput } from '../utils/portfolioUtils';
import { gsap, useGSAP, prefersReducedMotion } from '../lib/gsap';
import { useLenis } from './SmoothScroll';
import { MEDIA } from '../data/media';
import { Img } from './ui';

export interface ClientDetails {
  name: string;
  phone: string;
  email: string;
  city: string;
  timeline: string;
  interestedUnit?: string;
  notes?: string;
}

interface VillaAccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  project?: ProjectItem | null;
  onSuccess: (clientDetails: ClientDetails) => void;
  source?: string;
}

const CITIES = [
  ['Chennai', 'Chennai (local resident)'],
  ['Bengaluru', 'Bengaluru / Karnataka'],
  ['Mumbai', 'Mumbai / Maharashtra'],
  ['Hyderabad', 'Hyderabad / Telangana'],
  ['Delhi-NCR', 'Delhi / NCR'],
  ['NRI - UAE/Gulf', 'NRI — UAE / Middle East'],
  ['NRI - USA/Canada', 'NRI — USA / Canada'],
  ['NRI - Singapore/UK', 'NRI — Singapore / UK / Europe'],
  ['Other', 'Other city / overseas']
];

const TIMELINES = ['Immediate (0 – 30 Days)', '1 – 3 Months', '3 – 6 Months', 'Exploring Options'];

export const VillaAccessModal: React.FC<VillaAccessModalProps> = ({
  isOpen,
  onClose,
  project,
  onSuccess,
  source = 'Villa Showcase Gate'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { setLocked } = useLenis();
  const [formData, setFormData] = useState<ClientDetails>({
    name: '',
    phone: '',
    email: '',
    city: 'Chennai',
    timeline: 'Immediate (0 – 30 Days)',
    interestedUnit: 'MYSA Luxe 4BHK Villa with Private Pool',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGranted, setIsGranted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!isOpen) return;
    setIsGranted(false);
    setIsSubmitting(false);
    setErrorMessage('');
    const savedName = sessionStorage.getItem('unifra_client_name') || '';
    const savedPhone = sessionStorage.getItem('unifra_client_phone') || '';
    const savedEmail = sessionStorage.getItem('unifra_client_email') || '';
    if (savedName || savedPhone || savedEmail) {
      setFormData((prev) => ({
        ...prev,
        name: savedName || prev.name,
        phone: savedPhone || prev.phone,
        email: savedEmail || prev.email
      }));
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setLocked(true);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      setLocked(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose, setLocked]);

  useGSAP(
    () => {
      if (!isOpen || !rootRef.current || prefersReducedMotion()) return;
      gsap
        .timeline()
        .from(rootRef.current, { autoAlpha: 0, duration: 0.4 })
        .fromTo('[data-gate-media]', { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.3, ease: 'expo.inOut' }, 0)
        .from('[data-gate-media] img', { scale: 1.3, duration: 1.8, ease: 'expo.out' }, 0.2)
        .from('[data-gate-item]', { y: 28, autoAlpha: 0, stagger: 0.05, duration: 1, ease: 'expo.out' }, 0.4);
    },
    { dependencies: [isOpen], scope: rootRef }
  );

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validateVillaAccessInput(formData.phone, formData.email);
    if (!validation.valid) {
      setErrorMessage(validation.error || 'Please provide valid contact details.');
      return;
    }

    const clientName = formData.name.trim() || 'Valued Guest';
    setIsSubmitting(true);

    try {
      saveLead({
        name: clientName,
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        city: formData.city || 'Chennai',
        timeline: formData.timeline || 'Immediate (0 – 30 Days)',
        interestedUnit: formData.interestedUnit || (project ? project.name : 'MYSA Luxe Villas'),
        source: source || 'Menu - Mysa Villa Showcase',
        notes: formData.notes
      });
    } catch {
      // storage unavailable — continue
    }

    // Loaded only on success, keeping it out of the initial bundle
    import('canvas-confetti')
      .then(({ default: confetti }) =>
        confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ['#dfb776', '#a9814a', '#ffffff', '#0f0f0e'] })
      )
      .catch(() => {});

    setIsGranted(true);
    setIsSubmitting(false);
    setTimeout(() => onSuccess({ ...formData, name: clientName }), 1100);
  };

  const projectName = project ? project.name : 'MYSA Luxe Villas';
  const projectLocation = project ? project.location : 'Vettuvankeni, ECR Chennai';

  return (
    <div ref={rootRef} className="fixed inset-0 z-[130] bg-paper text-ink" role="dialog" aria-modal="true" aria-label={`Unlock ${projectName}`}>
      <div className="grid h-full lg:grid-cols-2">
        <div data-gate-media className="relative hidden overflow-hidden bg-ink lg:block">
          <Img media={MEDIA.entranceNight} alt="The illuminated MYSA lotus gate at night" sizes="50vw" className="img-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-12 text-paper">
            <p className="meta text-paper/70">{projectLocation}</p>
            <p className="mt-4 max-w-md font-display text-5xl leading-[1]">
              A private dossier, <span className="serif-italic">opened for you.</span>
            </p>
          </div>
        </div>

        <div className="flex h-full flex-col overflow-y-auto" data-lenis-prevent>
          <div className="flex items-center justify-between px-6 py-5 sm:px-12">
            <img src="/images/unifra-wordmark-gold.png" alt="Unifra" width={365} height={132} className="h-9 w-auto" />
            <button
              type="button"
              onClick={onClose}
              className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-ink hover:text-paper"
              aria-label="Close"
            >
              <X className="h-4 w-4 transition-transform duration-500 group-hover:rotate-90" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center px-6 pb-12 sm:px-12 lg:px-16">
            {isGranted ? (
              <div className="py-16 text-center">
                <img src="/images/unifra-emblem-gold.png" alt="" className="mx-auto h-20 w-20 object-contain" />
                <p className="meta mt-8 text-bronze-ink">Access granted</p>
                <h3 className="mt-4 font-display text-5xl leading-none">Welcome to {projectName}</h3>
                <p className="mx-auto mt-5 max-w-sm text-[15px] text-graphite">Opening floor plans, the complete photography archive and live construction status…</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mx-auto w-full max-w-xl" noValidate>
                <p data-gate-item className="meta text-bronze-ink">
                  Exclusive villa showcase
                </p>
                <h3 data-gate-item className="mt-4 font-display text-[clamp(2.6rem,4.2vw,4rem)] leading-[0.95]">
                  Unlock {projectName}
                </h3>
                <p data-gate-item className="mt-5 text-[15px] leading-relaxed text-graphite">
                  Share your phone and email for instant access to floor plans, high-resolution galleries, unit availability and pricing schedules.
                </p>

                <div data-gate-item className="mt-8 grid grid-cols-3 border-y border-line text-center">
                  {[
                    ['Floor plans', 'G + 2 layouts'],
                    ['Pricing', 'On request'],
                    ['Progress', 'Live on-site']
                  ].map(([k, v], i) => (
                    <div key={k} className={`py-4 ${i < 2 ? 'border-r border-line' : ''}`}>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-ash">{k}</p>
                      <p className="mt-1 text-[14px] font-medium">{v}</p>
                    </div>
                  ))}
                </div>

                {errorMessage && (
                  <p className="mt-6 border-l-2 border-red-600 bg-red-50 px-4 py-3 text-[13px] text-red-700" role="alert">
                    {errorMessage}
                  </p>
                )}

                <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                  <label data-gate-item className="block">
                    <span className="text-[12px] font-medium">Phone number *</span>
                    <input
                      type="tel"
                      required
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="field tabular-nums"
                    />
                  </label>
                  <label data-gate-item className="block">
                    <span className="text-[12px] font-medium">Email address *</span>
                    <input
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="name@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field"
                    />
                  </label>
                  <label data-gate-item className="block">
                    <span className="text-[12px] font-medium text-graphite">Full name</span>
                    <input
                      type="text"
                      autoComplete="name"
                      placeholder="Optional"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field"
                    />
                  </label>
                  <label data-gate-item className="block">
                    <span className="text-[12px] font-medium text-graphite">Current city</span>
                    <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className="field">
                      {CITIES.map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <fieldset data-gate-item className="mt-8">
                  <legend className="text-[12px] font-medium text-graphite">Purchase timeline</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {TIMELINES.map((option) => {
                      const active = formData.timeline === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setFormData({ ...formData, timeline: option })}
                          aria-pressed={active}
                          className={`flex h-10 cursor-pointer items-center gap-2 rounded-full border px-4 text-[13px] transition-colors duration-300 ${
                            active ? 'border-ink bg-ink text-paper' : 'border-line-strong text-graphite hover:border-ink hover:text-ink'
                          }`}
                        >
                          {active && <Check className="h-3.5 w-3.5" />}
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </fieldset>

                <div data-gate-item className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p className="max-w-[16rem] text-[12px] leading-relaxed text-ash">
                    Your details stay strictly confidential with Unifra Private Client Advisory.
                  </p>
                  <button type="submit" disabled={isSubmitting} className="btn btn-ink disabled:opacity-60">
                    {isSubmitting ? 'Verifying…' : 'Unlock the showcase'}
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
