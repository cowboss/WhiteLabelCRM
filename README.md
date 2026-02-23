# WhiteLabel CRM (Scaffold)

A modern, futuristic, modular CRM scaffold with:
- **Frontend**: React + Vite + TailwindCSS + Recharts + Framer Motion
- **Backend**: Node.js + Express + MongoDB (Mongoose)
- **Security**: JWT auth, role-based middleware, validation hooks, helmet, rate limits

## Project Structure

```txt
/backend   -> Express REST API modules
/frontend  -> React SPA
```

## Core Modules Included

### Phase 1: Core CRM
- Authentication: register, login, logout endpoint, `/auth/me`
- Role-based access via middleware (`admin`, `manager`, `sales`, `viewer`)
- Client management CRUD with contacts, notes, tags, custom fields
- Dashboard metrics endpoint with revenue trend
- Dashboard UI cards and chart

### Phase 2: Quotes
- Quote builder with item images/pricing
- Toggle markup / tax / discount flags and percentage fields
- Live quote URL token endpoint and public frontend view
- PDF generation stub (`/quotes/:id/pdf`)
- Quote acceptance flow converting into Job + Invoice

### Phase 3: Jobs & Invoices
- Jobs API for status, progress, assignments
- Invoices API and PDF export stub (`/invoices/:id/pdf`)

### Phase 4: Email Integration
- Mailbox connection status stub for IMAP/POP3
- Send email stub with attachment-ready payload and templating fields
- Sent email logged into client history model (`EmailLog`)

## Local Development

### 1) Backend

```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.

Set optional frontend environment variable:

```bash
VITE_API_URL=http://localhost:5000/api
```

## Notes
- PDF and email features are **functional stubs** and ready for iterative enhancements.
- Live quote URLs are available from quote records using `liveToken`.
- Backend is HTTPS-ready behind a reverse proxy; add TLS termination at deployment layer.
