import Link from "next/link";
import { ArrowRight, BarChart3, Clock3, Map } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ProgressBar } from "./ProgressBar";
import {
  assessmentCard,
  assessmentChip,
  assessmentEyebrow,
  assessmentMutedText,
  assessmentPrimaryButton,
  assessmentSoftCard,
} from "./styles";

const promises = [
  {
    icon: Clock3,
    title: "~3 минуты",
    text: "2 вопроса о контексте + 8 по зрелости",
  },
  {
    icon: BarChart3,
    title: "7 доменов зрелости",
    text: "от Ownership до Economics",
  },
  {
    icon: Map,
    title: "Профиль + карта блокеров",
    text: "+ план на 30 и 90 дней",
  },
];

export function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <main className="min-h-screen py-8 sm:py-10">
      <Container className="flex min-h-[calc(100vh-5rem)] max-w-3xl flex-col justify-center">
        <nav aria-label="Хлебные крошки" className="mb-8 flex items-center gap-2 text-sm text-[var(--muted)]">
          <Link href="/" className={assessmentChip}>
            TraaS
          </Link>
          <span>/</span>
          <span>Оценка готовности</span>
        </nav>

        <div className="mb-8 space-y-3">
          <div className="flex items-center justify-between text-sm text-[var(--muted)]">
            <span>До старта</span>
            <span>0 из 10</span>
          </div>
          <ProgressBar current={0} total={10} />
        </div>

        <section className={`${assessmentCard} p-6 sm:p-8 lg:p-10`}>
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-[color:color-mix(in_oklab,var(--primary)_22%,transparent)] blur-3xl" />
          <div className="relative space-y-7">
            <div className="space-y-4">
              <p className={assessmentEyebrow}>
                TraaS diagnostic
              </p>
              <h1 className="text-balance text-4xl font-bold leading-[1.05] tracking-tight text-[var(--foreground)] sm:text-5xl">
                Оценка готовности к ИИ-трансформации
              </h1>
              <p className="max-w-2xl text-base leading-relaxed text-[var(--muted)] sm:text-lg">
                Короткая диагностика по 7 ключевым доменам зрелости. Ответьте на 8 вопросов про текущее состояние организации — получите профиль готовности, карту узких мест и план первых шагов.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {promises.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className={`${assessmentSoftCard} p-4`}>
                    <Icon className="mb-4 h-5 w-5 text-[#ff6e79]" aria-hidden="true" />
                    <p className="font-semibold text-[var(--foreground)]">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">{item.text}</p>
                  </div>
                );
              })}
            </div>

            <p className={`${assessmentSoftCard} p-4 ${assessmentMutedText}`}>
              Отвечайте про текущее состояние организации, а не желаемое. Это критично для точности результата.
            </p>

            <div className="sticky bottom-0 -mx-6 bg-[color:color-mix(in_oklab,var(--background)_88%,transparent)] px-6 py-4 sm:static sm:mx-0 sm:bg-transparent sm:px-0 sm:py-0">
              <button
                type="button"
                onClick={onStart}
                className={`${assessmentPrimaryButton} w-full text-base sm:w-auto`}
              >
                Начать оценку <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="mt-3 text-xs text-[var(--muted)]">
                До завершения теста мы не собираем персональные данные.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
