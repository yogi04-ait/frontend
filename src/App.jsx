import React from "react";
import { Routes, Route } from "react-router-dom";

import RootLayout, { NotFoundComponent } from "@/routes/__root";

import HomePage from "@/routes/Index";

import AboutPage from "@/routes/About";
import ContactPage from "@/routes/Contact";
import ServicesPage from "@/routes/Services";
import IndustriesPage from "@/routes/Industries";
import HiringPage from "@/routes/Hiring";
import WhatsAppButton from "./components/ui/whatsAppButton";

import AdminLoginPage from "@/routes/Admin.login";
import AdminDashboardPage from "@/routes/Admin.index";
import AdminTestimonialsPage from "@/routes/Admin.testimonials";
import AdminHiringPartnersPage from "@/routes/Admin.hiring-partners";
import AdminEnquiriesPage from "@/routes/Admin.enquiries";
import AdminApplicantsPage from "@/routes/Admin.applicants";
import AdminSignupPage from "@/routes/Admin.signup";

import ApplicantDetailsPage from "@/routes/Admin.applicant.$applicantId";

import JobDetailsPage from "@/routes/Jobs.$jobId";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />

          <Route path="/about" element={<AboutPage />} />

          <Route path="/contact" element={<ContactPage />} />

          <Route path="/services" element={<ServicesPage />} />

          <Route path="/industries" element={<IndustriesPage />} />

          <Route path="/hiring" element={<HiringPage />} />

          <Route path="/jobs/:jobId" element={<JobDetailsPage />} />

          <Route path="/admin" element={<AdminDashboardPage />} />

          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/signup" element={<AdminSignupPage />} />

          <Route
            path="/admin/testimonials"
            element={<AdminTestimonialsPage />}
          />

          <Route
            path="/admin/hiring-partners"
            element={<AdminHiringPartnersPage />}
          />

          <Route path="/admin/enquiries" element={<AdminEnquiriesPage />} />

          <Route path="/admin/applicants" element={<AdminApplicantsPage />} />

          <Route
            path="/admin/applicant/:applicantId"
            element={<ApplicantDetailsPage />}
          />

          <Route path="*" element={<NotFoundComponent />} />
        </Route>
      </Routes>
      <WhatsAppButton />
    </>
  );
}
