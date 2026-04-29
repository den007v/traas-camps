import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import {
  assessmentCard,
  assessmentEyebrow,
  assessmentInput,
  assessmentPrimaryButton,
} from "./styles";
import type { Answers, ProfileAnswers, ScoreResult } from "../_lib/types";

const emailRegex = /^\S+@\S+\.\S+$/;

export function EmailGate({
  result,
  profileAnswers,
  answers,
}: {
  result: ScoreResult;
  profileAnswers: ProfileAnswers;
  answers: Answers;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();
    if (!emailRegex.test(normalizedEmail)) {
      setEmailError("Укажите корректный email");
      return;
    }

    setSubmitting(true);
    setEmailError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "ai_readiness_assessment",
          email: normalizedEmail,
          name: name.trim() || undefined,
          company: company.trim() || undefined,
          phone: phone.trim() || undefined,
          comment: comment.trim() || undefined,
          marketingOptIn,
          answers,
          userRole: profileAnswers.role,
          companySize: profileAnswers.companySize,
          result: {
            profileAnswers,
            profile: result.profile,
            finalScore: result.finalScore,
            rawScore: result.rawScore,
            hardCapTriggered: result.hardCapTriggered,
            domainScores: result.domainScores,
            topBlockers: result.topBlockers,
          },
        }),
      });
      const data = (await response.json().catch(() => null)) as { resultUrl?: string } | null;
      setResultUrl(data?.resultUrl ?? null);
    } catch {
      // Email is a bonus, not a blocker: show success even when the endpoint is unavailable.
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <section className={`${assessmentCard} border-[var(--primary)]/45 p-6 sm:p-8`} aria-live="polite">
        <div className="flex gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[color:color-mix(in_oklab,var(--primary)_16%,transparent)] text-[#ff6e79]">
            <Check className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[var(--foreground)]">Готово</h2>
            <p className="mt-3 leading-relaxed text-[var(--muted)]">
              Мы сохранили заявку и подготовим расширенный разбор. Если хотите обсудить ваш результат с командой TraaS — забронируйте 30-минутный созвон.
            </p>
            {resultUrl ? (
              <Link
                href={resultUrl}
                className="mt-4 inline-flex text-sm font-semibold text-[#ff8b94] underline-offset-4 hover:underline"
              >
                Открыть shareable-ссылку на результат →
              </Link>
            ) : null}
            <Link
              href="/#contact"
              className={`${assessmentPrimaryButton} mt-5 min-h-11`}
            >
              Забронировать созвон <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${assessmentCard} p-6 sm:p-8 lg:p-10`}>
      <div className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(circle_at_100%_0%,rgba(227,6,19,0.13),transparent_28%),radial-gradient(circle_at_0%_100%,rgba(159,123,36,0.08),transparent_30%)]" />
      <div className="relative grid gap-8 lg:grid-cols-2">
        <div>
          <span className={assessmentEyebrow}>
            Бонус
          </span>
          <h2 className="mt-4 text-2xl font-semibold text-[var(--foreground)]">
            Хотите сохранить разбор и углубить его?
          </h2>
          <p className="mt-3 font-medium text-[var(--foreground)]/85">
            Получите PDF-версию + отраслевой бенчмарк по вашему профилю
          </p>
          <p className="mt-4 leading-relaxed text-[var(--muted)]">
            Полный разбор вашей оценки в PDF — удобно переслать команде или сохранить.
            Дополнительно: подборка релевантных индустриальных данных и исследовательских материалов по теме ИИ-трансформации (McKinsey, BCG, Gartner) с привязкой к вашему профилю готовности.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-[var(--foreground)]">
              Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby={emailError ? "email-error" : undefined}
              className={assessmentInput}
            />
            {emailError ? (
              <p id="email-error" className="mt-2 text-sm text-[var(--error)]">
                {emailError}
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-[var(--foreground)]">
                Имя
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={assessmentInput}
              />
            </div>
            <div>
              <label htmlFor="company" className="text-sm font-semibold text-[var(--foreground)]">
                Компания
              </label>
              <input
                id="company"
                name="company"
                type="text"
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                className={assessmentInput}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="text-sm font-semibold text-[var(--foreground)]">
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className={assessmentInput}
            />
          </div>

          <div>
            <label htmlFor="comment" className="text-sm font-semibold text-[var(--foreground)]">
              Комментарий
            </label>
            <textarea
              id="comment"
              name="comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="Комментарий (необязательно)"
              rows={3}
              className={`${assessmentInput} resize-none`}
            />
            <p className="mt-1 text-xs leading-relaxed text-[var(--muted)]">
              Например: какие задачи стоят перед вашей командой, на какой стадии ИИ-проекты,
              с чем хотели бы помощь. Это поможет нам подготовиться к разговору.
            </p>
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface-2)_78%,transparent)] p-4 text-sm leading-relaxed text-[var(--muted)]">
            <input
              type="checkbox"
              checked={marketingOptIn}
              onChange={(event) => setMarketingOptIn(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-[var(--border)] accent-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
            />
            <span>Согласен получать материалы TraaS по теме трансформации (1–2 раза в месяц)</span>
          </label>

          <p className="text-xs leading-relaxed text-[var(--muted)]">
            Отправляя форму, вы соглашаетесь с обработкой персональных данных в целях получения материалов и связи по запросу.{" "}
            <a href="/privacy" className="font-semibold underline-offset-4 hover:text-[var(--foreground)] hover:underline">
              Политика обработки персональных данных →
            </a>
          </p>

          <button
            type="submit"
            disabled={submitting}
            className={`${assessmentPrimaryButton} w-full disabled:cursor-wait`}
          >
            {submitting ? "Отправляем..." : "Получить PDF и бенчмарк"}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <p className="text-xs text-[var(--muted)]">
            Письмо с PDF и бенчмарком — в течение часа.
          </p>
        </form>
      </div>
    </section>
  );
}
