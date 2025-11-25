
  # Appointment Booking App

  HealthBook is a Vite + React implementation of the Appointment Booking App Figma concept (https://www.figma.com/design/MpIDdglof0bGxqUMgIa4ch/Appointment-Booking-App). It provides a patient-facing booking flow, self-service appointment management, and a staff dashboard powered by mock data with hooks ready for Supabase integration.

  ## About the app

  - Patients can book visits, review confirmations, and manage upcoming appointments with responsive, mobile-friendly screens.
  - Staff members access dashboards, appointment lists, patient records, and configuration pages from a separate login area.
  - Shared UI primitives (Radix UI + Tailwind) keep visuals consistent with the original design file while remaining easy to extend.

  ## Tech stack

  - React 18 + TypeScript (bootstrapped with Vite)
  - Tailwind CSS utility classes for styling
  - Radix UI + shadcn-inspired primitives for accessible components
  - Supabase client helpers (placeholder hooks for backend integration)

  ## Setup

  1. **Install prerequisites**: Node.js 18+ and npm 9+.
  2. **Install dependencies**: `npm install`
  3. (Optional) **Configure env vars**: add Supabase keys or API endpoints as you wire up real data sources.

  ## Development workflow

  - Start the dev server: `npm run dev` (launches Vite with hot module reloading).
  - Build for production: `npm run build` (outputs static assets in `dist/`).
  - Lint/format: rely on your editor or add tooling (ESLint/Prettier) as needed.

  ## Usage instructions

  - Visit `/` for the marketing landing page and patient actions.
  - `/book` walks through the appointment request flow and persists data to `localStorage`.
  - `/my-appointments` lets patients search, review, or cancel visits using their email/phone.
  - `/booking-success` shows confirmation details after a successful request.
  - `/staff/login` authenticates demo staff users and routes them into `/staff/dashboard`, `/staff/appointments`, `/staff/patients`, and `/staff/settings`.

  Extend the mock data sources or connect Supabase to replace the temporary `localStorage` persistence when you are ready for production.
  