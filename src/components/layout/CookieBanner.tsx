"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { X } from "lucide-react";

const STORAGE_KEY = "cookie-consent-dismissed";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    queueMicrotask(() => {
      try {
        setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
      } catch {
        setVisible(true);
      }
    });
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] border-t border-white/10 bg-[#0f0f16]/96 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.45)] backdrop-blur-xl"
      role="dialog"
      aria-label="Уведомление о cookies"
    >
      <Container className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-zinc-300">
          На сайте используются cookies для стабильной работы и аналитики. Текст
          замените на свой и добавьте ссылку на политику.
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex items-center justify-center rounded-full bg-[#e30613] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff2331]"
          >
            Принять
          </button>
          <button
            type="button"
            onClick={dismiss}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-400 hover:bg-white/10"
            aria-label="Закрыть"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </div>
  );
}
