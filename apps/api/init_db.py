"""DB 테이블 생성 + 시드 데이터 삽입"""
import asyncio
import uuid

from app.database import Base, engine, async_session_factory
from app.models import *  # noqa: F401,F403 - 모든 모델 임포트
from app.models.pet_type import PetType
from app.models.question import Question


DOG_TYPES_DATA = [
    ("EAST", "탐험가", "", "활발하고 사교적이고 섬세하고 호기심 폭발! 어디서든 주목받는 에너지 넘치는 탐험가.", "IRCF"),
    ("EASF", "수호자", "", "활발하고 사교적이고 섬세하지만 안전한 곳을 좋아하는 든든한 수호자.", "IRCT"),
    ("EACT", "사교가", "", "에너지 넘치고 사교적이고 담대하고 호기심 많은 인기쟁이.", "IRSF"),
    ("EACF", "리더", "", "에너지 넘치고 사교적이고 담대하고 자기 영역을 지키는 리더.", "IRST"),
    ("ERST", "관찰자", "", "활발하지만 독립적, 섬세하고 호기심이 강한 탐정 기질.", "IACF"),
    ("ERSF", "감성파", "", "활발하지만 독립적, 섬세하고 안전을 추구하는 예민한 아이.", "IACT"),
    ("ERCT", "개척자", "", "활발하고 독립적이고 담대하고 탐험을 사랑하는 야생 기질.", "IASF"),
    ("ERCF", "독립가", "", "에너지 넘치고 독립적이고 담대하고 자기 영역이 확실한 자유로운 영혼.", "IAST"),
    ("IAST", "공감가", "", "느긋하지만 사교적, 섬세하고 호기심 있는 따뜻한 공감 능력자.", "ERCF"),
    ("IASF", "치유자", "", "느긋하고 사교적이고 섬세하고 안전한 곳을 좋아하는 힐링 메이커.", "ERCT"),
    ("IACT", "적응가", "", "느긋하고 사교적이고 담대하고 탐험도 즐기는 편안한 성격.", "ERSF"),
    ("IACF", "평화주의자", "", "느긋하고 사교적이고 담대하고 자기 자리를 좋아하는 태평한 성격.", "ERST"),
    ("IRST", "사색가", "", "느긋하고 독립적이고 섬세하고 호기심이 있는 감성적인 아이.", "EACF"),
    ("IRSF", "내면가", "", "느긋하고 독립적이고 섬세하고 안전을 추구하는 조용한 관찰자.", "EACT"),
    ("IRCT", "자유인", "", "느긋하고 독립적이고 담대하고 탐험도 즐기는 달관한 성격.", "EASF"),
    ("IRCF", "안식가", "", "느긋하고 독립적이고 담대하고 자기 자리를 좋아하는 집순이.", "EAST"),
]

CAT_TYPES_DATA = [
    ("EASD", "탐험가", "", "활발하고 집사 좋아하고 섬세한 탐험가 고양이.", "IRCP"),
    ("EASP", "수호자", "", "활발하고 집사 좋아하고 섬세하지만 영역을 지키는 냥이.", "IRCD"),
    ("EACD", "사교가", "", "에너지 넘치고 집사 러브, 대범하고 호기심 많은 파티 냥이.", "IRSP"),
    ("EACP", "리더", "", "사냥 본능 강하고 집사 좋아하고 대범하고 영역 의식 확실.", "IRSD"),
    ("ERSD", "관찰자", "", "활발하지만 독립적, 섬세하고 탐험을 사랑하는 냥이.", "IACP"),
    ("ERSP", "감성파", "", "활발하지만 독립적, 섬세하고 자기 영역을 중시하는 감성파.", "IACD"),
    ("ERCD", "개척자", "", "활발하고 독립적이고 대범하고 탐험하는 사냥꾼 기질.", "IASP"),
    ("ERCP", "독립가", "", "에너지 넘치고 독립적이고 대범하고 영역을 지배하는 보스.", "IASD"),
    ("IASD", "공감가", "", "느긋하고 집사 좋아하고 섬세하고 호기심 있는 힐링 냥이.", "ERCP"),
    ("IASP", "치유자", "", "느긋하고 집사 좋아하고 섬세하고 안전한 곳을 좋아하는 무릎 냥이.", "ERCD"),
    ("IACD", "적응가", "", "느긋하고 집사 좋아하고 대범하고 탐험도 즐기는 평화로운 냥이.", "ERSP"),
    ("IACP", "평화주의자", "", "느긋하고 집사 좋아하고 대범하고 자기 자리를 좋아하는 귀족.", "ERSD"),
    ("IRSD", "사색가", "", "느긋하고 독립적이고 섬세하고 관찰력 좋은 현자.", "EACP"),
    ("IRSP", "내면가", "", "느긋하고 독립적이고 섬세하고 자기만의 세계가 확실한 냥이.", "EACD"),
    ("IRCD", "자유인", "", "느긋하고 독립적이고 대범하고 탐험하는 닌자.", "EASP"),
    ("IRCP", "안식가", "", "느긋하고 독립적이고 대범하고 자기 영역이 확실한 도도한 냥이.", "EASD"),
]

