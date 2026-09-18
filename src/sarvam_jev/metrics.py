"""Decision metrics.

``mean_family_balanced_accuracy`` mirrors the headline metric in openjev's
``benchmarks/evaluate.py`` so our Sarvam numbers land on the same scale as the
published Qwen ladder. Balanced accuracy is macro-recall over the gold classes
that actually occur, averaged across families with equal weight.
"""

from __future__ import annotations

from collections import defaultdict


def balanced_accuracy(pairs: list[tuple[str, str]]) -> float | None:
    """Macro-recall over represented gold classes. ``pairs`` is (gold_id, pred_id)."""
    if not pairs:
        return None
    correct: dict[str, int] = defaultdict(int)
    total: dict[str, int] = defaultdict(int)
    for gold, predicted in pairs:
        total[gold] += 1
        correct[gold] += gold == predicted
    recalls = [correct[label] / total[label] for label in total]
    return sum(recalls) / len(recalls)


def accuracy(pairs: list[tuple[str, str]]) -> float | None:
    if not pairs:
        return None
    return sum(gold == predicted for gold, predicted in pairs) / len(pairs)


def macro_f1(pairs: list[tuple[str, str]]) -> float | None:
    if not pairs:
        return None
    labels = sorted({gold for gold, _ in pairs} | {predicted for _, predicted in pairs})
    scores = []
    for label in labels:
        tp = sum(g == label and p == label for g, p in pairs)
        fp = sum(g != label and p == label for g, p in pairs)
        fn = sum(g == label and p != label for g, p in pairs)
        if tp == 0:
            scores.append(0.0)
            continue
        precision, recall = tp / (tp + fp), tp / (tp + fn)
        scores.append(2 * precision * recall / (precision + recall))
    gold_labels = {gold for gold, _ in pairs}
    scored = [score for label, score in zip(labels, scores) if label in gold_labels]
    return sum(scored) / len(scored) if scored else None


def summarize(records: list[dict]) -> dict:
    """Aggregate scored records that each carry family, gold_id and predicted_id."""
    families: dict[str, list[tuple[str, str]]] = defaultdict(list)
    overall: list[tuple[str, str]] = []
    for record in records:
        pair = (record["gold_id"], record["predicted_id"])
        families[record.get("family", "all")].append(pair)
        overall.append(pair)
    per_family = {
        name: {
            "n": len(pairs),
            "accuracy": accuracy(pairs),
            "balanced_accuracy": balanced_accuracy(pairs),
            "macro_f1": macro_f1(pairs),
        }
        for name, pairs in sorted(families.items())
    }
    family_scores = [value["balanced_accuracy"] for value in per_family.values()
                     if value["balanced_accuracy"] is not None]
    chance = [1.0 / len(record["option_ids"]) for record in records if record.get("option_ids")]
    return {
        "n": len(overall),
        "accuracy": accuracy(overall),
        "mean_family_balanced_accuracy": (
            sum(family_scores) / len(family_scores) if family_scores else None
        ),
        "chance_balanced_accuracy": sum(chance) / len(chance) if chance else None,
        "family_results": per_family,
    }
