---
name: Neo-Brutalist Resume
colors:
  primary: "#171717"
  secondary: "#e8e4de"
  surface: "#faf8f4"
  on-surface: "#171717"
  accent: "#facc15"
  destructive: "#dc2626"
  muted: "#6b7280"
typography:
  body:
    fontFamily: Geist Sans / System UI
    fontSize: 14-16px
    fontWeight: 400
  mono:
    fontFamily: Geist Mono / UI Monospace
    fontSize: 12-14px
    fontWeight: 400
rounded:
  card: 8px
  badge: 4px
  avatar: 12px
---

# Design System

## Overview

A neo-brutalist personal resume website built with Next.js, Tailwind CSS, and shadcn/ui. The design prioritizes **bold visual identity** through thick borders, hard drop shadows, high-contrast typography, and deliberate lack of softness. The aesthetic is intentional and opinionated — every element communicates confidence and clarity.

## Layout

- **Container**: Centered `max-w-2xl` (672px) content column, padded `p-6` / `md:p-8`
- **Outer Shell**: Full viewport with `p-4` / `md:p-16` padding, scroll-snap `scroll-my-12`
- **Section Spacing**: `space-y-8` between major sections, `space-y-4` between items
- **Print Layout**: Single-column, no shadows, reduced spacing, forced new page support
- **Responsive**: Stacked single-column on all breakpoints, grid layouts for project cards
- **Card Layout**: `border-2 border-foreground` with `shadow-brutal` for emphasis

## Colors

- **Primary** (`#171717` / `hsl(0 0% 9%)`): Main text, borders, primary buttons, and all interactive elements
- **Secondary** (`#e8e4de` / `hsl(40 15% 91%)`): Card backgrounds for skill badges, muted surfaces, chip backgrounds
- **Surface** (`#faf8f4` / `hsl(40 33% 98%)`): Page background — warm off-white
- **Card** (`#ffffff` / `hsl(0 0% 100%)`): White card surfaces, input backgrounds
- **Accent** (`#facc15` / `hsl(47 100% 62%)`): Yellow accent — used sparingly for highlights
- **Destructive** (`#dc2626` / `hsl(0 84% 60%)`): Error states, destructive actions
- **Muted** (`#6b7280` / `hsl(220 9% 30%)`): Secondary text, timestamps, less important labels
- **Foreground on muted**: `text-foreground/80` for descriptions, secondary content
- **Border**: `hsl(0 0% 9%)` — pure black borders throughout for brutalist consistency

### Dark Mode Support

- Background: `hsl(0 0% 7%)` — near-black
- Foreground: `hsl(0 0% 98%)` — near-white
- Cards: `hsl(0 0% 10%)` — slightly lighter dark
- All borders invert to white for consistent contrast

## Typography

### Font Families
- **Sans** (`--font-geist-sans`): Primary body text, headings, descriptions
- **Mono** (`--font-geist-mono`): Company names, dates, skill tags, location text, metadata

### Type Scale
- **Page Title**: `text-3xl font-bold tracking-tight` (30px)
- **Section Headers**: `text-xl font-bold` (20px) with `border-b-2` underline
- **Card Titles**: `text-base font-semibold` (16px)
- **Card Subtitles**: `text-sm font-mono font-semibold` (14px)
- **Body Text**: `text-xs text-foreground/80` (12px)
- **Skill Badges**: `text-xs font-semibold font-mono` (12px)
- **Project Tags**: `text-[10px]` (10px)
- **Timestamps/Dates**: `text-sm tabular-nums text-gray-500` (14px, monospaced)
- **Print Sizes**: `print:text-[12px]` for body, `print:text-[10px]` for details, `print:text-[8px]` for badges

## Shadows & Depth

### Neo-Brutalist Shadow System
Three tiers of hard, non-blurred drop shadows:
- **`shadow-brutal`**: `3px 3px 0 0 hsl(var(--foreground))` — standard element shadow
- **`shadow-brutal-sm`**: `2px 2px 0 0 hsl(var(--foreground))` — badges, small elements
- **`shadow-brutal-lg`**: `6px 6px 0 0 hsl(var(--foreground))` — main resume container

All shadows use the foreground color (black in light mode, white in dark mode), creating a distinctive offset-press effect.

### Elevation Hierarchy
1. **Level 0**: No shadow — education, certifications, work experience cards (`border-none`)
2. **Level 1**: `shadow-brutal-sm` — badges, small interactive elements
3. **Level 2**: `shadow-brutal` — project cards, avatar
4. **Level 3**: `shadow-brutal-lg` — main resume container

## Components

### Section Headers
- `h2` with `border-b-2 border-foreground pb-1`
- Bold weight, 20px text
- Consistent across all sections (About, Skills, Work Experience, etc.)
- `id` attribute for anchor navigation

### Cards
- **Standard Card**: `rounded-lg border border-muted bg-card`
- **Brutalist Card** (Projects): `border-2 border-foreground p-3 shadow-brutal` with hover translate
- **Borderless Card** (Work, Education, Certs): `border-none py-1` — minimal, content-focused
- **Print**: `print:border-0 print:shadow-none`

### Badges
- **Default**: Black fill, white text, `border-2 border-foreground`, `shadow-brutal-sm`
- **Secondary**: Gray fill, dark text, same border treatment
- **Hover Effect**: `-translate-x-0.5 -translate-y-0.5` with shadow increase — subtle "press" animation
- **Shape**: `rounded-sm` with `px-2 py-0.5`
- **Font**: Mono, semibold, uppercase-ready

