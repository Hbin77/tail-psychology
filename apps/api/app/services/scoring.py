from app.models.question import Question
from app.models.response import Response


def calculate_base_scores(
    responses: list[Response], questions: list[Question]
) -> dict[str, float]:
    """각 응답의 axis_weights를 합산하고 -1 ~ +1로 정규화한다."""
    question_map = {str(q.id): q for q in questions}

    axis_totals: dict[str, float] = {
        "energy": 0.0,
        "social": 0.0,
        "sensitivity": 0.0,
        "curiosity": 0.0,
    }
    axis_counts: dict[str, int] = {
        "energy": 0,
        "social": 0,
        "sensitivity": 0,
        "curiosity": 0,
    }

    for resp in responses:
        question = question_map.get(str(resp.question_id))
        if not question or question.question_type == "free_text":
            continue

        # choices 구조: [{"id": "a", "text": "...", "axisWeights": {"energy": 2, ...}}, ...]
        if question.choices and resp.choice_id:
            for choice in question.choices:
                if choice.get("id") == resp.choice_id:
                    weights = choice.get("axisWeights", {})
                    for axis_key, weight_val in weights.items():
                        if axis_key in axis_totals:
                            axis_totals[axis_key] += weight_val
                            axis_counts[axis_key] += 1
                    break

    # -1 ~ +1 정규화 (최대 가중치 2 기준, 축당 약 3~4개 질문)
    scores: dict[str, float] = {}
    for axis in axis_totals:
        count = axis_counts[axis]
        if count > 0:
            # 최대값은 count * 2 (각 질문 최대 가중치 2)
            max_possible = count * 2.0
            raw = axis_totals[axis] / max_possible
            scores[axis] = max(-1.0, min(1.0, raw))
        else:
            scores[axis] = 0.0

    return scores


def determine_type_code(scores: dict[str, float]) -> str:
    """4축 점수로 유형 코드를 결정한다."""
    code = ""
    code += "A" if scores.get("energy", 0) >= 0 else "C"
    code += "S" if scores.get("social", 0) >= 0 else "M"
    code += "D" if scores.get("sensitivity", 0) >= 0 else "B"
    code += "E" if scores.get("curiosity", 0) >= 0 else "H"
    return code
