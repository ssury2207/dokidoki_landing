# Web AI Evaluator - Requirements Document
**Date:** 2026-03-14 (Updated)
**Status:** Ready for implementation

---

## Product Vision

**Core USP:** Demonstrate AI evaluation capability instantly through a clean, minimal web interface.

**Primary Goal:** Drive app downloads by letting users experience AI evaluation firsthand.

**User Flow:**
```
Land on site → Upload answer → Get evaluation → Download app
```

---

## Design Decision: ChatGPT-Style Interface

### Why This Approach?
- **Demonstrate, don't explain** - Users see the magic immediately
- **Minimal friction** - No distractions, one clear action
- **Familiar pattern** - ChatGPT/Claude-style UI is already intuitive
- **Focus on conversion** - Every element drives toward app download

### What Changed from Original Plan?
**Before:** Traditional landing page with AI evaluator as a section
**Now:** AI evaluator IS the homepage, content moved to separate page

---

## UI Design (ChatGPT/Claude Style)

### Landing State
```
┌─────────────────────────────────────────────────────────────┐
│                        DokiDoki                               │
│                                                               │
│             Upload your UPSC answer for AI evaluation         │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  📎  Attach images (max 3)           [Upload] →    │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│                        Explore  •  Blog                       │
└─────────────────────────────────────────────────────────────┘
```

### Results State
```
┌─────────────────────────────────────────────────────────────┐
│                        DokiDoki                               │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  📎  answer-page1.jpg                               │     │
│  │  📎  answer-page2.jpg                               │     │
│  │  📎  answer-page3.jpg                               │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  🤖  AI Evaluation                                  │     │
│  │                                                     │     │
│  │  Total Score: 38/50                                │     │
│  │                                                     │     │
│  │  Relevance & Understanding        8/10  ████████░░ │     │
│  │  Structure & Organization         7/10  ███████░░░ │     │
│  │  Content Depth & Examples         9/10  █████████░ │     │
│  │  Presentation & Neatness          6/10  ██████░░░░ │     │
│  │  Innovation / Value Addition      8/10  ████████░░ │     │
│  │                                                     │     │
│  │  ✅ Strengths                                       │     │
│  │  • Strong use of contemporary examples              │     │
│  │  • Clear logical flow                               │     │
│  │  • Good coverage of multiple dimensions             │     │
│  │                                                     │     │
│  │  ⚠️  Areas to Improve                               │     │
│  │  • Handwriting could be neater                      │     │
│  │  • Add more statistical data                        │     │
│  │  • Conclusion could be more impactful               │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│               ┌───────────────────────────────┐              │
│               │     Download App Now  →       │              │
│               └───────────────────────────────┘              │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐     │
│  │  📎  Upload another answer...                       │     │
│  └─────────────────────────────────────────────────────┘     │
│                                                               │
│                        Explore  •  Blog                       │
└─────────────────────────────────────────────────────────────┘
```

---

## Site Structure

### New File Organization
```
dokidoki_landing/
├── index.html              ← NEW: Clean AI evaluator (ChatGPT style)
├── explore.html            ← RENAMED: Current index.html content moved here
├── style.css               ← Updated for new minimal UI
├── script.js               ← Updated for upload/evaluation logic
├── blog/
│   └── index.html          ← Unchanged (5 blog posts)
├── 0.png - 9.png          ← App screenshots
├── dokidoki.png           ← Logo
└── web_ai_evaluator_notes.md
```

### Page Purposes
- **`/` (index.html)** - AI evaluator demo (primary conversion page)
- **`/explore.html`** - Full landing page (How It Works, FAQ, carousel, etc.)
- **`/blog/`** - Blog posts (SEO/content marketing)

### Navigation Structure
**Footer on all pages:**
```
Explore  •  Blog
```

**Links:**
- Explore → `/explore.html` (current landing page content)
- Blog → `/blog/`

**Primary CTA (after evaluation):**
- "Download App Now" button → Google Play Store URL
- Prominent, in-content placement (not just footer)

