# RetroBoard

RetroBoard is an automated retrospective compilation and synthesis toolkit designed specifically for modern agile development teams. Styled with a razor-sharp, premium **Clean Utility & Minimal** design aesthetic, RetroBoard streamlines retro sessions by allowing team members to submit start, stop, and continue items in real-time, grouping them into similar semantic pools, and leveraging intelligent clustering to distill raw feedback into actionable team plans.

## 🌟 Key Features

- **Start, Stop, and Continue Columns**: Elegant, cleanly color-accented columns matching the Clean Utility design specification.
- **Micro-Interaction Feedback Cards**: Anonymously submitted notes containing quicktag mood emojis and instant similarity stacking metrics.
- **Smart Duplicate Merging**: Cards with duplicate suggestions show similar indicators, reducing workspace noise through nested expanders.
- **AI Theme Sentiment Segmentation**: One-click clustering synthesizes raw feedback logs into high-level strategic themes with a precision match score, category distribution trackers, and recommended immediate actions.
- **Markdown Action Plan Export**: Instantly formats synthesized themes into a beautiful Action Plan file, ready to copy or download as `.md`.
- **Integrated Expiry Engine**: Best-effort real-time polling synchronizes work and implements a robust countdown mechanism for standard facilitator limits.

## 🎨 Visual Identity & Style Guide

- **Typography**: Paired display metrics using **Inter** for clean, scalable sans-serif readability, and utility metrics using **JetBrains Mono** for developer stats, confidence badges, and code snippets.
- **Theme Accents**: Solid, stark off-white backgrounds bordered with responsive `#E5E7EB` dividers, illuminated by soft category indicators (emerald, amber, rose, and indigo offsets).
- **Structure**: High-contrast header configurations and compact footer input docks optimized for high performance and strict layout boundaries.

## 🚀 Getting Started

Installing necessary environment variables and initial modules is fully automated. Simply boot up the dev client to run:

```bash
# Clean install packages
npm install

# Boot development mode
npm run dev

# Run type check/linter
npm run lint

# Build for server production
npm run build
```

## 🛠️ Technological Architecture

- **Front-End Matrix**: React 18 / TypeScript / Vite Setup
- **Styling Architecture**: Tailwind CSS
- **Icons Toolkit**: Lucide React
- **Local Persistence layer**: Optimized React Storage Controller with simulated multi-user polling fallback structures.
- **AI Synthesis Pipeline**: Google Gemini API integration (with native client-side fallback compilers to guarantee visual outcomes when API keys are absent).