### Buttons
- **Default**: `border-2 border-foreground bg-primary text-primary-foreground shadow-brutal-sm`
- **Hover**: Translates up-left (-0.5, -0.5) with increased shadow
- **Active**: Translates back to origin with shadow removal — tactile "click" feel
- **Outline**: Transparent background with border, hover shows accent background
- **Ghost**: No border, accent background on hover
- **Sizes**: Default (h-10), SM (h-9), LG (h-11), Icon (h-10 w-10)

### Avatar
- `size-28` (112px) circular with `rounded-xl`
- `border-2 border-foreground shadow-brutal`
- Fallback: Initials text on muted background
- Image: `object-cover` with error state handling

### Timeline (Work Experience)
- Single continuous vertical line: `w-0.5 bg-foreground/20`
- Bullet dots: `size-3 rounded-full border-2 border-foreground bg-card`
- Left offset: `pl-10` for timeline content, `left-[10px]` for dots
- Animation: Scale and opacity transition on scroll intersection
- Hidden in print: `print:hidden` and `print:pl-0`

### Project Cards
- `border-2 border-foreground p-3 shadow-brutal` — most visually prominent cards
- Hover: `-translate-x-0.5 -translate-y-0.5` with shadow increase
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Tags: `text-[10px]` secondary badges
- Active indicator: Green dot (`bg-green-500`) next to linked projects

## Spacing & Grid

- **Base Unit**: 4px (Tailwind default)
- **Section Gap**: `space-y-8` (32px) between sections
- **Item Gap**: `space-y-4` (16px) between list items
- **Card Padding**: `p-3` (12px) for project cards, none for borderless cards
- **Badge Gap**: `gap-1` (4px) for badge lists
- **Section Padding**: `gap-y-3` (12px) within sections
- **Container Padding**: `p-6` (24px) mobile, `p-8` (32px) desktop, `p-11` (44px) print

## Micro-interactions

### Hover States
- **Badges**: Translate (-0.5, -0.5) + shadow increase → tactile "lift" effect
- **Buttons**: Same translate + shadow change → pressable feel
- **Project Cards**: Translate (-0.5, -0.5) with `duration-150` → subtle lift
- **Links**: `hover:underline` or `hover:decoration-foreground` → underline reveals

### Click/Active States
- **Buttons**: `active:translate-x-0 active:translate-y-0 active:shadow-none` → physical press

### Scroll Animations
- **Fade In**: `@keyframes fadeIn` — opacity 0→1, translateY 4px→0, 400ms ease-out
- **Staggered Entry**: Sections animate with 75ms delay increments (0ms, 75ms, 150ms, 225ms, etc.)
- **Timeline**: IntersectionObserver triggers dot scale (0→1) and line height (0→full)

### Loading State
- Skeleton screens with `animate-pulse rounded bg-gray-200`
- Matches layout structure of actual content
- Print: animations disabled, all content visible

## Print Styles

- **No Animations**: All `animate-fade-in` classes disabled
- **No Shadows**: `print:shadow-none` on all elements
- **No Borders**: `print:border-0` on cards
- **Reduced Spacing**: `print:space-y-4` (vs. `space-y-8` screen)
- **Smaller Text**: `print:text-[12px]` body, `print:text-[10px]` details
- **Force Page Break**: `.print-force-new-page` → `page-break-before: always`
- **Timeline Hidden**: Bullet dots and vertical line removed
- **Hover States Disabled**: No translate effects on print

## Accessibility

- **ARIA Labels**: All interactive elements labeled (`aria-label` on links, buttons, lists)
- **Semantic HTML**: `<header>`, `<main>`, `<section>`, `<article>`, `<nav>`, `<h1>`-`<h4>`
- **Roles**: `role="feed"` on content lists, `aria-labelledby` on sections
- **Focus States**: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`
- **Keyboard Navigation**: Full Tab/Enter support via semantic elements and Radix primitives
- **Screen Reader Text**: `sr-only` heading for page title, `aria-hidden="true"` on decorative elements
- **Reduced Motion**: Print media query disables all animations
- **Link Safety**: `target="_blank" rel="noopener noreferrer"` on external links

## Iconography

- **Library**: Lucide React (Globe, Mail, Phone icons)
- **Custom SVGs**: GitHub, LinkedIn, X (Twitter) icons as React components
- **Size**: `size-3` (12px) inline, `size-4` (16px) in buttons
- **Color**: Inherits from parent (`text-foreground/80` or button foreground)
- **Interaction Icons**: `aria-hidden="true"` — decorative only

## Responsive Behavior

- **Mobile** (< 768px): Single column, full-width cards, stacked layout
- **Tablet** (768px-1024px): `md:grid-cols-2` for project cards
- **Desktop** (1024px+): `lg:grid-cols-3` for project cards
- **Container**: Always `max-w-2xl` centered — consistent reading width

## Do's and Don'ts

- **Do** use thick borders (`border-2`) and hard shadows consistently — this is the core identity
- **Do** keep shadows non-blurred (offset only) — no `box-shadow: blur`
- **Do** use mono font for metadata (dates, companies, tags) — creates visual hierarchy
- **Do** maintain `space-y-8` between sections — consistent rhythm
- **Do** use `text-foreground/80` for descriptions — subtle but readable
- **Don't** use rounded corners larger than `rounded-lg` (8px) — keep shapes sharp
- **Don't** mix shadow levels within the same component — be intentional about depth
- **Don't** use gradients — the aesthetic is flat and bold
- **Don't** add blur effects or soft shadows — violates the brutalist principle
- **Don't** use more than 2 font families (sans + mono) — keep it simple
- **Do** hover effects on interactive elements — translate + shadow change is the signature
- **Don't** use animation durations longer than 500ms — keep interactions snappy
- **Do** support print output — this is a resume, after all
