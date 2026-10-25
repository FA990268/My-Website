export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  readTime: string;
  publishDate: string;
  author: string;
  authorRole: string;
  imageGradient: string;
  summary: string;
  keyTakeaways: string[];
  contentParagraphs: {
    heading: string;
    text: string;
    callout?: string;
  }[];
}

export const INITIAL_BLOG_ARTICLES: BlogPost[] = [
  {
    id: 'post_pass_jft_30_days',
    title: 'How to Pass JFT-Basic CBT on Your First Attempt (30-Day Strategy)',
    slug: 'how-to-pass-jft-basic-30-days',
    category: 'Exam Strategy',
    readTime: '6 min read',
    publishDate: 'October 15, 2026',
    author: 'Kenji Sato',
    authorRole: 'Head of CBT Curriculum',
    imageGradient: 'from-orange-500 to-amber-600',
    summary: 'A step-by-step 4-week roadmap focusing on the 200/250 passing threshold, computer timer pacing, and mastering the 2-play listening restriction.',
    keyTakeaways: [
      'Allocate 10m for Section 1, 10m for Section 2, 18m for Section 3, and 20m for Section 4.',
      'Sections lock permanently upon submission — never submit early without reviewing flagged items.',
      'Audio plays exactly twice; train yourself to read the 4 answer choices during the preliminary 5-second silence.',
      'Focus heavily on workplace notices, train timetables, and medical clinic signs.'
    ],
    contentParagraphs: [
      {
        heading: 'Why Many N4 Holders Fail the JFT-Basic CBT',
        text: 'The Japan Foundation Test for Basic Japanese is strictly a Computer-Based Test (CBT) administered at Prometric test centers worldwide. Unlike the traditional paper-and-pencil JLPT where you can freely flip back and forth between sections, JFT enforces sequential section locks and strict audio playback constraints.'
      },
      {
        heading: 'Week 1 & 2: Vocabulary & Daily Workplace Conversations',
        text: 'Spend the first 14 days mastering the Irodori Starter A1 and Elementary 1/2 Can-do lists. Section 1 (Script & Vocabulary) features 12 straightforward questions. Scoring 11 or 12 here gives you a solid buffer for the tougher reading comprehension passages later.',
        callout: 'Pro Tip: Single Kanji with hiragana tails usually use Kun-yomi; paired Kanji compounds use On-yomi.'
      },
      {
        heading: 'Week 3: Conquering the Prometric 2-Play Audio Rule',
        text: 'In Section 3 (Listening), each dialogue can only be played twice. The biggest mistake students make is listening to the first replay without looking at the 4 options. Always glance at the 4 answer choices before the speaker begins to identify the target information (e.g. time, price, location, or next action).'
      },
      {
        heading: 'Week 4: Full-Length Timed CBT Mock Simulations',
        text: 'During the final 7 days, complete at least 3 full-length 60-minute mock tests on JFT Guru under real exam conditions with no pauses. Review your Weak Point Analytics report immediately after each attempt.'
      }
    ]
  },
  {
    id: 'post_cbt_exam_day_rules',
    title: 'Prometric CBT Exam Day Protocol: Rules, Timing & Audio Controls',
    slug: 'prometric-cbt-exam-day-protocol',
    category: 'CBT Test Centers',
    readTime: '5 min read',
    publishDate: 'September 28, 2026',
    author: 'Yuki Nakamura',
    authorRole: 'Prometric Test Center Supervisor',
    imageGradient: 'from-blue-600 to-indigo-700',
    summary: 'Everything you need to know about arriving at the test center, ID requirements, locker storage, headset testing, and on-screen keyboard navigation.',
    keyTakeaways: [
      'Arrive at least 30 minutes before your scheduled appointment; late arrivals forfeit their fees.',
      'Bring a valid passport or government-issued national identity card with matching English spelling.',
      'All personal items (phones, watches, wallets, notes) must be locked in the center lockers.',
      'Check headset volume during the preliminary sound test screen before initiating Section 1.'
    ],
    contentParagraphs: [
      {
        heading: 'Check-In & Identity Verification',
        text: 'Upon entering the Prometric testing facility, present your appointment confirmation sheet and government-issued photo ID. The supervisor will verify your name character-by-character against your registration profile, take your digital photo, and scan your palm or fingerprint.'
      },
      {
        heading: 'Locker Storage & Prohibited Items',
        text: 'Everything must be stored inside the designated locker. Even wristwatches and analog pens are prohibited inside the testing room. The test center provides a dry-erase laminated booklet and marker for rough notes, which must be returned when leaving.'
      },
      {
        heading: 'Headset Sound Check & Screen Controls',
        text: 'Before the 60-minute exam timer begins, an orientation screen allows you to adjust headset volume, toggle text font size, and practice clicking options. Make sure the sound is crisp and loud enough to overcome ambient air conditioning.'
      }
    ]
  },
  {
    id: 'post_ssw_visa_guide_2026',
    title: 'SSW Tokutei技能 1号 Visa Requirements & Salary Guide 2026',
    slug: 'ssw-tokutei-visa-requirements-salary-2026',
    category: 'SSW Careers & Visa',
    readTime: '8 min read',
    publishDate: 'October 02, 2026',
    author: 'Hiroshi Tanaka',
    authorRole: 'Licensed Administrative Scrivener (Gyoseishoshi)',
    imageGradient: 'from-emerald-600 to-teal-700',
    summary: 'Comprehensive breakdown of Specified Skilled Worker (SSW 1 & 2) visa pathways, minimum wage reforms, tax deductions, and required JFT/JLPT scores across 12 sectors.',
    keyTakeaways: [
      'JFT-Basic (200/250) or JLPT N4 is required alongside the sector-specific Skills Evaluation Test.',
      'Average gross monthly starting salary for SSW workers in Japan is ¥200,000 to ¥250,000 plus overtime.',
      'Net take-home pay is approximately 78%–82% of gross salary after health insurance, pension, and resident tax.',
      'SSW 1号 is valid for up to 5 years, with pathways to SSW 2号 allowing permanent residency and family accompaniment.'
    ],
    contentParagraphs: [
      {
        heading: 'The 2 Mandatory Qualifying Exams for SSW 1号',
        text: 'To qualify for the Specified Skilled Worker (SSW 1号) visa, foreign candidates must pass two independent tests: 1) A recognized Japanese language assessment (either JFT-Basic with at least 200 points or JLPT N4+); and 2) The Skill Evaluation Test for their chosen sector (e.g., Nursing Care, Food Service, Construction, Agriculture, or Building Cleaning).'
      },
      {
        heading: 'Japan Minimum Wage Increases & Regional Rates in 2026',
        text: 'Japan’s national average minimum hourly wage now exceeds ¥1,055/hour, with Tokyo reaching over ¥1,160/hour. SSW workers are legally entitled to receive remuneration equal to or greater than Japanese nationals performing equivalent roles.'
      },
      {
        heading: 'Understanding Monthly Deductions (Shakai Hoken & Zeikin)',
        text: 'From your gross monthly wage, four primary deductions will appear on your payslip (Kyuyo Meisaisho): Health Insurance (Kenko Hoken), Welfare Pension (Kosei Nenkin), Employment Insurance (Koyo Hoken), and Income Tax (Shotokuzei). While deductions reduce net pay, the welfare pension is partially refundable upon leaving Japan via the Lump-sum Withdrawal Payment (Dattai Ichijikin).'
      }
    ]
  }
];
