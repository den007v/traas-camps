"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ContactModal } from "@/components/contact/ContactModal";

export function CasesCtaPanel({
  title = "Хотите похожий результат для вашей команды?",
  text = "Оставьте заявку — разберём ваш кейс и предложим рабочий план внедрения.",
  backHref = "/tech-bootcamp",
  buttonLabel = "Оставить заявку",
}: {
  title?: string;
  text?: string;
  backHref?: string;
  buttonLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-7">
        <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)]">{text}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#e30613] bg-[#e30613] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#cf0611]"
          >
            {buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </button>
          <Link
            href={backHref}
            className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)] transition hover:border-[#e30613]/55"
          >
            Вернуться в Tech Bootcamp
          </Link>
        </div>
      </section>
      <ContactModal open={open} onOpenChange={setOpen} />
    </>
  );
}
