export const trigram = {
  1: { symbol: "☰", bagua: "乾", element: "金", index: [1, 1, 1] },
  2: { symbol: "☱", bagua: "兑", element: "金", index: [0, 1, 1] },
  3: { symbol: "☲", bagua: "离", element: "火", index: [1, 0, 1] },
  4: { symbol: "☳", bagua: "震", element: "木", index: [0, 0, 1] },
  5: { symbol: "☴", bagua: "巽", element: "木", index: [1, 1, 0] },
  6: { symbol: "☵", bagua: "坎", element: "水", index: [0, 1, 0] },
  7: { symbol: "☶", bagua: "艮", element: "土", index: [1, 0, 0] },
  8: { symbol: "☷", bagua: "坤", element: "土", index: [0, 0, 0] },
};

export const elementConnectionGua = {
  "火/金": {
    type: "吉",
    description: "克出",
  },
  "火/木": {
    type: "吉",
    description: "生入",
  },
  "水/金": {
    type: "吉",
    description: "生入",
  },
  "木/水": {
    type: "吉",
    description: "生入",
  },
  "木/土": {
    type: "吉",
    description: "克出",
  },
  "水/火": {
    type: "吉",
    description: "克出",
  },
  "金/木": {
    type: "吉",
    description: "克出",
  },
  "金/土": {
    type: "吉",
    description: "生入",
  },
  "土/火": {
    type: "吉",
    description: "生入",
  },
  "土/水": {
    type: "吉",
    description: "克出",
  },
  "金/金": {
    type: "吉",
    description: "比旺",
  },
  "火/火": {
    type: "吉",
    description: "比旺",
  },
  "木/木": {
    type: "吉",
    description: "比旺",
  },
  "水/水": {
    type: "吉",
    description: "比旺",
  },
  "土/土": {
    type: "吉",
    description: "比旺",
  },
  "金/火": {
    type: "凶",
    description: "克入",
  },
  "金/水": {
    type: "凶",
    description: "生出",
  },
  "水/木": {
    type: "凶",
    description: "生出",
  },
  "土/金": {
    type: "凶",
    description: "生出",
  },
  "土/木": {
    type: "凶",
    description: "克入",
  },
  "火/土": {
    type: "凶",
    description: "生出",
  },
  "火/水": {
    type: "凶",
    description: "克入",
  },
  "水/火": {
    type: "凶",
    description: "克入",
  },
  "水/土": {
    type: "凶",
    description: "克入",
  },
  "木/金": {
    type: "凶",
    description: "克入",
  },
  "木/火": {
    type: "凶",
    description: "生出",
  },
};

