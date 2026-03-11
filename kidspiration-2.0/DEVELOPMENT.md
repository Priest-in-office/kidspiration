# Kidspiration 2.0 — Development Documentation

> **Last Updated:** March 11, 2026  
> **Version:** 2.0.0 (Pre-release)  
> **Status:** Active Development

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Pages & Routing](#pages--routing)
- [Components](#components)
- [State Management](#state-management)
- [Kids Zone](#kids-zone)
- [Authentication](#authentication)
- [Payments & Donations](#payments--donations)
- [Shop Module](#shop-module)
- [Animations & UX](#animations--ux)
- [Theming](#theming)
- [Data & Type Definitions](#data--type-definitions)
- [Assets](#assets)
- [Environment Variables](#environment-variables)
- [Development Changelog](#development-changelog)
- [Known Issues & TODOs](#known-issues--todos)

---

## Project Overview

**Kidspiration** is a React-based web application for a children's ministry organization. The platform provides:

- An interactive **Kids Zone** with educational games, daily challenges, avatar customization, and a virtual reward shop
- **Donation processing** via Paystack payment gateway (Demo)
- **Impact Stories** showcasing real outreach events across countries
- **Live ministry content** and reading resources (HTTN for Kids)
- **E-commerce shop** module for merchandise (currently disabled in navigation)
- **User authentication** with role-based access (adults and children)
- **Dark mode** support across the entire application

---

## Tech Stack

| Category          | Technology                     | Version |
| ----------------- | ------------------------------ | ------- |
| **Framework**     | React                          | 19.2.0  |
| **Language**      | TypeScript                     | ~5.9.3  |
| **Build Tool**    | Vite                           | 7.3.1   |
| **Styling**       | TailwindCSS (v4 + Vite plugin) | 4.2.1   |
| **Routing**       | React Router DOM               | 7.13.1  |
| **Animations**    | Framer Motion                  | 12.34.3 |
| **Smooth Scroll** | Lenis                          | 1.3.17  |
| **Payments**      | Paystack Inline JS             | v2      |
| **Fonts**         | Plus Jakarta Sans, Fredoka     | —       |
| **Icons**         | Material Symbols Outlined      | —       |
| **Linting**       | ESLint + React Hooks/Refresh   | 9.39.1  |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x

### Installation

```bash
cd kidspiration-2.0
npm install
```

### Development Server

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

---

## Project Structure

```
kidspiration-2.0/
├── index.html                  # Entry HTML (Google Fonts, Material Icons, Paystack SDK)
├── vite.config.ts              # Vite config with TailwindCSS v4 + React plugins
├── package.json                # Dependencies and scripts
├── tsconfig.json               # Root TypeScript config (references app + node)
├── tsconfig.app.json           # App-level TS config
├── tsconfig.node.json          # Node-level TS config
├── eslint.config.js            # ESLint configuration
├── color_schemes.txt           # Design color palette reference
├── public/                     # Static public assets
└── src/
    ├── main.tsx                # App entry — providers (Lenis, BrowserRouter, Auth, Theme)
    ├── App.tsx                 # Route definitions & image preloading
    ├── App.css                 # App-level styles
    ├── index.css               # Global styles & Tailwind base
    ├── assets/                 # Static images (logos, hero, outreach photos)
    │   └── real-images/        # Live outreach photographs (15 images)
    ├── components/             # Reusable UI components
    │   └── kids-page/          # Kids Zone specific components
    │       └── games/          # Individual game implementations (8 games)
    ├── config/                 # App configuration
    │   └── navigation.ts       # Navigation menu items
    ├── context/                # React Context providers
    │   ├── AuthContext.tsx      # Authentication state & API calls
    │   ├── KidsContext.tsx      # Kids Zone state (sparks, streaks, rewards)
    │   ├── ThemeContext.tsx     # Dark/Light theme toggle
    │   └── FormValidation.tsx  # Reusable form validation hook
    ├── data/                   # Static data & content
    │   ├── avatars.ts          # Avatar image options
    │   ├── challenges.ts       # Daily challenge definitions
    │   ├── games.ts            # Game catalog configuration
    │   └── rewards.ts          # Reward shop items
    ├── hooks/                  # Custom React hooks
    │   └── useImagePreloader.ts # Critical image preloader
    ├── pages/                  # Page-level components (route targets)
    └── types/                  # TypeScript type definitions
        ├── kids.ts             # Reward, Challenge, GameConfig types
        ├── shop.ts             # Product, CartItem, CheckoutSession types
        └── paystack.d.ts       # Paystack SDK type declarations
```

---

## Architecture

### Provider Hierarchy

The application wraps the root component in a layered provider architecture:

```
StrictMode
 └── ReactLenis (smooth scrolling)
      └── BrowserRouter (client-side routing)
           └── AuthProvider (authentication state)
                └── ThemeProvider (dark/light mode)
                     └── App (routes & image preloading)
                          └── KidsProvider (wraps Kids Zone routes only)
```

### Image Preloading

The `App` component preloads critical above-the-fold images before rendering any routes. A minimum 1-second spinner is displayed to avoid layout flicker. Images preloaded include:

- Hero section image
- Healing Streams event image
- Logo
- Partner hero image
- Auth layout images

---

## Pages & Routing

| Route                | Page Component   | Description                                       |
| -------------------- | ---------------- | ------------------------------------------------- |
| `/`                  | `Home`           | Landing page with Hero, Features, CTA, Stats      |
| `/about`             | `About`          | Organization information and mission              |
| `/read-httn4kids`    | `ReadHttn`       | HTTN for Kids reading content                     |
| `/live`              | `Live`           | Live ministry events and content                  |
| `/4ps`               | `FourPs`         | Four Ps program information                       |
| `/stories`           | `ImpactStories`  | Impact reports from global outreaches             |
| `/partner`           | `Partner`        | Partnership opportunities page                    |
| `/partner/donate`    | `Donate`         | Donation form with Paystack integration           |
| `/shop`              | `Shop`           | E-commerce merchandise store (disabled in nav)    |
| `/signup`            | `SignupChooser`  | Role selection (Adult vs. Kid) with animations    |
| `/signup/adult`      | `Signup`         | Adult registration form                           |
| `/signup/kid`        | `KidSignup`      | Child registration form (with parent/mentor info) |
| `/login`             | `Login`          | User login page                                   |
| `/forgot-password`   | `ForgotPassword` | Password recovery page                            |
| `/kids`              | `KidsDashboard`  | Kids Zone dashboard (wrapped in KidsProvider)     |
| `/kids/game/:gameId` | `GameShell`      | Dynamic game page by game ID                      |
| `/kids/rewards`      | `RewardShopPage` | Virtual reward shop (spend sparks)                |
| `/kids/avatar`       | `AvatarBuilder`  | Avatar customization page                         |

---

## Components

### Layout & Navigation

| Component    | File             | Description                                                                           |
| ------------ | ---------------- | ------------------------------------------------------------------------------------- |
| `Navbar`     | `Navbar.tsx`     | Responsive navbar with theme toggle, mobile hamburger menu, active route highlighting |
| `Footer`     | `Footer.tsx`     | Site-wide footer                                                                      |
| `AuthLayout` | `AuthLayout.tsx` | Shared layout for auth pages (login, signup)                                          |

### Home Page

| Component           | File                    | Description                                                      |
| ------------------- | ----------------------- | ---------------------------------------------------------------- |
| `Hero`              | `Hero.tsx`              | Image carousel, typewriter heading, animated floating SVG shapes |
| `Features`          | `Features.tsx`          | Feature cards with staggered entrance animations                 |
| `FeaturesCard`      | `FeaturesCard.tsx`      | Individual feature card component                                |
| `Stats`             | `Stats.tsx`             | Impact statistics section                                        |
| `Testimonials`      | `Testimonials.tsx`      | User testimonial carousel                                        |
| `TestimonialCard`   | `TestimonialCard.tsx`   | Individual testimonial card                                      |
| `CTA`               | `CTA.tsx`               | Call-to-action section                                           |
| `HealingStreams`    | `HealingStreams.tsx`    | Healing Streams event promotion                                  |
| `InteractiveCanvas` | `InteractiveCanvas.tsx` | Canvas-based interactive visual element                          |

### Shared / Reusable

| Component        | File                 | Description                              |
| ---------------- | -------------------- | ---------------------------------------- |
| `FloatingShapes` | `FloatingShapes.tsx` | Reusable animated SVG background shapes  |
| `TypewriterText` | `TypewriterText.tsx` | Extracted typewriter animation component |
| `FormInput`      | `FormInput.tsx`      | Standardized form input with validation  |
| `CountrySelect`  | `CountrySelect.tsx`  | Country dropdown selector                |
| `VideoModal`     | `VideoModal.tsx`     | Modal for video playback                 |
| `RoleCard`       | `RoleCard.tsx`       | Role selection card (signup chooser)     |

### Partner Section

| Component          | File                   | Description                        |
| ------------------ | ---------------------- | ---------------------------------- |
| `PartnerHero`      | `PartnerHero.tsx`      | Partner page hero section          |
| `InvolvementCards` | `InvolvementCards.tsx` | Ways to get involved cards         |
| `ActionPath`       | `ActionPath.tsx`       | Call-to-action pathways            |
| `DonationForm`     | `DonationForm.tsx`     | 3-step donation form with Paystack |

### Shop

| Component      | File               | Description                     |
| -------------- | ------------------ | ------------------------------- |
| `ShopHero`     | `ShopHero.tsx`     | Shop page hero banner           |
| `CategoryGrid` | `CategoryGrid.tsx` | Product category grid           |
| `ProductCard`  | `ProductCard.tsx`  | Individual product display card |

### Auth Forms

| Component            | File                     | Description                         |
| -------------------- | ------------------------ | ----------------------------------- |
| `LoginForm`          | `LoginForm.tsx`          | Login form with validation          |
| `SignupForm`         | `SignupForm.tsx`         | Adult registration multi-field form |
| `SignupIntro`        | `SignupIntro.tsx`        | Signup introduction/onboarding      |
| `KidSignupForm`      | `KidSignupForm.tsx`      | Child registration form             |
| `ForgotPasswordForm` | `ForgotPasswordForm.tsx` | Password recovery form              |

---

## State Management

State is managed via **React Context API** with four providers:

### 1. `AuthContext` — Authentication

- **Session management** with cookie-based auth via `VITE_API_URL`
- Auto-checks session on mount
- Methods: `login()`, `signup()`, `logout()`, `clearError()`
- Tracks `user`, `isAuthenticated`, `isChild`, `isLoading`, `error`
- User interface supports roles: `parent_or_mentor`, `pastor_or_leader`, `child`

### 2. `KidsContext` — Kids Zone State

- **Persisted to `localStorage`** under `kidspiration_kids_state`
- Tracks: `playerName`, `avatar`, `sparks` (currency), `streak`, `lastActiveDate`, `unlockedRewards`, `completedChallenges`, `weeklyProgress`, `gameScores`
- Auto-calculates daily streaks on mount
- Methods: `addSparks()`, `spendSparks()`, `unlockReward()`, `completeChallenge()`, `setAvatar()`, `setPlayerName()`, `updateDailyProgress()`, `recordGameScore()`

### 3. `ThemeContext` — Theme

- **Persisted to `localStorage`** under `theme`
- Toggles `dark` class on `<html>` element
- Methods: `setTheme()`

### 4. `useFormValidation` — Form Validation (Custom Hook)

- Generic, reusable validation with configurable rules
- Supports: `required`, `minLength`, `pattern`, `match`, `maxAge`, `isEmail`, `isPhone`
- Handles compound date fields (day/month/year) with age validation
- Returns: `values`, `errors`, `setValue()`, `validate()`, `getDateAsISO()`

---

## Kids Zone

The Kids Zone is a gamified learning environment behind the `/kids` route family. All Kids Zone routes are wrapped in `KidsProvider`. This is a temporary arrangement. The Kids Zone will be the landing page, once a child logs into the platform, and it won't be accessible from the NavBar. The kids navbar will also be customized so that they can navigate to the home page, and Live page, and magazine.

### Dashboard (`KidsDashboard`)

Assembled from modular sub-components:

- **`KidsHeader`** — Header with avatar, player name, sparks count, and streak display
- **`WelcomeBanner`** — Personalized welcome message
- **`DailyChallenge`** — Daily learning challenges with sparks rewards
- **`WeeklyActivity`** — Weekly progress tracker (per day-of-week)
- **`GameZone`** — Grid of available games
- **`WatchAndLearn`** — Video learning section
- **`MagazineSection`** — Reading/magazine content
- **`RewardShop`** — Quick access to reward shop

### Games (8 Implemented)

| Game           | File                | Category    | Description                   |
| -------------- | ------------------- | ----------- | ----------------------------- |
| Math Blaster   | `MathBlaster.tsx`   | Educational | Math problem solving game     |
| Space Explorer | `SpaceExplorer.tsx` | Adventure   | Space-themed exploration game |
| Color Match    | `ColorMatch.tsx`    | Puzzle      | Color matching puzzle game    |
| Dino Run       | `DinoRun.tsx`       | Action      | Endless runner style game     |
| Word Scramble  | `WordScramble.tsx`  | Word Game   | Word unscrambling challenge   |
| Bible Trivia   | `BibleTrivia.tsx`   | Bible       | Bible knowledge quiz game     |
| Verse Scramble | `VerseScramble.tsx` | Bible       | Bible verse ordering game     |
| Fill the Verse | `FillTheVerse.tsx`  | Bible       | Complete-the-verse challenge  |

All games are loaded dynamically via the `GameShell` component using the `:gameId` route parameter.

### Gamification System

- **Sparks** — Virtual currency earned by completing challenges and games
- **Streaks** — Consecutive daily login tracking
- **Rewards** — Virtual items purchasable with sparks (badges, avatars, titles, game skins)
- **Challenges** — Daily tasks across categories: math, word, art, reading
- **Avatar Builder** — Profile image selection and customization

---

## Authentication

- Backend API communication via `authFetch()` helper (cookie-based credentials)
- Signup supports two roles: `parent_or_mentor` and `pastor_or_leader`
- Child signup includes nested `ChildSignUpData` (avatar, name, DOB, gender)
- Session checked on app mount via `GET /auth/session`
- Auth endpoints: `/auth/login`, `/auth/signup`, `/auth/logout`, `/auth/session`

---

## Payments & Donations

- **Paystack Inline JS v2** loaded via `<script>` in `index.html`
- `DonationForm` implements a **3-step wizard**:
  1. **Step 1** — Select donation amount (presets or custom) and donation purpose dropdown
  2. **Step 2** — Enter personal/contact details with form validation
  3. **Step 3** — Review and confirm, then initiate Paystack popup
- Custom TypeScript declarations in `paystack.d.ts` for Paystack SDK types

---

## Shop Module

- Full e-commerce type system defined (`Product`, `ProductVariant`, `CartItem`, `CheckoutSession`)
- Components: `ShopHero`, `CategoryGrid`, `ProductCard`
- Price utilities: `formatPrice()` (cents → formatted currency), `getDiscountPercent()`
- Supports product badges (`best-seller`, `new`, `sale`), variants (size/color), and stock tracking
- **Currently disabled** in the navigation bar (commented out in `navigation.ts`)

---

## Animations & UX

### Framer Motion

- Hero image carousel with `AnimatePresence` slide transitions
- Feature cards with staggered entrance animations
- Signup chooser page with slide-in fade effects
- Smooth component mount/unmount transitions

### Custom Animations

- **Typewriter effect** — Extracted into reusable `TypewriterText` component to prevent re-renders
- **Floating SVG shapes** — Reusable `FloatingShapes` component for animated background elements
- **Interactive Canvas** — Canvas-based interactive visual on the home page
- **Bounce effect** — "Join the Fun" CTA button animation

### Smooth Scrolling

- **Lenis** library provides butter-smooth page scrolling across the entire app

---

## Theming

- **Dark/Light mode** toggle via `ThemeContext`
- Theme persisted in `localStorage`
- Uses Tailwind's `dark:` variant by toggling `dark` class on `<html>`
- Navbar includes a theme toggle button

---

## Data & Type Definitions

### Static Data (`src/data/`)

| File            | Contents                                               |
| --------------- | ------------------------------------------------------ |
| `avatars.ts`    | Predefined avatar image URLs for selection             |
| `challenges.ts` | Daily challenge definitions (math, word, art, reading) |
| `games.ts`      | Game catalog with IDs, names, tags, icons, colors      |
| `rewards.ts`    | Reward items with costs, categories, descriptions      |

### Type Definitions (`src/types/`)

| File            | Exports                                                                                   |
| --------------- | ----------------------------------------------------------------------------------------- |
| `kids.ts`       | `Reward`, `Challenge`, `GameConfig` interfaces                                            |
| `shop.ts`       | `Product`, `ProductVariant`, `CartItem`, `CheckoutSession`, `Category` + helper functions |
| `paystack.d.ts` | Paystack Inline JS SDK type declarations                                                  |

---

## Assets

### Logo & Branding

- `kidspiration-logo.png` — Main logo (also used as favicon)

### Hero & Event Images

- `kidspiration-1.png` through `kidspiration-7.png` — Organization images
- `kidspiration-about.png` — About page hero
- `HSLHS_MARCH_2026.jpg` — Healing Streams event image
- `er100-partnership.png` — Partnership image

### Real Outreach Photographs

- `real-images/` — 15 photographs (`live-1.png` through `live-15.jpg`) from real outreach events used across Impact Stories, Hero carousel, Partner and Auth pages

### Media

- `KIDSPIRATION_IMPACT.mp4` — Impact video (placeholder)
- `ANIMATED HTTN VIDEOS/` — 16 animated video files for HTTN section

---

## Environment Variables

| Variable       | Description                   | Required |
| -------------- | ----------------------------- | -------- |
| `VITE_API_URL` | Backend API base URL for auth | Yes      |

Create a `.env` file in the project root:

```env
VITE_API_URL=https://your-api-url.com
```

---

## Development Changelog

### Features Implemented

1. **Home Page** — Hero with image carousel + typewriter text, Features section with staggered card animations, Stats, Testimonials, CTA, Healing Streams promo, Interactive Canvas
2. **About Page** — Organization mission and information
3. **Partner Section** — Partnership page with hero, involvement cards, action paths, and integrated donation form
4. **Donation System** — 3-step Paystack-integrated donation wizard with purpose selection dropdown, preset/custom amounts, contact detail validation, and payment confirmation
5. **Impact Stories Page** — Showcasing outreach reports with real photographs from US and Cuba events
6. **Live Ministry Page** — Live events and ministry content
7. **HTTN for Kids** — Reading content with animated HTTN videos
8. **4Ps Page** — Program information page
9. **Shop Module** — Full product catalog, category grid, and product cards (currently disabled)
10. **Authentication System** — Login, adult signup, child signup with parent/mentor info, forgot password, session management
11. **Signup Chooser** — Animated role selection page with floating SVG shapes and slide-in effects
12. **Kids Zone Dashboard** — Gamified learning hub with welcome banner, daily challenges, weekly activity tracker, game zone, watch & learn, magazine section, and reward shop
13. **8 Interactive Games** — Math Blaster, Space Explorer, Color Match, Dino Run, Word Scramble, Bible Trivia, Verse Scramble, Fill the Verse
14. **Gamification System** — Sparks currency, daily streaks, challenge completion, reward unlocking, game score tracking (all persisted to localStorage)
15. **Avatar Builder** — Profile image selection from predefined avatar library
16. **Reward Shop** — Virtual store to spend sparks on badges, avatars, titles, and game skins
17. **Dark Mode** — Full dark/light theme support with localStorage persistence
18. **Smooth Scrolling** — Lenis-powered smooth scroll across all pages
19. **Performance Optimizations** — Image preloading, extracted TypewriterText component to prevent re-renders, reusable FloatingShapes component
20. **Responsive Design** — Mobile-first responsive layout across all pages
21. **Navigation** — Responsive navbar with active route highlighting (including `/partner/donate` → Partner), mobile hamburger menu, theme toggle

---

## Known Issues & TODOs

- [ ] Shop module is disabled in navigation — awaiting backend integration
- [ ] `KIDSPIRATION_IMPACT.mp4` is a placeholder file (133 bytes)
- [ ] `drop.html` file exists in `src/` — appears to be a standalone test file, consider cleanup
- [ ] Duplicate Google Material Symbols stylesheet link in `index.html`
- [ ] Backend API integration pending for auth endpoints
- [ ] No automated test suite (unit/integration/e2e tests)
- [ ] No CI/CD pipeline configured
- [ ] Consider extracting `KidsProvider` wrapping into a layout route for cleaner routing

---

_This document is maintained as a development reference for the Kidspiration 2.0 project.
