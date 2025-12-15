# DokiDoki Landing Page - Redesign Project Status

## Project Overview
Landing page for DokiDoki - an AI-powered UPSC answer writing and evaluation app. The goal is to redesign the website to be more modern, SEO-friendly, and include blog/community sections for better visibility.

## Current Working Session
**Focus Area:** Landing Page Refinement - Community Carousel Implemented!
**Date Last Updated:** 2025-12-15

## Project Goals
1. ✅ Make website SEO-friendly with proper meta tags
2. ✅ Redesign each section to look more modern
3. ✅ Add blog section with 5 complete blog posts (3 UPSC-focused, 2 technical)
4. ⏳ Add community/posts section (preview on homepage, full page pending)
5. ⏳ Implement sitemap.xml and robots.txt

## Section-by-Section Progress

### 1. Navigation
**Status:** ✅ COMPLETED - Updated with Section Links!
**Date Updated:** 2025-12-14

**Implemented Features:**
- ✅ Fixed navigation with blur effect
- ✅ Responsive hamburger menu
- ✅ Clickable logo linking to homepage
- ✅ On-page section links (How It Works, Explore, FAQ)
- ✅ External links (Blog, Community, Download)
- ✅ Smooth scroll behavior for section navigation
- ✅ Modern styling with teal gradient accents
- ✅ All navigation properly linked to homepage from blog page

### 2. Hero Section
**Status:** ✅ COMPLETED - Modern Redesign Finished!
**Date Completed:** 2025-12-13

**Implemented Features:**
- ✅ Larger, bolder typography (42px → 64px responsive)
- ✅ Enhanced H1: "Master UPSC Mains Answer Writing"
- ✅ Cleaner, shorter subtitle focused on benefits
- ✅ Simplified feature badges: PYQ, AI+Peer, Daily
- ✅ Larger, more prominent CTA button with enhanced hover
- ✅ Glassmorphism evaluation card with backdrop blur
- ✅ Glowing evaluation card with teal accent
- ✅ Floating animation on evaluation card (6s cycle)
- ✅ Animated progress bars on page load (staggered)
- ✅ Subtle background gradient orbs (pulsing)
- ✅ Staggered entrance animations for all elements
- ✅ Improved spacing (64-80px gaps, better breathing room)
- ✅ Enhanced responsive behavior (3 breakpoints)
- ✅ Accessibility: reduced motion media query

**Technical Implementation:**
- CSS animations with cubic-bezier easing
- Backdrop-filter for glassmorphism
- CSS custom properties for progress bars
- Intersection Observer for scroll animations
- GPU-accelerated transforms
- Responsive typography scaling

**Design Principles Applied:**
- Modern YC startup aesthetic
- Minimal, clean hierarchy
- Generous whitespace
- Smooth, professional motion
- Premium depth effects
- SEO-optimized HTML structure

### 3. How It Works Section (Merged Challenge + Solution)
**Status:** ✅ COMPLETED - Timeline Journey Design!
**Date Completed:** 2025-12-13

**Implemented Features:**
- ✅ Merged "The Challenge" and "Our Solution" into one cohesive section
- ✅ Timeline/Journey style showing 4 steps
- ✅ Vertical timeline with connecting gradient line
- ✅ Numbered circular badges with gradient
- ✅ Glassmorphism content cards with backdrop blur
- ✅ Feature badges for each step (PYQ, AI, Peer Learning, Streaks)
- ✅ Hover effects on cards (slide, glow, scale)
- ✅ Staggered entrance animations (0.1s delay each)
- ✅ "See It In Action" CTA button scrolling to screenshots
- ✅ Fully responsive (mobile stacks naturally)
- ✅ SEO-friendly semantic HTML structure

**4 Steps:**
1. Daily PYQ at 1 AM (solves overwhelm, includes both daily + custom posts)
2. Write & Upload Your Answer (handwritten practice, photo upload, timing)
3. Get AI + Peer Feedback (5-parameter scoring, community reviews)
4. Track Progress & Build Streaks (habit building, score improvement)