---

## Technical Implementation

### Backend Architecture (Unchanged)
**Reuse existing mobile app infrastructure:**

1. User uploads images on web
2. Create user account with existing Supabase auth
3. Create post in `posts` table (same as mobile)
4. Call existing `aievaluator` edge function
5. Display evaluation results

**Edge Function:**
- Name: `aievaluator`
- Authentication: JWT token required
- Rate Limiting: 5 evaluations/day per user_id
- Caching: Checks database for existing evaluation by post_id
- **Decision: DO NOT MODIFY** - use exactly as-is

### Authentication Flow
**Decision: Use existing login/signup (same as mobile app)**

**Why:**
- No new backend code needed
- Reuses all existing infrastructure
- Rate limiting works automatically
- User accounts work across web + mobile

**Flow:**
```
User uploads images
    ↓
Click "Get Evaluation"
    ↓
Signup/Login required (Supabase auth)
    ↓
Email verification required
    ↓
Create post in database
    ↓
Call aievaluator edge function
    ↓
Display results
```

### Image Handling
- **Storage:** Cloudinary (same as mobile app)
- **Max images:** 3 photos
- **Format:** JPEG/PNG
- **Upload:** Direct to Cloudinary, URLs stored in post

---

## Design Principles

### UI/UX
1. **Ultra minimal** - Remove all non-essential elements
2. **Center-aligned** - ChatGPT/Claude-style layout
3. **Conversational flow** - User action → AI response
4. **Single focus** - One clear action at a time
5. **No distractions** - No nav menu, minimal chrome

