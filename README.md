# NovaCore - Compliance Oversight & Performance Tracking

A comprehensive Next.js web application for compliance oversight and performance tracking, built for a central regulatory body that oversees multiple reporting entities in the power/energy sector.

## 🎯 Key Objectives

- Provide clear, visual representations of structured data: charts, graphs, tables, trend lines, etc.
- Centralize critical compliance data into one interface
- Enable executives to monitor KPIs, budgets, licenses, and performance
- Support filtering, sorting, search, alerts, and summaries

## 🧱 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Charts**: Recharts
- **Authentication**: NextAuth.js with Role-Based Access Control
- **Database**: PostgreSQL with Prisma ORM
- **UI Components**: Custom components with Lucide React icons
- **Deployment**: Vercel (MVP), scalable to Docker/GCP/AWS later

## 🧩 Core Modules

The system includes 13 core views:

1. **Project Status Tracker** – Progress bars, phases, risk levels, filters
2. **CAPEX vs. Budget Tracker** – Budget vs. actual spend, variance alerts
3. **Contractor Performance Metrics** – KPIs like timeliness, safety, quality
4. **Energy Output Viewer** – Daily/monthly MW output per plant
5. **Plant Availability** – Uptime vs. outage, donut charts, maintenance
6. **Load Dispatch Compliance** – Compliance rate vs. dispatch logs
7. **Outage History** – Cause, resolution time, recurring issue trends
8. **Maintenance Schedule Tracker** – Gantt/calendar view
9. **License Status** – Expiry dates, flags, search
10. **Regulatory Filings** – Submission types, status, file download
11. **HSE Compliance** – Safety/environmental incidents, non-compliance
12. **Executive Summary (C-Level)** – Key insights, risk score, output
13. **Offtaker Performance** – Power accepted vs. rejected, revenue recovery

## 🔐 User Roles

- **Admin / Regulator** - Full access to all modules
- **Contractor** - Limited access to project status and performance metrics
- **Plant Operator** - Access to plant-specific data and maintenance
- **Executive (C-Level)** - High-level dashboards and summaries

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd novacore
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/novacore"
   
   # NextAuth
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Optional: Cloudinary for file uploads
   # CLOUDINARY_CLOUD_NAME=""
   # CLOUDINARY_API_KEY=""
   # CLOUDINARY_API_SECRET=""
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Optional: Open Prisma Studio
   npm run db:studio
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: admin@novacore.com
- **Password**: password123

## 📁 Project Structure

```
novacore/
├── src/
│   ├── app/
│   │   ├── api/auth/[...nextauth]/  # NextAuth API routes
│   │   ├── auth/signin/             # Authentication pages
│   │   ├── dashboard/               # Dashboard pages
│   │   │   ├── projects/           # Project status tracker
│   │   │   ├── budget/             # CAPEX vs budget tracker
│   │   │   └── layout.tsx          # Dashboard layout
│   │   ├── globals.css             # Global styles
│   │   ├── layout.tsx              # Root layout
│   │   └── page.tsx                # Landing page
│   ├── components/
│   │   ├── dashboard/              # Dashboard components
│   │   │   ├── dashboard-nav.tsx   # Navigation sidebar
│   │   │   ├── dashboard-header.tsx # Dashboard header
│   │   │   ├── executive-summary.tsx # Executive summary
│   │   │   ├── project-status-tracker.tsx # Project tracker
│   │   │   └── budget-tracker.tsx  # Budget tracker
│   │   ├── providers/              # Context providers
│   │   │   └── auth-provider.tsx   # Authentication provider
│   │   └── ui/                     # Reusable UI components
│   │       └── card.tsx            # Card component
│   └── lib/
│       ├── auth.ts                 # NextAuth configuration
│       ├── prisma.ts               # Prisma client
│       └── utils.ts                # Utility functions
├── prisma/
│   └── schema.prisma               # Database schema
├── public/                         # Static assets
├── middleware.ts                   # Route protection
└── package.json                    # Dependencies
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following key models:

- **User** - Authentication and role management
- **Project** - Project information and status
- **Contractor** - Contractor performance metrics
- **Plant** - Power plant data and availability
- **Budget** - Budget tracking and variance analysis
- **Outage** - Plant outage history and analysis
- **Maintenance** - Maintenance schedules and tracking
- **License** - License status and expiry tracking
- **RegulatoryFiling** - Regulatory compliance filings
- **HSEIncident** - Health, Safety, and Environmental incidents

## 🎨 Features

### MVP Features (Phase 1)
- ✅ User authentication with NextAuth.js
- ✅ Role-based access control
- ✅ Executive Summary dashboard
- ✅ Project Status Tracker
- ✅ CAPEX vs Budget Tracker
- ✅ Responsive design
- ✅ Interactive charts and visualizations

### Planned Features (Future Phases)
- [ ] Real-time data integration
- [ ] File upload and management
- [ ] Advanced filtering and search
- [ ] Email notifications and alerts
- [ ] Mobile app
- [ ] API for external integrations
- [ ] Advanced reporting and exports

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema to database
- `npm run db:studio` - Open Prisma Studio

### Adding New Modules

1. Create a new page in `src/app/dashboard/`
2. Add navigation item in `src/components/dashboard/dashboard-nav.tsx`
3. Create corresponding component in `src/components/dashboard/`
4. Update role permissions as needed

## 🚀 Deployment

### Vercel (Recommended for MVP)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker Deployment

```bash
# Build Docker image
docker build -t novacore .

# Run container
docker run -p 3000:3000 novacore
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**NovaCore** - Empowering regulatory oversight through intelligent compliance tracking.
