// 25 Japanese Tools Data Bank

export interface HiraganaItem {
  kana: string;
  romaji: string;
}

export const HIRAGANA_GRID: HiraganaItem[] = [
  { kana: 'あ', romaji: 'a' }, { kana: 'い', romaji: 'i' }, { kana: 'う', romaji: 'u' }, { kana: 'え', romaji: 'e' }, { kana: 'お', romaji: 'o' },
  { kana: 'か', romaji: 'ka' }, { kana: 'き', romaji: 'ki' }, { kana: 'く', romaji: 'ku' }, { kana: 'け', romaji: 'ke' }, { kana: 'こ', romaji: 'ko' },
  { kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' }, { kana: 'す', romaji: 'su' }, { kana: 'せ', romaji: 'se' }, { kana: 'そ', romaji: 'so' },
  { kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' }, { kana: 'つ', romaji: 'tsu' }, { kana: 'て', romaji: 'te' }, { kana: 'と', romaji: 'to' },
  { kana: 'な', romaji: 'na' }, { kana: 'に', romaji: 'ni' }, { kana: 'ぬ', romaji: 'nu' }, { kana: 'ね', romaji: 'ne' }, { kana: 'の', romaji: 'no' },
  { kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' }, { kana: 'ふ', romaji: 'fu' }, { kana: 'へ', romaji: 'he' }, { kana: 'ほ', romaji: 'ho' },
  { kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' }, { kana: 'む', romaji: 'mu' }, { kana: 'め', romaji: 'me' }, { kana: 'も', romaji: 'mo' },
  { kana: 'や', romaji: 'ya' }, { kana: 'ゆ', romaji: 'yu' }, { kana: 'よ', romaji: 'yo' },
  { kana: 'ら', romaji: 'ra' }, { kana: 'り', romaji: 'ri' }, { kana: 'る', romaji: 'ru' }, { kana: 'れ', romaji: 're' }, { kana: 'ろ', romaji: 'ro' },
  { kana: 'わ', romaji: 'wa' }, { kana: 'を', romaji: 'wo' }, { kana: 'ん', romaji: 'n' }
];

export const KATAKANA_GRID: HiraganaItem[] = [
  { kana: 'ア', romaji: 'a' }, { kana: 'イ', romaji: 'i' }, { kana: 'ウ', romaji: 'u' }, { kana: 'エ', romaji: 'e' }, { kana: 'オ', romaji: 'o' },
  { kana: 'カ', romaji: 'ka' }, { kana: 'キ', romaji: 'ki' }, { kana: 'ク', romaji: 'ku' }, { kana: 'ケ', romaji: 'ke' }, { kana: 'コ', romaji: 'ko' },
  { kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' }, { kana: 'ス', romaji: 'su' }, { kana: 'セ', romaji: 'se' }, { kana: 'ソ', romaji: 'so' },
  { kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' }, { kana: 'ツ', romaji: 'tsu' }, { kana: 'テ', romaji: 'te' }, { kana: 'ト', romaji: 'to' },
  { kana: 'ナ', romaji: 'na' }, { kana: 'ニ', romaji: 'ni' }, { kana: 'ヌ', romaji: 'nu' }, { kana: 'ネ', romaji: 'ne' }, { kana: 'ノ', romaji: 'no' },
  { kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' }, { kana: 'フ', romaji: 'fu' }, { kana: 'ヘ', romaji: 'he' }, { kana: 'ホ', romaji: 'ho' },
  { kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' }, { kana: 'ム', romaji: 'mu' }, { kana: 'メ', romaji: 'me' }, { kana: 'モ', romaji: 'mo' },
  { kana: 'ヤ', romaji: 'ya' }, { kana: 'ユ', romaji: 'yu' }, { kana: 'ヨ', romaji: 'yo' },
  { kana: 'ラ', romaji: 'ra' }, { kana: 'リ', romaji: 'ri' }, { kana: 'ル', romaji: 'ru' }, { kana: 'レ', romaji: 're' }, { kana: 'ロ', romaji: 'ro' },
  { kana: 'ワ', romaji: 'wa' }, { kana: 'ヲ', romaji: 'wo' }, { kana: 'ン', romaji: 'n' }
];

export interface KanjiStrokeInfo {
  kanji: string;
  strokes: number;
  onyomi: string[];
  kunyomi: string[];
  meaning: string;
  radical: string;
  jlpt: string;
  stepGuide: string[];
}

export const KANJI_SAMPLE_BANK: KanjiStrokeInfo[] = [
  { kanji: '日', strokes: 4, onyomi: ['ニチ', 'ジツ'], kunyomi: ['ひ', 'か'], meaning: 'Day, Sun, Japan', radical: '日', jlpt: 'N5', stepGuide: ['1: Left vertical', '2: Top horizontal down right', '3: Middle horizontal', '4: Bottom horizontal closing'] },
  { kanji: '月', strokes: 4, onyomi: ['ゲツ', 'ガツ'], kunyomi: ['つき'], meaning: 'Month, Moon', radical: '月', jlpt: 'N5', stepGuide: ['1: Left sweep down', '2: Top horizontal hook down', '3: First inner bar', '4: Second inner bar'] },
  { kanji: '木', strokes: 4, onyomi: ['ボク', 'モク'], kunyomi: ['き'], meaning: 'Tree, Wood', radical: '木', jlpt: 'N5', stepGuide: ['1: Horizontal crossbar', '2: Center vertical hook', '3: Left downward diagonal', '4: Right downward diagonal'] },
  { kanji: '水', strokes: 4, onyomi: ['スイ'], kunyomi: ['みず'], meaning: 'Water', radical: '水', jlpt: 'N5', stepGuide: ['1: Center vertical hook', '2: Upper-left sweep', '3: Lower-left sweep', '4: Right sweep down'] },
  { kanji: '火', strokes: 4, onyomi: ['カ'], kunyomi: ['ひ'], meaning: 'Fire', radical: '火', jlpt: 'N5', stepGuide: ['1: Left dot', '2: Right dot', '3: Center sweep down left', '4: Right sweep down right'] },
  { kanji: '人', strokes: 2, onyomi: ['ジン', 'ニン'], kunyomi: ['ひと'], meaning: 'Person, Human', radical: '人', jlpt: 'N5', stepGuide: ['1: Left diagonal sweep', '2: Right diagonal support'] },
  { kanji: '車', strokes: 7, onyomi: ['シャ'], kunyomi: ['くるま'], meaning: 'Car, Vehicle, Wheel', radical: '車', jlpt: 'N5', stepGuide: ['1: Top horizontal', '2: Left vertical box', '3: Right vertical box', '4: Inner horizontal', '5: Lower box line', '6: Long bottom horizontal', '7: Center vertical axis through all'] },
  { kanji: '食', strokes: 9, onyomi: ['ショク'], kunyomi: ['た・べる'], meaning: 'Eat, Food', radical: '食', jlpt: 'N5', stepGuide: ['1: Roof left', '2: Roof right', '3: Horizontal under roof', '4: Center stroke', '5-9: Lower bowl strokes'] },
  { kanji: '飲', strokes: 12, onyomi: ['イン'], kunyomi: ['の・む'], meaning: 'Drink', radical: '食', jlpt: 'N5', stepGuide: ['1-8: Left radical food', '9-12: Right yawn radical (欠)'] },
  { kanji: '駅', strokes: 14, onyomi: ['エキ'], kunyomi: [], meaning: 'Railway Station', radical: '馬', jlpt: 'N5', stepGuide: ['1-10: Left horse radical (馬)', '11-14: Right尺 component'] }
];

export interface DictWord {
  id: string;
  kanji: string;
  kana: string;
  romaji: string;
  pos: string;
  meaning: string;
  level: string;
  exampleJp: string;
  exampleEn: string;
}

export const DICTIONARY_WORDS: DictWord[] = [
  { id: 'w1', kanji: '受付', kana: 'うけつけ', romaji: 'uketsuke', pos: 'Noun', meaning: 'Reception desk, information counter', level: 'N5 / JFT', exampleJp: '受付で 診察券を 出してください。', exampleEn: 'Please submit your consultation card at the reception desk.' },
  { id: 'w2', kanji: '確認', kana: 'かくにん', romaji: 'kakunin', pos: 'Noun, Suru Verb', meaning: 'Confirmation, verification, check', level: 'N4 / JFT', exampleJp: '作業前に 安全装置を 確認してください。', exampleEn: 'Please confirm the safety mechanism prior to work.' },
  { id: 'w3', kanji: '準備', kana: 'じゅんび', romaji: 'junbi', pos: 'Noun, Suru Verb', meaning: 'Preparation, arrangement, setup', level: 'N5 / JFT', exampleJp: '明日の 会議の 準備を 始めます。', exampleEn: 'I will start preparing for tomorrow\'s meeting.' },
  { id: 'w4', kanji: '案内', kana: 'あんない', romaji: 'annai', pos: 'Noun, Suru Verb', meaning: 'Guidance, escort, information', level: 'N5 / JFT', exampleJp: 'お客様を 席へ ご案内します。', exampleEn: 'I will guide the customer to their table.' },
  { id: 'w5', kanji: '連絡', kana: 'れんらく', romaji: 'renraku', pos: 'Noun, Suru Verb', meaning: 'Contact, communication, notifying', level: 'N4 / JFT', exampleJp: '遅れるときは、必ず 電話で 連絡してください。', exampleEn: 'If you are going to be late, always contact us by telephone.' },
  { id: 'w6', kanji: '手伝う', kana: 'てつだう', romaji: 'tetsudau', pos: 'Godan Verb', meaning: 'To help, to assist', level: 'N5 / JFT', exampleJp: '荷物を 運ぶのを 手伝いましょうか。', exampleEn: 'Shall I help you carry the luggage?' },
  { id: 'w7', kanji: '注意', kana: 'ちゅうい', romaji: 'chuui', pos: 'Noun, Suru Verb', meaning: 'Caution, warning, attention', level: 'N5 / JFT', exampleJp: '足元に 注意して 歩いてください。', exampleEn: 'Please walk carefully watching your step.' },
  { id: 'w8', kanji: '大切', kana: 'たいせつ', romaji: 'taisetsu', pos: 'Na-adjective', meaning: 'Important, precious, valuable', level: 'N5 / JFT', exampleJp: '健康管理は とても 大切です。', exampleEn: 'Managing one\'s health is very important.' },
  { id: 'w9', kanji: '指示', kana: 'しじ', romaji: 'shiji', pos: 'Noun, Suru Verb', meaning: 'Instruction, direction, order', level: 'N4 / JFT', exampleJp: '上司の 指示に従って 作業します。', exampleEn: 'We work following the supervisor\'s instructions.' },
  { id: 'w10', kanji: '相談', kana: 'そうだん', romaji: 'soudan', pos: 'Noun, Suru Verb', meaning: 'Consultation, discussion, advice', level: 'N4 / JFT', exampleJp: '困ったときは 先輩に 相談しましょう。', exampleEn: 'When in trouble, let us consult our senior colleagues.' }
];

export interface VerbConjugationItem {
  dictionary: string;
  kana: string;
  group: 'Group 1 (Godan)' | 'Group 2 (Ichidan)' | 'Group 3 (Irregular)';
  meaning: string;
  masu: string;
  nai: string;
  te: string;
  ta: string;
  potential: string;
  passive: string;
  causative: string;
}

export const VERB_CONJUGATIONS: VerbConjugationItem[] = [
  { dictionary: '行く', kana: 'いく', group: 'Group 1 (Godan)', meaning: 'To go', masu: '行きます (ikimasu)', nai: '行かない (ikanai)', te: '行って (itte)', ta: '行った (itta)', potential: '行ける (ikeru)', passive: '行かれる (ikareru)', causative: '行かせる (ikaseru)' },
  { dictionary: '食べる', kana: 'たべる', group: 'Group 2 (Ichidan)', meaning: 'To eat', masu: '食べます (tabemasu)', nai: '食べない (tabenai)', te: '食べて (tabete)', ta: '食べた (tabeta)', potential: '食べられる (taberareru)', passive: '食べられる (taberareru)', causative: '食べさせる (tabesaseru)' },
  { dictionary: 'する', kana: 'する', group: 'Group 3 (Irregular)', meaning: 'To do', masu: 'します (shimasu)', nai: 'しない (shinai)', te: 'して (shite)', ta: 'した (shita)', potential: 'できる (dekiru)', passive: 'される (sareru)', causative: 'させる (saseru)' },
  { dictionary: '来る', kana: 'くる', group: 'Group 3 (Irregular)', meaning: 'To come', masu: '来ます (kimasu)', nai: '来ない (konai)', te: '来て (kite)', ta: '来た (kita)', potential: '来られる (korareru)', passive: '来られる (korareru)', causative: '来させる (kosaseru)' },
  { dictionary: '飲む', kana: 'のむ', group: 'Group 1 (Godan)', meaning: 'To drink', masu: '飲みます (nomimasu)', nai: '飲まない (nomanai)', te: '飲んで (nonde)', ta: '飲んだ (nonda)', potential: '飲める (nomeru)', passive: '飲まれる (nomareru)', causative: '飲ませる (nomaseru)' },
  { dictionary: '話す', kana: 'はなす', group: 'Group 1 (Godan)', meaning: 'To speak', masu: '話します (hanashimasu)', nai: '話さない (hanasanai)', te: '話して (hanashite)', ta: '話した (hanashita)', potential: '話せる (hanaseru)', passive: '話される (hanasareru)', causative: '話させる (hanasaseru)' },
  { dictionary: '待つ', kana: 'まつ', group: 'Group 1 (Godan)', meaning: 'To wait', masu: '待ちます (machimasu)', nai: '待たない (matanai)', te: '待って (matte)', ta: '待った (matta)', potential: '待てる (materu)', passive: '待たれる (matareru)', causative: '待たせる (mataseru)' },
  { dictionary: '買う', kana: 'かう', group: 'Group 1 (Godan)', meaning: 'To buy', masu: '買います (kaimasu)', nai: '買わない (kawanai)', te: '買って (katte)', ta: '買った (katta)', potential: '買える (kaeru)', passive: '買われる (kawareru)', causative: '買わせる (kawaseru)' }
];

export interface ParticleQuizItem {
  id: string;
  sentence: string; // with [?]
  options: string[];
  correct: string;
  explanation: string;
  translation: string;
}

export const PARTICLE_QUIZ_LIST: ParticleQuizItem[] = [
  { id: 'pq1', sentence: '私は 毎朝 7時 [?] 起きます。', options: ['に', 'で', 'を', 'へ'], correct: 'に', explanation: 'Specific points of time require the particle 「に」.', translation: 'I wake up at 7 o\'clock every morning.' },
  { id: 'pq2', sentence: '電車 [?] 会社へ 行きます。', options: ['で', 'に', 'を', 'と'], correct: 'で', explanation: 'Means of transportation (by train) takes the particle 「で」.', translation: 'I go to work by train.' },
  { id: 'pq3', sentence: '食堂 [?] 昼ごはんを 食べました。', options: ['で', 'に', 'へ', 'から'], correct: 'で', explanation: 'Location where an active action occurs takes 「で」.', translation: 'I ate lunch in the cafeteria.' },
  { id: 'pq4', sentence: '山田さん [?] 電話を かけます。', options: ['に', 'で', 'を', 'へ'], correct: 'に', explanation: 'Target/recipient of a phone call or action takes 「に」.', translation: 'I will make a phone call to Yamada-san.' },
  { id: 'pq5', sentence: '駅の 前 [?] 友達と 会いました。', options: ['で', 'に', 'を', 'へ'], correct: 'で', explanation: 'The place where meeting happens actively takes 「で」.', translation: 'I met with my friend in front of the station.' },
  { id: 'pq6', sentence: '日本 [?] 来てから、半年が たちました。', options: ['に', 'で', 'を', 'から'], correct: 'に', explanation: 'Destination of arrival/movement (coming to Japan) takes 「に」 (or 「へ」).', translation: 'Six months have passed since coming to Japan.' },
  { id: 'pq7', sentence: 'この 薬は 1日 3回 水 [?] 飲んでください。', options: ['で', 'に', 'を', 'と'], correct: 'で', explanation: 'Means/medium used to swallow medicine takes 「で」.', translation: 'Please take this medicine 3 times a day with water.' }
];

export interface CounterGuideItem {
  counter: string;
  furigana: string;
  usedFor: string;
  examples: { num: string; jp: string; romaji: string }[];
}

export const COUNTER_GUIDE_ITEMS: CounterGuideItem[] = [
  { counter: '本', furigana: 'ほん / ぼん / ぽん', usedFor: 'Long, cylindrical objects (bottles, pens, umbrella, trees, trains)', examples: [{ num: '1', jp: 'いっぽん', romaji: 'ippon' }, { num: '2', jp: 'にほん', romaji: 'nihon' }, { num: '3', jp: 'さんぼん', romaji: 'sanbon' }, { num: '6', jp: 'ろっぽん', romaji: 'roppon' }] },
  { counter: '枚', furigana: 'まい', usedFor: 'Thin, flat objects (paper, sheets, plates, shirts, tickets)', examples: [{ num: '1', jp: 'いちまい', romaji: 'ichimai' }, { num: '2', jp: 'にまい', romaji: 'nimai' }, { num: '3', jp: 'さんまい', romaji: 'sanmai' }, { num: '5', jp: 'ごまい', romaji: 'gomai' }] },
  { counter: '匹', furigana: 'ひき / ぴき / びき', usedFor: 'Small and medium animals (cats, dogs, fish, insects)', examples: [{ num: '1', jp: 'いっぴき', romaji: 'ippiki' }, { num: '2', jp: 'にひき', romaji: 'nihiki' }, { num: '3', jp: 'さんびき', romaji: 'sanbiki' }, { num: '6', jp: 'ろっぴき', romaji: 'roppiki' }] },
  { counter: '杯', furigana: 'はい / ぱい / ばい', usedFor: 'Cups and glasses of drinks (water, coffee, beer)', examples: [{ num: '1', jp: 'いっぱい', romaji: 'ippai' }, { num: '2', jp: 'にはい', romaji: 'nihai' }, { num: '3', jp: 'さんばい', romaji: 'sanbai' }] },
  { counter: '台', furigana: 'だい', usedFor: 'Machines, vehicles, electronic appliances (cars, PCs, TVs)', examples: [{ num: '1', jp: 'いちだい', romaji: 'ichidai' }, { num: '2', jp: 'にだい', romaji: 'nidai' }, { num: '3', jp: 'さんだい', romaji: 'sandai' }] },
  { counter: '人', furigana: 'にん (ひとり・ふたり)', usedFor: 'Counting human beings', examples: [{ num: '1', jp: 'ひとり', romaji: 'hitori' }, { num: '2', jp: 'ふたり', romaji: 'futari' }, { num: '3', jp: 'さんにん', romaji: 'sannin' }, { num: '4', jp: 'よにん', romaji: 'yonin' }] }
];

export interface KeigoPair {
  verb: string;
  meaning: string;
  plain: string;
  polite: string;
  respectful: string; // Sonkeigo (supervisor/customer action)
  humble: string;     // Kenjougo (my action)
}

export const KEIGO_PAIRS: KeigoPair[] = [
  { verb: '行く / 来る', meaning: 'To go / To come', plain: 'いく / くる', polite: 'いきます / きます', respectful: 'いらっしゃいます / おいでになります', humble: '参ります (まいります)' },
  { verb: '言う', meaning: 'To say / speak', plain: 'いう', polite: 'いいます', respectful: 'おっしゃいます', humble: '申します (もうします) / 申し上げます' },
  { verb: '食べる / 飲む', meaning: 'To eat / drink', plain: 'たべる / のむ', polite: 'たべます / のみます', respectful: '召し上がります (めしあがります)', humble: 'いただきます' },
  { verb: '見る', meaning: 'To see / watch', plain: 'みる', polite: 'みます', respectful: 'ご覧になります (ごらんになります)', humble: '拝見します (はいけんします)' },
  { verb: '知っている', meaning: 'To know', plain: 'しっている', polite: 'しっています', respectful: 'ご存じです (ごぞんじです)', humble: '存じております (ぞんじております)' },
  { verb: 'する', meaning: 'To do', plain: 'する', polite: 'します', respectful: 'なさいます', humble: 'いたします' },
  { verb: '会う', meaning: 'To meet', plain: 'あう', polite: 'あいます', respectful: 'お会いになります', humble: 'お目にかかります' }
];

export interface GrammarReferenceItem {
  id: string;
  pattern: string;
  formation: string;
  meaning: string;
  jlpt: string;
  examples: { jp: string; en: string }[];
}

export const GRAMMAR_PATTERNS: GrammarReferenceItem[] = [
  { id: 'g1', pattern: '〜てから', formation: 'Verb Te-form + から', meaning: 'After doing X, do Y (chronological sequence)', jlpt: 'N5 / JFT', examples: [{ jp: '手を 洗ってから、食事を します。', en: 'After washing my hands, I eat the meal.' }] },
  { id: 'g2', pattern: '〜たことがある', formation: 'Verb Ta-form + ことがある', meaning: 'Have the past experience of doing X', jlpt: 'N5 / JFT', examples: [{ jp: '富士山に 登ったことが あります。', en: 'I have the experience of climbing Mount Fuji.' }] },
  { id: 'g3', pattern: '〜ほうがいい', formation: 'Verb Ta-form / Nai-form + ほうがいい', meaning: 'It is better to / had better (giving advice)', jlpt: 'N5 / JFT', examples: [{ jp: '熱が あるなら、早く 寝たほうがいいですよ。', en: 'If you have a fever, you had better sleep early.' }] },
  { id: 'g4', pattern: '〜なければならない', formation: 'Verb Nai-stem + なければならない', meaning: 'Must do / have to do (obligation)', jlpt: 'N5 / JFT', examples: [{ jp: '毎月 25日までに 家賃を 払わなければなりません。', en: 'Must pay room rent by the 25th of every month.' }] },
  { id: 'g5', pattern: '〜てもいいです', formation: 'Verb Te-form + もいいです', meaning: 'May I do / It is permitted to do', jlpt: 'N5 / JFT', examples: [{ jp: 'ここで 写真を 撮ってもいいですか。', en: 'May I take photos here?' }] }
];
