# 🚌 TicketBari | Online Ticket Booking Platform

**TicketBari**is a comprehensive, secure, and fully-optimized MERN-stack Online Ticket Booking Platform. It allows users to effortlessly discover and book various travel tickets (Bus, Train, Launch, Flight) while providing dedicated and secure dashboards for Users, Vendors, and Administrators.

---

## 🚀 Live Links & Credentials

- **Live Site URL:** `[Live link]`
- **Client Repository:** `[https://github.com/Haolader91/ticket-bari-client]`
- **Server Repository:** `[https://github.com/Haolader91/ticket-bari-server]`

### 🔑 Test Accounts

- **Admin:** `[admin@gamil.com]` | Password: `[123456789]`
- **Vendor:** `[ventor@gamil.com]` | Password: `[123456789]`
- **User:** `[user@gmail.com]` | Password: `[123456789]`

---

## 🎯 Purpose of the Project

The core purpose of **TicketBari** is to streamline the traditional, fragmented ticket booking process into a singular, highly efficient platform. By separating roles into Admins, Vendors, and Users, the platform ensures that service providers can easily manage their seat inventories, admins can monitor the platform's security and content, and travelers can securely purchase tickets via modern payment gateways with zero hassle.

---

## Key Features

### User Panel

- **BetterAuth Authentication:** Secure sign-up/login along with a one-click **"Continue with Google"** option.
- **Ticket Booking & Dynamic Countdown:** Seamless booking with real-time countdowns synced to the exact departure time.
- **Stripe Payment Integration:** Secure checkout using Stripe API (automatically calculates `unit price × quantity`).
- **Interactive Dashboard:** Dedicated views for Profile management, Booking History (Pending/Accepted/Paid), and a detailed Transaction History table.

### Vendor Panel

- **Ticket Management:** Vendors can add tickets (with images via ImgBB), update details, or delete tickets (disabled if rejected by admin).
- **Fraud Protection:** Instant booking request handling (Accept/Reject options). Rejecting requests safely restores seats to the master inventory.
- **Revenue Analytics:** Visual charts and graphs mapping out total tickets added, seats sold, and generated revenue.

### Admin Panel

- **Ticket Moderation:** Review queue to Approve or Reject newly added vendor tickets before they go live.
- **User & Role Management:** Toggle user permissions (Make Admin/Vendor) and a critical **"Mark as Fraud"** tool to ban malicious vendors and instantly hide their listings.
- **Homepage Advertisement Controller:** Toggle exactly up to 6 approved featured tickets for the main landing page slider/banner.

### Challenge & Advanced Features Implemented

- **Advanced Search & Filtering:** Filter and search instantly by From-To locations and transport type.
  **Sorting & Pagination:** Sort pricing from Low-to-High / High-to-Low with a clean pagination design (6–9 items per page).
  **Dark / Light Mode:** A fully integrated aesthetic toggle for accessibility and comfort.

---

## 🛠️ Tech Stack & Packages Used

### Frontend (Client)

- **Framework:** Next.js / React.js
- **Styling:** Tailwind CSS, / HeroUI
- **Authentication:** Better-Auth
- **State & Forms:** React Hook Form / Context API
- **Icons & Sliders:** React icons

### Backend (Server)

- **Runtime Environment:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB (Official Node.js Driver)
- **Payment Gateway:** Stripe API
- **Security & Utilities:** JsonWebToken (JWT), dotenv, cors

---