DOG_QUESTIONS_DATA = [
    # 에너지 축 (3개)
    ("dog", "산책하자고 하면 반응이?", "choice", "extraversion", 1, [
        {"id": "a", "text": "미친듯이 뛰어다니며 좋아함", "axisWeights": {"extraversion": 2, "amicability": 0, "neuroticism": 0, "trainability": 0}},
        {"id": "b", "text": "꼬리 흔들며 기대하는 눈빛", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "trainability": 0}},
        {"id": "c", "text": "슬슬 일어나서 준비", "axisWeights": {"extraversion": -1, "amicability": 0, "neuroticism": 0, "trainability": 0}},
        {"id": "d", "text": "자리에서 잘 안 일어남", "axisWeights": {"extraversion": -2, "amicability": 0, "neuroticism": 0, "trainability": 0}},
    ]),
    ("dog", "집에서 주로 어떤 상태?", "choice", "extraversion", 2, [
        {"id": "a", "text": "이리저리 돌아다니며 활동적", "axisWeights": {"extraversion": 2, "amicability": 0, "neuroticism": 0, "trainability": 0}},
        {"id": "b", "text": "장난감 물고 놀기", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "trainability": 1}},
        {"id": "c", "text": "조용히 앉아있거나 창밖 구경", "axisWeights": {"extraversion": -1, "amicability": 0, "neuroticism": 0, "trainability": 0}},
        {"id": "d", "text": "거의 자고 있음", "axisWeights": {"extraversion": -2, "amicability": 0, "neuroticism": 0, "trainability": 0}},
    ]),
    ("dog", "다른 강아지랑 놀 때 체력은?", "choice", "extraversion", 3, [
        {"id": "a", "text": "지칠 줄 모르고 계속 놀자고 함", "axisWeights": {"extraversion": 2, "amicability": 1, "neuroticism": 0, "trainability": 0}},
        {"id": "b", "text": "적당히 놀다가 쉬었다 또 놀기", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "trainability": 0}},
        {"id": "c", "text": "금방 지쳐서 쉼", "axisWeights": {"extraversion": -1, "amicability": 0, "neuroticism": 0, "trainability": 0}},
        {"id": "d", "text": "놀기보다 그냥 옆에 있음", "axisWeights": {"extraversion": -2, "amicability": -1, "neuroticism": 0, "trainability": 0}},
    ]),
    # 사교성 축 (3개)
    ("dog", "낯선 사람이 집에 오면?", "choice", "amicability", 4, [
        {"id": "a", "text": "바로 달려가서 반겨줌", "axisWeights": {"extraversion": 0, "amicability": 2, "neuroticism": 0, "trainability": 0}},
        {"id": "b", "text": "냄새 맡고 천천히 다가감", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 0, "trainability": 1}},
        {"id": "c", "text": "경계하면서 거리를 유지", "axisWeights": {"extraversion": 0, "amicability": -1, "neuroticism": 1, "trainability": 0}},
        {"id": "d", "text": "숨거나 무시", "axisWeights": {"extraversion": 0, "amicability": -2, "neuroticism": 0, "trainability": 0}},
    ]),
    ("dog", "산책 중 낯선 강아지를 만나면?", "choice", "amicability", 5, [
        {"id": "a", "text": "신나서 바로 달려감", "axisWeights": {"extraversion": 1, "amicability": 2, "neuroticism": 0, "trainability": 0}},
        {"id": "b", "text": "냄새 맡으며 인사", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 0, "trainability": 0}},
        {"id": "c", "text": "보호자 뒤로 숨음", "axisWeights": {"extraversion": 0, "amicability": -1, "neuroticism": 1, "trainability": 0}},
        {"id": "d", "text": "무관심하게 지나감", "axisWeights": {"extraversion": 0, "amicability": -2, "neuroticism": 0, "trainability": 0}},
    ]),
    ("dog", "가족이 외출 준비를 하면?", "choice", "amicability", 6, [
        {"id": "a", "text": "따라가려고 난리", "axisWeights": {"extraversion": 1, "amicability": 2, "neuroticism": 1, "trainability": 0}},
        {"id": "b", "text": "아쉬운 눈빛으로 쳐다봄", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 1, "trainability": 0}},
        {"id": "c", "text": "별 반응 없이 자기 할 일", "axisWeights": {"extraversion": 0, "amicability": -1, "neuroticism": 0, "trainability": 0}},
        {"id": "d", "text": "오히려 편해하는 느낌", "axisWeights": {"extraversion": 0, "amicability": -2, "neuroticism": 0, "trainability": 0}},
    ]),
    # 감수성 축 (3개)
    ("dog", "갑자기 큰 소리가 나면?", "choice", "neuroticism", 7, [
        {"id": "a", "text": "벌벌 떨거나 숨음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 2, "trainability": 0}},
        {"id": "b", "text": "귀를 쫑긋 세우고 긴장", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "trainability": 0}},
        {"id": "c", "text": "잠깐 쳐다보다 무시", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -1, "trainability": 0}},
        {"id": "d", "text": "전혀 신경 안 씀", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -2, "trainability": 0}},
    ]),
    ("dog", "보호자가 슬퍼하거나 아플 때?", "choice", "neuroticism", 8, [
        {"id": "a", "text": "옆에 와서 얼굴을 핥아줌", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 2, "trainability": 0}},
        {"id": "b", "text": "가까이 와서 조용히 있음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "trainability": 0}},
        {"id": "c", "text": "평소랑 똑같이 행동", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -1, "trainability": 0}},
        {"id": "d", "text": "오히려 놀자고 함", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": -2, "trainability": 0}},
    ]),
    ("dog", "가구 배치를 바꾸면?", "choice", "neuroticism", 9, [
        {"id": "a", "text": "불안해하며 낑낑거림", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 2, "trainability": 0}},
        {"id": "b", "text": "이리저리 냄새 맡으며 확인", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "trainability": 1}},
        {"id": "c", "text": "잠깐 둘러보다 적응", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -1, "trainability": 0}},
        {"id": "d", "text": "아무 반응 없음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -2, "trainability": 0}},
    ]),
    # 호기심 축 (3개)
    ("dog", "처음 가는 장소에서?", "choice", "trainability", 10, [
        {"id": "a", "text": "신나서 이곳저곳 탐험", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "trainability": 2}},
        {"id": "b", "text": "주변을 천천히 살핌", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "trainability": 1}},
        {"id": "c", "text": "보호자 곁에서 벗어나지 않음", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 0, "trainability": -1}},
        {"id": "d", "text": "가기 싫어함", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "trainability": -2}},
    ]),
    ("dog", "새로운 장난감을 주면?", "choice", "trainability", 11, [
        {"id": "a", "text": "바로 물고 흔들고 탐색", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "trainability": 2}},
        {"id": "b", "text": "냄새 맡고 조심스럽게 접근", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "trainability": 1}},
        {"id": "c", "text": "관심은 보이지만 멀리서 관찰", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "trainability": -1}},
        {"id": "d", "text": "기존 장난감이 더 좋음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "trainability": -2}},
    ]),
    ("dog", "산책 중 새로운 길을 발견하면?", "choice", "trainability", 12, [
        {"id": "a", "text": "그쪽으로 끌고 가려 함", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "trainability": 2}},
        {"id": "b", "text": "관심 있게 쳐다봄", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "trainability": 1}},
        {"id": "c", "text": "원래 가던 길 고수", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "trainability": -1}},
        {"id": "d", "text": "새로운 길은 불안해함", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "trainability": -2}},
    ]),
    # 자유입력
    ("dog", "우리 아이만의 특이한 행동이 있다면?", "free_text", "extraversion", 13, []),
]

