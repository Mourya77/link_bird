# Linkbird.ai - Internship Assignment Replica

This is a fully functional replica of the Leads and Campaigns sections of the Linkbird.ai platform, built as part of an internship selection process.

---

### **Live Demo & Video Walkthrough**

* **Live Application (Vercel):** [Your Vercel Link Here]
* **Video Demo (2 mins):** [Link to your uploaded video on Google Drive/Loom]

---

### **Tech Stack**

* **Framework:** Next.js 15+ (App Router)
* **Styling:** Tailwind CSS with shadcn/ui
* **Database:** Vercel Postgres
* **ORM:** Drizzle ORM
* **Authentication:** NextAuth.js
* **Data Fetching:** TanStack Query (React Query)
* **State Management:** Zustand

---

### **Features Implemented**

* Google OAuth Authentication & Session Management
* Responsive Sidebar Navigation
* Infinitely Scrollable Leads Table with Loading Skeletons
* Detailed Lead Profile Side Sheet with Data Fetching
* Campaigns List Page with Lead Counts
* Tabbed Campaign Details Page (Overview, Leads, Sequence, Settings)

---

### **How to Run Locally**

1.  Clone the repository.
2.  Install dependencies with `npm install`.
3.  Set up a Vercel Postgres database and a Google OAuth Client.
4.  Create a `.env.local` file and add the required environment variables:
    ```env
    AUTH_SECRET=
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    POSTGRES_URL=
    ```
5.  Push the database schema with `npx drizzle-kit push`.
6.  Run the database seed script: `npm run db:seed`.
7.  Start the development server: `npm run dev`.
