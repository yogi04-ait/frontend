import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { api } from "@/lib/api";

export default function AdminSignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const check = async () => {
      try {
        await api.auth.me();
        navigate("/admin");
      } catch (err) {
        // user not authenticated
      }
    };

    check();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);

    try {
      await api.auth.signup({
        email,
        password,
      });

      // verify login session
      await api.auth.me();

      navigate("/admin");
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-16">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight">
              Create Admin Account
            </h1>

            <p className="mt-2 text-sm text-muted-foreground">
              Create your administrator account to manage the platform.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Email */}
            <div>
              <label className="text-sm font-medium">Email Address</label>

              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium">Password</label>

              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium">Confirm Password</label>

              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-elegant transition hover:bg-primary-glow disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Admin Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 space-y-3 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/admin/login"
                className="font-medium text-primary hover:underline"
              >
                Sign in
              </Link>
            </p>

            <Link
              to="/"
              className="block text-xs text-muted-foreground hover:text-primary"
            >
              ← Back to website
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
