# CyberQuest

A production-ready cybersecurity learning platform with gamified labs, CTF challenges, and structured learning paths.

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        CDN (CloudFront)                       │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────────┐
│                    Nginx Reverse Proxy                        │
│              (Rate Limiting, SSL, Security Headers)           │
└────────────┬────────────┼────────────────┬──────────────────┘
             │            │                │
┌────────────┴───┐  ┌─────┴──────┐  ┌─────┴──────────┐
│    Frontend    │  │   Backend   │  │   WebSocket    │
│   (Next.js)   │  │  (NestJS)   │  │    Server      │
│   Port 3000   │  │  Port 4000  │  │   (Socket.io)  │
└────────────────┘  └──────┬──────┘  └────────────────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
       ┌──────┴──┐  ┌─────┴──┐  ┌─────┴──────┐
       │PostgreSQL│  │  Redis  │  │    S3      │
       │   DB    │  │  Cache  │  │  Storage   │
       └─────────┘  └────────┘  └────────────┘
```

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Utility-first styling
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animations
- **next-themes** - Dark/light mode

### Backend
- **NestJS** - Enterprise Node.js framework
- **TypeORM** - Database ORM
- **PostgreSQL** - Primary database
- **Redis** - Caching and sessions
- **Socket.io** - Real-time communication
- **Passport.js** - Authentication
- **Swagger** - API documentation

### Infrastructure
- **Docker** - Containerization
- **Kubernetes** - Orchestration
- **Terraform** - Infrastructure as Code
- **Nginx** - Reverse proxy
- **GitHub Actions** - CI/CD

## Getting Started

### Prerequisites
- Node.js 22+
- Docker & Docker Compose
- PostgreSQL 16
- Redis 7

### Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/johns817/cyber11.git
cd cyber11

# Start all services
docker-compose up -d

# Access the platform
# Frontend: http://localhost:3000
# API: http://localhost:4000/api/docs
# Nginx: http://localhost:80
```

### Local Development

```bash
# Install dependencies
npm install

# Start frontend
cd frontend && npm run dev

# Start backend (in separate terminal)
cd backend && npm run start:dev
```

### Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Backend
NODE_ENV=development
PORT=4000
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=cyberquest
DB_PASSWORD=cyberquest
DB_NAME=cyberquest
JWT_SECRET=your-secret-key
REDIS_HOST=localhost
REDIS_PORT=6379

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

## Project Structure

```
cyber11/
├── frontend/               # Next.js frontend application
│   ├── src/
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   │   ├── ui/         # Base UI components (ShadCN-style)
│   │   │   ├── layout/     # Layout components
│   │   │   └── features/   # Feature-specific components
│   │   ├── lib/            # Utility functions
│   │   ├── hooks/          # Custom React hooks
│   │   └── types/          # TypeScript types
│   └── public/             # Static assets
├── backend/                # NestJS backend application
│   └── src/
│       ├── auth/           # Authentication module
│       ├── users/          # Users module
│       ├── labs/           # Labs module
│       ├── challenges/     # Challenges module
│       ├── gamification/   # Gamification engine
│       ├── teams/          # Teams module
│       ├── notifications/  # Real-time notifications
│       ├── common/         # Shared utilities
│       └── database/       # Entities and migrations
├── infrastructure/         # Infrastructure configuration
│   ├── nginx/              # Nginx configuration
│   ├── db/                 # Database initialization
│   ├── k8s/               # Kubernetes manifests
│   └── terraform/          # Terraform IaC
├── docs/                   # Documentation
├── docker-compose.yml      # Docker Compose orchestration
└── .github/workflows/      # CI/CD pipelines
```

## Features

- **Authentication** - JWT, OAuth (Google/GitHub/Microsoft), MFA
- **Gamification** - XP, levels, leaderboards, achievements, streaks
- **Labs** - Linux/Windows/Cloud virtual machines with VPN access
- **Challenges** - CTF-style flag capture across multiple categories
- **Learning Paths** - 17+ structured tracks from beginner to expert
- **Teams** - Create teams, compete, collaborate
- **Community** - Forums, discussions, writeups
- **Subscriptions** - Free, Premium, Enterprise tiers
- **Admin Dashboard** - Full platform management
- **Real-time** - WebSocket notifications, live leaderboards

## API Documentation

When running locally, visit `http://localhost:4000/api/docs` for the Swagger UI.

## Deployment

### Docker
```bash
docker-compose -f docker-compose.yml up -d
```

### Kubernetes
```bash
kubectl apply -f infrastructure/k8s/
```

### Terraform
```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

## Security

- OWASP best practices implemented
- RBAC permission system
- Rate limiting on all endpoints
- CSRF/XSS protection
- SQL injection prevention
- Secure headers (HSTS, CSP, etc.)
- Audit logging
- Encryption at rest

## License

MIT
