import { MockTest, Question, UserProfile, ExamAttempt, ThemeConfig, AdminCredentials } from '../types';
import { ALL_MOCK_TESTS } from './mockTestsData';

export const DEFAULT_THEME_CONFIG: ThemeConfig = {
  customLogoUrl: '',
  backgroundImageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=2000&q=80',
  instituteName: 'DAI ICHI ACADEMY CBT',
  instituteTitle: 'Dai Ichi Academy Khulna',
  instituteSlogan: 'Japanese Language and Visa Consultancy',
  isGlassEnabled: true,
  glassOpacity: 70,
  glassBlur: 16,
  glassBorder: true,
  fullTransparency: true,
  brightness: 100,
  colorTone: 'crimson',
  hueRotate: 0,
  saturation: 100
};

export const DEFAULT_ADMIN_CREDENTIALS: AdminCredentials = {
  username: 'admin@daiichi.com',
  passwordHash: 'DaiIchi#Admin2026',
  email: 'admin@daiichi.com',
  updatedAt: new Date().toISOString()
};

export const DEMO_ADMIN: UserProfile = {
  id: 'usr_admin_001',
  full_name: 'Administrator (Dai Ichi Academy Master)',
  email: 'admin@daiichi.com',
  role: 'admin',
  subscription_tier: 'pro',
  credits: 999,
  streak: 14,
  bookmarked_questions: ['q_s3_28', 'q_s4_41'],
  avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  permissions: ['manage_tests', 'manage_questions', 'view_analytics', 'manage_students', 'manage_storage', 'system_admin'],
  created_at: new Date().toISOString()
};

export const DEMO_TEACHER: UserProfile = {
  id: 'usr_teacher_001',
  full_name: 'Yamamoto Sensei (Dai Ichi Academy Khulna)',
  email: 'teacher@daiichi.com',
  role: 'teacher',
  subscription_tier: 'pro',
  credits: 999,
  streak: 21,
  bookmarked_questions: ['q_s1_01', 'q_s3_28'],
  avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
  permissions: ['manage_tests', 'manage_questions', 'view_analytics', 'manage_storage'],
  created_at: new Date().toISOString()
};

export const DEMO_STUDENT: UserProfile = {
  id: 'usr_student_001',
  full_name: 'Tanaka Kenji (田中 健二)',
  email: 'student@daiichi.com',
  role: 'student',
  subscription_tier: 'free',
  credits: 3,
  streak: 7,
  bookmarked_questions: ['q_s3_28', 'q_s4_41'],
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
  permissions: ['take_tests', 'view_own_results', 'manage_own_bookmarks'],
  created_at: new Date().toISOString()
};

export const INITIAL_MOCK_TESTS: MockTest[] = ALL_MOCK_TESTS;

