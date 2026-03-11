// 질문/유형 데이터 - packages/shared/constants.ts에서 복사
// MVP에서는 프론트에서 직접 사용

export interface AxisWeights {
  extraversion: number;
  amicability: number;
  neuroticism: number;
  trainability?: number; // dog
  dominance?: number; // cat
}

export interface Choice {
  id: string;
  text: string;
  axisWeights: AxisWeights;
}

export interface Question {
  id: string;
  petCategory: string;
  questionText: string;
  questionType: 'choice' | 'free_text';
  axis: string | null;
  orderIndex: number;
  choices: Choice[];
}

export interface PetType {
  code: string;
  characterName: string;
  icon: string;
  category: string;
  description: string;
  compatibleType: string;
}

// Dog code mapping: A→E, C→I, S→A, M→R, D→S, B→C, E→T, H→F
export const DOG_TYPES: PetType[] = [
  { code: 'EAST', characterName: '탐험가', icon: 'compass', category: 'dog', description: '에너지 넘치고 사교적이며 섬세한 감성까지 갖춘 탐험가 강아지. 새로운 친구와 장소를 만나면 온몸으로 기쁨을 표현하지만, 작은 변화도 놓치지 않는 예민한 감각의 소유자입니다.', compatibleType: 'IRCF' },
  { code: 'EASF', characterName: '수호자', icon: 'shield', category: 'dog', description: '활발하고 다정하지만 익숙한 것을 좋아하는 든든한 수호자. 가족에게 헌신적이고 감정 변화를 잘 읽어내지만, 낯선 환경에서는 경계심을 보입니다.', compatibleType: 'IRCT' },
  { code: 'EACT', characterName: '사교가', icon: 'sparkles', category: 'dog', description: '어디서든 분위기 메이커인 활발하고 대담한 탐험가. 무엇이든 두려움 없이 도전하고, 모든 강아지와 사람에게 먼저 다가갑니다.', compatibleType: 'IRSF' },
  { code: 'EACF', characterName: '리더', icon: 'crown', category: 'dog', description: '에너지 넘치고 사교적이며 담대한 성격의 안정 추구형. 무리에서 자연스럽게 리더 역할을 하며, 익숙한 영역 안에서 당당하게 군림합니다.', compatibleType: 'IRST' },
  { code: 'ERST', characterName: '관찰자', icon: 'search', category: 'dog', description: '혼자만의 시간에 세상을 탐구하는 섬세한 탐험가. 낯선 냄새와 소리에 민감하게 반응하며, 자기만의 방식으로 조용히 세계를 넓혀갑니다.', compatibleType: 'IACF' },
  { code: 'ERSF', characterName: '감성파', icon: 'flower-2', category: 'dog', description: '활발하지만 혼자를 즐기고, 섬세하면서도 안전을 추구하는 타입. 보호자의 감정을 귀신같이 읽어내며, 자기만의 안전한 공간에서 충전합니다.', compatibleType: 'IACT' },
  { code: 'ERCT', characterName: '개척자', icon: 'mountain', category: 'dog', description: '독립적이고 대담하며 모험을 사랑하는 야생의 영혼. 혼자서도 거침없이 새로운 길을 개척하며, 두려움이라는 단어를 모르는 강아지입니다.', compatibleType: 'IASF' },
  { code: 'ERCF', characterName: '독립가', icon: 'wind', category: 'dog', description: '에너지가 넘치지만 자기 페이스를 지키는 독립적인 강아지. 담대하고 안정을 추구하며, 자기 영역에서는 누구보다 자유롭게 뛰어놉니다.', compatibleType: 'IAST' },
  { code: 'IAST', characterName: '공감가', icon: 'heart', category: 'dog', description: '느긋하면서도 다정하고, 섬세한 감성으로 주변을 따뜻하게 만드는 강아지. 새로운 것에 조심스럽게 다가가지만, 한번 마음을 열면 깊은 유대를 형성합니다.', compatibleType: 'ERCF' },
  { code: 'IASF', characterName: '치유자', icon: 'hand-heart', category: 'dog', description: '느긋하고 사교적이며 섬세한 감성의 안정 추구형. 보호자 곁에서 조용히 함께하는 것만으로 힐링을 주는, 세상에서 가장 따뜻한 존재입니다.', compatibleType: 'ERCT' },
  { code: 'IACT', characterName: '적응가', icon: 'home', category: 'dog', description: '느긋하고 친화적이며 담대한 탐험가. 대범한 성격으로 어디서든 편안하게 적응하고, 사람들과 잘 어울리면서도 여유로운 페이스를 유지합니다.', compatibleType: 'ERSF' },
  { code: 'IACF', characterName: '평화주의자', icon: 'sun', category: 'dog', description: '세상 편안한 소셜 강아지. 느긋하고 담대하며 안정을 사랑해서, 어떤 상황에서도 흔들림 없는 평화로운 에너지를 발산합니다.', compatibleType: 'ERST' },
  { code: 'IRST', characterName: '사색가', icon: 'palette', category: 'dog', description: '느긋하고 독립적이며 섬세한 감성의 탐험가. 자기만의 세계에서 조용히 새로운 것을 발견하는 것을 즐기며, 풍부한 내면을 가진 강아지입니다.', compatibleType: 'EACF' },
  { code: 'IRSF', characterName: '내면가', icon: 'moon', category: 'dog', description: '조용하고 섬세하며 안전한 공간을 사랑하는 내향형. 보호자와의 1:1 시간을 가장 소중히 여기며, 작은 일상에서 행복을 찾는 강아지입니다.', compatibleType: 'EACT' },
  { code: 'IRCT', characterName: '자유인', icon: 'leaf', category: 'dog', description: '느긋하고 독립적이며 담대한 탐험가. 자기만의 길을 묵묵히 걸으며, 어떤 상황에서도 흔들리지 않는 강인한 정신력을 가졌습니다.', compatibleType: 'EASF' },
  { code: 'IRCF', characterName: '안식가', icon: 'armchair', category: 'dog', description: '세상에서 집이 제일 좋은 느긋한 독립파. 자기만의 공간에서 편안하게 시간을 보내는 것을 최고의 행복으로 여기는 강아지입니다.', compatibleType: 'EAST' },
];

