import { useState, memo } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import Logo from "../assets/LOGO.PNG";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/industries", label: "Industries" },
  { to: "/hiring", label: "Hiring" },
  { to: "/contact", label: "Contact" },
];

export const SiteHeader = memo(function SiteHeader({
  adminMode,
  adminActions,
} = {}) {
  const [open, setOpen] = useState(false);

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition-colors ${
      isActive
        ? "bg-secondary text-primary"
        : "text-muted-foreground hover:text-foreground"
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-secondary text-primary"
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    }`;

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-lg"
    >
      <div className="mx-auto flex overflow-hidden h-18 max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
        <Link
          to="/"
          className="group flex items-center gap-3"
          aria-label="Guruji Job Consultancy — Home"
          onClick={() => setOpen(false)}
        >
          <div className="flex h-36 w-36  items-center justify-center transition-transform group-hover:scale-105">
            <img
              src={Logo}
              alt="Guruji Job Consultancy"
              className="h-20 w-auto object-contain"
            />
          </div>

          <div className="flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-foreground">
              Guruji Job Consultancy
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}

          <Link
            to="/contact"
            className="ml-3 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-elegant transition-all hover:bg-primary-glow hover:shadow-large"
          >
            Get Started
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        id="mobile-nav"
        className={cn(
          "overflow-hidden border-t border-border/60 bg-background transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-96" : "max-h-0",
        )}
      >
        {adminMode ? (
          <nav
            className="flex flex-col gap-1 px-5 py-4"
            aria-label="Admin mobile navigation"
          >
            <NavLink
              to="/"
              end
              onClick={() => setOpen(false)}
              className={mobileNavLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/admin/hiring-partners"
              onClick={() => setOpen(false)}
              className={mobileNavLinkClass}
            >
              Hiring Partners
            </NavLink>

            <NavLink
              to="/admin/testimonials"
              onClick={() => setOpen(false)}
              className={mobileNavLinkClass}
            >
              Testimonials
            </NavLink>

            <NavLink
              to="/admin/applicants"
              onClick={() => setOpen(false)}
              className={mobileNavLinkClass}
            >
              Applicants
            </NavLink>

            <NavLink
              to="/admin/enquiries"
              onClick={() => setOpen(false)}
              className={mobileNavLinkClass}
            >
              Enquiries
            </NavLink>

            <button
              onClick={() => {
                setOpen(false);
                adminActions?.onAddJob?.();
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Add Job
            </button>

            <button
              onClick={() => {
                setOpen(false);
                adminActions?.onLogout?.();
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold hover:bg-secondary"
            >
              Logout
            </button>
          </nav>
        ) : (
          <nav
            className="flex flex-col gap-1 px-5 py-4"
            aria-label="Mobile navigation"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={mobileNavLinkClass}
              >
                {item.label}
              </NavLink>
            ))}

            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Get Started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
});
