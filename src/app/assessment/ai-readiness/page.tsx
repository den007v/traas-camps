"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { FullResult } from "./_components/FullResult";
import { IntroScreen } from "./_components/IntroScreen";
import { ProfileQuestionScreen } from "./_components/ProfileQuestionScreen";
import { QuestionScreen } from "./_components/QuestionScreen";
import { assessmentBackground, assessmentShell } from "./_components/styles";
import { PROFILE_QUESTIONS, QUESTIONS } from "./_lib/schema";
import { computeResult } from "./_lib/scoring";
import type { Answers, ProfileAnswers, ScreenState } from "./_lib/types";

const STORAGE_KEY = "traas_assessment_v1";
const AUTO_ADVANCE_DELAY_MS = 360;
const TOTAL_STEPS = PROFILE_QUESTIONS.length + QUESTIONS.length;

type StoredAssessment = {
  version: 1;
  screen: ScreenState;
  answers: Answers;
  profileAnswers: ProfileAnswers;
};

export default function AIReadinessAssessmentPage() {
  const [screen, setScreen] = useState<ScreenState>({ kind: "intro" });
  const [answers, setAnswers] = useState<Answers>({});
  const [profileAnswers, setProfileAnswers] = useState<ProfileAnswers>({});
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const analyticsSubmitted = useRef(false);

  function clearAutoAdvanceTimer() {
    if (!autoAdvanceTimer.current) return;
    clearTimeout(autoAdvanceTimer.current);
    autoAdvanceTimer.current = null;
  }

  useEffect(() => {
    const payload: StoredAssessment = {
      version: 1,
      screen,
      answers,
      profileAnswers,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [answers, profileAnswers, screen]);

  useEffect(() => {
    const hasAnswered = Object.keys(answers).length > 0;
    if (screen.kind !== "question" || !hasAnswered) return;

    function handleBeforeUnload(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = "Прогресс не сохранён. Уйти со страницы?";
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [answers, screen.kind]);

  useEffect(() => clearAutoAdvanceTimer, []);

  const result = useMemo(
    () => (Object.keys(answers).length === QUESTIONS.length ? computeResult(answers) : null),
    [answers],
  );

  useEffect(() => {
    if (!result || analyticsSubmitted.current) return;
    analyticsSubmitted.current = true;

    const scores = QUESTIONS.map((question) => answers[question.id]);
    void fetch("/api/assessment/ai-readiness", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assessmentVersion: "ai_readiness_stage_1_1",
        role: profileAnswers.role,
        companySize: profileAnswers.companySize,
        scores,
        result: {
          profile: result.profile,
          finalScore: result.finalScore,
          rawScore: result.rawScore,
          hardCapTriggered: result.hardCapTriggered,
          domainScores: result.domainScores,
          topBlockers: result.topBlockers,
        },
      }),
    }).catch(() => {
      analyticsSubmitted.current = false;
    });
  }, [answers, profileAnswers, result]);

  function start() {
    setScreen({ kind: "profile", index: 0 });
  }

  function selectProfileAnswer(value: string) {
    if (screen.kind !== "profile") return;
    const question = PROFILE_QUESTIONS[screen.index];
    setProfileAnswers((prev) => ({ ...prev, [question.id]: value }));
    clearAutoAdvanceTimer();

    const nextScreen: ScreenState =
      screen.index === PROFILE_QUESTIONS.length - 1
        ? { kind: "question", index: 0 }
        : { kind: "profile", index: screen.index + 1 };

    autoAdvanceTimer.current = setTimeout(() => {
      setScreen(nextScreen);
      autoAdvanceTimer.current = null;
    }, AUTO_ADVANCE_DELAY_MS);
  }

  function selectAnswer(score: number) {
    if (screen.kind !== "question") return;
    const question = QUESTIONS[screen.index];
    setAnswers((prev) => ({ ...prev, [question.id]: score }));
    clearAutoAdvanceTimer();

    const nextScreen: ScreenState =
      screen.index === QUESTIONS.length - 1
        ? { kind: "result" }
        : { kind: "question", index: screen.index + 1 };

    autoAdvanceTimer.current = setTimeout(() => {
      setScreen(nextScreen);
      autoAdvanceTimer.current = null;
    }, AUTO_ADVANCE_DELAY_MS);
  }

  function goBack() {
    if (screen.kind !== "question" && screen.kind !== "profile") return;
    clearAutoAdvanceTimer();

    if (screen.kind === "profile" && screen.index === 0) {
      setScreen({ kind: "intro" });
      return;
    }

    if (screen.kind === "profile") {
      setScreen({ kind: "profile", index: screen.index - 1 });
      return;
    }

    if (screen.index === 0) {
      setScreen({ kind: "profile", index: PROFILE_QUESTIONS.length - 1 });
      return;
    }

    setScreen({ kind: "question", index: screen.index - 1 });
  }

  if (screen.kind === "result" && !result) {
    return (
      <div className={assessmentShell}>
        <div className={assessmentBackground} aria-hidden="true" />
        <div className="relative">
          <IntroScreen onStart={start} />
        </div>
      </div>
    );
  }

  return (
    <div className={assessmentShell}>
      <div className={assessmentBackground} aria-hidden="true" />
      <div className="relative">
        {screen.kind === "intro" ? <IntroScreen onStart={start} /> : null}

        {screen.kind === "profile" ? (
          <ProfileQuestionScreen
            question={PROFILE_QUESTIONS[screen.index]}
            questionIndex={screen.index}
            totalSteps={TOTAL_STEPS}
            selectedValue={profileAnswers[PROFILE_QUESTIONS[screen.index].id] ?? null}
            onSelect={selectProfileAnswer}
            onBack={goBack}
          />
        ) : null}

        {screen.kind === "question" ? (
          <QuestionScreen
            question={QUESTIONS[screen.index]}
            questionIndex={PROFILE_QUESTIONS.length + screen.index}
            totalQuestions={TOTAL_STEPS}
            selectedScore={answers[QUESTIONS[screen.index].id] ?? null}
            onSelect={selectAnswer}
            onBack={goBack}
          />
        ) : null}

        {screen.kind === "result" && result ? (
          <FullResult result={result} profileAnswers={profileAnswers} answers={answers} />
        ) : null}
      </div>
    </div>
  );
}
