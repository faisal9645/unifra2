# Graph Report - unifra-v2  (2026-11-17)

## Corpus Check
- Corpus is ~43,172 words - fits in a single context window. You may not need a graph.

## Summary
- 246 nodes · 496 edges · 15 communities (13 shown, 2 thin omitted)
- Extraction: 94% EXTRACTED · 6% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.89)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Core Application Shell & UI State
- Landing Hero & Blog Sections
- Editorial Showcase & Footer Layout
- Admin Leads Management Portal
- Build & Development Tooling
- MYSA 3D Villa & Architecture Showcase
- Runtime UI & Animation Dependencies
- TypeScript Configuration & Compiler Options
- Brand Identity & Logo Visual Assets
- Vite Bundler & Tailwind CSS Plugins
- Logo Processing & Asset Automation Script
- NPM Lifecycle & Build Scripts
- Smooth Scrolling & Environment Runtime
- Three.js 3D Typings
- AI Studio Deployment Guide

## God Nodes (most connected - your core abstractions)
1. `react` - 27 edges
2. `lucide-react` - 23 edges
3. `AppContent()` - 21 edges
4. `Unifra Properties v2 Overview` - 16 edges
5. `compilerOptions` - 15 edges
6. `AdminLeadsPage()` - 14 edges
7. `ProjectItem` - 13 edges
8. `Web Application HTML Entrypoint` - 13 edges
9. `saveLead()` - 11 edges
10. `GalleryItem` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Asset: 02A` --conceptually_related_to--> `Unifra Properties v2 Overview`  [INFERRED]
  public/images/mysa3d/02A.jpg → HANDOVER.md
- `Asset: 03` --conceptually_related_to--> `Unifra Properties v2 Overview`  [INFERRED]
  public/images/mysa3d/03.jpg → HANDOVER.md
- `Asset: Bax00768` --conceptually_related_to--> `Unifra Properties v2 Overview`  [INFERRED]
  public/images/mysa3d/BAX00768.jpg → HANDOVER.md
- `Asset: Bax09923` --conceptually_related_to--> `Unifra Properties v2 Overview`  [INFERRED]
  public/images/mysa3d/BAX09923.jpg → HANDOVER.md
- `Asset: First Floor Bedroom` --conceptually_related_to--> `Unifra Properties v2 Overview`  [INFERRED]
  public/images/mysa3d/first-floor-bedroom.jpg → HANDOVER.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Unifra Brand Identity Assets** — img_public_images_unifra_emblem_gold, img_public_images_unifra_emblem_white, img_public_images_unifra_emblem, img_public_images_unifra_logo_horizontal_gold, img_public_images_unifra_logo_horizontal_white, img_public_images_unifra_logo_horizontal [INFERRED 0.85]

## Communities (15 total, 2 thin omitted)

### Community 0 - "Core Application Shell & UI State"
Cohesion: 0.07
Nodes (39): lucide-react, react, App(), AppContent(), CoreValues(), CustomCursor(), CustomCursorProps, VirtualTourModal() (+31 more)

### Community 1 - "Landing Hero & Blog Sections"
Cohesion: 0.12
Nodes (22): BlogSection(), BlogSectionProps, HeroOverlayProps, ArticleReaderModal(), ArticleReaderModalProps, ConsultationModal(), GalleryLightbox(), GalleryLightboxProps (+14 more)

### Community 2 - "Editorial Showcase & Footer Layout"
Cohesion: 0.13
Nodes (19): EditorialSections(), EditorialSectionsProps, Footer(), FooterProps, ConsultationModalProps, AppPage, groupProjectsByStatus(), Navbar() (+11 more)

### Community 3 - "Admin Leads Management Portal"
Cohesion: 0.23
Nodes (21): ACTIVITY_META, AdminLeadsPage(), AGENT_OPTIONS, STATUS_ACCENT, STATUS_COLUMNS, timeAgo(), ClientLead, LeadStatus (+13 more)

### Community 4 - "Build & Development Tooling"
Cohesion: 0.14
Nodes (19): devDependencies, autoprefixer@^10.4.21, esbuild@^0.25.0, tailwindcss@^4.1.14, tsx@^4.21.0, @types/express@^4.17.21, @types/node@^22.14.0, typescript@~5.8.2 (+11 more)

### Community 5 - "MYSA 3D Villa & Architecture Showcase"
Cohesion: 0.12
Nodes (17): Unifra Properties v2 Overview, Luxury Tech Stack & Architecture, Asset: 02A, Asset: 03, Asset: Bax00768, Asset: Bax09923, Asset: First Floor Bedroom, Asset: First Floor Bedroom 1 (+9 more)

### Community 6 - "Runtime UI & Animation Dependencies"
Cohesion: 0.12
Nodes (17): dependencies, canvas-confetti@^1.9.4, express@^4.21.2, @google/genai@^2.4.0, lucide-react@^0.546.0, motion@^12.23.24, react@^19.0.1, react-dom@^19.0.1 (+9 more)

### Community 7 - "TypeScript Configuration & Compiler Options"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, allowJs, experimentalDecorators, isolatedModules, jsx, lib, module (+7 more)

### Community 8 - "Brand Identity & Logo Visual Assets"
Cohesion: 0.15
Nodes (13): Asset: Favicon, Asset: Unifra Emblem, Asset: Unifra Emblem Gold, Asset: Unifra Emblem White, Asset: Unifra Logo, Asset: Unifra Logo Horizontal, Asset: Unifra Logo Horizontal Gold, Asset: Unifra Logo Horizontal White (+5 more)

### Community 9 - "Vite Bundler & Tailwind CSS Plugins"
Cohesion: 0.22
Nodes (7): @tailwindcss/vite@^4.1.14, vite@^6.2.3, @vitejs/plugin-react@^5.0.4, vite@^6.2.3, @tailwindcss/vite, vite, @vitejs/plugin-react

### Community 10 - "Logo Processing & Asset Automation Script"
Cohesion: 0.28
Nodes (4): is_dark(), main(), col_mostly_dark(), row_mostly_dark()

### Community 11 - "NPM Lifecycle & Build Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, clean, dev, lint, preview

### Community 12 - "Smooth Scrolling & Environment Runtime"
Cohesion: 0.33
Nodes (4): dotenv@^17.2.3, lenis@^1.3.26, dotenv, lenis

## Knowledge Gaps
- **28 isolated node(s):** `AI Studio App Deployment Guide`, `Asset: Favicon`, `Asset: 02A`, `Asset: 03`, `Asset: Bax00768` (+23 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 89 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Core Application Shell & UI State` to `Landing Hero & Blog Sections`, `Editorial Showcase & Footer Layout`, `Admin Leads Management Portal`, `Build & Development Tooling`, `Runtime UI & Animation Dependencies`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Are the 15 inferred relationships involving `Unifra Properties v2 Overview` (e.g. with `Asset: 02A` and `Asset: 03`) actually correct?**
  _`Unifra Properties v2 Overview` has 15 INFERRED edges - model-reasoned connections that need verification._
- **What connects `AI Studio App Deployment Guide`, `Asset: Favicon`, `Asset: 02A` to the rest of the system?**
  _28 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Core Application Shell & UI State` be split into smaller, more focused modules?**
  _Cohesion score 0.07058001397624039 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Core Application Shell & UI State` to `Landing Hero & Blog Sections`, `Editorial Showcase & Footer Layout`, `Admin Leads Management Portal`, `Build & Development Tooling`, `Runtime UI & Animation Dependencies`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Should `Landing Hero & Blog Sections` be split into smaller, more focused modules?**
  _Cohesion score 0.12413793103448276 - nodes in this community are weakly interconnected._
- **Why does `Luxury Tech Stack & Architecture` connect `MYSA 3D Villa & Architecture Showcase` to `Core Application Shell & UI State`?**
  _High betweenness centrality (0.109) - this node is a cross-community bridge._