CAT_QUESTIONS_DATA = [
    ("cat", "레이저 포인터를 켜면?", "choice", "extraversion", 1, [
        {"id": "a", "text": "미친듯이 쫓아다님", "axisWeights": {"extraversion": 2, "amicability": 0, "neuroticism": 0, "dominance": 1}},
        {"id": "b", "text": "처음엔 쫓다가 금방 흥미 잃음", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "dominance": 0}},
        {"id": "c", "text": "누워서 눈으로만 따라감", "axisWeights": {"extraversion": -1, "amicability": 0, "neuroticism": 0, "dominance": 0}},
        {"id": "d", "text": "무관심", "axisWeights": {"extraversion": -2, "amicability": 0, "neuroticism": 0, "dominance": 0}},
    ]),
    ("cat", "밤에 주로 뭘 하나요?", "choice", "extraversion", 2, [
        {"id": "a", "text": "운동회 개최 (집안 질주)", "axisWeights": {"extraversion": 2, "amicability": 0, "neuroticism": 0, "dominance": 0}},
        {"id": "b", "text": "가끔 놀다가 잠", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "dominance": 0}},
        {"id": "c", "text": "집사랑 같이 잠", "axisWeights": {"extraversion": -1, "amicability": 1, "neuroticism": 0, "dominance": 0}},
        {"id": "d", "text": "하루 종일 거의 잠만 잠", "axisWeights": {"extraversion": -2, "amicability": 0, "neuroticism": 0, "dominance": 0}},
    ]),
    ("cat", "장난감 놀이 시간은?", "choice", "extraversion", 3, [
        {"id": "a", "text": "30분 이상도 거뜬", "axisWeights": {"extraversion": 2, "amicability": 0, "neuroticism": 0, "dominance": 0}},
        {"id": "b", "text": "10~15분 정도", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "dominance": 0}},
        {"id": "c", "text": "5분이면 끝", "axisWeights": {"extraversion": -1, "amicability": 0, "neuroticism": 0, "dominance": 0}},
        {"id": "d", "text": "장난감에 관심 없음", "axisWeights": {"extraversion": -2, "amicability": 0, "neuroticism": 0, "dominance": -1}},
    ]),
    ("cat", "집사가 쓰다듬으려 하면?", "choice", "amicability", 4, [
        {"id": "a", "text": "골골송 부르며 좋아함", "axisWeights": {"extraversion": 0, "amicability": 2, "neuroticism": 0, "dominance": 0}},
        {"id": "b", "text": "기분 좋을 때만 허락", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 0, "dominance": 0}},
        {"id": "c", "text": "잠깐 참다가 피함", "axisWeights": {"extraversion": 0, "amicability": -1, "neuroticism": 0, "dominance": 0}},
        {"id": "d", "text": "터치하면 화냄", "axisWeights": {"extraversion": 0, "amicability": -2, "neuroticism": 1, "dominance": 0}},
    ]),
    ("cat", "손님이 집에 오면?", "choice", "amicability", 5, [
        {"id": "a", "text": "다가가서 냄새 맡고 인사", "axisWeights": {"extraversion": 0, "amicability": 2, "neuroticism": 0, "dominance": 1}},
        {"id": "b", "text": "멀리서 관찰", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": 1}},
        {"id": "c", "text": "숨어버림", "axisWeights": {"extraversion": 0, "amicability": -1, "neuroticism": 1, "dominance": 0}},
        {"id": "d", "text": "하악질 or 경계", "axisWeights": {"extraversion": 0, "amicability": -2, "neuroticism": 1, "dominance": 0}},
    ]),
    ("cat", "집사가 퇴근하고 돌아오면?", "choice", "amicability", 6, [
        {"id": "a", "text": "문 앞에서 기다리고 있음", "axisWeights": {"extraversion": 0, "amicability": 2, "neuroticism": 1, "dominance": 0}},
        {"id": "b", "text": "슬슬 다가와서 반겨줌", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 0, "dominance": 0}},
        {"id": "c", "text": "눈만 마주치고 무시", "axisWeights": {"extraversion": 0, "amicability": -1, "neuroticism": 0, "dominance": 0}},
        {"id": "d", "text": "전혀 관심 없음", "axisWeights": {"extraversion": 0, "amicability": -2, "neuroticism": 0, "dominance": 0}},
    ]),
    ("cat", "청소기를 켜면?", "choice", "neuroticism", 7, [
        {"id": "a", "text": "도망가서 숨음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 2, "dominance": 0}},
        {"id": "b", "text": "긴장하며 경계", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "dominance": 0}},
        {"id": "c", "text": "귀찮은 듯 자리 옮김", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -1, "dominance": 0}},
        {"id": "d", "text": "신경 안 씀", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -2, "dominance": 0}},
    ]),
    ("cat", "집사의 감정 변화를 눈치채나요?", "choice", "neuroticism", 8, [
        {"id": "a", "text": "바로 알아채고 옆에 옴", "axisWeights": {"extraversion": 0, "amicability": 1, "neuroticism": 2, "dominance": 0}},
        {"id": "b", "text": "뭔가 느끼는 것 같음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "dominance": 0}},
        {"id": "c", "text": "잘 모르는 것 같음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -1, "dominance": 0}},
        {"id": "d", "text": "전혀 관심 없음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -2, "dominance": 0}},
    ]),
    ("cat", "캣타워 위치를 바꾸면?", "choice", "neuroticism", 9, [
        {"id": "a", "text": "불안해하며 안 올라감", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 2, "dominance": 0}},
        {"id": "b", "text": "냄새 맡으며 확인 후 적응", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "dominance": 1}},
        {"id": "c", "text": "바로 적응", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -1, "dominance": 0}},
        {"id": "d", "text": "아무 반응 없이 바로 사용", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": -2, "dominance": 0}},
    ]),
    ("cat", "상자를 놔두면?", "choice", "dominance", 10, [
        {"id": "a", "text": "즉시 들어감", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": 2}},
        {"id": "b", "text": "냄새 맡고 둘러본 후 들어감", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": 1}},
        {"id": "c", "text": "멀리서 쳐다만 봄", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": -1}},
        {"id": "d", "text": "무관심", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": -2}},
    ]),
    ("cat", "새로운 물건을 집에 들이면?", "choice", "dominance", 11, [
        {"id": "a", "text": "바로 다가가서 조사", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": 2}},
        {"id": "b", "text": "천천히 접근해서 냄새 맡기", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": 1}},
        {"id": "c", "text": "경계하며 멀리서 관찰", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 1, "dominance": -1}},
        {"id": "d", "text": "관심 없음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": -2}},
    ]),
    ("cat", "창문 밖에 새가 보이면?", "choice", "dominance", 12, [
        {"id": "a", "text": "캭캭 소리 내며 흥분", "axisWeights": {"extraversion": 1, "amicability": 0, "neuroticism": 0, "dominance": 2}},
        {"id": "b", "text": "조용히 집중해서 관찰", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": 1}},
        {"id": "c", "text": "잠깐 보다 말기", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": -1}},
        {"id": "d", "text": "관심 없음", "axisWeights": {"extraversion": 0, "amicability": 0, "neuroticism": 0, "dominance": -2}},
    ]),
    ("cat", "우리 고양이만의 독특한 루틴이 있다면?", "free_text", "extraversion", 13, []),
]


async def main():
    # 테이블 생성
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)
        await conn.run_sync(Base.metadata.create_all)
    print("✅ 테이블 생성 완료")

    # 시드 데이터 삽입
    async with async_session_factory() as session:
        # 유형 데이터
        for code, name, emoji, desc, compat in DOG_TYPES_DATA:
            session.add(PetType(
                pet_category="dog", type_code=code, character_name=name,
                character_emoji=emoji, base_description=desc,
                compatible_types=[compat],
            ))
        for code, name, emoji, desc, compat in CAT_TYPES_DATA:
            session.add(PetType(
                pet_category="cat", type_code=code, character_name=name,
                character_emoji=emoji, base_description=desc,
                compatible_types=[compat],
            ))
        print("✅ 32개 유형 데이터 삽입")

        # 질문 데이터
        for cat, text, qtype, axis, order, choices in DOG_QUESTIONS_DATA:
            session.add(Question(
                pet_category=cat, question_text=text, question_type=qtype,
                axis=axis, choices=choices, order_index=order, is_active=True,
            ))
        for cat, text, qtype, axis, order, choices in CAT_QUESTIONS_DATA:
            session.add(Question(
                pet_category=cat, question_text=text, question_type=qtype,
                axis=axis, choices=choices, order_index=order, is_active=True,
            ))
        print("✅ 26개 질문 데이터 삽입")

        await session.commit()
    print("✅ DB 초기화 완료!")


if __name__ == "__main__":
    asyncio.run(main())