// Cat code mapping: A→E, C→I, S→A, M→R, D→S, B→C, E→D, H→P
export const CAT_TYPES: PetType[] = [
  { code: 'EASD', characterName: '탐험가', icon: 'compass', category: 'cat', description: '에너지 넘치고 사교적이며 섬세한 감성의 탐험가 고양이. 새로운 것이라면 무엇이든 뛰어들고, 사람과 교감하면서도 세상의 모든 것을 탐구하려 합니다.', compatibleType: 'IRCP' },
  { code: 'EASP', characterName: '수호자', icon: 'shield', category: 'cat', description: '활발하면서도 보호자에게 헌신적인 섬세한 고양이. 익숙한 환경을 좋아하고, 가족의 감정 변화를 누구보다 빨리 감지하는 수호자입니다.', compatibleType: 'IRCD' },
  { code: 'EACD', characterName: '사교가', icon: 'sparkles', category: 'cat', description: '어디서든 주인공인 활발하고 대담한 탐험가 고양이. 낯선 사람에게도 먼저 다가가고, 새로운 장난감이면 무조건 돌진하는 파티의 주인공입니다.', compatibleType: 'IRSP' },
  { code: 'EACP', characterName: '왕자', icon: 'crown', category: 'cat', description: '에너지 넘치고 사교적이며 담대한 영역 지킴이. 자기 구역 안에서는 왕처럼 군림하며, 가족에게 당당하게 애정을 표현합니다.', compatibleType: 'IRSD' },
  { code: 'ERSD', characterName: '관찰자', icon: 'search', category: 'cat', description: '독립적이지만 섬세한 감성을 가진 탐험가. 혼자서 조용히 집안 곳곳을 탐사하며, 작은 소리와 움직임도 놓치지 않는 예리한 관찰자입니다.', compatibleType: 'IACP' },
  { code: 'ERSP', characterName: '감성파', icon: 'flower-2', category: 'cat', description: '활발하지만 자기만의 시간이 필요한 섬세한 고양이. 보호자의 기분을 읽는 데 천재적이며, 안전한 자기 공간에서 재충전합니다.', compatibleType: 'IACD' },
  { code: 'ERCD', characterName: '사냥꾼', icon: 'target', category: 'cat', description: '독립적이고 대담하며 모험을 즐기는 야생의 본능. 혼자서도 거침없이 사냥 놀이에 몰두하며, 두려움 없이 새로운 영역을 개척합니다.', compatibleType: 'IASP' },
  { code: 'ERCP', characterName: '보스', icon: 'trophy', category: 'cat', description: '에너지가 넘치지만 자기 페이스를 절대 양보하지 않는 보스. 자기 영역에서 당당하게 지내며, 관심이 필요할 때만 다가오는 카리스마 고양이입니다.', compatibleType: 'IASD' },
  { code: 'IASD', characterName: '치유자', icon: 'heart', category: 'cat', description: '느긋하고 다정하며 섬세한 감성의 탐험가. 조심스럽게 새로운 것에 다가가고, 보호자 옆에서 조용히 그르렁거리며 힐링을 선사합니다.', compatibleType: 'ERCP' },
  { code: 'IASP', characterName: '무릎냥', icon: 'hand-heart', category: 'cat', description: '보호자 무릎 위가 세상에서 가장 좋은 느긋한 다정이. 섬세한 감성으로 가족의 감정을 읽고, 안정적인 환경에서 최고의 동반자가 됩니다.', compatibleType: 'ERCD' },
  { code: 'IACD', characterName: '평화주의자', icon: 'sun', category: 'cat', description: '느긋하고 친화적이며 담대한 탐험가 고양이. 어디서든 편안하게 적응하고, 다른 동물과도 평화롭게 공존하는 여유로운 성격입니다.', compatibleType: 'ERSP' },
  { code: 'IACP', characterName: '귀족', icon: 'gem', category: 'cat', description: '느긋하고 사교적이며 담대한 안정파. 우아하게 자기 자리를 지키며, 관심을 즐기면서도 절대 허둥대지 않는 기품 있는 고양이입니다.', compatibleType: 'ERSD' },
  { code: 'IRSD', characterName: '현자', icon: 'book-open', category: 'cat', description: '느긋하고 독립적이며 섬세한 감성의 탐험가. 조용히 세상을 관찰하고 자기만의 방식으로 탐구하는, 지혜로운 눈빛의 고양이입니다.', compatibleType: 'EACP' },
  { code: 'IRSP', characterName: '달빛', icon: 'moon', category: 'cat', description: '조용하고 섬세하며 안전한 공간을 사랑하는 내향형 고양이. 깊은 밤 창가에서 달빛을 바라보며, 보호자와의 고요한 시간을 가장 소중히 여깁니다.', compatibleType: 'EACD' },
  { code: 'IRCD', characterName: '닌자', icon: 'eye', category: 'cat', description: '느긋하고 독립적이며 담대한 탐험가. 소리 없이 움직이며 자기만의 방식으로 세상을 탐험하는, 누구에게도 흔들리지 않는 고양이입니다.', compatibleType: 'EASP' },
  { code: 'IRCP', characterName: '은둔자', icon: 'castle', category: 'cat', description: '자기 성에서 유유자적하는 느긋한 독립파. 자기만의 공간에서 편안하게 시간을 보내는 것이 최고의 행복인, 도도하고 우아한 고양이입니다.', compatibleType: 'EASD' },
];

