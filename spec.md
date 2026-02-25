# Specification

## Summary
**Goal:** Build a cinematic videography service website for "Himachali Editor" with pricing display, Internet Identity authentication, online booking, and a customer dashboard.

**Planned changes:**
- Apply a dark cinematic theme (deep blacks, warm golds, earthy tones, bold typography) consistently across all pages
- Create a landing page with a full-width hero section (brand name, tagline), brief about section, and navigation to Pricing and Booking
- Display a "One-Time Services" section with four service cards: Normal Video Editing + Shoot (₹4,000), High Video Editing + Shoot (₹5,000), Car Delivery Shoot (₹2,500), Bike Delivery Shoot (₹2,000), each with a "Book Now" button
- Display a "Monthly Packages" section with three package cards: Basic (₹12,000), Premium (₹15,000), Pro (₹18,000) with details and Subscribe buttons; Pro package visually highlighted
- Implement Internet Identity login/logout in the navigation header; show customer ID/name when logged in
- Backend Motoko actor with customer profile storage (principal, display name, email, timestamp) and auto-creation on first login
- Backend booking data model (booking ID, principal, service name, date, status, timestamp) with createBooking and getMyBookings functions
- Booking modal that opens when clicking "Book Now" or "Subscribe", pre-filled with service name, collects preferred date and optional notes, submits to backend; prompts unauthenticated users to log in
- Customer dashboard (authenticated only) listing all bookings with service name, date, and status; shows empty state when no bookings exist

**User-visible outcome:** Visitors can browse Himachali Editor's videography services and pricing, log in with Internet Identity, book services online, and view their booking history in a personal dashboard.