export const sixtyFourGua = {
  "乾/乾": {
    hexagramName: "Heaven",
    guaName: "乾為天",
    laterHeavenSequence: 1,
    hexagram: "䷀",
    meaning:
      "代表「天」的形象 Vast, powerful, leadership, heaven, emperor, King, decisive, proactive, visionary, innovative, set the direction 在乾卦布局权力，乾乾卦，吸引有权力的人",
  },
  "兑/乾": {
    hexagramName: "Tread",
    guaName: "天澤履",
    laterHeavenSequence: 10,
    hexagram: "䷉",
    meaning:
      "履為踩踏之意，序卦傳另云：履者禮也 Treading on a danger territory, need to be careful 如果别人不能够遵守承诺，可以用",
  },
  "乾/离": {
    hexagramName: "Fellowship",
    guaName: "天火同人",
    laterHeavenSequence: 13,
    hexagram: "䷌",
    meaning:
      "同人是「會同」・「協同」之意 Build a team that share a common goal",
  },
  "乾/震": {
    hexagramName: "Without Wrongdoing",
    guaName: "天雷无妄",
    laterHeavenSequence: 25,
    hexagram: "䷘",
    meaning:
      "妄與誠相反，虛偽的意思；無妄，即不虛偽。无妄也是无妄之灾之意 Nothing happen at the end if we continue to do this we. We cannot get the results if we don't fix the cause",
  },
  "乾/巽": {
    hexagramName: "Meeting",
    guaName: "天風姤",
    laterHeavenSequence: 44,
    hexagram: "䷫",
    meaning:
      "序卦傳所言：姤，遇也，柔遇剛也。為「相遇、邂逅」之意 Attraction, likeability, first impression, seduction, passion 相遇卦：天风姤卦，因为乾卦强，所有可以用 巽卦e.g.路由器，5枝毛笔，吹风筒，无线电话 乾卦e.g.圆钟，盾，圆的镜子 在乾卦下面放巽卦 如果放5枝毛笔，可能会吸引爱好书法的人 What quality you put, you attract that quality of people 如果摆放低档次，就会吸引低档次的人 e.g.天风姤卦，政府进场干预，可以把电房移掉，是个有权力的人！",
  },
  "乾/坎": {
    hexagramName: "Litigation",
    guaName: "天水訟",
    laterHeavenSequence: 6,
    hexagram: "䷅",
    meaning:
      "為了飲食生活的「需」求，開始會有爭執，是為「爭訟」 To fight our own right, it is about fairness",
  },
  "乾/艮": {
    hexagramName: "Retreat",
    guaName: "天山遯",
    laterHeavenSequence: 33,
    hexagram: "䷠",
    meaning:
      "序卦傳云：遯者，退也。「隱匿」之意 We need to retreat and conserve our resources in order to win a war, don't be over confident",
  },
  "乾/坤": {
    hexagramName: "Stagnation",
    guaName: "天地否",
    laterHeavenSequence: 12,
    hexagram: "䷋",
    meaning:
      "否為閉「塞」之意 Not aligned, separation, both go into different direction, there might be sign of betrayal",
  },
  "兑/兑": {
    hexagramName: "Marsh",
    guaName: "兌為澤",
    laterHeavenSequence: 58,
    hexagram: "䷹",
    meaning:
      "序卦傳云：兌者，悅也。代表「喜悅」之意 Joy, talking, persuasion, speaking, smiling, argument, broken objects, imperfect object, defective products",
  },
  "兑/离": {
    hexagramName: "Reform",
    guaName: "泽火革",
    laterHeavenSequence: 49,
    hexagram: "䷰",
    meaning:
      "序卦傳所言：革，去故也。為「改革、革新、革命」之象 Changing the situation, go through transformation, reform, challenge the authority. Controversial content",
  },
  "兑/震": {
    hexagramName: "Following",
    guaName: "澤雷隨",
    laterHeavenSequence: 17,
    hexagram: "䷐",
    meaning:
      "隨為跟隨之意 Go with the flow, don't change the existing system, abide by the rules now, the flow currently is correct, now is not the time to reinvent the wheel, be a great follower. Follow your heart if there's no existing flow",
  },
  "兑/巽": {
    hexagramName: "Great Exceeding",
    guaName: "澤風大過",
    laterHeavenSequence: 28,
    hexagram: "䷛",
    meaning:
      "有超越太多、「過猶不及」之意 Under pressure, trap in between, cannot move as no option left, move forward or backward also danger, no option to run away like the Lesser Exceeding hexagram",
  },
  "兑/坎": {
    hexagramName: "Trap",
    guaName: "澤水困",
    laterHeavenSequence: 47,
    hexagram: "䷮",
    meaning:
      "為「受圍困」之象 Feeling trap, cannot move, emotionally suppressed, feel that we are not welcome, feel helpless",
  },
  "兑/艮": {
    hexagramName: "Influence",
    guaName: "澤山咸",
    laterHeavenSequence: 31,
    hexagram: "䷞",
    meaning:
      "為「交感」，互相連結之意 Connect with people through our heart as it can touch emotion at the core and it is powerful and influential. Physical intimacy, can be through speaking, touch people by the words that you say",
  },
  "兑/坤": {
    hexagramName: "Gathering",
    guaName: "澤地萃",
    laterHeavenSequence: 45,
    hexagram: "䷬",
    meaning:
      "序卦傳：萃者，聚也。為「匯聚」之象 The problem can be solved by finding liked minded people to discuss together",
  },
  "离/乾": {
    hexagramName: "Great Reward",
    guaName: "火天大有",
    laterHeavenSequence: 14,
    hexagram: "䷍",
    meaning:
      "意指大的收穫 Abundance, possession, happiness 在坤卦摆放火天大有，加强客户群",
  },
  "离/兑": {
    hexagramName: "Opposition",
    guaName: "火澤睽",
    laterHeavenSequence: 38,
    hexagram: "䷥",
    meaning:
      "序卦傳云：睽者，乖也。為「乖違、違背」之象 Internal fight, private argument, can be a betrayal, internal fight between 2 females in the house",
  },
  "离/离": {
    hexagramName: "Fire",
    guaName: "離為火",
    laterHeavenSequence: 30,
    hexagram: "䷝",
    meaning:
      "亦有「麗」之意 Brightness, passion, happiness, beauty, clear, enlightenment",
  },
  "离/震": {
    hexagramName: "Biting",
    guaName: "火雷噬嗑",
    laterHeavenSequence: 21,
    hexagram: "䷔",
    meaning:
      "噬嗑為咬之意 Not fulfilled in life, suppress emotion, unhappy, depressed. Need to look internally, express it out",
  },
  "离/巽": {
    hexagramName: "Cauldron",
    guaName: "火風鼎",
    laterHeavenSequence: 50,
    hexagram: "䷱",
    meaning:
      "序卦傳所言：鼎，取新也。為「鼎新」之意 Long term prosperity, stability, true love built over time, long lasting, longevity bonds, a steady way of making money, fundamental investing. Meeting hexagram is passion, Cauldron hexagram is love",
  },
  "离/坎": {
    hexagramName: "Not Yet Accomplished",
    guaName: "火水未濟",
    laterHeavenSequence: 64,
    hexagram: "䷿",
    meaning:
      "代表「事未成」之意 Mission not accomplished yet, we need to do something to trigger a change",
  },
  "离/艮": {
    hexagramName: "Travelling",
    guaName: "火山旅",
    laterHeavenSequence: 56,
    hexagram: "䷷",
    meaning:
      "為「探索」之意 Holiday, generating income from oversea or online business, get more exposure to different ways of doing things, change our environment 火山旅卦：多看，多扛，把不好的帮手请走",
  },
  "离/坤": {
    hexagramName: "Advancement",
    guaName: "火地晉",
    laterHeavenSequence: 35,
    hexagram: "䷢",
    meaning:
      "序卦傳云：晉者，進也。是「進步」的象徵 We need to be visible, show our achievement in a subtle way",
  },
  "震/乾": {
    hexagramName: "Great Strength",
    guaName: "雷天大壯",
    laterHeavenSequence: 34,
    hexagram: "䷡",
    meaning:
      "為「陽剛壯盛」之意 Act without thinking, impulsive, too confident, therefore need to plan before act 坎卦：加强机会能力来得到政府的支持和operation support，要有创意！ 木在上，金在下 雷天大壮卦：一生一泄 = 流通，可以解决官司",
  },
  "震/兑": {
    hexagramName: "Marrying Maiden",
    guaName: "雷澤歸妹",
    laterHeavenSequence: 54,
    hexagram: "䷵",
    meaning:
      "序卦傳云：歸妹，女之終也。形容「女子出嫁」 It's about refund, goods return because of defects",
  },
  "震/离": {
    hexagramName: "Abundance",
    guaName: "雷火豐",
    laterHeavenSequence: 55,
    hexagram: "䷶",
    meaning:
      "為「豐盛」之意 We walk the talk, gain reputation, have integrity and happy. We feel enough inside, we feel life is a gift, we think we are lucky, we tell ourself we have enough and we genuinely feel that. We rejoice other people's success and wish well for everyone as we know it will not diminish our opportunities...",
  },
  "震/震": {
    hexagramName: "Thunder",
    guaName: "震為雷",
    laterHeavenSequence: 51,
    hexagram: "䷲",
    meaning:
      "序卦傳：震者，「動」也 Execution, movement, drastic changes, unexpected changes, constantly moving, busy lifestyle",
  },
  "震/巽": {
    hexagramName: "Consistency",
    guaName: "雷風恆",
    laterHeavenSequence: 32,
    hexagram: "䷟",
    meaning:
      "恆者，「永恆」之意 We must put our feeling aside, separate our mind from our feeling, we can still take action and achieve consistency without the need to feel good...",
  },
  "震/坎": {
    hexagramName: "Relief",
    guaName: "雷水解",
    laterHeavenSequence: 40,
    hexagram: "䷧",
    meaning:
      "序卦傳：解者，緩也。乃「消除、緩和」之意 Relief of pain, dissolve of a crisis, problem is going to dissolve soon, letting go of possession or responsibility",
  },
  "震/艮": {
    hexagramName: "Lesser Exceeding",
    guaName: "雷山小過",
    laterHeavenSequence: 62,
    hexagram: "䷽",
    meaning:
      "為「稍有過失」之意 A person is in dilemma between action and no action, the person will not fulfil their promises...",
  },
  "震/坤": {
    hexagramName: "Delight",
    guaName: "雷地豫",
    laterHeavenSequence: 16,
    hexagram: "䷏",
    meaning:
      "豫為喜悅之意 While celebrating don't overlook any danger, someone may take advantage or keep us off guard",
  },
  "巽/乾": {
    hexagramName: "Small Livestock",
    guaName: "風天小畜",
    laterHeavenSequence: 9,
    hexagram: "䷈",
    meaning:
      "小畜有集合之意，人們親近後開始集合 Lesser asset, not ready yet, not so stable now, not in the position to invest",
  },
  "巽/兑": {
    hexagramName: "Sincerity",
    guaName: "風澤中孚",
    laterHeavenSequence: 61,
    hexagram: "䷼",
    meaning:
      "序卦傳：中孚，中孚，信也。代表「誠信」之意 Heart to heart talk to each other, kissing, talking, honest communication...",
  },
  "巽/离": {
    hexagramName: "Family",
    guaName: "風火家人",
    laterHeavenSequence: 37,
    hexagram: "䷤",
    meaning:
      "序卦傳云：家人，內也。為「齊家」之象 Reproducing offspring, about family matter, it's about creating legacy...",
  },
  "巽/震": {
    hexagramName: "Increasing",
    guaName: "風雷益",
    laterHeavenSequence: 42,
    hexagram: "䷩",
    meaning:
      "風雷益 It's time for growth & expansion, while doing expansion, remember to take care of health",
  },
  "巽/巽": {
    hexagramName: "Wind",
    guaName: "巽為風",
    laterHeavenSequence: 57,
    hexagram: "䷸",
    meaning:
      "序卦傳云：巽者，入也。象徵風「無孔不入」的特性 Progress, flexible, adaptable, can survive in different environment...",
  },
  "巽/坎": {
    hexagramName: "Dispersing",
    guaName: "風水渙",
    laterHeavenSequence: 59,
    hexagram: "䷺",
    meaning:
      "序卦傳：渙者，離散也。有「渙散」的意思 Keep running over the same problem over and over again, therefore need to identify the cause & fix it...",
  },
  "巽/艮": {
    hexagramName: "Gradual Progress",
    guaName: "風山漸",
    laterHeavenSequence: 53,
    hexagram: "䷴",
    meaning:
      "序卦傳：漸者，進也。為「漸進」之意 There's progress, small daily efforts in long run will end up in success",
  },
  "巽/坤": {
    hexagramName: "Observation",
    guaName: "風地觀",
    laterHeavenSequence: 20,
    hexagram: "䷓",
    meaning:
      "觀者，觀看之意 Look at the big picture, don't have bias, step back & observe first",
  },
  "坎/乾": {
    hexagramName: "Waiting",
    guaName: "水天需",
    laterHeavenSequence: 5,
    hexagram: "䷄",
    meaning:
      "需為「飲食之道」，指萬物啟蒙後的養育 Cultivate the virtue of patient, don't take any action yet as it is not the right time",
  },
  "坎/兑": {
    hexagramName: "Regulate",
    guaName: "水澤節",
    laterHeavenSequence: 60,
    hexagram: "䷻",
    meaning:
      "序卦傳：節，止也。有「節止」、「節制」之意 Control the situation, take control of something, retrenchment, regulate finance, auditing, control budgeting...",
  },
  "坎/离": {
    hexagramName: "Accomplished",
    guaName: "水火既濟",
    laterHeavenSequence: 63,
    hexagram: "䷾",
    meaning:
      "序卦傳：既濟，成也。代表「事已成」 Mission accomplished, everything is in place already, don’t add anymore, don’t fix what’s not broken",
  },
  "坎/震": {
    hexagramName: "Deliverance",
    guaName: "水雷屯",
    laterHeavenSequence: 3,
    hexagram: "䷂",
    meaning:
      "屯為難之意，表示事物「起始艱難」 It's difficult at the beginning, big obstacles ahead...",
  },
  "坎/巽": {
    hexagramName: "Mild",
    guaName: "水風井",
    laterHeavenSequence: 48,
    hexagram: "䷯",
    meaning:
      "井者，取之不竭也，為「水井」之意 Consistency, good habit, positive routine, to repeat the good things that we do everyday, like going to the well everyday",
  },
  "坎/坎": {
    hexagramName: "Water",
    guaName: "坎為水",
    laterHeavenSequence: 29,
    hexagram: "䷜",
    meaning:
      "習坎，即「重險」的意思 Difficulties, constant obstacle, repeated problems, low in spirit, repeat the same mistakes again and again",
  },
  "坎/艮": {
    hexagramName: "Develop",
    guaName: "水山蹇",
    laterHeavenSequence: 39,
    hexagram: "䷦",
    meaning:
      "蹇為跛也。序卦傳：蹇，難也。乃「困難」之意 It's a difficult situation, a lot of restrictions, do not fight the restriction...",
  },
  "坎/坤": {
    hexagramName: "Bringing Together",
    guaName: "水地比",
    laterHeavenSequence: 8,
    hexagram: "䷇",
    meaning:
      "比為「合」也，指「親比」之意 Friends come together, alliances, business partnerships, collaboration...",
  },
  "艮/乾": {
    hexagramName: "Little Taming",
    guaName: "山天大畜",
    laterHeavenSequence: 26,
    hexagram: "䷙",
    meaning:
      "畜有畜養之意 Cultivate, accumulate, build asset over time, great asset",
  },
  "艮/兑": {
    hexagramName: "Diminishing",
    guaName: "山澤損",
    laterHeavenSequence: 41,
    hexagram: "䷨",
    meaning:
      "損有減少、損失之意 Reduce, less is more, cut down on excessive expenses, diet, eat less, reduce possession, decluttering",
  },
  "艮/离": {
    hexagramName: "Brightness Hiding",
    guaName: "山火賁",
    laterHeavenSequence: 22,
    hexagram: "䷕",
    meaning:
      "賁者飾也，有裝飾之意 Beautifying, makeup, cosmetic, decorating, putting on a show...",
  },
  "艮/震": {
    hexagramName: "Youthful Folly",
    guaName: "山雷頤",
    laterHeavenSequence: 27,
    hexagram: "䷚",
    meaning:
      "頤為養也，有「養育、保養」之意 Nourishment, to grow internally and externally, eat healthy, enrich our knowledge...",
  },
  "艮/巽": {
    hexagramName: "Restraint",
    guaName: "山風蠱",
    laterHeavenSequence: 18,
    hexagram: "䷑",
    meaning:
      "蠱為事物敗壞之意，有敗壞後必須整治、糾正的意味 Corruption, rotten, after something bad happens, we need to rectify it...",
  },
  "艮/坎": {
    hexagramName: "Keeping Still",
    guaName: "山水蒙",
    laterHeavenSequence: 4,
    hexagram: "䷃",
    meaning:
      "蒙者，昧也。物生未光，象徵蒙昧 Ignorance, lack of knowledge, lack of understanding...",
  },
  "艮/艮": {
    hexagramName: "Mountain",
    guaName: "艮為山",
    laterHeavenSequence: 52,
    hexagram: "䷳",
    meaning:
      "艮有「止」的意思，代表靜止、安靜之象 Inaction, meditate, stop, calm, serenity",
  },
  "艮/坤": {
    hexagramName: "Prospering",
    guaName: "山地剝",
    laterHeavenSequence: 23,
    hexagram: "䷖",
    meaning:
      "剝為損也，代表衰退、剝落 Collapse, decline, falling apart, destruction, be careful of health issues",
  },
  "坤/乾": {
    hexagramName: "Peace",
    guaName: "地天泰",
    laterHeavenSequence: 11,
    hexagram: "䷊",
    meaning:
      "泰者，通也。天地交泰，萬物通泰 Harmony, prosperity, peace, everything flows smoothly",
  },
  "坤/兑": {
    hexagramName: "Exhaustion",
    guaName: "地澤臨",
    laterHeavenSequence: 19,
    hexagram: "䷒",
    meaning:
      "臨為大也，為監臨、臨視之意 Overseeing, inspection, authority watching over, being supervised",
  },
  "坤/离": {
    hexagramName: "Brightness Advancing",
    guaName: "地火明夷",
    laterHeavenSequence: 36,
    hexagram: "䷣",
    meaning:
      "明夷為傷也，有受傷、黑暗之意 Injury, hide brightness, hide talent, conceal true ability",
  },
  "坤/震": {
    hexagramName: "Revival",
    guaName: "地雷復",
    laterHeavenSequence: 24,
    hexagram: "䷗",
    meaning:
      "復為回也，象徵復歸、回復 Comeback, return, revival, regeneration, starting over again",
  },
  "坤/巽": {
    hexagramName: "Ascending",
    guaName: "地風升",
    laterHeavenSequence: 46,
    hexagram: "䷭",
    meaning:
      "升為進也，象徵上升、晉升 Promotion, rising, upgrading, stepping upward",
  },
  "坤/坎": {
    hexagramName: "Darkness",
    guaName: "地水師",
    laterHeavenSequence: 7,
    hexagram: "䷆",
    meaning:
      "師為眾也，有軍隊之意 Army, discipline, structure, organization, follow command",
  },
  "坤/艮": {
    hexagramName: "Splitting Apart",
    guaName: "地山謙",
    laterHeavenSequence: 15,
    hexagram: "䷎",
    meaning:
      "謙為讓也，有謙虛之意 Humility, modesty, staying low, not showing off",
  },
  "坤/坤": {
    hexagramName: "Earth",
    guaName: "坤為地",
    laterHeavenSequence: 2,
    hexagram: "䷁",
    meaning:
      "坤有承載之意，象徵大地、母親 Receptive, nurturing, motherly, supportive, yielding",
  },
};
