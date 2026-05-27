"use client";

import {
  assessmentEyebrow,
  assessmentSoftCard,
} from "@/app/assessment/ai-readiness/_components/styles";

type Props = {
  topic: string;
};

export function AINotice({ topic }: Props) {
  return (
    <section
      className={`${assessmentSoftCard} flex gap-4 border-l-2 border-l-[var(--primary)] p-5`}
    >
      <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--primary)_14%,transparent)] text-[11px]">
        ⚡
      </div>
      <div>
        <p className={assessmentEyebrow}>Отчёт создан с помощью ИИ</p>
        <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
          Этот отчёт построен на основе ваших ответов. Он даёт первичную
          картину {topic} и помогает быстро выявить вероятные зоны риска,
          но не заменяет полноценную диагностику с интервью, изучением
          артефактов и экспертной проверкой.{" "}
          <span className="text-[var(--foreground)]/80">
            Для глубокого разбора — обращайтесь к команде TraaS.
          </span>
        </p>
      </div>
    </section>
  );
}