export const INITIAL_QUESTIONS: Question[] = [
  // =========================================================================
  // SECTION 1: 文字と語彙 (Script and Vocabulary) - 12 Questions
  // =========================================================================
  {
    id: 'q_s1_01',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 1,
    question_mode: 'text_image',
    prompt_text: 'つぎの ぶんの ＿＿＿の ことばの よみかたとして、もっとも よい ものを １・２・３・４から ひとつ えらんでください。\n\nあしたは [友][とも]だちと [駅][えき]の [前][まえ]で 会います。',
    options: [
      { id: 'opt_1', label: 'A', text: 'あいます' },
      { id: 'opt_2', label: 'B', text: 'いいます' },
      { id: 'opt_3', label: 'C', text: 'かいます' },
      { id: 'opt_4', label: 'D', text: 'すいます' }
    ],
    correct_option_index: 0,
    explanation: '「会います」の読み方は「あいます」です。「駅の前で会います」(meet in front of the station)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_02',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 2,
    question_mode: 'text_image',
    prompt_text: '＿＿＿の ことばの よみかたとして、もっとも よい ものを １・２・３・４から ひとつ えらんでください。\n\nすみませんが、[窓][まど]を [開][あ]けて ください。',
    options: [
      { id: 'opt_1', label: 'A', text: 'つけて' },
      { id: 'opt_2', label: 'B', text: 'あけて' },
      { id: 'opt_3', label: 'C', text: 'しめて' },
      { id: 'opt_4', label: 'D', text: 'みせて' }
    ],
    correct_option_index: 1,
    explanation: '「開けて」の読み方は「あけて」です。「窓を開けてください」(Please open the window)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_03',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 3,
    question_mode: 'text_image',
    prompt_text: '＿＿＿の ひらがなは かんじで どう かきますか。１・２・３・4から ひとつ えらんでください。\n\nまいあさ [７時][しちじ]に [おきます]。',
    options: [
      { id: 'opt_1', label: 'A', text: '起きます' },
      { id: 'opt_2', label: 'B', text: '行きます' },
      { id: 'opt_3', label: 'C', text: '着きます' },
      { id: 'opt_4', label: 'D', text: '寝ます' }
    ],
    correct_option_index: 0,
    explanation: '「おきます」の漢字は「起きます」です。(Wake up at 7:00 every morning)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_04',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 4,
    question_mode: 'text_image',
    prompt_text: '＿＿＿の ひらがなは かんじで どう かきますか。１・２・３・4から ひとつ えらんでください。\n\nわたしの せんもんは [にほんご]です。',
    options: [
      { id: 'opt_1', label: 'A', text: '日本語' },
      { id: 'opt_2', label: 'B', text: '本語日' },
      { id: 'opt_3', label: 'C', text: '日本字' },
      { id: 'opt_4', label: 'D', text: '日英語' }
    ],
    correct_option_index: 0,
    explanation: '「にほんご」の正しい漢字表記は「日本語」です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_05',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 5,
    question_mode: 'text_image',
    prompt_text: '（　　）に なにを いれますか。いちばん いい ものを １・２・３・４から ひとつ えらんでください。\n\nのどが かわきましたから、つめたい お茶を （　　）たいです。',
    options: [
      { id: 'opt_1', label: 'A', text: 'たべ' },
      { id: 'opt_2', label: 'B', text: 'のみ' },
      { id: 'opt_3', label: 'C', text: 'きき' },
      { id: 'opt_4', label: 'D', text: 'よみ' }
    ],
    correct_option_index: 1,
    explanation: '「お茶を（のみ）たいです」が正解です。「お茶を飲む」(drink tea)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_06',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 6,
    question_mode: 'text_image',
    prompt_text: '（　　）に なにを いれますか。いちばん いい ものを １・２・３・４から ひとつ えらんでください。\n\nスーパーで りんごを ３つ （　　）ました。',
    options: [
      { id: 'opt_1', label: 'A', text: 'かい' },
      { id: 'opt_2', label: 'B', text: 'うり' },
      { id: 'opt_3', label: 'C', text: 'あげ' },
      { id: 'opt_4', label: 'D', text: 'まち' }
    ],
    correct_option_index: 0,
    explanation: '「スーパーでりんごを3つ（かい）ました」(Bought 3 apples at the supermarket)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_07',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 7,
    question_mode: 'text_image',
    prompt_text: '（　　）に なにを いれますか。いちばん いい ものを １・２・３・４から ひとつ えらんでください。\n\nこの へやは あかるくて、とても （　　）です。',
    options: [
      { id: 'opt_1', label: 'A', text: 'ひろい' },
      { id: 'opt_2', label: 'B', text: 'あぶない' },
      { id: 'opt_3', label: 'C', text: 'さむい' },
      { id: 'opt_4', label: 'D', text: 'からい' }
    ],
    correct_option_index: 0,
    explanation: '「明るくてとても（広い）です」(bright and very spacious)。文脈としてポジティブな「広い」が適切です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_08',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 8,
    question_mode: 'text_image',
    prompt_text: '＿＿＿の ぶんと だいたい おなじ いみの ぶんは どれですか。１・２・３・４から ひとつ えらんでください。\n\nこの 仕事[しごと]は [簡単][かんたん]です。',
    options: [
      { id: 'opt_1', label: 'A', text: 'この 仕事は むずかしくないです。' },
      { id: 'opt_2', label: 'B', text: 'この 仕事は たいへんです。' },
      { id: 'opt_3', label: 'C', text: 'この 仕事は おもしろくないです。' },
      { id: 'opt_4', label: 'D', text: 'この 仕事は ながいです。' }
    ],
    correct_option_index: 0,
    explanation: '「簡単です」(easy/simple) ＝「難しくないです」(not difficult)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_09',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 9,
    question_mode: 'text_image',
    prompt_text: 'つぎの ことばの つかいかたとして、いちばん いい ものを ひとつ えらんでください。\n\n【しずか（な）】',
    options: [
      { id: 'opt_1', label: 'A', text: 'としょかんは いつも しずかです。' },
      { id: 'opt_2', label: 'B', text: 'この ケーキは とても しずかです。' },
      { id: 'opt_3', label: 'C', text: '昨日は しずかな 天気でした。' },
      { id: 'opt_4', label: 'D', text: 'わたしは しずかな バスに のりました。' }
    ],
    correct_option_index: 0,
    explanation: '「静か（な）」は音や声がしない様子を表します。「図書館はいつも静かです」(The library is always quiet)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_10',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 10,
    question_mode: 'text_image',
    prompt_text: '（　　）に なにを いれますか。いちばん いい ものを １・２・３・４から ひとつ えらんでください。\n\n[熱][ねつ]が ありますから、きょうは [薬][くすり]を （　　）て ねます。',
    options: [
      { id: 'opt_1', label: 'A', text: 'のん' },
      { id: 'opt_2', label: 'B', text: 'たべ' },
      { id: 'opt_3', label: 'C', text: 'み' },
      { id: 'opt_4', label: 'D', text: 'きい' }
    ],
    correct_option_index: 0,
    explanation: '日本語では「薬を飲む」と言います。て形は「飲んで（のんで）」です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_11',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 11,
    question_mode: 'text_image',
    prompt_text: '＿＿＿の ことばの よみかたとして、もっとも よい ものを ひとつ えらんでください。\n\n毎週[まいしゅう] [土曜日][どようび]に [自転車][じてんしゃ]で 買い物に 行きます。',
    options: [
      { id: 'opt_1', label: 'A', text: 'じてんしゃ' },
      { id: 'opt_2', label: 'B', text: 'じどうしゃ' },
      { id: 'opt_3', label: 'C', text: 'でんしゃ' },
      { id: 'opt_4', label: 'D', text: 'ちかてつ' }
    ],
    correct_option_index: 0,
    explanation: '「自転車」の読み方は「じてんしゃ」(bicycle) です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s1_12',
    mock_test_id: 'test_jft_01',
    section_number: 1,
    question_order: 12,
    question_mode: 'text_image',
    prompt_text: '（　　）に なにを いれますか。いちばん いい ものを ひとつ えらんでください。\n\n時間が ありませんから、（　　）行きましょう。',
    options: [
      { id: 'opt_1', label: 'A', text: 'ゆっくり' },
      { id: 'opt_2', label: 'B', text: 'いそいで' },
      { id: 'opt_3', label: 'C', text: 'ぜんぜん' },
      { id: 'opt_4', label: 'D', text: 'あまり' }
    ],
    correct_option_index: 1,
    explanation: '時間がありません（No time）→「いそいで行きましょう」(Let\'s go in a hurry / quickly)。',
    created_at: new Date().toISOString()
  },

  // =========================================================================
  // SECTION 2: 会話と表現 (Conversation and Expression) - 12 Questions
  // =========================================================================
  {
    id: 'q_s2_13',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 1,
    question_mode: 'text_image',
    prompt_text: 'かいしゃで 先輩[せんぱい]と 話しています。（　　）に なにを いれますか。\n\n先輩：「田中[たなか]さん、先[さき]に 帰[かえ]るね。」\n田中：「おつかれさまでした。（　　）。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'お気をつけて' },
      { id: 'opt_2', label: 'B', text: 'いただきます' },
      { id: 'opt_3', label: 'C', text: 'はじめまして' },
      { id: 'opt_4', label: 'D', text: 'ごちそうさまでした' }
    ],
    correct_option_index: 0,
    explanation: '先に帰る先輩に対して気遣う表現として「お気をつけて（おかえりください）」が自然です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_14',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 2,
    question_mode: 'text_image',
    prompt_text: 'コンビニの レジで 店員[てんいん]と 話しています。（　　）に なにを いれますか。\n\n店員：「お会計[かいけい]は 650円[えん]です。レジ袋[ぶくろ]は ご利用[りよう]ですか。」\n客：「いいえ、（　　）。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'けっこうです（いりません）' },
      { id: 'opt_2', label: 'B', text: '２枚ください' },
      { id: 'opt_3', label: 'C', text: 'おねがいします' },
      { id: 'opt_4', label: 'D', text: 'ありがとうございます' }
    ],
    correct_option_index: 0,
    explanation: 'レジ袋を断る際、最も一般的な表現は「いいえ、けっこうです（いりません）」です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_15',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 3,
    question_mode: 'text_image',
    prompt_text: '職場で 同僚[どうりょう]に コピーを お願いしたいです。なんと言いますか。\n\n「すみません、この 書類[しょるい]を 10枚[じゅうまい] （　　）いただけませんか。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'コピーして' },
      { id: 'opt_2', label: 'B', text: 'コピーすれば' },
      { id: 'opt_3', label: 'C', text: 'コピーした' },
      { id: 'opt_4', label: 'D', text: 'コピーする' }
    ],
    correct_option_index: 0,
    explanation: '丁寧な依頼表現「〜していただけませんか」には動詞の【て形】が接続します。「コピーしていただけませんか」。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_16',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 4,
    question_mode: 'text_image',
    prompt_text: '病院[びょういん]の 受付[うけつけ]で 話しています。（　　）に なにを いれますか。\n\n受付：「きょうは どうされましたか。」\n患者：「きのうの 夜[よる]から （　　）んです。」',
    options: [
      { id: 'opt_1', label: 'A', text: '頭が 痛くて 熱が ある' },
      { id: 'opt_2', label: 'B', text: '元気に 散歩した' },
      { id: 'opt_3', label: 'C', text: 'おいしい ご飯を食べた' },
      { id: 'opt_4', label: 'D', text: '薬を 治した' }
    ],
    correct_option_index: 0,
    explanation: '医師や受付に症状を伝える表現として「頭が痛くて熱があるんです」(have a headache and fever) が適切です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_17',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 5,
    question_mode: 'text_image',
    prompt_text: '駅員[えきいん]に 電車の ホームを たずねます。なんと言いますか。\n\n「すみません、新宿行[しんじゅくゆ]きの 電車は （　　）番線[ばんせん]ですか。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'なん' },
      { id: 'opt_2', label: 'B', text: 'どれ' },
      { id: 'opt_3', label: 'C', text: 'どこ' },
      { id: 'opt_4', label: 'D', text: 'いくら' }
    ],
    correct_option_index: 0,
    explanation: 'ホームの番号を尋ねるときは「何番線（なんばんせん）ですか」と言います。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_18',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 6,
    question_mode: 'text_image',
    prompt_text: '仕事の 会議[かいぎ]に 少し 遅[おく]れそうです。上司[じょうし]に 電話で なんと言いますか。\n\n「電車が 遅れておりまして、10分ほど （　　）。申し訳ございません。」',
    options: [
      { id: 'opt_1', label: 'A', text: '遅れそうです' },
      { id: 'opt_2', label: 'B', text: '早いです' },
      { id: 'opt_3', label: 'C', text: '帰ります' },
      { id: 'opt_4', label: 'D', text: '休みます' }
    ],
    correct_option_index: 0,
    explanation: '遅刻しそうな状況を報告する表現は「10分ほど遅れそうです」(I may be about 10 minutes late)。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_19',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 7,
    question_mode: 'text_image',
    prompt_text: '友だちを 食事に さそいます。いちばん 自然[しぜん]な いいかたは どれですか。\n\n「こんばん、いっしょに ラーメンを （　　）。」',
    options: [
      { id: 'opt_1', label: 'A', text: '食べに 行きませんか' },
      { id: 'opt_2', label: 'B', text: '食べましたか' },
      { id: 'opt_3', label: 'C', text: '食べるでしょう' },
      { id: 'opt_4', label: 'D', text: '食べないでください' }
    ],
    correct_option_index: 0,
    explanation: '相手を誘う表現は「〜に行きませんか」(Won\'t you go to eat...?) です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_20',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 8,
    question_mode: 'text_image',
    prompt_text: 'レストランで 注文[ちゅうもん]が 決まりました。店員[てんいん]を よぶとき、はじめに なんと言いますか。',
    options: [
      { id: 'opt_1', label: 'A', text: '「すみません！」' },
      { id: 'opt_2', label: 'B', text: '「ごめんなさい！」' },
      { id: 'opt_3', label: 'C', text: '「しつれいしました！」' },
      { id: 'opt_4', label: 'D', text: '「さようなら！」' }
    ],
    correct_option_index: 0,
    explanation: '日本の飲食店で店員を呼ぶときは「すみません！」と声をかけます。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_21',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 9,
    question_mode: 'text_image',
    prompt_text: 'アパートの 大家[おおや]さんに あいさつします。（　　）に なにを いれますか。\n\n「今日から 201号室[ごうしつ]に 引っ越[ひっこ]してきました リーです。（　　）。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'これから よろしく お願いいたします' },
      { id: 'opt_2', label: 'B', text: 'おじゃましました' },
      { id: 'opt_3', label: 'C', text: 'いってまいります' },
      { id: 'opt_4', label: 'D', text: 'おかえりなさい' }
    ],
    correct_option_index: 0,
    explanation: '引っ越しの挨拶では「これからよろしくお願いいたします」と自己紹介を結びます。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_22',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 10,
    question_mode: 'text_image',
    prompt_text: '仕事が 終[お]わって 帰るとき、まだ 働[はたら]いている 人に なんと言いますか。',
    options: [
      { id: 'opt_1', label: 'A', text: '「お先に失礼します。」' },
      { id: 'opt_2', label: 'B', text: '「ごちそうさまでした。」' },
      { id: 'opt_3', label: 'C', text: '「いってらっしゃい。」' },
      { id: 'opt_4', label: 'D', text: '「ただいま。」' }
    ],
    correct_option_index: 0,
    explanation: '職場から先に退勤する挨拶は「お先に失礼します」(Excuse me for leaving before you) です。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_23',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 11,
    question_mode: 'text_image',
    prompt_text: '相手[あいて]の 言っていることが 聞き取れませんでした。もう 一度[いちど] 言ってほしいとき、なんと言いますか。',
    options: [
      { id: 'opt_1', label: 'A', text: '「すみません、もう一度言っていただけますか。」' },
      { id: 'opt_2', label: 'B', text: '「言わないでください。」' },
      { id: 'opt_3', label: 'C', text: '「わかりました。」' },
      { id: 'opt_4', label: 'D', text: '「聞きませんでした。」' }
    ],
    correct_option_index: 0,
    explanation: '相手にもう一度話してほしい丁寧な依頼は「すみません、もう一度言っていただけますか」。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s2_24',
    mock_test_id: 'test_jft_01',
    section_number: 2,
    question_order: 12,
    question_mode: 'text_image',
    prompt_text: '市役所[しやくしょ]で 書類[しょるい]の 書き方が わかりません。係員[かかりいん]に なんと たずねますか。\n\n「すみません、ここに （　　）書けば いいですか。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'どう' },
      { id: 'opt_2', label: 'B', text: 'だれ' },
      { id: 'opt_3', label: 'C', text: 'いつ' },
      { id: 'opt_4', label: 'D', text: 'いくら' }
    ],
    correct_option_index: 0,
    explanation: '方法を尋ねるときは「どう書けばいいですか」(How should I write here?) と言います。',
    created_at: new Date().toISOString()
  },

  // =========================================================================
  // SECTION 3: 聴解 (Listening Comprehension) - 12 Questions (audio_mcq)
  // Max 2 plays rule enforced!
  // =========================================================================
  {
    id: 'q_s3_25',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 1,
    question_mode: 'audio_mcq',
    prompt_text: '男[おとこ]の 人と 女[おんな]の 人が 話しています。２人は あした 何時[なんじ]に 会いますか。\n\n【音声[おんせい]を 聞いて、正しいものを １・２・３・４から ひとつ えらんでください】',
    reading_passage: '男：「あしたの 待ち合わせ、何時にする？」\n女：「10時は どう？」\n男：「ごめん、10時は ちょっと 用事があるんだ。30分 遅らせていい？」\n女：「じゃあ、10時半ね。駅の 改札の前で。」\n男：「うん、わかった！」',
    options: [
      { id: 'opt_1', label: 'A', text: '9時 30分' },
      { id: 'opt_2', label: 'B', text: '10時 00分' },
      { id: 'opt_3', label: 'C', text: '10時 30分' },
      { id: 'opt_4', label: 'D', text: '11時 00分' }
    ],
    correct_option_index: 2,
    explanation: '女性が10時を提案しますが、男性が用事があるため「30分遅らせて」と頼み、「10時半」に決定しました。正解はC（10時30分）。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_26',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 2,
    question_mode: 'audio_mcq',
    prompt_text: '会社で 上司[じょうし]が 指示[しじ]を 出しています。社員[しゃいん]は まず 何を しますか。',
    reading_passage: '課長：「鈴木さん、会議の準備をお願いね。まず、この資料を20部コピーしてきてくれる？その後で第2会議室のエアコンをつけておいて。」\n社員：「かしこまりました。すぐコピーしてまいります。」',
    options: [
      { id: 'opt_1', label: 'A', text: '会議室の エアコンをつける' },
      { id: 'opt_2', label: 'B', text: '資料を 20部 コピーする' },
      { id: 'opt_3', label: 'C', text: 'お茶を 準備する' },
      { id: 'opt_4', label: 'D', text: '課長に 電話をかける' }
    ],
    correct_option_index: 1,
    explanation: '課長が「まず、この資料を20部コピーしてきてくれる？」と指示しています。したがってまず行うのはBです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_27',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 3,
    question_mode: 'audio_mcq',
    prompt_text: 'スーパーで 女の人と 店員が 話しています。女の人は 何を 買いますか。',
    reading_passage: '女：「すみません、このリンゴはおいくらですか？」\n店員：「1個120円ですが、3個セットですと300円とお得ですよ。」\n女：「じゃあ、その3個セットをひとつください。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'リンゴ 1個' },
      { id: 'opt_2', label: 'B', text: 'リンゴ 3個セット' },
      { id: 'opt_3', label: 'C', text: 'ミカン 1袋' },
      { id: 'opt_4', label: 'D', text: '何も買わない' }
    ],
    correct_option_index: 1,
    explanation: '女性は「じゃあ、その3個セットをひとつください」と答えているため、正解はBです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_28',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 4,
    question_mode: 'audio_mcq',
    prompt_text: '駅のアナウンスを 聞いています。東京行きの 新幹線は何番線に きますか。',
    reading_passage: 'アナウンス：「まもなく、4番線に 14時20分発、東京行き『ひかり』号が まいります。黄色い点字ブロックの内側まで お下がりください。」',
    options: [
      { id: 'opt_1', label: 'A', text: '1番線' },
      { id: 'opt_2', label: 'B', text: '2番線' },
      { id: 'opt_3', label: 'C', text: '3番線' },
      { id: 'opt_4', label: 'D', text: '4番線' }
    ],
    correct_option_index: 3,
    explanation: '「まもなく、4番線に東京行きひかり号がまいります」とアナウンスされています。正解はD（4番線）。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_29',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 5,
    question_mode: 'audio_mcq',
    prompt_text: '病院で 医者と 男の人が 話しています。男の人は 薬を いつ 飲みますか。',
    reading_passage: '医者：「この胃薬は、毎食後、つまり朝・昼・晩のご飯を食べ終わった後に、1錠ずつ飲んでくださいね。」\n患者：「ご飯の前ではなく、ご飯の後ですね。わかりました。」',
    options: [
      { id: 'opt_1', label: 'A', text: 'ご飯を 食べる前' },
      { id: 'opt_2', label: 'B', text: 'ご飯を 食べた後' },
      { id: 'opt_3', label: 'C', text: '寝る直前だけ' },
      { id: 'opt_4', label: 'D', text: 'お風呂に入った後' }
    ],
    correct_option_index: 1,
    explanation: '医者が「毎食後、ご飯を食べ終わった後に」と指示しています。正解はBです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_30',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 6,
    question_mode: 'audio_mcq',
    prompt_text: '男の人と 女の人が レストランで 話しています。女の人は 何を 注文しますか。',
    reading_passage: '男：「僕はカレーライスにするよ。君は何にする？」\n女：「うーん、ハンバーグセットかパスタで迷うなぁ。でも今日はパスタの気分かな。パスタにする！」',
    options: [
      { id: 'opt_1', label: 'A', text: 'カレーライス' },
      { id: 'opt_2', label: 'B', text: 'ハンバーグセット' },
      { id: 'opt_3', label: 'C', text: 'パスタ' },
      { id: 'opt_4', label: 'D', text: 'サラダだけ' }
    ],
    correct_option_index: 2,
    explanation: '女性は「今日はパスタの気分かな。パスタにする！」と決めています。正解はC。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_31',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 7,
    question_mode: 'audio_mcq',
    prompt_text: 'アパートの 管理人[かんりにん]が ゴミの 日について 話しています。燃[も]える ゴミの 日は 何曜日ですか。',
    reading_passage: '管理人：「ゴミの分別について説明しますね。燃えるゴミは毎週火曜日と金曜日の朝8時までに出してください。缶とビンは水曜日です。」',
    options: [
      { id: 'opt_1', label: 'A', text: '月曜日と 木曜日' },
      { id: 'opt_2', label: 'B', text: '火曜日と 金曜日' },
      { id: 'opt_3', label: 'C', text: '水曜日' },
      { id: 'opt_4', label: 'D', text: '土曜日と 日曜日' }
    ],
    correct_option_index: 1,
    explanation: '「燃えるゴミは毎週火曜日と金曜日の朝8時まで」と説明されています。正解はB。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_32',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 8,
    question_mode: 'audio_mcq',
    prompt_text: '会社の 事務所で 男の人と 女の人が 話しています。男の人は 午後 どこへ 行きますか。',
    reading_passage: '女：「高橋さん、午後の予定はどうなっていますか？」\n男：「午後2時から、A社へ新しい契約書の打ち合わせに行ってきます。夕方4時には戻ります。」',
    options: [
      { id: 'opt_1', label: 'A', text: '銀行' },
      { id: 'opt_2', label: 'B', text: 'A社' },
      { id: 'opt_3', label: 'C', text: '病院' },
      { id: 'opt_4', label: 'D', text: '自宅' }
    ],
    correct_option_index: 1,
    explanation: '「午後2時から、A社へ新しい契約書の打ち合わせに行ってきます」と話しています。正解はB。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_33',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 9,
    question_mode: 'audio_mcq',
    prompt_text: '天気予報を 聞いています。あしたの 天気は どうなりますか。',
    reading_passage: '気象予報士：「あすの関東地方の天気です。朝から青空が広がり、一日中よく晴れる見込みです。お洗濯日和になるでしょう。」',
    options: [
      { id: 'opt_1', label: 'A', text: '一日中 晴れ' },
      { id: 'opt_2', label: 'B', text: '一日中 雨' },
      { id: 'opt_3', label: 'C', text: '夕方から 雪' },
      { id: 'opt_4', label: 'D', text: '曇りのち 雷' }
    ],
    correct_option_index: 0,
    explanation: '「朝から青空が広がり、一日中よく晴れる見込み」と予報されています。正解はA。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_34',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 10,
    question_mode: 'audio_mcq',
    prompt_text: '店員と 客が 話しています。客の 支払い方法は どれですか。',
    reading_passage: '店員：「合計で4,800円になります。お支払いはどうなさいますか？」\n客：「あ、クレジットカードで一括でお願いします。」\n店員：「かしこまりました。こちらの端末にカードを差し込んで暗証番号をお願いします。」',
    options: [
      { id: 'opt_1', label: 'A', text: '現金' },
      { id: 'opt_2', label: 'B', text: 'クレジットカード' },
      { id: 'opt_3', label: 'C', text: '電子マネー（Suica）' },
      { id: 'opt_4', label: 'D', text: '商品券' }
    ],
    correct_option_index: 1,
    explanation: '客が「クレジットカードで一括でお願いします」と答えています。正解はB。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_35',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 11,
    question_mode: 'audio_mcq',
    prompt_text: '留守番電話の メッセージを 聞いています。田中さんは 何を してほしいと 言っていますか。',
    reading_passage: '留守電：「ピー。こんにちは、田中です。週末のBBQの件で確認したいことがあります。このメッセージを聞いたら、折り返し私の携帯に電話をください。よろしくお願いします。」',
    options: [
      { id: 'opt_1', label: 'A', text: '田中の 携帯に 折り返し 電話する' },
      { id: 'opt_2', label: 'B', text: '週末の BBQに 肉を持っていく' },
      { id: 'opt_3', label: 'C', text: 'メールで 住所を送る' },
      { id: 'opt_4', label: 'D', text: '田中の 家へ 直接行く' }
    ],
    correct_option_index: 0,
    explanation: '「このメッセージを聞いたら、折り返し私の携帯に電話をください」と要請しています。正解はA。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s3_36',
    mock_test_id: 'test_jft_01',
    section_number: 3,
    question_order: 12,
    question_mode: 'audio_mcq',
    prompt_text: '図書館で 案内を 聞いています。本は 一度に 何冊まで 借りられますか。',
    reading_passage: '司書：「初めて利用される方へご案内です。図書カード1枚につき、本は一度に5冊まで、2週間借りることができます。」',
    options: [
      { id: 'opt_1', label: 'A', text: '2冊' },
      { id: 'opt_2', label: 'B', text: '3冊' },
      { id: 'opt_3', label: 'C', text: '5冊' },
      { id: 'opt_4', label: 'D', text: '10冊' }
    ],
    correct_option_index: 2,
    explanation: '「本は一度に5冊まで、2週間借りることができます」と説明されています。正解はC（5冊）。',
    created_at: new Date().toISOString()
  },

  // =========================================================================
  // SECTION 4: 読解 (Reading Comprehension) - 12 Questions
  // Demonstrating Mode 1 (Text & Image) and Mode 2 (PDF / Document Sheet)
  // =========================================================================
  {
    id: 'q_s4_37',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 1,
    question_mode: 'text_image',
    prompt_text: 'つぎの おしらせを よんで、しつもんに こたえてください。ただしいものを ひとつ えらんでください。\n\n【しつもん】さくらクリニックの 休診日[きゅうしんび]（休みのひ）は いつですか。',
    reading_passage: '【さくらクリニック 診療時間のお知らせ】\n\n・診療時間：午前 9:00〜12:30 / 午後 14:30〜18:00\n・休診日：木曜日午後・日曜日・祝日\n※土曜日は午前中のみ診療いたします。\n※急患の方は事前にお電話ください。',
    options: [
      { id: 'opt_1', label: 'A', text: '日曜日、祝日、木曜日午後' },
      { id: 'opt_2', label: 'B', text: '月曜日と 金曜日' },
      { id: 'opt_3', label: 'C', text: '土曜日の 午前' },
      { id: 'opt_4', label: 'D', text: 'まいにち 診療している' }
    ],
    correct_option_index: 0,
    explanation: 'お知らせ本文の「休診日：木曜日午後・日曜日・祝日」より、正解はAです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_38',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 2,
    question_mode: 'text_image',
    prompt_text: '会社で もらった メールを 読んで、質問に こたえてください。\n\n【質問】社員は 研修[けんしゅう]に 何を 持っていかなければ なりませんか。',
    reading_passage: '件名：来週の新入社員セキュリティ研修について\n送信者：人事部 山田\n\n社員の皆さんへ\n来週月曜日10:00より、3階第1研修室にてセキュリティ研修を実施します。\n各自、筆記用具と社員証を必ず持参してください。\nテキストとノートパソコンは会社で準備しますので、持ってくる必要はありません。',
    options: [
      { id: 'opt_1', label: 'A', text: '筆記用具と 社員証' },
      { id: 'opt_2', label: 'B', text: 'ノートパソコンと テキスト' },
      { id: 'opt_3', label: 'C', text: 'お弁当と 水筒' },
      { id: 'opt_4', label: 'D', text: '何も 持っていかなくてよい' }
    ],
    correct_option_index: 0,
    explanation: 'メールに「各自、筆記用具と社員証を必ず持参してください。テキストとノートパソコンは会社で準備します」と明記されています。正解はA。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_39',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 3,
    question_mode: 'pdf_view',
    prompt_text: '左側の 【JFT-Basic 読解公式パンフレット（Page 1）】を よく 読んで、しつもんに こたえてください。\n\n【しつもん】図書館で 本を 返すとき、閉館[へいかん]している 時間は どうすれば いいですか。',
    reading_passage: '【市民図書館 利用案内】\n\n開館時間：9:00〜19:00\n休館日：毎週月曜日（月曜が祝日の場合は翌日火曜日）\n\n【返却について】\n・開館中はカウンターへ直接お持ちください。\n・閉館時および休館日は、入口横の「ブックポスト（返却ポスト）」に入れてください。\n※CD・DVDなどの視聴覚資料は破損の恐れがあるため、ブックポストには入れず、開館中にカウンターへお返しください。',
    pdf_url: 'https://www.jpf.go.jp/j/project/japanese/education/jft-basic/sample/pdf/jft-sample-reading.pdf',
    pdf_page: 1,
    options: [
      { id: 'opt_1', label: 'A', text: '入口横の「ブックポスト」に 入れる' },
      { id: 'opt_2', label: 'B', text: '開館するまで 図書館の 前で 待つ' },
      { id: 'opt_3', label: 'C', text: '郵便で 図書館に 送る' },
      { id: 'opt_4', label: 'D', text: 'そのまま 家に 持って帰る' }
    ],
    correct_option_index: 0,
    explanation: '案内の「閉館時および休館日は、入口横の『ブックポスト』に入れてください」より、正解はAです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_40',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 4,
    question_mode: 'pdf_view',
    prompt_text: '左側の 資料【ゴミの 分別ルール パンフレット】を 読んで、しつもんに こたえてください。\n\n【しつもん】ペットボトルを 捨てるとき、キャップと ラベルは どうしますか。',
    reading_passage: '【資源ゴミ（ペットボトル）の出し方】\n\n①キャップとフィルムラベルを必ず外してください。\n②外したキャップとラベルは「プラスチック容器包装（プラゴミ）」へ。\n③ボトル本体の中を水で軽くすすぎ、足でつぶしてから、透明なゴミ袋に入れて専用ネットに出してください。',
    pdf_url: 'https://www.jpf.go.jp/j/project/japanese/education/jft-basic/sample/pdf/jft-sample-reading.pdf',
    pdf_page: 2,
    options: [
      { id: 'opt_1', label: 'A', text: '必ず 外して プラスチックゴミに出す' },
      { id: 'opt_2', label: 'B', text: 'つけたまま ペットボトルと 一緒に 捨てる' },
      { id: 'opt_3', label: 'C', text: '燃えるゴミの 袋に 入れる' },
      { id: 'opt_4', label: 'D', text: '洗わずに そのまま 捨てる' }
    ],
    correct_option_index: 0,
    explanation: '手順①と②「キャップとラベルを必ず外してください。外したキャップとラベルはプラスチック容器包装へ」より、正解はAです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_41',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 5,
    question_mode: 'text_image',
    prompt_text: 'アパートの 掲示板[けいじばん]に はってある おしらせを 読んで、こたえてください。\n\n【しつもん】断水[だんすい]（水が でなくなること）は いつから いつまでですか。',
    reading_passage: '【入居者の皆様へ：水道管点検に伴う一時断水のお知らせ】\n\n日時：11月15日（水） 午前10:00 〜 午後13:00（3時間）\n\n上記の時間帯は点検作業のため、全室で水道およびトイレのご使用ができません。\n作業前に、生活用水やお飲み物をあらかじめ汲み置きしていただきますようお願いいたします。ご不便をおかけしますがご協力をお願い申し上げます。\n緑ハイツ管理事務所',
    options: [
      { id: 'opt_1', label: 'A', text: '11月15日 午前10:00 〜 午後13:00' },
      { id: 'opt_2', label: 'B', text: '11月15日 一日中' },
      { id: 'opt_3', label: 'C', text: '11月16日 午前9:00 〜 午後17:00' },
      { id: 'opt_4', label: 'D', text: '毎週水曜日' }
    ],
    correct_option_index: 0,
    explanation: '掲示文の日時欄「11月15日（水）午前10:00〜午後13:00」より、正解はAです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_42',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 6,
    question_mode: 'text_image',
    prompt_text: 'レストランの メニューを 見て、質問に こたえてください。\n\n【質問】平日[へいじつ]の ランチタイムに 頼[たの]むと、無料で ついてくる ものは 何ですか。',
    reading_passage: '【カフェ・富士 平日限定ランチサービス】\n（月〜金 11:30〜14:30 ※祝日を除く）\n\nすべてのランチメニューに【ミニサラダ】と【本日のスープ】が無料セットで付きます！\n＋150円でセットドリンク（コーヒー・紅茶・烏龍茶）を追加できます。\n＋200円で本日のデザート（ミニパフェ）をお付けできます。',
    options: [
      { id: 'opt_1', label: 'A', text: 'ミニサラダと 本日のスープ' },
      { id: 'opt_2', label: 'B', text: 'コーヒーと ミニパフェ' },
      { id: 'opt_3', label: 'C', text: 'お代わりの ご飯だけ' },
      { id: 'opt_4', label: 'D', text: '無料のものは 何もない' }
    ],
    correct_option_index: 0,
    explanation: '「すべてのランチメニューに【ミニサラダ】と【本日のスープ】が無料セットで付きます」と書かれています。正解はA。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_43',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 7,
    question_mode: 'text_image',
    prompt_text: '電車の 乗り換え 案内を 読んで、質問に こたえてください。\n\n【質問】羽田空港[はねだくうこう]へ 行く人は、どの 駅で 乗り換えますか。',
    reading_passage: '【品川駅から羽田空港へのアクセス】\n\n品川駅より京急本線（快特またはエアポート急行）にご乗車ください。\n京急蒲田駅にて羽田空港第1・第2ターミナル行き空港線にお乗り換えいただけます。\n※直通のエアポート快特にご乗車の場合は、乗り換えなしで羽田空港まで直行いたします。',
    options: [
      { id: 'opt_1', label: 'A', text: '京急蒲田駅' },
      { id: 'opt_2', label: 'B', text: '東京駅' },
      { id: 'opt_3', label: 'C', text: '新宿駅' },
      { id: 'opt_4', label: 'D', text: '渋谷駅' }
    ],
    correct_option_index: 0,
    explanation: '「京急蒲田駅にて羽田空港第1・第2ターミナル行き空港線にお乗り換えいただけます」と記載されています。正解はA。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_44',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 8,
    question_mode: 'text_image',
    prompt_text: 'アルバイトの 募集[ぼしゅう] チラシを 読んで、質問に こたえてください。\n\n【質問】この アルバイトの 応募条件[じょうけん]として 正しいものは どれですか。',
    reading_passage: '【コンビニスタッフ大募集！】\n・仕事内容：レジ接客、商品陳列、店内清掃\n・時給：1,150円（早朝・深夜は25%アップ）\n・勤務時間：週2日、1日4時間からOK！シフト応相談\n・応募資格：高校生以上、未経験者大歓迎、留学生歓迎（日本語日常会話レベル可能な方）\n・交通費：全額支給、制服貸与',
    options: [
      { id: 'opt_1', label: 'A', text: '週2日、1日4時間から 働ける' },
      { id: 'opt_2', label: 'B', text: '週5日、毎日 8時間 働かなければならない' },
      { id: 'opt_3', label: 'C', text: '交通費は 自分で 払う' },
      { id: 'opt_4', label: 'D', text: '経験が ない人は 応募できない' }
    ],
    correct_option_index: 0,
    explanation: '勤務時間「週2日、1日4時間からOK！」および「未経験者大歓迎、交通費全額支給」より、正しい選択肢はAです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_45',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 9,
    question_mode: 'text_image',
    prompt_text: '薬の 説明書[せつめいしょ]を 読んで、質問に こたえてください。\n\n【質問】12歳[さい]の 子どもは、この 薬を 1回に 何錠[じょう] 飲みますか。',
    reading_passage: '【総合かぜ薬 ネオゴールド 用法・用量】\n次の量を食後なるべく30分以内に水または白湯で服用してください。\n\n・成人（15歳以上）：1回 3錠（1日3回）\n・11歳以上 15歳未満：1回 2錠（1日3回）\n・11歳未満：服用しないでください（飲まないこと）',
    options: [
      { id: 'opt_1', label: 'A', text: '2錠' },
      { id: 'opt_2', label: 'B', text: '3錠' },
      { id: 'opt_3', label: 'C', text: '1錠' },
      { id: 'opt_4', label: 'D', text: '飲んではいけない' }
    ],
    correct_option_index: 0,
    explanation: '12歳は「11歳以上15歳未満」に該当するため、「1回2錠」です。正解はA。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_46',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 10,
    question_mode: 'text_image',
    prompt_text: 'つぎの 文章[ぶんしょう]を 読んで、質問に こたえてください。\n\n【質問】筆者[ひっしゃ]（書いた人）が 日本に来て 一番[いちばん] 驚[おどろ]いたことは 何ですか。',
    reading_passage: 'わたしは去年の春にベトナムから日本へ来ました。日本での生活は最初とても緊張しましたが、職場の皆さんがとても親切に教えてくれます。\nわたしが日本に来て一番驚いたのは、街の自動販売機（じどうはんばいき）の多さです。冷たい飲み物だけでなく、温かいお茶やコーヒーまでボタン一つで買えるのは本当に便利で素晴らしいと思います。',
    options: [
      { id: 'opt_1', label: 'A', text: '街に 自動販売機が たくさん あること' },
      { id: 'opt_2', label: 'B', text: '職場の 人が 厳しいこと' },
      { id: 'opt_3', label: 'C', text: '電車が 時間どおりに 来ないこと' },
      { id: 'opt_4', label: 'D', text: '日本の冬が 寒いこと' }
    ],
    correct_option_index: 0,
    explanation: '「わたしが日本に来て一番驚いたのは、街の自動販売機の多さです」と書かれています。正解はA。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_47',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 11,
    question_mode: 'text_image',
    prompt_text: '工場の 安全[あんぜん] ルールを 読んで、質問に こたえてください。\n\n【質問】作業員[さぎょういん]は 作業場[さぎょうば]に 入る前に、何を しなければ なりませんか。',
    reading_passage: '【食品工場 クリーンルーム入場手順】\n①所定の作業着、帽子、マスクを正しく着用すること。\n②粘着ローラー（コロコロ）で作業着のホコリを念入りに除去すること。\n③石鹸で30秒以上手を洗い、アルコール消毒を行うこと。\n④エアシャワー室に入り、全身の除塵を行うこと（30秒間）。\n※以上の手順を完了しない者は、いかなる理由があっても作業場へ入場を禁じます。',
    options: [
      { id: 'opt_1', label: 'A', text: '作業着着用、ホコリ取り、手洗い消毒、エアシャワー' },
      { id: 'opt_2', label: 'B', text: '作業着を着るだけで すぐ 入ってよい' },
      { id: 'opt_3', label: 'C', text: '手を洗わずに アルコールだけ つける' },
      { id: 'opt_4', label: 'D', text: '帽子と マスクは つけなくてもよい' }
    ],
    correct_option_index: 0,
    explanation: '手順①〜④すべてを実施することが入場条件となっています。正解はAです。',
    created_at: new Date().toISOString()
  },
  {
    id: 'q_s4_48',
    mock_test_id: 'test_jft_01',
    section_number: 4,
    question_order: 12,
    question_mode: 'text_image',
    prompt_text: '郵便局[ゆうびんきょく]の 不在連絡票[ふざいれんらくひょう]を 読んで、質問に こたえてください。\n\n【質問】荷物[にもつ]を もう一度 配達[はいたつ]してもらうには、どうすれば いいですか。',
    reading_passage: '【ご不在連絡票】\nお届けにまいりましたが、ご不在のため持ち戻りました。\n\n【再配達のお申し込み方法】\n1. 表面のQRコードから24時間インターネットでお申し込みいただけます。\n2. 自動受付電話（24時間対応：0120-XXX-XXX）からもお申し込み可能です。\n※保管期限は本日より7日間となります。期限を過ぎますと差出人へ返送されますのでご注意ください。',
    options: [
      { id: 'opt_1', label: 'A', text: 'QRコードまたは 電話で 再配達を 申し込む' },
      { id: 'opt_2', label: 'B', text: '郵便局の 前で 待つ' },
      { id: 'opt_3', label: 'C', text: '何もしなくても 毎日 勝手に 届く' },
      { id: 'opt_4', label: 'D', text: '差出人に もう一度 送ってもらう' }
    ],
    correct_option_index: 0,
    explanation: '「1. 表面のQRコードから... 2. 自動受付電話からお申し込み可能です」より、正解はAです。',
    created_at: new Date().toISOString()
  }
];