**Design Principles:**
- User journey narrative (not just features)
- Problem-solution context built into each step
- Clean, modern timeline aesthetic
- Glassmorphism + gradient accents
- Emphasis on simplicity and daily habit

### 4. Explore Section (Community Carousel + Blog)
**Status:** ✅ COMPLETED - Modern Carousel Implementation!
**Date Completed:** 2025-12-13
**Date Updated:** 2025-12-15 (Replaced Product Demo & Community Posts with Glossy Carousel)

**Implemented Features:**
- ✅ Removed Product Demo section (separate slideshow)
- ✅ Removed "From Our Community" post cards (redirected to /posts/)
- ✅ Removed /posts/ navigation link (focusing on app downloads)
- ✅ **NEW:** Community Highlights Carousel with 10 app screenshots
- ✅ Modern glossy gradient border with animated color shift
- ✅ Dark glassmorphism background with subtle gradient
- ✅ Floating glow effects (60px blur, pulsing shadows)
- ✅ Smooth slide transitions with cubic-bezier easing
- ✅ Auto-advance carousel (4 seconds per slide)
- ✅ Manual navigation: prev/next buttons, dot indicators
- ✅ Touch/swipe support for mobile devices
- ✅ Keyboard navigation (arrow keys)
- ✅ Pause autoplay on hover
- ✅ "Download App & Join Community" CTA button with shine effect
- ✅ Fully responsive (3 breakpoints: desktop/tablet/mobile)
- ✅ Latest from the Blog: 3 blog preview cards (unchanged)

**Carousel Features:**
- **10 App Screenshots:** 0.png through 9.png showing all app features
- **Glossy Gradient:** Animated multi-stop gradient border (6s loop)
- **Navigation:** Clickable dots, prev/next arrows, swipe gestures
- **Accessibility:** aria-labels, keyboard controls, reduced motion support
- **Performance:** GPU-accelerated transforms, optimized animations

**Two Subsections:**
1. **Join UPSC Aspirants**: Interactive carousel showcasing app screenshots
2. **Latest from the Blog**: 3 blog preview cards (actual blog posts)

**Blog Topics Featured:**
1. Why We Built DokiDoki
2. Why Reddit and Social Media Won't Work for Your UPSC Preparation
3. Automating Daily UPSC PYQs with GitHub Actions

**Design Principles:**
- Focus on app downloads (removed /posts/ page link)
- Premium glossy aesthetic with gradient animations
- Community social proof ("Join UPSC Aspirants")
- Interactive engagement with carousel controls
- Direct CTA to download app rather than browse posts

### 5. FAQ Section
**Status:** ✅ COMPLETED - Accordion FAQ!
**Date Completed:** 2025-12-13
**Date Updated:** 2025-12-13 (Converted to accordion)

**Implemented Features:**
- ✅ 5 SEO-optimized questions and answers
- ✅ Click-to-reveal accordion format
- ✅ + icon that rotates to × when open
- ✅ Smooth height animation on expand/collapse
- ✅ Clean typography with Hanken Grotesk font
- ✅ Teal accent on important text (parameters)
- ✅ Hover effects on questions
- ✅ Fully responsive design
- ✅ Semantic HTML for SEO (content still crawlable)
- ✅ Accessible (aria-expanded attributes)

**5 FAQ Questions:**
1. How does AI evaluate handwritten UPSC answers?
2. Why are PYQs (Previous Year Questions) important for UPSC Mains?
3. Can I practice both daily PYQs and my own questions?
4. What are the 5 parameters used to evaluate UPSC answers?
5. How does peer review help improve UPSC answer writing?

**SEO Keywords Covered:**
- AI evaluation, handwritten answers, OCR
- PYQ, Previous Year Questions, UPSC Mains
- Daily practice, custom questions, flexibility
- Evaluation parameters, marking scheme
- Peer review, community learning, collaborative preparation

**Featured Snippet Potential:**
- Questions 2 and 4 structured for Google featured snippets
- Long-tail keywords for organic search
- Addresses user concerns and conversion barriers

### 6. Footer (Merged About + Contact)
**Status:** ✅ COMPLETED - Enhanced Footer!
**Date Completed:** 2025-12-13

