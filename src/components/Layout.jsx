import React from "react";
import { Toaster } from "sonner";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function Layout({ children, adminMode = false, adminActions = null }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Sonner Toast Renderer */}
      <Toaster position="top-right" richColors closeButton />

      <SiteHeader adminMode={adminMode} adminActions={adminActions} />

      <main id="main-content" className="flex-1" role="main">
        {children}
      </main>

      <SiteFooter />
    </div>
  );
}
