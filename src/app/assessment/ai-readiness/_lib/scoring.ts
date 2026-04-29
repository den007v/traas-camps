import { DOMAINS, QUESTIONS } from "./schema";
import type { Answers, DomainKey, ProfileKey, ScoreResult } from "./types";

const SCORING_DOMAINS = DOMAINS.filter((domain) => domain.weight > 0);

function getLevel(pct: number): "low" | "mid" | "high" {
  if (pct < 41) return "low";
  if (pct <= 70) return "mid";
  return "high";
}

function getProfile(score: number): ProfileKey {
  if (score <= 24) return "fragmented";
  if (score <= 49) return "pilot_ready";
  if (score <= 74) return "managed_scaling";
  return "platform_ready";
}

export function computeResult(answers: Answers): ScoreResult {
  for (const question of QUESTIONS) {
    const value = answers[question.id];
    if (value !== 0 && value !== 1 && value !== 2 && value !== 3) {
      throw new Error(`Missing answer for ${question.id}`);
    }
  }

  const domainScores: ScoreResult["domainScores"] = {};

  for (const domain of SCORING_DOMAINS) {
    const questions = QUESTIONS.filter((question) => question.domain === domain.key);
    const raw = questions.reduce((sum, question) => sum + answers[question.id], 0);
    const max = questions.length * 3;
    const pct = max > 0 ? Math.round((raw / max) * 100) : 0;
    domainScores[domain.key] = {
      raw,
      max,
      pct,
      level: getLevel(pct),
    };
  }

  const rawScore = Math.round(
    SCORING_DOMAINS.reduce((sum, domain) => {
      const domainScore = domainScores[domain.key];
      return sum + ((domainScore?.pct ?? 0) / 100) * domain.weight * 100;
    }, 0),
  );

  const triggeredCaps = SCORING_DOMAINS.flatMap((domain) => {
    if (!domain.hardCap) return [];
    const hasZero = QUESTIONS.some(
      (question) => question.domain === domain.key && answers[question.id] === 0,
    );
    return hasZero ? [domain.hardCap] : [];
  });
  const hardCapValue = triggeredCaps.length > 0 ? Math.min(...triggeredCaps) : 100;
  const finalScore = Math.min(rawScore, hardCapValue);
  const profile = getProfile(finalScore);
  const blockerCount = profile === "fragmented" || profile === "pilot_ready" ? 3 : 2;
  const topBlockers = [...SCORING_DOMAINS].sort((a, b) => {
    const pctDiff = (domainScores[a.key]?.pct ?? 0) - (domainScores[b.key]?.pct ?? 0);
    if (pctDiff !== 0) return pctDiff;
    return b.weight - a.weight;
  })
    .slice(0, blockerCount)
    .map((domain) => domain.key as DomainKey);

  return {
    rawScore,
    finalScore,
    hardCapTriggered: triggeredCaps.length > 0,
    domainScores,
    profile,
    topBlockers,
  };
}

/**
 * Scoring smoke scenarios:
 * 1. All answers = 1 -> raw/final ~= 33, profile "pilot_ready".
 * 2. All answers = 3 -> final = 100, profile "platform_ready".
 * 3. Q1 = 0, others = 3 -> hard cap 49, profile "pilot_ready".
 * 4. Q3 = 0 and Q5 = 0, others = 3 -> lowest hard cap 59, profile "managed_scaling".
 */