### Visual Design
- **Theme:** Dark background (#121212)
- **Font:** Hanken Grotesk (already loaded)
- **Accent:** Teal gradient (#61bfc5 to #4a9ca2)
- **Cards:** Glassmorphism with backdrop-filter
- **Spacing:** Generous whitespace
- **Responsive:** Mobile-first design

### Content Strategy
- **Headline:** "Upload your UPSC answer for AI evaluation"
- **Subheadline:** (optional) Brief one-liner
- **CTA:** Clear, action-oriented ("Upload", "Get Evaluation")
- **Results:** Clean, scannable format
- **Download prompt:** After results, prominent button

---

## User Flows

### First-Time User (Happy Path)
```
1. Land on /
2. See clean upload interface
3. Upload 3 answer images
4. Click "Get Evaluation"
5. Signup/login required
6. Email verification
7. Return to site
8. Evaluation runs (5 seconds)
9. See detailed results
10. Click "Download App"
11. Install from Play Store
```

### User Wanting More Info
```
1. Land on /
2. Click "Explore" in footer
3. See full landing page (How It Works, FAQ)
4. Return to / to try demo
5. Upload and evaluate
6. Download app
```

### Return User
```
1. Land on /
2. Already logged in
3. Upload images immediately
4. Get evaluation (hits rate limit check)
5. See results
6. Upload another (up to 5/day)
```

---

## Key Features

### Landing Page (index.html)
- Logo/brand at top
- Single headline
- Upload interface (drag & drop or click)
- Max 3 images indicator
- Minimal footer (Explore • Blog)

### Evaluation Flow
- Loading state with progress indicator
- "Analyzing your answer..." message
- Time estimate (~5 seconds)

### Results Display
- Uploaded images preview (thumbnails)
- AI evaluation card with:
  - Total score (X/50)
  - 5 parameter scores with progress bars
  - Strengths (bullet points)
  - Areas to improve (bullet points)
- **Download App button** (prominent, in content)
- "Upload another answer" input

---

## Technical Requirements

### Frontend
- Pure HTML/CSS/JS (no frameworks)
- Supabase client library for auth
- Cloudinary upload widget
- Responsive design (mobile-first)
- Fast load times (<2s)

### Integration Points
1. **Supabase Auth** - Signup/login/email verification
2. **Cloudinary** - Image upload and storage
3. **Supabase Edge Function** - Call `aievaluator` with post_id
4. **Supabase Database** - Create post, fetch evaluation

### API Calls
```javascript
// 1. Upload images to Cloudinary → Get URLs
// 2. Create post in posts table
// 3. Call edge function
const { data, error } = await supabase.functions.invoke('aievaluator', {
  body: {
    post_id: postId,
    image_urls: imageUrls,
    question: null // optional
  }
})
// 4. Display evaluation results
```

---

## Constraints & Limitations

### Technical Constraints
- Cannot modify edge function
- Must use email verification (Supabase config)
- Must create posts in database (not ephemeral)
- Rate limit: 5 evaluations/day per user
- Max 3 images per evaluation

### Design Constraints
- Must maintain dark theme consistency
- Must use Hanken Grotesk font
- Must work on mobile devices
- Must load quickly

### Business Constraints
- Primary goal: Drive app downloads
- Secondary goal: Demonstrate AI capability
- Content/SEO preserved in /explore and /blog

---

## Success Metrics

### User Engagement
- Upload completion rate
- Evaluation completion rate
- Time to first evaluation
- Return user rate

### Conversion
- App download click rate (primary metric)
- Signup completion rate
- Email verification rate

### Technical
- Page load time (<2s)
- Evaluation response time (~5s)
- Error rate (<5%)

---

## Out of Scope (for MVP)

- Anonymous/guest evaluations (auth required)
- Magic link login (use standard email/password)
- Evaluation history page
- Social sharing features
- Payment/premium features
- Custom branding per user
- Multiple language support

---

## Implementation Checklist

### Phase 1: Setup (Current)
- [x] Read existing codebase
- [x] Understand current landing page
- [x] Define new UI design (ChatGPT style)
- [ ] Update requirements document

### Phase 2: File Restructure
- [ ] Rename index.html to explore.html
- [ ] Create new minimal index.html
- [ ] Update all internal links
- [ ] Test navigation between pages

### Phase 3: Build UI
- [ ] Landing state (upload interface)
- [ ] Loading state (evaluating)
- [ ] Results state (evaluation display)
- [ ] Mobile responsive design
- [ ] Footer navigation

### Phase 4: Backend Integration
- [ ] Supabase auth setup (signup/login)
- [ ] Cloudinary upload integration
- [ ] Create post in database
- [ ] Call aievaluator edge function
- [ ] Handle errors and edge cases

### Phase 5: Polish
- [ ] Loading animations
- [ ] Error messages
- [ ] Success states
- [ ] Download app CTA
- [ ] Cross-browser testing

### Phase 6: Deploy
- [ ] Test on staging
- [ ] Update Vercel deployment
- [ ] Verify all links work
- [ ] Monitor analytics

---

## Development Notes

### Current Status (2026-03-14)
- Requirements finalized
- UI design approved (ChatGPT/Claude style)
- Architecture decided (reuse mobile app backend)
- Ready to start implementation

### Key Decisions Made
1. ✅ ChatGPT-style interface (minimal, focused)
2. ✅ Homepage = demo, content moved to /explore
3. ✅ Reuse existing auth (no anonymous mode)
4. ✅ Download App button in content (not just footer)
5. ✅ Footer minimal: Explore • Blog only

### Next Steps
1. Rename current index.html to explore.html
2. Build new minimal index.html
3. Implement upload interface
4. Connect to aievaluator edge function
5. Build results display

---

## Questions & Answers

**Q: Why not allow anonymous evaluations?**
A: Backend requires auth for edge function, rate limiting, and database storage.

**Q: Why move content to separate page?**
A: Focus homepage on demonstration (conversion), not explanation.

**Q: Why ChatGPT-style UI?**
A: Familiar, minimal, focused on single action - proven pattern for conversion.

**Q: What about SEO for the content?**
A: Preserved in /explore and /blog pages, still indexed by Google.

**Q: How to handle email verification friction?**
A: Accepted trade-off - prevents abuse, aligns with mobile app flow.

---

**Last Updated:** 2026-03-14
**Next Review:** After Phase 3 (UI build complete)
