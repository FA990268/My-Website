import { EBookItem } from '../types';

export const INITIAL_EBOOKS: EBookItem[] = [
  {
    id: 'book_irodori_grammar',
    title: 'Irodori Complete Grammar & Vocab Notes (A1 & A2)',
    japaneseTitle: 'いろどり 生活の日本語 文法・語彙総まとめ',
    author: 'JFT Guru Academic Editorial Board',
    category: 'Grammar & Core Text',
    price: 4.99,
    rating: 4.9,
    reviewCount: 384,
    pages: 148,
    level: 'A1 - A2 (JFT-Basic / JLPT N4)',
    coverColor: 'from-blue-600 to-indigo-800',
    badge: 'Best Seller',
    description: 'The definitive companion for the Japan Foundation Irodori syllabus. Contains systematic breakdowns of all 18 topics, particle rules, Furigana annotations, and over 1,200 high-yield phrases.',
    tableOfContents: [
      'Chapter 1: Self-Introductions & Daily Greeting Nuances',
      'Chapter 2: Housing, Apartments & Trash Disposal Rules in Japan',
      'Chapter 3: Food Culture, Supermarket Labels & Restaurant Orders',
      'Chapter 4: Commuting, Train Delays & Asking Directions',
      'Chapter 5: Hospital Visits, Describing Symptoms & Pharmacy Slips',
      'Chapter 6: Workplace Hou-Ren-So (Report, Contact, Consult) & Keigo'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Essential Workplace Greetings & Response Protocol',
        japaneseHeader: '第1章：職場の基本挨拶と返答マナー',
        content: [
          'In a Japanese workplace, greetings are not merely pleasantries; they establish your readiness to collaborate and signal awareness of mutual responsibility.',
          'Always look directly at your team members with a 15-degree bow when uttering 「おはようございます」. When leaving for a lunch break or temporary errand, announce 「行ってまいります」 and your colleagues will respond with 「いってらっしゃい」.'
        ],
        grammarBox: {
          rule: '〜てから (Te-form + kara)',
          explanation: 'Used to express "after doing X, do Y" in a strict chronological sequence.',
          examples: [
            '手を 洗ってから、作業場に 入ってください。(Please enter the work area after washing your hands.)',
            '説明書を 読んでから、機械を 動かします。(Start the machine after reading the instruction manual.)'
          ]
        },
        vocabularyList: [
          { word: 'お疲れ様です', kana: 'おつかれさまです', meaning: 'Thank you for your hard work (standard workplace greeting)' },
          { word: '失礼します', kana: 'しつれいします', meaning: 'Excuse me (when entering/leaving an office or room)' },
          { word: '承知しました', kana: 'しょうちしました', meaning: 'Understood / Certainly (formal workplace confirmation)' }
        ]
      },
      {
        pageNumber: 2,
        title: 'Navigating Convenience Stores & Cashier Dialogues',
        japaneseHeader: '第2章：コンビニ・スーパーの実用会話',
        content: [
          'Cashier Japanese uses specialized humble and polite honorific formulas. Understanding these phrases prevents panic during daily shopping.',
          'Common cashier questions include asking if you have a point card (「ポイントカードはお持ちですか？」) and whether you need your lunch box heated up in the microwave (「お弁当を温めますか？」).'
        ],
        grammarBox: {
          rule: '〜てもいいですか (Te-form + mo ii desu ka)',
          explanation: 'Polite expression to ask for permission ("May I do X?").',
          examples: [
            'ここで 写真を 撮ってもいいですか。(May I take photos here?)',
            'レシートを もらってもいいですか。(May I have the receipt?)'
          ]
        },
        vocabularyList: [
          { word: '袋', kana: 'ふくろ', meaning: 'Plastic bag' },
          { word: '温め', kana: 'あたため', meaning: 'Heating / microwaving' },
          { word: 'お会計', kana: 'おかいけい', meaning: 'Bill / Payment calculation' }
        ]
      }
    ]
  },
  {
    id: 'book_kaigo_master',
    title: 'SSW Caregiver (Kaigo) Vocabulary & Care Terms Master',
    japaneseTitle: '特定技能 介護のことば＆ケア記録マスター',
    author: 'Nurse Hiroko Sato & JFT Guru Medical Team',
    category: 'SSW Kaigo Specialization',
    price: 6.99,
    rating: 4.95,
    reviewCount: 512,
    pages: 182,
    level: 'Care Worker Skill Test & JFT A2',
    coverColor: 'from-emerald-600 to-teal-800',
    badge: 'Essential for Kaigo',
    description: 'Developed specifically for foreign caregivers passing the Nursing Care Skills Evaluation Test and working in Japanese elderly care facilities (Tokuyo & Rojin Home).',
    tableOfContents: [
      'Chapter 1: Anatomy, Body Mechanics & Transfer Assistance',
      'Chapter 2: Vital Signs, Blood Pressure & Body Temperature Monitoring',
      'Chapter 3: Meal Assistance, Swallowing (嚥下) & Dietary Restrictions',
      'Chapter 4: Bathing & Excretion Dignity (排泄ケア)',
      'Chapter 5: Incident Reporting (ヒヤリハット) & Daily Care Charting'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Safe Body Mechanics & Bed-to-Wheelchair Transfer',
        japaneseHeader: '介護技術：ボディメカニクスの活用と移乗介助',
        content: [
          'Body mechanics principles minimize lower back strain for caregivers while ensuring maximum stability and comfort for the care recipient.',
          'Keep your base of support wide by spreading your feet shoulder-width apart, lower your center of gravity by bending your knees, and never twist your trunk while supporting a resident.'
        ],
        grammarBox: {
          rule: '〜ましょうか (Volitional + ka)',
          explanation: 'Used when kindly offering assistance to a resident ("Shall I do X for you?").',
          examples: [
            '車いすを お持ちしましょうか。(Shall I bring the wheelchair for you?)',
            '少し お水を 飲まれますか。(Would you like to drink a little water?)'
          ]
        },
        vocabularyList: [
          { word: '移乗', kana: 'いじょう', meaning: 'Transferring (from bed to chair)' },
          { word: '車椅子', kana: 'くるまいす', meaning: 'Wheelchair' },
          { word: '体位変換', kana: 'たいいへんかん', meaning: 'Repositioning the resident body' }
        ]
      }
    ]
  },
  {
    id: 'book_food_service',
    title: 'SSW Food Service & Restaurant Hospitality Japanese',
    japaneseTitle: '外食業技能測定試験 接客日本語＆衛生管理',
    author: 'Chef Kenichi Morimoto & JFT Guru Hospitality Group',
    category: 'SSW Restaurant & Kitchen',
    price: 5.99,
    rating: 4.88,
    reviewCount: 290,
    pages: 136,
    level: 'SSW Food Service Exam & JFT A2',
    coverColor: 'from-amber-600 to-orange-800',
    badge: 'Popular',
    description: 'All 7 mandatory allergen food labeling laws, Japanese restaurant customer service Keigo, POS machine operations, and HACCP kitchen hygiene rules.',
    tableOfContents: [
      'Chapter 1: Hall Customer Service: Welcoming, Guiding & Seating',
      'Chapter 2: Menu Explanations, Taking Orders & Allergen Disclosure',
      'Chapter 3: Kitchen Hygiene, Cross-Contamination & Hand Washing Steps',
      'Chapter 4: Clearing Tables, Dishwashing Machine Safety & Floor Polishing',
      'Chapter 5: Handling Customer Requests, Delays & Apologies'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Customer Service Keigo: Taking Orders with Confidence',
        japaneseHeader: '接客用語：ご注文のお伺いと復唱確認',
        content: [
          'In Japanese restaurants, repeat the customer order clearly and append 「〜でよろしかったでしょうか」 or 「〜でございますね」 to ensure accuracy.',
          'If a customer inquires about food allergies, consult the allergen matrix immediately and never guess. Severe allergens include eggs, milk, wheat, buckwheat, peanuts, shrimp, and crab.'
        ],
        grammarBox: {
          rule: '〜でございます (Polite copula)',
          explanation: 'The respectful customer-service equivalent of 「です」.',
          examples: [
            '日替わりランチで ございます。(Here is your daily lunch special.)',
            'お会計は 1,200円で ございます。(Your total is 1,200 yen.)'
          ]
        },
        vocabularyList: [
          { word: 'かしこまりました', kana: 'かしこまりました', meaning: 'Understood / Right away (polite acknowledgment)' },
          { word: '少々お待ちください', kana: 'しょうしょうおまちください', meaning: 'Please wait a moment' },
          { word: 'アレルギー', kana: 'アレルギー', meaning: 'Allergy' }
        ]
      }
    ]
  },
  {
    id: 'book_construction_safety',
    title: 'SSW Construction Safety Terms & Tool Vocab Handbook',
    japaneseTitle: '建設業 現場用語・KY活動・安全必携ハンドブック',
    author: 'Site Inspector Daisuke Takahashi',
    category: 'SSW Construction',
    price: 5.99,
    rating: 4.85,
    reviewCount: 210,
    pages: 140,
    level: 'SSW Construction Exam & JFT A2',
    coverColor: 'from-slate-700 to-slate-900',
    description: 'Hazard Prediction (KYK - Kiken Yochi Katsudo), morning assembly chants, personal protective equipment (PPE), scaffolding regulations, and heavy machinery hand signals.',
    tableOfContents: [
      'Chapter 1: Morning Assembly (Chorei) & Hazard Prediction KY Activities',
      'Chapter 2: PPE Inspection: Helmets, Safety Harnesses & Steel-Toe Boots',
      'Chapter 3: Power Tools, Hand Tools & Measuring Instruments',
      'Chapter 4: Scaffolding, Fall Prevention & High-Altitude Safety',
      'Chapter 5: Emergency Alarms, Heatstroke First Aid & Evacuation'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Morning KY Activities & Safety Confirmation',
        japaneseHeader: '朝礼とKY活動（危険予知）の手順',
        content: [
          'Every morning on a Japanese construction site begins with the radio calisthenics (Rajio Taiso) followed by the Kiken Yochi (KY) meeting.',
          'Point and call (Shisa Kanko / 指差呼称) is performed at all critical steps: Point at the target with your index finger, confirm with your eyes, and call out 「ヨシ！」 loudly.'
        ],
        grammarBox: {
          rule: '〜なければならない (Must do)',
          explanation: 'Expresses mandatory safety obligations on job sites.',
          examples: [
            '現場では 必ず 安全帯を 着用しなければならない。(Must always wear a safety harness on site.)',
            '作業前に 点検を 行わなければならない。(Must carry out inspection prior to work.)'
          ]
        },
        vocabularyList: [
          { word: '指差呼称', kana: 'しさこしょう', meaning: 'Pointing and calling safety confirmation' },
          { word: '安全第一', kana: 'あんぜんだいいち', meaning: 'Safety First' },
          { word: '足場', kana: 'あしば', meaning: 'Scaffolding' }
        ]
      }
    ]
  },
  {
    id: 'book_jft_1000_kanji',
    title: 'JFT-Basic 1000 Core Vocabulary & Kanji Drill Book',
    japaneseTitle: 'JFT-Basic 頻出語彙＆漢字マスター 1000選',
    author: 'JFT Guru Kanji Research Institute',
    category: 'Kanji & Vocabulary',
    price: 4.49,
    rating: 4.92,
    reviewCount: 440,
    pages: 160,
    level: 'JFT-Basic & JLPT N4',
    coverColor: 'from-rose-600 to-pink-800',
    badge: 'Essential',
    description: 'Every single Kanji and compound word that has appeared in JFT-Basic Prometric computer-based tests since 2019, organized by frequency and semantic clusters.',
    tableOfContents: [
      'Cluster 1: Time, Calendar, Shifts & Appointments',
      'Cluster 2: Numbers, Money, Prices & Counters',
      'Cluster 3: Travel, Directions, Stations & Roads',
      'Cluster 4: Food, Cooking, Flavors & Health',
      'Cluster 5: Work, Duties, Operations & Machines'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'High-Frequency Workplace Kanji Compounds',
        japaneseHeader: '頻出職場漢字：仕事と連絡に関する語彙',
        content: [
          'Mastering these 20 Kanji allows you to solve Section 1 (Script & Vocab) in under 8 minutes, leaving more time for the challenging reading passages.',
          'Pay special attention to Kun-yomi vs On-yomi distinctions in compound nouns: 「受付」 is read 「うけつけ」 (Kun-Kun), while 「案内」 is read 「あんない」 (On-On).'
        ],
        grammarBox: {
          rule: 'Kanji Reading Strategy',
          explanation: 'Single Kanji with Okurigana (hiragana endings) usually take Kun-yomi readings; pairs of Kanji without hiragana usually take On-yomi readings.',
          examples: [
            '書く (かく - Kun-yomi) vs 書類 (しょるい - On-yomi)',
            '会う (あう - Kun-yomi) vs 会議 (かいぎ - On-yomi)'
          ]
        },
        vocabularyList: [
          { word: '連絡', kana: 'れんらく', meaning: 'Contact / Communication' },
          { word: '準備', kana: 'じゅんび', meaning: 'Preparation / Setup' },
          { word: '確認', kana: 'かくにん', meaning: 'Confirmation / Check' }
        ]
      }
    ]
  },
  {
    id: 'book_jft_10_mock_bank',
    title: 'JFT Prometric CBT 10-Mock Exam Question Bank & Explanations',
    japaneseTitle: 'JFT-Basic 本番完全予想模試 10回分収録',
    author: 'JFT Guru Exam Strategy Division',
    category: 'Mock Exam Papers',
    price: 7.99,
    rating: 4.96,
    reviewCount: 620,
    pages: 260,
    level: 'Full JFT-Basic Preparation',
    coverColor: 'from-purple-600 to-indigo-900',
    badge: 'Ultimate Prep',
    description: '480 complete questions across 10 full test sets. Features side-by-side English explanations, vocabulary breakdowns, audio transcripts, and Prometric time management strategies.',
    tableOfContents: [
      'Test Set 01 to 03: Foundation Level Diagnostic Tests',
      'Test Set 04 to 07: Prometric High-Yield Standard Sets',
      'Test Set 08 to 10: Difficult & Tricky Questions Practice',
      'Appendix A: Comprehensive Audio Dialogue Scripts',
      'Appendix B: Quick Grammar Review Formula Sheets'
    ],
    previewPages: [
      {
        pageNumber: 1,
        title: 'Prometric CBT Timing Strategy & Section Allocation',
        japaneseHeader: '試験攻略法：60分間の時間配分と合格基準',
        content: [
          'The JFT-Basic is 60 minutes long and contains 4 sequential sections totaling 48 questions. You need 200 out of 250 scaled points to pass.',
          'Recommended timing allocation: Section 1 (Vocab): 10 minutes; Section 2 (Conversation): 10 minutes; Section 3 (Listening): 18 minutes; Section 4 (Reading): 20 minutes; 2 minutes buffer.'
        ],
        grammarBox: {
          rule: 'Section Locking Rule',
          explanation: 'Once you submit a section in Prometric CBT, you cannot return to revise answers. Maximize your review before clicking [Next Section].',
          examples: [
            'Section 1 is permanently locked once Section 2 starts.',
            'Audio plays a maximum of 2 times in Section 3.'
          ]
        },
        vocabularyList: [
          { word: '制限時間', kana: 'せいげんじかん', meaning: 'Time limit' },
          { word: '合格基準', kana: 'ごうかくきじゅん', meaning: 'Passing criteria' },
          { word: '見直し', kana: 'みなおし', meaning: 'Review / checking answers' }
        ]
      }
    ]
  }
];
