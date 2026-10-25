export interface SpeakingScenario {
  id: string;
  category: string;
  title: string;
  japaneseTitle: string;
  description: string;
  avatarRole: string;
  avatarExpression: 'friendly' | 'professional' | 'thoughtful' | 'encouraging';
  turns: {
    turnNumber: number;
    senseiPromptJp: string;
    senseiPromptFurigana: string;
    senseiPromptRomaji: string;
    senseiPromptEn: string;
    contextHint: string;
    expectedKeywords: string[];
    sampleBestResponseJp: string;
    sampleBestResponseRomaji: string;
    sampleBestResponseEn: string;
  }[];
}

export const AI_SPEAKING_SCENARIOS: SpeakingScenario[] = [
  {
    id: 'sc_daily_kaiwa',
    category: 'JFT Daily Kaiwa',
    title: 'Workplace Greetings & Asking for Assistance',
    japaneseTitle: '職場での挨拶と手伝いのお願い',
    description: 'Practice natural everyday workplace dialogues with your supervisor Yamada-san. Learn how to apologize for interruptions, request clarification, and confirm schedules.',
    avatarRole: 'Senior Colleague (先輩 - Yamada-san)',
    avatarExpression: 'friendly',
    turns: [
      {
        turnNumber: 1,
        senseiPromptJp: '田中さん、おはようございます！今日の午後のミーティングの準備は、もう終わりましたか？',
        senseiPromptFurigana: '田中[たなか]さん、おはようございます！今日[きょう]の午後[ごご]のミーティングの準備[じゅんび]は、もう終[お]わりましたか？',
        senseiPromptRomaji: 'Tanaka-san, ohayou gozaimasu! Kyou no gogo no miitingu no junbi wa, mou owarimashita ka?',
        senseiPromptEn: 'Good morning, Tanaka-san! Have you already finished the preparations for this afternoon\'s meeting?',
        contextHint: 'State that you have printed the handouts, or explain that you need another 10 minutes.',
        expectedKeywords: ['終わりました', '準備', '資料', 'まだ', '少し'],
        sampleBestResponseJp: 'おはようございます、山田さん！はい、資料のコピーはすべて終わりました。第2会議室に運んでおきます。',
        sampleBestResponseRomaji: 'Ohayou gozaimasu, Yamada-san! Hai, shiryou no kopii wa subete owarimashita. Dai-ni kaigishitsu ni hakonde okimasu.',
        sampleBestResponseEn: 'Good morning, Yamada-san! Yes, I have finished copying all the materials. I will carry them to Meeting Room 2.'
      },
      {
        turnNumber: 2,
        senseiPromptJp: '助かります！プロジェクターの電源が入るか、事前に確認しておいてもらえますか？',
        senseiPromptFurigana: '助[たす]かります！プロジェクターの電源[でんげん]が入[はい]るか、事前[じぜん]に確認[かくにん]しておいてもらえますか？',
        senseiPromptRomaji: 'Tasukarimasu! Purojekutaa no dengen ga hairu ka, jizen ni kakunin shite oite moraemasu ka?',
        senseiPromptEn: 'That is a big help! Could you please verify beforehand whether the projector turns on?',
        contextHint: 'Politely accept the request using 「承知しました」 or 「かしこまりました」.',
        expectedKeywords: ['承知しました', 'かしこまりました', '確認します', 'わかりました'],
        sampleBestResponseJp: 'はい、承知いたしました。すぐにプロジェクターの接続と画面の確認をしてまいります。',
        sampleBestResponseRomaji: 'Hai, shouchi itashimashita. Sugu ni purojekutaa no setsuzoku to gamen no kakunin o shite mairimasu.',
        sampleBestResponseEn: 'Yes, understood! I will immediately go check the projector connection and display.'
      }
    ]
  },
  {
    id: 'sc_ssw_kaigo',
    category: 'SSW Caregiver (Kaigo)',
    title: 'Morning Resident Health Check & Wheelchair Transfer',
    japaneseTitle: '利用者の体調確認と車いす移乗介助',
    description: 'Practice respectful, gentle communication with elderly care recipients (Sato-san). Greet with empathy, check for dizziness or joint pain, and safely explain movement assistance.',
    avatarRole: 'Facility Head Nurse (指導看護師 - Sato-san)',
    avatarExpression: 'encouraging',
    turns: [
      {
        turnNumber: 1,
        senseiPromptJp: '佐藤さん、おはようございます。よく眠れましたか？今朝の体調はいかがですか？',
        senseiPromptFurigana: '佐藤[さとう]さん、おはようございます。よく眠[ねむ]れましたか？今朝[けさ]の体調[たいちょう]はいかがですか？',
        senseiPromptRomaji: 'Satou-san, ohayou gozaimasu. Yoku nemuremashita ka? Kesa no taichou wa ikaga desu ka?',
        senseiPromptEn: 'Good morning, Sato-san. Did you sleep well? How are you feeling this morning?',
        contextHint: 'Greet kindly, mention asking about any dizziness or pain, and invite them to breakfast.',
        expectedKeywords: ['体調', '大丈夫', '痛い', '朝ごはん', '気分'],
        sampleBestResponseJp: '佐藤さん、おはようございます！昨日はよく眠れましたか？めまいや、お体に痛いところはありませんか？',
        sampleBestResponseRomaji: 'Satou-san, ohayou gozaimasu! Kinou wa yoku nemuremashita ka? Memai ya, o-karada ni itai tokoro wa arimasen ka?',
        sampleBestResponseEn: 'Good morning Sato-san! Did you sleep well yesterday? Do you have any dizziness or places that hurt?'
      },
      {
        turnNumber: 2,
        senseiPromptJp: '「少し腰が痛いけれど、朝ごはんは食堂で食べたいわ」とおっしゃっています。どう介助しますか？',
        senseiPromptFurigana: '「少[すこ]し腰[こし]が痛[いた]いけれど、朝[あさ]ごはんは食堂[しょくどう]で食[た]べたいわ」とおっしゃっています。どう介助[かいじょ]しますか？',
        senseiPromptRomaji: '"Koshi ga sukoshi itai keredo, asagohan wa shokudou de tabetai wa" to osshatte imasu. Dou kaijo shimasu ka?',
        senseiPromptEn: 'The resident says: "My lower back hurts a little, but I want to eat breakfast in the dining hall." How will you assist her?',
        contextHint: 'Suggest moving slowly, locking the wheelchair brakes, and holding on safely.',
        expectedKeywords: ['車いす', 'ゆっくり', 'ブレーキ', 'つかまって', 'お手伝い'],
        sampleBestResponseJp: '無理をなさらないでくださいね。車いすをお持ちしますので、ゆっくり立ち上がりましょう。手すりにつかまってください。',
        sampleBestResponseRomaji: 'Muri o nasaranai de kudasai ne. Kurumaisu o o-mochi shimasu node, yukkuri tachiagarimashou. Tesuri ni tsukamatte kudasai.',
        sampleBestResponseEn: 'Please don\'t push yourself too hard. I will bring the wheelchair, so let\'s stand up slowly. Please hold onto the handrail.'
      }
    ]
  },
  {
    id: 'sc_ssw_restaurant',
    category: 'SSW Food Service',
    title: 'Restaurant Hospitality: Orders & Allergen Inquiries',
    japaneseTitle: 'レストラン接客：注文とアレルギー確認',
    description: 'Master practical customer service Keigo. Learn how to seat guests, recite special daily dishes, inquire about egg/milk allergies, and confirm payment totals.',
    avatarRole: 'Store Manager (店長 - Suzuki-san)',
    avatarExpression: 'professional',
    turns: [
      {
        turnNumber: 1,
        senseiPromptJp: 'お客様が2名ご来店されました。席へご案内して、最初のご挨拶をしてください。',
        senseiPromptFurigana: 'お客様[きゃくさま]が2名[めい]ご来店[らいてん]されました。席[せき]へご案内[あんない]して、最初[さいしょ]のご挨拶[あいさつ]をしてください。',
        senseiPromptRomaji: 'Okyakusama ga ni-mei goraiten saremashita. Seki e go-annai shite, saisho no go-aisatsu o shite kudasai.',
        senseiPromptEn: 'Two customers have arrived. Guide them to their table and give the opening greeting.',
        contextHint: 'Use welcoming Keigo: 「いらっしゃいませ」, ask party size, guide to the table, and present menus.',
        expectedKeywords: ['いらっしゃいませ', '名様', 'ご案内', 'こちらへどうぞ', 'メニュー'],
        sampleBestResponseJp: 'いらっしゃいませ！2名様ですね。こちらのテーブル席へどうぞ。お水とメニューでございます。',
        sampleBestResponseRomaji: 'Irasshaimase! Ni-mei-sama desu ne. Kochira no teeburu-seki e douzo. O-mizu to menyuu de gozaimasu.',
        sampleBestResponseEn: 'Welcome! Two guests, correct? Right this way to this table. Here is your water and menu.'
      },
      {
        turnNumber: 2,
        senseiPromptJp: 'お客様から「このスープにエビやカニは入っていますか？」と聞かれました。どう答えますか？',
        senseiPromptFurigana: 'お客様[きゃくさま]から「このスープにエビやカニは入[はい]っていますか？」と聞[き]かれました。どう答[こた]えますか？',
        senseiPromptRomaji: 'Okyakusama kara "Kono suupu ni ebi ya kani wa haitte imasu ka?" to kikaremashita. Dou kotaemasu ka?',
        senseiPromptEn: 'The customer asks: "Does this soup contain shrimp or crab?" How do you respond?',
        contextHint: 'Never guess; state that you will check with the kitchen chef immediately and ask them to wait briefly.',
        expectedKeywords: ['確認', '厨房', 'シェフ', '少々お待ちください', 'アレルギー'],
        sampleBestResponseJp: 'アレルギーの確認ですね。念のため、厨房の料理長にすぐ確認してまいりますので、少々お待ちいただけますでしょうか。',
        sampleBestResponseRomaji: 'Arerugii no kakunin desu ne. Nen no tame, chuubou no ryourichou ni sugu kakunin shite mairimasu node, shoushou omachi itadakemasu deshou ka.',
        sampleBestResponseEn: 'Checking for allergies, I see. To be completely sure, I will check with the head chef in the kitchen right away, so could you please wait a moment?'
      }
    ]
  },
  {
    id: 'sc_visa_interview',
    category: 'Visa & Immigration',
    title: 'Japan Embassy & Immigration Interview',
    japaneseTitle: '日本大使館・出入国在留管理庁 面接シミュレーション',
    description: 'Ace your visa interview! Practice answering typical immigration officer questions regarding your motive to work in Japan, family background, and length of stay.',
    avatarRole: 'Immigration Consular Officer (入国審査官)',
    avatarExpression: 'thoughtful',
    turns: [
      {
        turnNumber: 1,
        senseiPromptJp: 'どうして日本で働きたいと思いましたか？特定技能を目指した理由を教えてください。',
        senseiPromptFurigana: 'どうして日本[にほん]で働[はたら]きたいと思[おも]いましたか？特定技能[とくていぎのう]を目指[めざ]した理由[りゆう]を教[おし]えてください。',
        senseiPromptRomaji: 'Doushite Nihon de hatarakitai to omoimashita ka? Tokutei ginou o mezashita riyuu o oshiete kudasai.',
        senseiPromptEn: 'Why did you decide that you want to work in Japan? Please tell me the reason you aimed for Specified Skilled Worker (SSW).',
        contextHint: 'Explain your motivation, interest in Japanese technology/culture/care system, and how you studied.',
        expectedKeywords: ['日本', '技術', '学びたい', '介護', '一生懸命', '役に立ちたい'],
        sampleBestResponseJp: '日本の進んだ技術とおもてなしの心を学び、日本の現場で貢献したいからです。JFTと技能試験に向けて毎日熱心に勉強してまいりました。',
        sampleBestResponseRomaji: 'Nihon no susunda gijutsu to omotenashi no kokoro o manabi, Nihon no genba de kouken shitai kara desu. JFT to ginou shiken ni mukete mainichi nesshin ni benkyou shite mairimashita.',
        sampleBestResponseEn: 'Because I wish to learn Japan\'s advanced techniques and spirit of hospitality, and contribute on the job site in Japan. I have studied diligently every day for the JFT and skill exams.'
      },
      {
        turnNumber: 2,
        senseiPromptJp: '日本での生活で、言葉や文化の違いに困ったときは、どのように解決しますか？',
        senseiPromptFurigana: '日本[にほん]での生活[せいかつ]で、言葉[ことば]や文化[ぶんか]の違[ちが]いに困[こま]ったときは、どのように解決[かいけつ]しますか？',
        senseiPromptRomaji: 'Nihon de no seikatsu de, kotoba ya bunka no chigai ni komatta toki wa, dono you ni kaiketsu shimasu ka?',
        senseiPromptEn: 'In your life in Japan, when you face difficulties due to language or cultural differences, how will you resolve them?',
        contextHint: 'State that you will consult your colleagues, supervisor (Hou-Ren-So), and continue studying Japanese diligently.',
        expectedKeywords: ['相談', '上司', '同僚', '質問', 'ルール', '勉強'],
        sampleBestResponseJp: '一人で悩まずに、職場の先輩や上司にすぐに相談（ほうれんそう）します。また、日本の生活ルールをしっかり守り、継続して日本語を勉強します。',
        sampleBestResponseRomaji: 'Hitori de nayamazu ni, shokuba no senpai ya joushi ni sugu ni soudan (Hou-Ren-So) shimasu. Mata, Nihon no seikatsu ruuru o shikkari mamori, keizoku shite Nihongo o benkyou shimasu.',
        sampleBestResponseEn: 'Without worrying alone, I will consult my senior coworkers and supervisors right away (Hou-Ren-So). Furthermore, I will strictly follow Japanese rules of living and continue studying Japanese continuously.'
      }
    ]
  }
];