export const DOG_QUESTIONS: Question[] = [
  {
    id: 'dog-energy-1', petCategory: 'dog', questionText: '산책하자고 하면 우리 아이 반응은?', questionType: 'choice', axis: 'extraversion', orderIndex: 1,
    choices: [
      { id: 'dog-e1-1', text: '리드줄만 봐도 미친 듯이 뛰어다녀요', axisWeights: { extraversion: 2, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e1-2', text: '꼬리 흔들며 현관으로 달려가요', axisWeights: { extraversion: 1, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e1-3', text: '기지개 한번 켜고 슬슬 일어나요', axisWeights: { extraversion: -1, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e1-4', text: '자리에서 눈만 굴리며 "꼭 가야 해?" 표정이에요', axisWeights: { extraversion: -2, amicability: 0, neuroticism: 0, trainability: 0 } },
    ],
  },
  {
    id: 'dog-energy-2', petCategory: 'dog', questionText: '집에서 우리 아이는 주로 어떤 상태인가요?', questionType: 'choice', axis: 'extraversion', orderIndex: 2,
    choices: [
      { id: 'dog-e2-1', text: '장난감을 물고 끊임없이 돌아다녀요', axisWeights: { extraversion: 2, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e2-2', text: '이리저리 왔다 갔다 하며 활동적이에요', axisWeights: { extraversion: 1, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e2-3', text: '좋아하는 자리에서 쉬다가 가끔 움직여요', axisWeights: { extraversion: -1, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e2-4', text: '거의 하루 종일 누워서 자요', axisWeights: { extraversion: -2, amicability: 0, neuroticism: 0, trainability: 0 } },
    ],
  },
  {
    id: 'dog-energy-3', petCategory: 'dog', questionText: '산책 후 집에 돌아오면 우리 아이는?', questionType: 'choice', axis: 'extraversion', orderIndex: 3,
    choices: [
      { id: 'dog-e3-1', text: '아직도 에너지가 넘쳐서 놀자고 해요', axisWeights: { extraversion: 2, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e3-2', text: '잠깐 쉬더니 금방 또 돌아다녀요', axisWeights: { extraversion: 1, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e3-3', text: '자기 자리에 가서 쉬어요', axisWeights: { extraversion: -1, amicability: 0, neuroticism: 0, trainability: 0 } },
      { id: 'dog-e3-4', text: '바로 드러누워서 깊이 잠들어요', axisWeights: { extraversion: -2, amicability: 0, neuroticism: 0, trainability: 0 } },
    ],
  },
  {
    id: 'dog-social-1', petCategory: 'dog', questionText: '처음 보는 사람이 집에 오면?', questionType: 'choice', axis: 'amicability', orderIndex: 4,
    choices: [
      { id: 'dog-s1-1', text: '꼬리 흔들며 달려가서 온몸으로 환영해요', axisWeights: { extraversion: 0, amicability: 2, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s1-2', text: '다가가서 냄새를 맡고 친해지려 해요', axisWeights: { extraversion: 0, amicability: 1, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s1-3', text: '멀리서 지켜보다가 천천히 다가가요', axisWeights: { extraversion: 0, amicability: -1, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s1-4', text: '자기 자리로 가서 무시하거나 숨어요', axisWeights: { extraversion: 0, amicability: -2, neuroticism: 0, trainability: 0 } },
    ],
  },
  {
    id: 'dog-social-2', petCategory: 'dog', questionText: '산책 중 다른 강아지를 만나면?', questionType: 'choice', axis: 'amicability', orderIndex: 5,
    choices: [
      { id: 'dog-s2-1', text: '꼬리 흔들며 먼저 달려가서 인사해요', axisWeights: { extraversion: 0, amicability: 2, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s2-2', text: '조심스럽게 다가가서 냄새를 맡아요', axisWeights: { extraversion: 0, amicability: 1, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s2-3', text: '상대가 다가오면 받아주긴 해요', axisWeights: { extraversion: 0, amicability: -1, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s2-4', text: '무시하거나 피하려 해요', axisWeights: { extraversion: 0, amicability: -2, neuroticism: 0, trainability: 0 } },
    ],
  },
  {
    id: 'dog-social-3', petCategory: 'dog', questionText: '보호자가 외출 준비를 하면?', questionType: 'choice', axis: 'amicability', orderIndex: 6,
    choices: [
      { id: 'dog-s3-1', text: '현관 앞을 막고 "나도 데려가!" 난리예요', axisWeights: { extraversion: 0, amicability: 2, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s3-2', text: '아쉬운 눈으로 따라다니며 쳐다봐요', axisWeights: { extraversion: 0, amicability: 1, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s3-3', text: '잠깐 쳐다보다가 자기 할 일 해요', axisWeights: { extraversion: 0, amicability: -1, neuroticism: 0, trainability: 0 } },
      { id: 'dog-s3-4', text: '전혀 신경 안 쓰고 자던 자리에 그대로예요', axisWeights: { extraversion: 0, amicability: -2, neuroticism: 0, trainability: 0 } },
    ],
  },
  {
    id: 'dog-sensitivity-1', petCategory: 'dog', questionText: '갑자기 큰 소리(천둥, 폭죽 등)가 나면?', questionType: 'choice', axis: 'neuroticism', orderIndex: 7,
    choices: [
      { id: 'dog-d1-1', text: '벌벌 떨면서 숨을 곳을 찾아요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 2, trainability: 0 } },
      { id: 'dog-d1-2', text: '보호자에게 바짝 붙어서 불안해해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 1, trainability: 0 } },
      { id: 'dog-d1-3', text: '귀를 쫑긋하고 잠깐 긴장하다 풀어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -1, trainability: 0 } },
      { id: 'dog-d1-4', text: '전혀 신경 안 쓰고 하던 거 계속해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -2, trainability: 0 } },
    ],
  },
  {
    id: 'dog-sensitivity-2', petCategory: 'dog', questionText: '보호자가 기분이 안 좋을 때 우리 아이는?', questionType: 'choice', axis: 'neuroticism', orderIndex: 8,
    choices: [
      { id: 'dog-d2-1', text: '옆에 와서 얼굴을 핥거나 몸을 기대요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 2, trainability: 0 } },
      { id: 'dog-d2-2', text: '평소보다 조용히 곁에 있어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 1, trainability: 0 } },
      { id: 'dog-d2-3', text: '평소와 별 차이 없어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -1, trainability: 0 } },
      { id: 'dog-d2-4', text: '전혀 모르는 것 같아요, 자기 세계에 빠져 있어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -2, trainability: 0 } },
    ],
  },
  {
    id: 'dog-sensitivity-3', petCategory: 'dog', questionText: '집 안 가구 배치를 바꾸면?', questionType: 'choice', axis: 'neuroticism', orderIndex: 9,
    choices: [
      { id: 'dog-d3-1', text: '불안해하며 한참 동안 적응을 못 해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 2, trainability: 0 } },
      { id: 'dog-d3-2', text: '킁킁거리며 꼼꼼히 확인해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 1, trainability: 0 } },
      { id: 'dog-d3-3', text: '잠깐 둘러보고 금방 적응해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -1, trainability: 0 } },
      { id: 'dog-d3-4', text: '아무 반응 없어요, 바뀐 줄도 모르는 것 같아요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -2, trainability: 0 } },
    ],
  },
  {
    id: 'dog-curiosity-1', petCategory: 'dog', questionText: '산책 중 처음 가보는 길이 나타나면?', questionType: 'choice', axis: 'trainability', orderIndex: 10,
    choices: [
      { id: 'dog-c1-1', text: '리드줄 팽팽하게 당기며 돌진해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: 2 } },
      { id: 'dog-c1-2', text: '호기심을 보이며 킁킁거리며 들어가요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: 1 } },
      { id: 'dog-c1-3', text: '입구에서 잠깐 냄새 맡고 원래 길로 가요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: -1 } },
      { id: 'dog-c1-4', text: '익숙한 길이 아니면 가기 싫어해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: -2 } },
    ],
  },
  {
    id: 'dog-curiosity-2', petCategory: 'dog', questionText: '새로운 장난감을 주면?', questionType: 'choice', axis: 'trainability', orderIndex: 11,
    choices: [
      { id: 'dog-c2-1', text: '바로 물고 흔들고 분해하려 해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: 2 } },
      { id: 'dog-c2-2', text: '코로 킁킁 탐색하고 조심스럽게 놀아요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: 1 } },
      { id: 'dog-c2-3', text: '한번 보고 기존 장난감으로 돌아가요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: -1 } },
      { id: 'dog-c2-4', text: '경계하며 멀리서 쳐다보기만 해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: -2 } },
    ],
  },
  {
    id: 'dog-curiosity-3', petCategory: 'dog', questionText: '처음 가보는 장소(동물병원 제외)에서 우리 아이는?', questionType: 'choice', axis: 'trainability', orderIndex: 12,
    choices: [
      { id: 'dog-c3-1', text: '신나서 구석구석 탐험해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: 2 } },
      { id: 'dog-c3-2', text: '천천히 돌아다니며 냄새를 맡아요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: 1 } },
      { id: 'dog-c3-3', text: '보호자 근처에서만 조심스럽게 움직여요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: -1 } },
      { id: 'dog-c3-4', text: '보호자 뒤에 숨거나 안기려 해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, trainability: -2 } },
    ],
  },
  {
    id: 'dog-free-1', petCategory: 'dog', questionText: '우리 아이만의 특이한 행동이 있다면 알려주세요!', questionType: 'free_text', axis: null, orderIndex: 13, choices: [],
  },
];

export const CAT_QUESTIONS: Question[] = [
  {
    id: 'cat-energy-1', petCategory: 'cat', questionText: '놀아주자고 장난감을 꺼내면?', questionType: 'choice', axis: 'extraversion', orderIndex: 1,
    choices: [
      { id: 'cat-e1-1', text: '눈이 번뜩이며 즉시 사냥 모드 돌입!', axisWeights: { extraversion: 2, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e1-2', text: '관심을 보이며 슬슬 다가와요', axisWeights: { extraversion: 1, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e1-3', text: '누운 자세로 앞발만 휘적거려요', axisWeights: { extraversion: -1, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e1-4', text: '눈길 한번 주고 다시 잠자요', axisWeights: { extraversion: -2, amicability: 0, neuroticism: 0, dominance: 0 } },
    ],
  },
  {
    id: 'cat-energy-2', petCategory: 'cat', questionText: '새벽 시간, 우리 고양이는 보통?', questionType: 'choice', axis: 'extraversion', orderIndex: 2,
    choices: [
      { id: 'cat-e2-1', text: '운동회 시작! 집안을 미친 듯이 뛰어다녀요', axisWeights: { extraversion: 2, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e2-2', text: '이것저것 만지고 탐색하며 돌아다녀요', axisWeights: { extraversion: 1, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e2-3', text: '가끔 움직이지만 대부분 조용해요', axisWeights: { extraversion: -1, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e2-4', text: '보호자와 함께 꿀잠 자요', axisWeights: { extraversion: -2, amicability: 0, neuroticism: 0, dominance: 0 } },
    ],
  },
  {
    id: 'cat-energy-3', petCategory: 'cat', questionText: '하루 중 우리 고양이의 활동량은?', questionType: 'choice', axis: 'extraversion', orderIndex: 3,
    choices: [
      { id: 'cat-e3-1', text: '쉬는 시간보다 뛰어다니는 시간이 많아요', axisWeights: { extraversion: 2, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e3-2', text: '활동과 휴식이 반반이에요', axisWeights: { extraversion: 1, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e3-3', text: '대부분 쉬고 가끔 움직여요', axisWeights: { extraversion: -1, amicability: 0, neuroticism: 0, dominance: 0 } },
      { id: 'cat-e3-4', text: '하루 종일 자는 게 일상이에요', axisWeights: { extraversion: -2, amicability: 0, neuroticism: 0, dominance: 0 } },
    ],
  },
  {
    id: 'cat-social-1', petCategory: 'cat', questionText: '처음 보는 사람이 집에 오면?', questionType: 'choice', axis: 'amicability', orderIndex: 4,
    choices: [
      { id: 'cat-s1-1', text: '먼저 다가가서 냄새 맡고 비벼요', axisWeights: { extraversion: 0, amicability: 2, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s1-2', text: '호기심을 보이며 가까이 와서 관찰해요', axisWeights: { extraversion: 0, amicability: 1, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s1-3', text: '멀리서 지켜보다가 한참 후에 나와요', axisWeights: { extraversion: 0, amicability: -1, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s1-4', text: '숨어서 안 나오거나 완전 무시해요', axisWeights: { extraversion: 0, amicability: -2, neuroticism: 0, dominance: 0 } },
    ],
  },
  {
    id: 'cat-social-2', petCategory: 'cat', questionText: '보호자가 소파에 앉아 있으면?', questionType: 'choice', axis: 'amicability', orderIndex: 5,
    choices: [
      { id: 'cat-s2-1', text: '바로 무릎 위로 올라와 자리 잡아요', axisWeights: { extraversion: 0, amicability: 2, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s2-2', text: '옆자리에 와서 나란히 앉아요', axisWeights: { extraversion: 0, amicability: 1, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s2-3', text: '같은 방에는 있지만 좀 떨어져 있어요', axisWeights: { extraversion: 0, amicability: -1, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s2-4', text: '다른 방에서 혼자만의 시간을 보내요', axisWeights: { extraversion: 0, amicability: -2, neuroticism: 0, dominance: 0 } },
    ],
  },
  {
    id: 'cat-social-3', petCategory: 'cat', questionText: '보호자가 화상통화나 영상을 보고 있으면?', questionType: 'choice', axis: 'amicability', orderIndex: 6,
    choices: [
      { id: 'cat-s3-1', text: '화면 앞에 떡하니 앉아서 같이 봐요', axisWeights: { extraversion: 0, amicability: 2, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s3-2', text: '옆에 와서 관심을 가져요', axisWeights: { extraversion: 0, amicability: 1, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s3-3', text: '한번 쳐다보고 자기 할 일 해요', axisWeights: { extraversion: 0, amicability: -1, neuroticism: 0, dominance: 0 } },
      { id: 'cat-s3-4', text: '전혀 관심 없어요', axisWeights: { extraversion: 0, amicability: -2, neuroticism: 0, dominance: 0 } },
    ],
  },
  {
    id: 'cat-sensitivity-1', petCategory: 'cat', questionText: '청소기를 돌리면?', questionType: 'choice', axis: 'neuroticism', orderIndex: 7,
    choices: [
      { id: 'cat-d1-1', text: '순간이동 하듯 침대 밑으로 사라져요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 2, dominance: 0 } },
      { id: 'cat-d1-2', text: '경계하며 높은 곳으로 올라가요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 1, dominance: 0 } },
      { id: 'cat-d1-3', text: '잠깐 쳐다보다가 신경 꺼요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -1, dominance: 0 } },
      { id: 'cat-d1-4', text: '바로 옆에서도 꿈쩍 안 해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -2, dominance: 0 } },
    ],
  },
  {
    id: 'cat-sensitivity-2', petCategory: 'cat', questionText: '보호자가 울거나 슬퍼하면?', questionType: 'choice', axis: 'neuroticism', orderIndex: 8,
    choices: [
      { id: 'cat-d2-1', text: '옆에 와서 꾹꾹이를 하거나 얼굴을 비벼요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 2, dominance: 0 } },
      { id: 'cat-d2-2', text: '평소와 다르게 가까이 와서 있어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 1, dominance: 0 } },
      { id: 'cat-d2-3', text: '평소와 별 차이 없는 것 같아요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -1, dominance: 0 } },
      { id: 'cat-d2-4', text: '전혀 반응 없이 자기 세계에 빠져 있어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -2, dominance: 0 } },
    ],
  },
  {
    id: 'cat-sensitivity-3', petCategory: 'cat', questionText: '새로운 향(방향제, 향수 등)이 집에 생기면?', questionType: 'choice', axis: 'neuroticism', orderIndex: 9,
    choices: [
      { id: 'cat-d3-1', text: '플레멘 반응하며 한참 킁킁거려요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 2, dominance: 0 } },
      { id: 'cat-d3-2', text: '냄새 나는 쪽을 확인하러 가요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 1, dominance: 0 } },
      { id: 'cat-d3-3', text: '잠깐 냄새 맡고 신경 안 써요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -1, dominance: 0 } },
      { id: 'cat-d3-4', text: '전혀 반응 없어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: -2, dominance: 0 } },
    ],
  },
  {
    id: 'cat-curiosity-1', petCategory: 'cat', questionText: '택배 상자가 도착하면?', questionType: 'choice', axis: 'dominance', orderIndex: 10,
    choices: [
      { id: 'cat-c1-1', text: '뜯기도 전에 상자 위에 올라타요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: 2 } },
      { id: 'cat-c1-2', text: '열면 바로 안으로 들어가 탐색해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: 1 } },
      { id: 'cat-c1-3', text: '멀리서 보다가 나중에 슬쩍 들어가요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: -1 } },
      { id: 'cat-c1-4', text: '상자에 전혀 관심 없어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: -2 } },
    ],
  },
  {
    id: 'cat-curiosity-2', petCategory: 'cat', questionText: '창문 밖에 새가 나타나면?', questionType: 'choice', axis: 'dominance', orderIndex: 11,
    choices: [
      { id: 'cat-c2-1', text: '캐캐캐 소리 내며 사냥 자세를 취해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: 2 } },
      { id: 'cat-c2-2', text: '창가에 가서 집중해서 관찰해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: 1 } },
      { id: 'cat-c2-3', text: '잠깐 쳐다보다 관심을 끊어요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: -1 } },
      { id: 'cat-c2-4', text: '창밖에 뭐가 있든 신경 안 써요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: -2 } },
    ],
  },
  {
    id: 'cat-curiosity-3', petCategory: 'cat', questionText: '평소 안 열어주던 방문을 열어주면?', questionType: 'choice', axis: 'dominance', orderIndex: 12,
    choices: [
      { id: 'cat-c3-1', text: '번개같이 들어가서 구석구석 탐험해요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: 2 } },
      { id: 'cat-c3-2', text: '조심스럽게 들어가서 냄새를 맡아요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: 1 } },
      { id: 'cat-c3-3', text: '문 앞에서 잠깐 보고 말아요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: -1 } },
      { id: 'cat-c3-4', text: '열려 있어도 안 들어가요', axisWeights: { extraversion: 0, amicability: 0, neuroticism: 0, dominance: -2 } },
    ],
  },
  {
    id: 'cat-free-1', petCategory: 'cat', questionText: '우리 고양이만의 특이한 행동이 있다면 알려주세요!', questionType: 'free_text', axis: null, orderIndex: 13, choices: [],
  },
];