export const INITIAL_DEMO_ATTEMPT: ExamAttempt = {
  id: 'att_demo_completed_001',
  user_id: 'usr_student_001',
  mock_test_id: 'test_jft_01',
  started_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  completed_at: new Date(Date.now() - 3600000 * 1).toISOString(),
  time_remaining_seconds: 480, // finished with 8 mins remaining
  current_section: 4,
  locked_sections: [1, 2, 3, 4],
  answers: {
    'q_s1_01': 0, 'q_s1_02': 1, 'q_s1_03': 0, 'q_s1_04': 0, 'q_s1_05': 1,
    'q_s1_06': 0, 'q_s1_07': 0, 'q_s1_08': 0, 'q_s1_09': 0, 'q_s1_10': 0,
    'q_s1_11': 0, 'q_s1_12': 1,
    'q_s2_13': 0, 'q_s2_14': 0, 'q_s2_15': 0, 'q_s2_16': 0, 'q_s2_17': 0,
    'q_s2_18': 0, 'q_s2_19': 0, 'q_s2_20': 0, 'q_s2_21': 0, 'q_s2_22': 0,
    'q_s2_23': 0, 'q_s2_24': 0,
    'q_s3_25': 2, 'q_s3_26': 1, 'q_s3_27': 1, 'q_s3_28': 3, 'q_s3_29': 1,
    'q_s3_30': 2, 'q_s3_31': 1, 'q_s3_32': 1, 'q_s3_33': 0, 'q_s3_34': 1,
    'q_s3_35': 0, 'q_s3_36': 2,
    'q_s4_37': 0, 'q_s4_38': 0, 'q_s4_39': 0, 'q_s4_40': 0, 'q_s4_41': 0,
    'q_s4_42': 0, 'q_s4_43': 0, 'q_s4_44': 0, 'q_s4_45': 0, 'q_s4_46': 0,
    'q_s4_47': 0, 'q_s4_48': 0
  },
  flagged_questions: ['q_s3_28', 'q_s4_41'],
  audio_play_counts: {
    'q_s3_25': 2,
    'q_s3_26': 1,
    'q_s3_27': 1,
    'q_s3_28': 2
  },
  total_score: 224, // 224 out of 250
  section_scores: {
    section1: 92, // Script & Vocab %
    section2: 92, // Conversation %
    section3: 83, // Listening %
    section4: 92  // Reading %
  },
  passed: true,
  status: 'completed'
};
