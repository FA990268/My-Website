# JFT Guru CBT Mock Exam Platform & No-Code Admin CMS

A production-ready Computer-Based Test (CBT) e-learning web platform modeled after **jftguru.com** to simulate the official **Japan Foundation Test for Basic Japanese (JFT-Basic)** Prometric examination.

---

## 🌟 Key Features

### 1. Authentic Prometric CBT Engine
- **60-Minute Global Timer:** Single continuous countdown clock across the entire exam. Flashes warning red in the final 5 minutes (< 300s). Auto-submits all answers if time expires.
- **Sequential 48 Questions across 4 Sections:**
  - Section 1: Script & Vocabulary (文字と語彙) — 12 Questions
  - Section 2: Conversation & Expression (会話と表現) — 12 Questions
  - Section 3: Listening Comprehension (聴解) — 12 Questions
  - Section 4: Reading Comprehension (読解) — 12 Questions
- **Strict One-Way Section Lock:** Freely navigate within the current section. Confirming section completion permanently locks that section.
- **Strict 2-Play Listening Audio Rule:** Custom restricted audio player allowing a maximum of 2 plays per question (`2/2` &rarr; `1/2` &rarr; `0/2 [Locked]`). Read-only progress bar prevents scrubbing, seeking, or rewinding.
- **Prometric Orange Selection Bar:** Highlights selected MCQ answer in `#f97316`.
- **Japanese Typography & Furigana:** Full `<ruby>漢字<rt>かんじ</rt></ruby>` rendering and bracket notation `漢字[かんじ]`.
- **Session Persistence:** `localStorage` preserves countdown progress, answers, flags, and audio play counts against accidental refreshes.

### 2. Instant 250-Scale Printable Result Sheet
- Scaled score out of **250 points** (Passing cut-off: **200 points**).
- **PASSED (合格)** or **FAILED (不合格)** official stamp with celebration confetti.
- Section-by-section percentage breakdown.
- Automatic weakest-area diagnostics and one-click recommendation to targeted Section Practice.
- Single-page print-optimized certificate layout (`@media print` CSS).

### 3. No-Code Admin Panel & 3-Mode Question Builder
- **Mode 1 (Text & Image):** Rich text prompt with Furigana helper and image uploader.
- **Mode 2 (PDF Page View):** Embedded high-clarity document viewer with zoom controls and page navigation paired with MCQ options.
- **Mode 3 (Audio MCQ):** Audio upload for Section 3 with restricted player and transcript helper.
- **Student & Tier Manager:** 1-click Free/Pro subscription toggles and search.

---

## 🚀 Quick Start

### 1. Install & Run Locally
```bash
cd C:\Users\faruk\.gemini\antigravity\scratch\jft-guru-cbt
npm install
npm run dev
```

### 2. Demo Credentials & 1-Click Role Switcher
The app includes a sticky **Demo Control Toolbar** at the top:
- **Student (Free Tier):** `student@jftguru.com` (Tanaka Kenji)
- **Student (Pro Tier):** Instant 1-click Pro access test
- **Admin (CMS):** `admin@jftguru.com` (JFT Guru Master)
- **Reset Seed Data:** 1-click restore to original seed questions and tests

---

## 🗄️ Database Schema & Supabase Setup

The database schema is located at `supabase/schema.sql`.

### Tables:
1. `profiles`: Candidate and Admin users with roles and `free` / `pro` tiers.
2. `mock_tests`: Exam configuration with timers, 250 max score, 200 pass mark, and tiers.
3. `questions`: Questions supporting `text_image`, `pdf_view`, and `audio_mcq` modes.
4. `exam_attempts`: Candidate attempt records with lock states, answers, and scaled scores.

### Optional Supabase Environment Variables:
Create `.env` in the project root:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```
*Note: If no Supabase credentials are provided, the application automatically uses its high-fidelity local persistence engine with zero degradation in functionality.*
