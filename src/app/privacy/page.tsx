import Link from "next/link";
import { Container } from "@/components/ui/Container";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Container className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-[var(--divider)] bg-[var(--surface)] p-6 sm:p-8">
          <Link href="/" className="text-sm font-medium text-[var(--muted)] hover:text-[var(--foreground)]">
            ← На главную
          </Link>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight sm:text-4xl">
            Политика обработки персональных данных
          </h1>
          <div className="mt-6 space-y-5 text-sm leading-relaxed text-[var(--muted)]">
            <p>
              TraaS обрабатывает данные, которые вы передаёте через формы сайта и диагностические тесты:
              имя, email, телефон, компанию, комментарий, выбранные ответы и рассчитанный результат диагностики.
            </p>
            <p>
              Эти данные нужны, чтобы связаться с вами по запросу, подготовить разбор результата, отправить
              материалы по диагностике и улучшать качество наших продуктов. Мы не продаём персональные данные
              третьим лицам и не используем их для целей, не связанных с вашим запросом.
            </p>
            <p>
              Вы можете запросить уточнение, исправление или удаление ваших данных. Для этого напишите на{" "}
              <a href="mailto:team@traas.ru" className="font-semibold text-[var(--foreground)] underline-offset-4 hover:underline">
                team@traas.ru
              </a>
              .
            </p>
            <p>
              Отправляя форму на сайте, вы подтверждаете согласие на обработку данных в описанных выше целях.
              Если вы отмечаете согласие на получение материалов, мы можем отправлять вам письма TraaS по теме
              трансформации; от таких писем можно отказаться в любой момент.
            </p>
          </div>
        </div>
      </Container>
    </main>
  );
}
