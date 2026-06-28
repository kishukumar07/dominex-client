# Dominex

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org/)
[![Zustand](https://img.shields.io/badge/Zustand-state_management-9cf?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Socket.io](https://img.shields.io/badge/Socket.io-realtime-010101?style=for-the-badge&logo=socketdotio)](https://socket.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2300B4B6?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## Project Overview

Dominex is a polished frontend for a developer-focused social network built with Next.js 14 App Router. It combines secure token-based authentication, modern UI patterns, and real-time collaboration to deliver a rich experience for devs to share posts, follow peers, and engage through nested comments and AI-enhanced workflows.

Designed as an Instagram-style feed for developers, Dominex prioritizes session continuity, responsive navigation, and fast content interactions.

## Tech Stack

- Next.js 14 (App Router)
- React 19
- Zustand for client state management
- Custom fetch interceptor for auth token refresh
- Socket.io client for real-time updates
- Tailwind CSS for styling
- Lucide React for icons

## Features

- Secure JWT authentication flow
  - Access token returned in response body
  - Refresh token stored in an `httpOnly` cookie
- OTP-based user registration via SMTP
- Protected routes with session restore and no F5 flicker
- GitHub-inspired navbar with hamburger sidebar and avatar dropdown
- Feed page with modal-based PostViewer experience
- Nested comments with reply threads and author controls
- Optimistic like toggling for responsive interaction
- Full profile page with follow/unfollow actions and overlay panels
- CreatePostModal with multipart `FormData` image upload
- AI assistant integration with switchable Gemini / OpenAI support
- Refreshable auth interceptor to keep sessions active seamlessly

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm (or yarn/pnpm compatible)
- A running backend API that supports the Dominex auth contract

### Environment Variables

Create a `.env.local` file at the project root with the following:

```env
NEXT_PUBLIC_SERVER_BASE_URL=https://api.example.com
```

> `NEXT_PUBLIC_SERVER_BASE_URL` should point to your Dominex API backend. Example: `https://api.dominex.dev/`

### Install and Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm start
```

Lint:

```bash
npm run lint
```

## Folder Structure

```text
app/
  auth/           # login, register, verify, forgot-password flows
  main/           # protected app shell and main pages
components/
  navbar/         # GitHub-style header, sidebar, avatar dropdown
  post/           # feed cards, post viewer, comment system, create post modal
  profile/        # profile layout, stats, follow panels
interceptors/     # custom auth fetch interceptor
lib/              # reusable API helpers and fetch utilities
store/            # Zustand auth state management
public/           # static assets
```

## Screenshots

![Register](screenshots/Screenshot%202026-06-28%20203948.png)

![Login](screenshots/Screenshot%202026-06-28%20203918.png)

![Post view](screenshots/Screenshot%202026-06-28%20204130.png)

![post modal](screenshots/Screenshot%202026-06-28%20204205.png)

![Profile page](screenshots/Screenshot%202026-06-28%20204235.png)

## Contributing

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature`
3. Install dependencies: `npm install`
4. Make your changes
5. Submit a pull request with a clear summary of the improvement

## License

MIT License

---

Built with confidence for developer communities and modern social experiences.