**Implemented Features:**
- ✅ Merged About and Contact sections into footer
- ✅ Logo + brand name at top
- ✅ SEO-optimized description: "Master UPSC answer writing through consistent daily practice. AI evaluation, peer reviews, and habit tracking—all in one app."
- ✅ Clickable email link (mailto)
- ✅ Gradient divider line
- ✅ Copyright text
- ✅ Clean, minimal, center-aligned design
- ✅ Consistent styling with site theme
- ✅ Teal accent color on email

**Content Strategy:**
- Focus on SEO keywords: UPSC, answer writing, daily practice, AI evaluation, peer reviews, habit tracking
- Two-line description for optimal keyword density
- Contact info easily accessible
- Professional, minimal aesthetic

### 7. Blog Page
**Status:** ✅ COMPLETED - All 5 Blog Posts Published!
**Date Completed:** 2025-12-15

**Implemented Features:**
- ✅ Created /blog/index.html - single page for all blog posts
- ✅ Dropdown selector to choose which blog post to read
- ✅ All 5 blog posts complete with full content
- ✅ Modern code block styling with syntax highlighting
- ✅ Minimal navigation (simple centered links)
- ✅ Clean article layout optimized for readability
- ✅ "Back to Home" link at bottom of each article
- ✅ Smooth scroll to selected article
- ✅ Same dark theme, Hanken Grotesk typography
- ✅ Glassmorphism dropdown with teal accent
- ✅ Max-width 680px for article readability
- ✅ Fully responsive design
- ✅ No em dashes (simplified punctuation)

