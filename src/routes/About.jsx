import React, { lazy, Suspense, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Network,
  Compass,
  Zap,
  LifeBuoy,
  Award,
  Heart,
  Eye,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
const CtaBanner = lazy(() => import("@/components/CtaBanner"));
const TrustedBy = lazy(() => import("@/components/TrustedBy"));

const reasons = [
  {
    icon: Network,
    title: "Strong Industry Network",
    desc: "100+ verified hiring partners across Delhi NCR, Mumbai, Bengaluru and tier-2 cities.",
  },
  {
    icon: Compass,
    title: "Personalized Guidance",
    desc: "Helping candidates connect with relevant job opportunities based on their skills and experience.",
  },
  {
    icon: Zap,
    title: "Quick Hiring Process",
    desc: "Most placements complete in 15 working days, with structured timelines and updates.",
  },
  {
    icon: LifeBuoy,
    title: "End-to-End Support",
    desc: "From first call to onboarding and the first 30 days — we stay with you throughout.",
  },
  {
    icon: Award,
    title: "Quality Over Quantity",
    desc: "Every candidate we recommend is carefully vetted and interview-ready.",
  },
  {
    icon: Heart,
    title: "Built on Relationships",
    desc: "Many of our clients and candidates come back — and refer others. That trust is everything.",
  },
];

const values = [
  {
    title: "Transparency",
    desc: "Clear updates, honest feedback, and zero hidden charges for job seekers.",
  },
  {
    title: "Speed",
    desc: "Faster shortlisting and interview cycles — without compromising on quality.",
  },
  {
    title: "Empathy",
    desc: "We treat every candidate's career and every employer's hire with genuine care.",
  },
];

export default function AboutPage() {
  return (
    <Layout>
      <PageHero
        eyebrow="About Us"
        title="The right job can change lives."
        description="At Guruji Job Consultancy, we help job seekers find opportunities that match their skills and ambitions, and we help companies hire the best talent — efficiently, transparently and reliably."
      />

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Mission */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Target className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Mission</h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Our mission is to bridge ambition with opportunity. For job
              seekers, we provide guidance, skill alignment, and honest support
              at every step — from resume to retirement. For employers, we
              deliver not just candidates, but committed companions who fit the
              role, the team, and the vision. We simplify hiring, humanize
              careers, and ensure no one walks their professional journey alone.
            </p>
          </div>

          {/* Vision */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-md lg:p-10">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Eye className="h-6 w-6" />
            </div>

            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Vision</h2>

            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              To be the trusted companion for both talent and teams. We walk
              with job seekers from confusion to career, and stand with
              employers from vacancy to victory. At Guruji, we don't just match
              resumes to roles — we build relationships that help people grow
              and companies thrive. Because every great journey needs a
              companion.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
              Why Choose Us
            </span>
            <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
              Built on trust, focused on growth
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Six reasons job seekers and employers across Delhi NCR choose
              Guruji as their long-term hiring partner.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                  <r.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
            Our Values
          </span>
          <h2 className="mt-4 text-3xl font-bold sm:text-4xl">
            What we stand for
          </h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl border border-border bg-card p-7 text-center shadow-sm"
            >
              <h3 className="text-xl font-bold text-primary">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Suspense fallback={<div className="py-14 lg:py-16" aria-hidden />}>
        <TrustedBy />
      </Suspense>

      <Suspense fallback={<div className="py-16 lg:py-24" aria-hidden />}>
        <CtaBanner />
      </Suspense>
    </Layout>
  );
}
