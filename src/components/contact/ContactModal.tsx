"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronDown, X } from "lucide-react";
import { CONTACT_TOPICS } from "@/data/contactFormTopics";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ContactModal({ open, onOpenChange }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [messenger, setMessenger] = useState("");
  const [topic, setTopic] = useState("");
  const [hp, setHp] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    setError(null);
    if (!done) {
      const t = window.setTimeout(() => firstFieldRef.current?.focus(), 50);
      return () => window.clearTimeout(t);
    }
  }, [open, done]);

  useEffect(() => {
    if (open) return;
    setFullName("");
    setPhone("");
    setEmail("");
    setMessenger("");
    setTopic("");
    setHp("");
    setDone(false);
    setError(null);
    setSubmitting(false);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onOpenChange]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          messenger,
          topic,
          _hp: hp,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Ошибка отправки");
        return;
      }
      setDone(true);
    } catch {
      setError("Нет соединения. Проверьте сеть и попробуйте снова.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted || !open) return null;

  const field =
    "w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-zinc-100 shadow-inner outline-none transition placeholder:text-zinc-500 focus:border-[#e30613]/55 focus:ring-2 focus:ring-[#e30613]/25";

  const node = (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 sm:items-center sm:p-6">
      <button
        type="button"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px] transition"
        aria-label="Закрыть"
        onClick={() => onOpenChange(false)}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[min(92vh,720px)] w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#12121a] shadow-[0_24px_80px_rgba(0,0,0,0.55)] ring-1 ring-white/[0.06]"
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <h2
              id={titleId}
              className="text-lg font-semibold tracking-tight text-zinc-50 sm:text-xl"
            >
              Связаться с нами
            </h2>
            <p className="mt-1 text-sm leading-relaxed text-zinc-400">
              Оставьте контакты — ответим и предложим следующий шаг.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="shrink-0 rounded-lg p-2 text-zinc-400 transition hover:bg-white/8 hover:text-zinc-100"
            aria-label="Закрыть окно"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="flex flex-1 flex-col justify-center px-6 py-10 text-center">
            <p className="text-base leading-relaxed text-zinc-100 whitespace-pre-line">
              {`Заявка отправлена\nМы свяжемся с вами по указанным контактам`}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain px-6 py-5"
          >
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden
            />

            <div className="space-y-4">
              <div>
                <label htmlFor="cf-name" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  ФИО <span className="text-[#ff6f77]">*</span>
                </label>
                <input
                  ref={firstFieldRef}
                  id="cf-name"
                  name="fullName"
                  required
                  autoComplete="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={field}
                  placeholder="Иванов Иван Иванович"
                />
              </div>
              <div>
                <label htmlFor="cf-phone" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Телефон <span className="text-[#ff6f77]">*</span>
                </label>
                <input
                  id="cf-phone"
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  required
                  autoComplete="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={field}
                  placeholder="+7 …"
                />
              </div>
              <div>
                <label htmlFor="cf-email" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Email <span className="text-[#ff6f77]">*</span>
                </label>
                <input
                  id="cf-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={field}
                  placeholder="name@company.ru"
                />
              </div>
              <div>
                <label htmlFor="cf-messenger" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Telegram или другой мессенджер
                </label>
                <input
                  id="cf-messenger"
                  name="messenger"
                  type="text"
                  value={messenger}
                  onChange={(e) => setMessenger(e.target.value)}
                  className={field}
                  placeholder="@username или ссылка"
                />
              </div>
              <div>
                <label htmlFor="cf-topic" className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Тема обращения <span className="text-[#ff6f77]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="cf-topic"
                    name="topic"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className={`${field} cursor-pointer appearance-none pr-10 text-zinc-100`}
                  >
                    <option value="" disabled>
                      Выберите вариант
                    </option>
                    {CONTACT_TOPICS.map((t) => (
                      <option key={t.value} value={t.value}>
                        {t.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                    aria-hidden
                  />
                </div>
              </div>
            </div>

            {error ? (
              <p className="mt-4 rounded-lg border border-[#e30613]/35 bg-[#e30613]/10 px-3 py-2 text-sm text-[#ffb4b9]" role="alert">
                {error}
              </p>
            ) : null}

            <p className="mt-4 text-[11px] leading-relaxed text-zinc-500">
              Нажимая «Отправить», вы соглашаетесь на обработку персональных данных в целях обратной связи.
            </p>

            <div className="mt-6 flex shrink-0 flex-col gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="rounded-full border border-white/15 bg-transparent px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:bg-white/6"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full border border-[#ff5a65]/50 bg-[#e30613]/18 px-6 py-2.5 text-sm font-semibold text-[#ffc8cc] shadow-[0_8px_28px_rgba(227,6,19,0.2)] transition hover:bg-[#e30613]/28 disabled:opacity-60"
              >
                {submitting ? "Отправка…" : "Отправить"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return createPortal(node, document.body);
}