**Modern Code Block Features:**
- ✅ Language tags (JavaScript, SQL, YAML)
- ✅ Dark code editor theme (#0d0d0d background)
- ✅ Syntax highlighting colors
- ✅ Custom scrollbar styling
- ✅ Header with language label
- ✅ Professional, clean presentation

**SEO Optimization:**
- ✅ Comprehensive meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card tags
- ✅ Schema.org BlogPosting markup for each article
- ✅ Semantic HTML (article, header, time tags)
- ✅ Proper heading hierarchy (H1 for titles)
- ✅ Meta dates and author info (2025-12-15)

**5 Published Blog Posts:**

**UPSC-Focused (Good SEO):**
1. **"Why DokiDoki Exists: A Distraction-Free Space for UPSC Answer Writing"** (~1,850 words)
   - Origin story, Reddit problems, focused solution
   - Keywords: UPSC answer writing, distraction-free, focused practice
   - SEO Value: High (targets UPSC aspirants directly)

2. **"Why Reddit and Social Media Won't Help You Clear UPSC"** (~2,000 words)
   - Social media traps, comparison anxiety, practical tips to quit
   - Keywords: UPSC Reddit, social media preparation, study habits
   - SEO Value: High (targets aspirants searching for advice)

3. **"How to Practice UPSC Answer Writing When You Have No One to Evaluate"** (~1,300 words)
   - Feedback problem, 5-parameter system, daily practice routine
   - Keywords: UPSC answer writing practice, evaluation, remote preparation
   - SEO Value: Very High (solves specific pain point)

**Technical (Credibility/Developer Audience):**
4. **"Automating Daily UPSC PYQs with GitHub Actions"** (~2,000 words)
   - GitHub Actions workflow, cron scheduling, timezone handling
   - Expo push notifications, scalability analysis
   - Code examples: JavaScript, YAML
   - SEO Value: Low for users, high for developer credibility

5. **"Why We Migrated from Firebase to Supabase: A Real Startup Journey"** (~2,100 words)
   - 4 phases: POC → Growth → Breaking point → Migration
   - Honest migration story, NoSQL vs SQL comparison
   - Code examples: Firestore vs Supabase queries, SQL
   - Shows mid-level engineering thinking
   - SEO Value: Low for users, high for technical credibility

**Content Quality:**
- All dates updated to 2025-12-15
- Simple, conversational tone throughout
- No em dashes or overly formal language
- Honest about limitations and challenges
- Shows authentic engineering journey
- 8th-9th grade reading level maintained
- Research-backed (UPSC topper quotes, studies)

**Design Principles:**
- One page for all content (easy to maintain)
- Dropdown navigation (simple UX)
- No visual clutter (minimal metadata)
- SEO-optimized but invisible to users
- Fast, lightweight, minimal
- Easy to add new blogs (update dropdown + add article)

## Blog & Community Sections
**Status:** ✅ Blog Complete | ⏳ Community Pending

**Blog Section:**
- ✅ Created `/blog/` directory with index.html
- ✅ Built single-page blog structure with dropdown
- ✅ Added structured data (Schema.org BlogPosting) for all posts
- ✅ Wrote and published all 5 blog posts (complete)
- ✅ Modern code block styling implemented
- ✅ SEO optimization complete

**Community Posts Section:**
- ✅ Preview cards on homepage Explore section
- ⏳ Create `/posts/` directory with full page
- ⏳ Build client-side page to fetch from Supabase edge function
- ⏳ Display posts with comments and metadata

## SEO Optimization
**Current Status:**
- ✅ Primary meta tags (title, description, keywords)
- ✅ Open Graph tags for social sharing
- ✅ Twitter card tags
- ✅ Structured data (SoftwareApplication schema)
- ✅ Theme color
- ⏳ Canonical URLs (pending)
- ⏳ sitemap.xml (pending)
- ⏳ robots.txt (pending)
- ⏳ Blog post schema markup (pending)

## Technology Stack
- Pure HTML, CSS, JavaScript (no frameworks)
- Google Fonts: Hanken Grotesk
- Modern CSS (Grid, Flexbox, Custom Properties, Animations)
- Intersection Observer API for scroll animations

## Design System
**Colors:**
- Background: #121212 (dark)
- Text Primary: #e5e5e5 (light gray)
- Text Secondary: #a1a1aa (medium gray)
- Accent/Brand: #61bfc5 to #4a9ca2 (teal gradient)
- Cards: #2d3535 / #3a4444
- Borders: #2d3535 / #3a4444

**Typography:**
- Font: Hanken Grotesk (300, 400, 500, 600, 700)
- Hero H1: 42px mobile → 60px desktop
- Section titles: 32px
- Body: 14-16px
- Line heights: 1.15-1.2 (headings), 1.5-1.6 (body)
- Letter spacing: -0.01em to -0.02em (headings)
- Font weights: 300 (light), 400 (regular), 500-600 (medium/semibold)

**Spacing:**
- Section padding: 80px vertical
- Container max-width: 1000px
- Grid gaps: 20-24px

## Files Structure
```
dokidoki_landing/
├── index.html          # Main landing page
├── style.css           # All styles (shared by all pages)
├── script.js           # Interactive features
├── dokidoki.png        # Logo
├── 0.png - 4.png       # App screenshots
├── PROJECT_STATUS.md   # This file
├── /blog/
│   └── index.html      # Single-page blog with dropdown selector
└── /posts/             # To be created
```

## Next Steps (Immediate)
1. ✅ ~~Complete hero section redesign~~ - DONE!
2. ✅ ~~Merge Challenge + Solution into "How It Works" timeline~~ - DONE!
3. ✅ ~~Merge About + Contact into Footer~~ - DONE!
4. ✅ ~~Add FAQ section for SEO~~ - DONE!
5. ✅ ~~Create unified Explore section (merge Screenshots + Posts + Blog)~~ - DONE!
6. ✅ ~~Create /blog/ directory with blog structure~~ - DONE!
7. ✅ ~~Write all 5 blog posts with modern code styling~~ - DONE!
8. ⏳ Create /posts/ directory with community posts page
9. ⏳ Add sitemap.xml and robots.txt
10. ⏳ Final polish and testing

## Latest Session Notes
**Date:** 2025-12-15 (Session 8 - Blog Content Complete!)

**Session 1 - Hero Section:**
- Increased headline size dramatically (64px desktop)
- Added glassmorphism + glow to eval card
- Implemented floating animation
- Added animated progress bars
- Created pulsing background orbs
- Staggered entrance animations
- Enhanced CTA button
- Removed trust badge per user preference
- Added Google Play Store links to all download buttons

**Session 2 - How It Works Section:**
- ✅ Merged "The Challenge" and "Our Solution" into one cohesive "How It Works" section
- Created timeline/journey style with 4 steps
- Vertical timeline with gradient connecting line
- Numbered circular badges with gradient + glow
- Glassmorphism content cards with hover effects
- Feature badges for each step
- "See It In Action" CTA button
- Fully responsive design
- SEO-friendly semantic HTML
- Focus on user journey narrative (not just feature list)
- Added scroll-triggered reveal animations (each milestone appears when scrolled to)

**Session 3 - Footer Enhancement:**
- ✅ Merged About and Contact sections into enhanced footer
- Removed two separate sections, reduced page length
- Added logo + brand name at top of footer
- SEO-optimized description with keywords: UPSC, answer writing, AI evaluation, peer reviews, habit tracking
- Clickable mailto: link for email
- Gradient divider line
- Clean, modern, minimal design
- Consistent teal accent colors

**Session 4 - FAQ Section:**
- ✅ Added FAQ section with 5 SEO-optimized questions
- Minimal clean list format (all visible, no accordion)
- Strategic questions covering: AI evaluation, PYQ importance, flexibility, evaluation parameters, peer review
- Gradient divider lines between questions
- Teal accent on important keywords (5 parameters)
- Targets long-tail keywords for organic search
- Addresses user concerns and conversion barriers
- Featured snippet potential for Google search results
- Fully responsive design

**Session 5 - Typography Upgrade & FAQ Accordion:**
- ✅ Changed font from Inter to Hanken Grotesk site-wide
- Typography refinements inspired by modern standards:
  - Tighter line heights (1.15-1.2 for headings, 1.5-1.6 for body)
  - Letter spacing adjustments (-0.01em to -0.02em for headings)
  - Font weights: 300 (light), 400 (regular), 500-600 (medium/semibold)
  - Improved readability and modern feel
- ✅ Converted FAQ from visible list to accordion (click to reveal)
  - Questions are buttons with + icon
  - Click to expand/collapse answers
  - Icon rotates 45deg when open (+ becomes ×)
  - Smooth height animation (max-height transition)
  - Cleaner, more organized presentation
  - Better mobile experience (less scrolling)
  - All answers still in HTML (SEO-friendly)
- Maintained teal accent colors throughout
- Kept minimal, clean aesthetic

**Session 6 - Explore Section (Merged Content Hub):**
- ✅ Merged Screenshots, Community Posts, and Blog sections into one unified "Explore DokiDoki" section
- Created three distinct subsections with vertical stack layout:
  1. Product Demo (existing screenshot slideshow)
  2. From Our Community (3 dummy post cards)
  3. Latest from the Blog (3 blog preview cards)
- Glassmorphism content cards with backdrop-filter blur
- Teal accent line (4px gradient) on subsection titles
- Responsive 3-column grid (desktop) → 1-column (mobile)
- Hover effects: translateY(-4px), border glow, shadow
- Consistent card styling across all content types
- Reduced overall page length by consolidating sections
- Clean, minimal, scannable presentation
- SEO-optimized semantic HTML structure
- Maintained consistent Hanken Grotesk typography

**Session 7 - Blog Page Implementation & Card Simplification:**
**Date:** 2025-12-14

- ✅ Simplified Explore section cards:
  - Removed all emojis from post and blog cards
  - Removed metadata (author, upvotes, dates, read time)
  - Kept only: title + brief description + link
  - Cleaner, lighter, more minimal design
  - Updated blog card titles to actual 4 blog topics
  - All "Read Article" buttons now link to /blog/

- ✅ Updated navigation bar:
  - Added section IDs to How It Works and FAQ
  - Made logo clickable (scrolls to top)
  - Updated nav links with smooth scrolling
  - Links: How It Works, Explore, FAQ (on-page) + Blog, Community (external)
  - All navigation properly linked between pages

- ✅ Created /blog/ directory and single-page blog structure:
  - Built /blog/index.html with dropdown selector
  - All 4 blog posts on one page (shown/hidden via JS)
  - Ultra-minimal navigation (no logo, centered links)
  - Clean article layout (title only, no metadata visible)
  - "Back to Home" link at bottom of each article
  - Smooth scroll to selected article
  - Glassmorphism dropdown with teal accent
  - Article content max-width: 680px for readability
  - No footer (ultra-minimal design)

- ✅ SEO optimization for blog page:
  - Comprehensive meta tags (title, description, keywords)
  - Open Graph + Twitter Card tags
  - Schema.org BlogPosting markup for each article
  - Semantic HTML (article, header, time tags)
  - Meta dates and author (hidden but crawlable)

- ✅ Established blog content strategy:
  - Identified 4 blog topics with SEO keywords
  - Set writing guidelines: 1,500-2,500 words per post
  - Target readability: 8th-9th grade level
  - Structure: Hook → Intro → Main content → Conclusion
  - Tone: Professional but conversational
  - Publishing priority: Start with "Why We Built DokiDoki"

**Session 8 - All 5 Blog Posts Written & Published:**
**Date:** 2025-12-15

- ✅ **Blog 1: "Why DokiDoki Exists"** (~1,850 words)
  - Removed personal "I failed Prelims" story per user request
  - Focus on problem (Reddit noise, lack of feedback) and solution
  - Honest positioning: not a magic solution, just focused environment
  - Keywords: UPSC answer writing, distraction-free practice

- ✅ **Blog 2: "Why Reddit Won't Help You Clear UPSC"** (~2,000 words)
  - Initially wrote 30-day tactical plan (too rigid)
  - Rewrote as simple, conversational advice
  - Removed action plans, checklists, day-by-day structure
  - Focus: why social media fails + simple tips to break habit
  - Keywords: UPSC Reddit, social media preparation

- ✅ **Blog 3: "How to Practice Answer Writing Without Evaluator"** (~1,300 words)
  - Short, focused blog based on user answers
  - 5-parameter evaluation system explained
  - Multiple evaluators → averaged scores + parameter breakdown
  - Acknowledges coaching is best, but for remote aspirants
  - Keywords: UPSC answer writing practice, evaluation

- ✅ **Blog 4: "Automating Daily PYQs with GitHub Actions"** (~2,000 words)
  - First technical blog showing mid-level engineering
  - Compared 4 solution options (VPS, Firebase, Lambda, GitHub Actions)
  - Code examples: JavaScript (question assignment, push notifications), YAML (workflow)
  - Timezone handling (IST = UTC + 5:30)
  - Scalability analysis: easily handles 10K users
  - Modern code blocks with language tags implemented
  - Shows pragmatic decisions, not over-engineering

- ✅ **Blog 5: "Why We Migrated Firebase to Supabase"** (~2,100 words)
  - 4-phase narrative: POC → Growth → Breaking Point → Migration
  - Honest story: started Firebase (fast), migrated when complex
  - Only 10 internal users when migrated (easy switch)
  - Code comparisons: Firestore (6+ queries) vs Supabase (1 query)
  - Shows mid-level engineering: start simple, migrate when needed
  - SQL vs NoSQL trade-offs explained clearly

**Technical Achievements:**
- ✅ Modern code block styling implemented
  - Language tags (JavaScript, SQL, YAML)
  - Dark editor theme (#0d0d0d)
  - Syntax highlighting colors
  - Custom scrollbar styling
  - Professional, clean presentation

- ✅ Content quality maintained
  - Removed all em dashes per user request
  - Simple, conversational tone (no corporate speak)
  - 8th-9th grade reading level
  - Honest about limitations and challenges
  - Research-backed (topper quotes, studies)

**SEO Strategy:**
- 3 UPSC-focused blogs (High SEO value for user acquisition)
- 2 technical blogs (Low SEO, high credibility/trust)
- All dates: 2025-12-15
- Schema.org markup for all posts
- Proper meta tags, Open Graph, Twitter Cards

**Session 9 - Landing Page Carousel Implementation:**
**Date:** 2025-12-15

- ✅ **Strategic Decision: Remove /posts/ page plans**
  - User decided NOT to build separate community posts page
  - Landing page goal = drive app downloads (not content browsing)
  - Community lives in the app, not on website
  - Landing page → Blog → App download funnel

- ✅ **Removed Product Demo section**
  - Deleted separate screenshot slideshow with 5 images
  - Removed download buttons (Google Play, iOS Coming Soon)
  - Simplified Explore section subtitle

- ✅ **Removed "From Our Community" section**
  - Deleted 3 dummy post cards
  - Removed "View All Community Posts" link
  - Removed /posts/ navigation link from header

- ✅ **Implemented Modern Community Carousel**
  - **HTML:** 10 slides with all app screenshots (0.png - 9.png)
  - **CSS:** Glossy gradient border with 6s animation loop
  - **CSS:** Dark glassmorphism background with subtle gradients
  - **CSS:** Floating glow effects (multi-layer shadows)
  - **CSS:** Responsive design (desktop 350px, tablet 280px, mobile 240px)
  - **JavaScript:** Auto-advance carousel (4 seconds per slide)
  - **JavaScript:** Manual controls (prev/next buttons, dot navigation)
  - **JavaScript:** Touch/swipe gestures for mobile
  - **JavaScript:** Keyboard navigation (arrow keys)
  - **JavaScript:** Pause on hover functionality
  - **CTA:** "Download App & Join Community" button with shine effect

- ✅ **Carousel Visual Features**
  - Multi-stop gradient border: rgba(97, 191, 197, 0.4) → 0.3 → 0.2 → 0.3 → 0.4
  - Animated gradient shift: background-position 0% → 100% over 6s
  - Hover effect: translateY(-8px) scale(1.02) with enhanced glow
  - Active dot indicator: pill shape (10px circle → 32px × 10px)
  - Navigation buttons: glassmorphism with teal accent borders

- ✅ **Performance Optimizations**
  - GPU-accelerated transforms (translateX, scale)
  - Cubic-bezier easing: (0.4, 0, 0.2, 1)
  - Dynamic dot generation (prevents HTML bloat)
  - Touch event handling for smooth mobile swipes

**Key Learnings:**
- SEO insight: Client-side JavaScript fetch won't help SEO (Google can't see dynamic content)
- SSR/SSG needed for SEO value of community posts
- Strategic decision: Skip /posts/ page, focus on app downloads
- Better UX: Show screenshots in beautiful carousel vs browsing text posts

**Next focus:** Sitemap/robots.txt or further polish

## Blog Writing Guidelines

**Content Length:**
- Target: 1,500-2,500 words per post
- "Why We Built DokiDoki": 1,500-1,800 words
- "Why Social Media Fails": 2,000-2,500 words
- "Automating PYQs": 2,000-2,500 words
- "Firebase to Supabase": 2,500+ words

**Readability:**
- Target: 8th-9th grade reading level
- Short sentences (15-20 words max)
- Short paragraphs (2-4 sentences)
- Use bullet points and lists
- Avoid jargon or explain technical terms
- Use active voice

**Structure:**
1. Hook (100-150 words) - Start with problem/story
2. Introduction (200-300 words) - What, why, what they'll learn
3. Main Content (1,000-1,800 words) - 3-5 H2 sections
4. Conclusion (150-200 words) - Summary + CTA

**SEO Best Practices:**
- Use primary keyword in: title, first paragraph, H2 headings, conclusion
- Add 2-3 internal links (other blogs, landing page sections)
- Add 1-2 external links (authoritative sources)
- Use descriptive alt text for images/code
- Scannable format (bold key points, lists, visual breaks)

**Tone:**
- Professional but conversational
- Use "we", "our", "you"
- Share challenges and failures (builds trust)
- Empathetic for UPSC posts, technical for dev posts

**Priority Order:**
1. Why We Built DokiDoki (easiest, personal story)
2. Why Reddit Won't Work (most shareable, controversial)
3. Automating Daily PYQs (technical + user value)
4. Supabase Migration (most technical)

## Design References & Inspiration
(Add any reference links or inspiration notes here)

## Notes
- Focus on smooth, professional animations
- Maintain fast load times despite animations
- Keep mobile-first approach
- Ensure accessibility (reduced motion preferences)
- Target audience: UPSC aspirants (serious, professional tone)
