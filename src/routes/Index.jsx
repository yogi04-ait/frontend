import React, { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  ArrowRight,
  Search,
  Users,
  GraduationCap,
  Handshake,
  Building2,
  Stethoscope,
  Shirt,
  Cpu,
  ShoppingBag,
  Truck,
  CheckCircle2,
} from "lucide-react";

import { Layout } from "@/components/Layout";
import { SectionHeader } from "@/components/SectionHeader";

const CtaBanner = lazy(() => import("@/components/CtaBanner"));
const TrustedBy = lazy(() => import("@/components/TrustedBy"));
const TestimonialsSection = lazy(
  () => import("@/components/TestimonialsSection"),
);
const AudienceSplit = lazy(() => import("@/components/AudienceSplit"));

import heroImg from "@/assets/hero.jpg";

const services = [
  {
    icon: Search,
    title: "Job Matching",
    desc: "Personalized roles aligned with your skills, salary expectations and career ambitions.",
  },
  {
    icon: Users,
    title: "Talent Sourcing",
    desc: "Pre-screened, background-verified candidates ready to interview and join your team.",
  },
  {
    icon: GraduationCap,
    title: "Career Guidance",
    desc: "Job guidance and support to help candidates explore suitable career opportunities.",
  },
  {
    icon: Handshake,
    title: "Bulk Hiring",
    desc: "Volume recruitment across warehouses, BPO, retail and manufacturing — with quick turnaround.",
  },
];

const steps = [
  {
    n: "01",
    title: "Register or Connect",
    desc: "Share your profile or hiring requirements — online or with a quick call.",
  },
  {
    n: "02",
    title: "Tell Us Your Goal",
    desc: "We listen carefully — role, industry, location, salary band and timeline expectations.",
  },
  {
    n: "03",
    title: "Get Hiring Support",
    desc: "Receive suitable job opportunities or candidate profiles based on your requirements and experience.",
  },
  {
    n: "04",
    title: "Get Placed or Hire",
    desc: "Onboard the right opportunity or right talent — with continued support after day one.",
  },
];

const industries = [
  { icon: Building2, name: "Manufacturing" },
  { icon: Shirt, name: "Garments & Textile" },
  { icon: Stethoscope, name: "Healthcare" },
  { icon: Cpu, name: "IT & BPO" },
  { icon: ShoppingBag, name: "Retail" },
  { icon: Truck, name: "Logistics" },
];

export default function HomePage() {
  useEffect(() => {
    document.title =
      "Guruji Job Consultancy — Job Consultancy in Gurgaon & Delhi NCR";

    const metaDescription = document.querySelector('meta[name="description"]');

    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Guruji Job Consultancy is a trusted job consultancy in Gurgaon offering placement services in Delhi NCR. We help job seekers find roles and employers hire skilled candidates across India.",
      );
    }
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-soft">
        <div className="absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-primary/15 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-8 lg:py-8">
          <div>
            <h1 className="mt-10 text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
              Get Job Companion for{" "}
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Career Growth
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Guruji Job Consultancy connects talented professionals with the
              right opportunities and helps companies hire skilled candidates —
              with personalized guidance at every step. Trusted placement
              services in Gurgaon, Delhi NCR and across India.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:bg-primary-glow hover:shadow-large"
              >
                Find a Job <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground shadow-sm transition-colors hover:bg-secondary"
              >
                Hire Talent
              </Link>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { v: "1000+", l: "Candidates Placed" },
                { v: "100+", l: "Hiring Partners" },
                { v: "15 Days", l: "Avg. Placement" },
              ].map((s) => (
                <div key={s.l}>
                  <dt className="text-2xl font-bold text-foreground sm:text-3xl">
                    {s.v}
                  </dt>

                  <dd className="mt-1 text-xs text-muted-foreground sm:text-sm">
                    {s.l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-3xl bg-gradient-hero opacity-20 blur-2xl" />

            <div className="relative -mt-5 overflow-hidden rounded-3xl border border-border bg-card shadow-large">
              <img
                src={heroImg}
                alt="Professionals collaborating in a modern office in Gurgaon"
                width={1536}
                height={1024}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-card p-4 shadow-large sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-soft">
                  <CheckCircle2 className="h-5 w-5 text-accent" />
                </div>

                <div>
                  <p className="text-sm font-semibold">Verified Employers</p>

                  <p className="text-xs text-muted-foreground">
                    Trusted hiring network
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Suspense fallback={<div className="py-14 lg:py-16" aria-hidden />}>
        <TrustedBy />
      </Suspense>

      <Suspense fallback={<div className="py-20 lg:py-24" aria-hidden />}>
        <AudienceSplit />
      </Suspense>

      {/* SERVICES */}
      <section className="bg-surface py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeader
            eyebrow="What We Do"
            title="Hiring solutions, end to end"
            description="From first job to senior leadership, from individual hires to bulk recruitment — we make the process simpler, faster, and more human across Delhi NCR and India."
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-elegant"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                  <s.icon className="h-6 w-6" />
                </div>

                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Keep remaining sections EXACTLY SAME */}
      {/* No UI changes needed below */}

      <Suspense fallback={<div className="py-20 lg:py-24" aria-hidden />}>
        <TestimonialsSection />
      </Suspense>

      <Suspense fallback={<div className="py-16 lg:py-24" aria-hidden />}>
        <CtaBanner />
      </Suspense>
    </Layout>
  );
}
