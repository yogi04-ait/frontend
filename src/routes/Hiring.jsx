import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Briefcase,
  MapPin,
  Users,
  Clock,
  ExternalLink,
  Building2,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageHero } from "@/components/PageHero";
import { api } from "@/lib/api";

function HiringPage() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [meta, setMeta] = useState({
    page: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

  useEffect(() => {
    let cancelled = false;

    setLoading(true);

    api.companies
      .list(page, limit)
      .then((res) => {
        if (cancelled) return;

        const items = res?.items || [];

        const activeCompanies = items.filter((c) => c.status === "active");
        setCompanies(activeCompanies);
        setMeta(
          res?.meta || {
            page,
            totalPages: 1,
            total: activeCompanies.length,
            limit,
          },
        );
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, limit]);

  return (
    <Layout>
      <PageHero
        eyebrow="Live Openings"
        title="Currently hiring companies"
        description="Real-time openings from companies hiring through Guruji Job Consultancy. Apply directly or reach out to our team for guidance."
      />
      <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-20">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading openings…</p>
        ) : companies.length === 0 ? (
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center">
            <Briefcase className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">
              No active openings right now
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Please check back soon or contact our team to register your
              profile.
            </p>
          </div>
        ) : (
          <div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {companies.map((c) => (
                <article
                  key={c.id}
                  className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  <div className="flex items-start gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-bold">{c.name}</h3>
                      {c.industry && (
                        <p className="text-xs text-muted-foreground">
                          {c.industry}
                        </p>
                      )}
                    </div>
                  </div>

                  {c.role && (
                    <p className="mt-4 text-sm font-semibold text-primary">
                      {c.role}
                    </p>
                  )}

                  <ul className="mt-4 space-y-2 text-sm text-foreground">
                    {c.location && (
                      <li className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-accent" /> {c.location}
                      </li>
                    )}
                    {c.experience && (
                      <li className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-accent" /> {c.experience}
                      </li>
                    )}
                    {c.openings != null && (
                      <li className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-accent" /> {c.openings}{" "}
                        opening
                        {c.openings === 1 ? "" : "s"}
                      </li>
                    )}
                  </ul>

                  <div className="mt-6 flex-1" />
                  <Link
                    to={`/jobs/${c.id}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:bg-primary-glow"
                  >
                    Apply Now <ExternalLink className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {meta.page} of {meta.totalPages} — {meta.total} openings
              </div>
              <div className="inline-flex items-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page <= 1}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm font-semibold hover:bg-secondary disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(meta.totalPages || 1, p + 1))
                  }
                  disabled={page >= (meta.totalPages || 1)}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm font-semibold hover:bg-secondary disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default HiringPage;
