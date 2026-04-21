"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import type { SiteContent } from "@/types/content";
import { ChevronRight, Sparkles } from "lucide-react";

const CHECKUPS_BG = "/images/checkups-mesh-bg.png";

function renderCheckupVisual(stepId: string): ReactNode {
  if (stepId === "1") {
    return (
      <svg width="100%" viewBox="0 0 680 380" preserveAspectRatio="xMidYMid meet" style={{ borderRadius: "8px", marginBottom: "16px" }}>
        <g transform="translate(200,195)">
          <polygon points="0,-120 103.9,-60 103.9,60 0,120 -103.9,60 -103.9,-60" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
          <polygon points="0,-90 77.9,-45 77.9,45 0,90 -77.9,45 -77.9,-45" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
          <polygon points="0,-60 51.9,-30 51.9,30 0,60 -51.9,30 -51.9,-30" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
          <polygon points="0,-30 25.9,-15 25.9,15 0,30 -25.9,15 -25.9,-15" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="-120" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="103.9" y2="-60" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="103.9" y2="60" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="0" y2="120" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="-103.9" y2="60" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
          <line x1="0" y1="0" x2="-103.9" y2="-60" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
          <polygon points="0,-76.8 66.3,-30 57.9,33.6 0,84 -45.7,26.4 -62.3,-36" fill="#C0392B" fillOpacity="0.18" stroke="#C0392B" strokeWidth="1.5" />
          <circle cx="0" cy="-76.8" r="4" fill="#C0392B" />
          <circle cx="66.3" cy="-30" r="4" fill="#C0392B" />
          <circle cx="57.9" cy="33.6" r="4" fill="#C0392B" />
          <circle cx="0" cy="84" r="4" fill="#C0392B" />
          <circle cx="-45.7" cy="26.4" r="4" fill="#C0392B" />
          <circle cx="-62.3" cy="-36" r="4" fill="#C0392B" />
          <text x="6" y="-26" fill="rgba(255,255,255,0.30)" fontSize="9" fontFamily="inherit">1</text>
          <text x="6" y="-56" fill="rgba(255,255,255,0.30)" fontSize="9" fontFamily="inherit">2</text>
          <text x="6" y="-86" fill="rgba(255,255,255,0.30)" fontSize="9" fontFamily="inherit">3</text>
          <text x="6" y="-116" fill="rgba(255,255,255,0.30)" fontSize="9" fontFamily="inherit">4</text>
        </g>
        <text x="200" y="52" textAnchor="middle" fill="rgba(255,255,255,0.70)" fontSize="12" fontFamily="inherit">Архитектура</text>
        <text x="330" y="126" textAnchor="start" fill="rgba(255,255,255,0.70)" fontSize="12" fontFamily="inherit">Данные</text>
        <text x="330" y="278" textAnchor="start" fill="rgba(255,255,255,0.70)" fontSize="12" fontFamily="inherit">Безопасность</text>
        <text x="200" y="346" textAnchor="middle" fill="rgba(255,255,255,0.70)" fontSize="12" fontFamily="inherit">Процессы</text>
        <text x="66" y="278" textAnchor="end" fill="rgba(255,255,255,0.70)" fontSize="12" fontFamily="inherit">Инфраструктура</text>
        <text x="66" y="126" textAnchor="end" fill="rgba(255,255,255,0.70)" fontSize="12" fontFamily="inherit">Команда</text>
        <text x="390" y="80" fill="rgba(255,255,255,0.90)" fontSize="13" fontWeight="500" fontFamily="inherit">Карта зрелости</text>
        <text x="390" y="98" fill="rgba(255,255,255,0.50)" fontSize="11" fontFamily="inherit">6 направлений ИТ, шкала 1–5</text>
        <rect x="390" y="116" width="10" height="10" rx="2" fill="#C0392B" fillOpacity="0.18" stroke="#C0392B" strokeWidth="1.5" />
        <text x="406" y="126" fill="rgba(255,255,255,0.60)" fontSize="11" fontFamily="inherit">Текущий уровень</text>
        <rect x="390" y="136" width="10" height="10" rx="2" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.5" />
        <text x="406" y="146" fill="rgba(255,255,255,0.60)" fontSize="11" fontFamily="inherit">Целевой уровень 5/5</text>
        <line x1="390" y1="164" x2="630" y2="164" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
        <text x="390" y="186" fill="rgba(255,255,255,0.40)" fontSize="11" fontFamily="inherit">Результат диагностики</text>
        <text x="390" y="204" fill="rgba(255,255,255,0.40)" fontSize="11" fontFamily="inherit">становится основой</text>
        <text x="390" y="222" fill="rgba(255,255,255,0.40)" fontSize="11" fontFamily="inherit">для шага 2</text>
      </svg>
    );
  }

  if (stepId === "2") {
    return (
      <svg width="100%" viewBox="0 0 680 360" preserveAspectRatio="xMidYMid meet" style={{ borderRadius: "8px", marginBottom: "16px" }}>
        <defs>
          <marker id="arr2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(255,255,255,0.40)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <rect x="220" y="18" width="240" height="42" rx="8" fill="#C0392B" fillOpacity="0.25" stroke="#C0392B" strokeWidth="1" />
        <text x="340" y="35" textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="13" fontWeight="500" fontFamily="inherit">Бизнес-стратегия</text>
        <text x="340" y="52" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily="inherit">Рост и устойчивость</text>
        <line x1="340" y1="60" x2="340" y2="92" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <line x1="130" y1="92" x2="550" y2="92" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <line x1="130" y1="92" x2="130" y2="110" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <rect x="50" y="110" width="160" height="42" rx="8" fill="#C0392B" fillOpacity="0.15" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.6" />
        <text x="130" y="127" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.90)" fontSize="12" fontWeight="500" fontFamily="inherit">Надёжность</text>
        <text x="130" y="143" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.50)" fontSize="11" fontFamily="inherit">и безопасность</text>
        <line x1="340" y1="92" x2="340" y2="110" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <rect x="260" y="110" width="160" height="42" rx="8" fill="#C0392B" fillOpacity="0.15" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.6" />
        <text x="340" y="127" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.90)" fontSize="12" fontWeight="500" fontFamily="inherit">Эффективность</text>
        <text x="340" y="143" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.50)" fontSize="11" fontFamily="inherit">разработки и данных</text>
        <line x1="550" y1="92" x2="550" y2="110" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <rect x="470" y="110" width="160" height="42" rx="8" fill="#C0392B" fillOpacity="0.15" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.6" />
        <text x="550" y="127" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.90)" fontSize="12" fontWeight="500" fontFamily="inherit">Масштабирование</text>
        <text x="550" y="143" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.50)" fontSize="11" fontFamily="inherit">и AI-готовность</text>
        <line x1="130" y1="152" x2="130" y2="188" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="75" y1="188" x2="185" y2="188" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="75" y1="188" x2="75" y2="206" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="185" y1="188" x2="185" y2="206" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="340" y1="152" x2="340" y2="188" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="285" y1="188" x2="395" y2="188" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="285" y1="188" x2="285" y2="206" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="395" y1="188" x2="395" y2="206" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="550" y1="152" x2="550" y2="188" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="495" y1="188" x2="605" y2="188" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="495" y1="188" x2="495" y2="206" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="605" y1="188" x2="605" y2="206" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        {[{ x: 35, label: "SRE-практики" }, { x: 145, label: "CMDB и ITSM" }, { x: 245, label: "CI/CD" }, { x: 355, label: "Data platform" }, { x: 455, label: "ML / AI" }, { x: 565, label: "Платформы" }].map(({ x, label }) => (
          <g key={label}>
            <rect x={x} y="206" width="80" height="30" rx="5" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <text x={x + 40} y="221" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.65)" fontSize="11" fontFamily="inherit">{label}</text>
          </g>
        ))}
        <line x1="40" y1="266" x2="640" y2="266" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="4 4" />
        <text x="40" y="290" fill="rgba(255,255,255,0.80)" fontSize="13" fontWeight="500" fontFamily="inherit">Приоритизация бэклога</text>
        <text x="40" y="308" fill="rgba(255,255,255,0.40)" fontSize="11" fontFamily="inherit">по эффекту и сложности внедрения</text>
        <rect x="390" y="276" width="56" height="56" rx="4" fill="none" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <line x1="418" y1="276" x2="418" y2="332" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <line x1="390" y1="304" x2="446" y2="304" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <circle cx="402" cy="288" r="5" fill="#C0392B" fillOpacity="0.90" />
        <circle cx="410" cy="292" r="3.5" fill="#C0392B" fillOpacity="0.60" />
        <circle cx="432" cy="320" r="3.5" fill="rgba(255,255,255,0.35)" />
        <circle cx="438" cy="316" r="2.5" fill="rgba(255,255,255,0.25)" />
        <text x="388" y="274" textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="inherit">Эффект↑</text>
        <text x="450" y="338" textAnchor="start" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="inherit">Сложность→</text>
        <circle cx="460" cy="288" r="4" fill="#C0392B" fillOpacity="0.90" />
        <text x="470" y="292" fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily="inherit">Quick wins</text>
        <circle cx="460" cy="308" r="4" fill="rgba(255,255,255,0.30)" />
        <text x="470" y="312" fill="rgba(255,255,255,0.55)" fontSize="11" fontFamily="inherit">Long-term</text>
      </svg>
    );
  }

  if (stepId === "3") {
    return (
      <svg width="100%" viewBox="0 0 680 300" preserveAspectRatio="xMidYMid meet" style={{ borderRadius: "8px", marginBottom: "16px" }}>
        <defs>
          <marker id="arr3" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
        <line x1="60" y1="100" x2="625" y2="100" stroke="rgba(255,255,255,0.20)" strokeWidth="1" markerEnd="url(#arr3)" />
        <line x1="148" y1="100" x2="342" y2="100" stroke="#C0392B" strokeWidth="1.5" strokeOpacity="0.50" />
        <line x1="358" y1="100" x2="548" y2="100" stroke="#C0392B" strokeWidth="1.5" strokeOpacity="0.25" />
        <circle cx="140" cy="100" r="9" fill="#C0392B" />
        <circle cx="350" cy="100" r="9" fill="#C0392B" fillOpacity="0.60" />
        <circle cx="560" cy="100" r="9" fill="#C0392B" fillOpacity="0.30" />
        <line x1="140" y1="91" x2="140" y2="44" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <rect x="60" y="14" width="160" height="32" rx="8" fill="#C0392B" fillOpacity="0.30" stroke="#C0392B" strokeWidth="1" />
        <text x="140" y="30" textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="13" fontWeight="500" fontFamily="inherit">Пилот</text>
        <text x="140" y="112" textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="11" fontFamily="inherit">1–3 мес</text>
        {["2–3 команды", "Быстрые победы", "Метрики успеха"].map((t, i) => (
          <g key={t}>
            <rect x="60" y={138 + i * 28} width="160" height="22" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            <text x="140" y={149 + i * 28} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.60)" fontSize="11" fontFamily="inherit">{t}</text>
          </g>
        ))}
        <line x1="350" y1="91" x2="350" y2="44" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <rect x="270" y="14" width="160" height="32" rx="8" fill="#C0392B" fillOpacity="0.18" stroke="#C0392B" strokeWidth="0.8" strokeOpacity="0.60" />
        <text x="350" y="30" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.90)" fontSize="13" fontWeight="500" fontFamily="inherit">Внедрение</text>
        <text x="350" y="112" textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="11" fontFamily="inherit">2–4 мес</text>
        {["Инструменты", "Обучение команды", "Playbook"].map((t, i) => (
          <g key={t}>
            <rect x="270" y={138 + i * 28} width="160" height="22" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
            <text x="350" y={149 + i * 28} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.60)" fontSize="11" fontFamily="inherit">{t}</text>
          </g>
        ))}
        <line x1="560" y1="91" x2="560" y2="44" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <rect x="480" y="14" width="160" height="32" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" />
        <text x="560" y="30" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.70)" fontSize="13" fontWeight="500" fontFamily="inherit">Масштабирование</text>
        <text x="560" y="112" textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="11" fontFamily="inherit">3–6 мес</text>
        {["Передача ownership", "Все команды", "Go/No-Go"].map((t, i) => (
          <g key={t}>
            <rect x="480" y={138 + i * 28} width="160" height="22" rx="4" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" strokeWidth="0.5" />
            <text x="560" y={149 + i * 28} textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="inherit">{t}</text>
          </g>
        ))}
        <line x1="40" y1="248" x2="640" y2="248" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="4 4" />
        <text x="40" y="270" fill="rgba(255,255,255,0.70)" fontSize="12" fontWeight="500" fontFamily="inherit">Артефакты этапа</text>
        <circle cx="185" cy="267" r="3.5" fill="#C0392B" />
        <text x="194" y="271" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="inherit">Отчёт пилота</text>
        <circle cx="330" cy="267" r="3.5" fill="#C0392B" fillOpacity="0.55" />
        <text x="339" y="271" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="inherit">Playbook</text>
        <circle cx="450" cy="267" r="3.5" fill="#C0392B" fillOpacity="0.30" />
        <text x="459" y="271" fill="rgba(255,255,255,0.45)" fontSize="11" fontFamily="inherit">Итоговый отчёт</text>
      </svg>
    );
  }

  if (stepId === "4") {
    return (
      <svg width="100%" viewBox="0 0 680 340" preserveAspectRatio="xMidYMid meet" style={{ borderRadius: "8px", marginBottom: "16px" }}>
        <defs>
          <marker id="arr4" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
          <clipPath id="leftClip">
            <rect x="0" y="0" width="310" height="340" />
          </clipPath>
        </defs>
        <circle cx="200" cy="175" r="28" fill="#C0392B" fillOpacity="0.28" stroke="#C0392B" strokeWidth="1.5" />
        <circle cx="200" cy="175" r="64" fill="#C0392B" fillOpacity="0.10" stroke="#C0392B" strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="200" cy="175" r="104" fill="#C0392B" fillOpacity="0.05" stroke="#C0392B" strokeWidth="0.5" strokeDasharray="4 6" />
        <circle cx="200" cy="175" r="148" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="4 8" clipPath="url(#leftClip)" />
        <circle cx="200" cy="175" r="14" fill="#C0392B" />
        <text x="200" y="175" textAnchor="middle" dominantBaseline="central" fill="#ffffff" fontSize="11" fontWeight="500" fontFamily="inherit">TraaS</text>
        <text x="200" y="141" textAnchor="middle" fill="#C0392B" fontSize="12" fontFamily="inherit">Пилот</text>
        <text x="200" y="104" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="12" fontFamily="inherit">Отдел</text>
        <text x="200" y="64" textAnchor="middle" fill="rgba(255,255,255,0.40)" fontSize="12" fontFamily="inherit">Бизнес-юнит</text>
        <text x="200" y="26" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="12" fontFamily="inherit">Вся организация</text>
        <line x1="200" y1="161" x2="200" y2="132" stroke="#C0392B" strokeWidth="0.8" markerEnd="url(#arr4)" />
        <line x1="200" y1="125" x2="200" y2="96" stroke="rgba(255,255,255,0.20)" strokeWidth="0.8" markerEnd="url(#arr4)" />
        <line x1="200" y1="89" x2="200" y2="57" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" markerEnd="url(#arr4)" />
        <line x1="340" y1="20" x2="340" y2="320" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        <text x="370" y="38" fill="rgba(255,255,255,0.80)" fontSize="13" fontWeight="500" fontFamily="inherit">Рост технологической зрелости</text>
        <line x1="380" y1="260" x2="635" y2="260" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" markerEnd="url(#arr4)" />
        <line x1="380" y1="260" x2="380" y2="60" stroke="rgba(255,255,255,0.20)" strokeWidth="0.5" markerEnd="url(#arr4)" />
        {[1, 2, 3, 4, 5].map((n, i) => (
          <text key={n} x="374" y={260 - i * 40} textAnchor="end" dominantBaseline="central" fill="rgba(255,255,255,0.25)" fontSize="10" fontFamily="inherit">{n}</text>
        ))}
        <line x1="380" y1="100" x2="630" y2="100" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" strokeDasharray="4 4" />
        <text x="632" y="100" fill="rgba(255,255,255,0.25)" fontSize="9" fontFamily="inherit">цель</text>
        <path d="M388,258 C410,255 430,250 450,238 C470,226 480,210 498,190 C516,170 526,148 545,128 C560,114 580,108 610,104" fill="none" stroke="#C0392B" strokeWidth="2" strokeLinecap="round" />
        {[[388, 258], [450, 238], [498, 190], [545, 128], [610, 104]].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="4" fill="#C0392B" fillOpacity={1 - i * 0.15} />
        ))}
        {[["Start", 388], ["Пилот", 450], ["Запуск", 498], ["Масштаб", 545]].map(([t, x]) => (
          <text key={t} x={x} y="275" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontFamily="inherit">{t}</text>
        ))}
        <line x1="355" y1="298" x2="640" y2="298" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {[{ x: 360, label: "+30% скорость", fill: "#C0392B", fo: 0.30 }, { x: 460, label: "−25% инциденты", fill: "#C0392B", fo: 0.18 }, { x: 555, label: "Зрелость 4/5", fill: "rgba(255,255,255,0.08)", fo: 1 }].map(({ x, label, fill, fo }) => (
          <g key={label}>
            <rect x={x} y="308" width={label.length * 7 + 16} height="24" rx="6" fill={fill} fillOpacity={fo} stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
            <text x={x + (label.length * 7 + 16) / 2} y="320" textAnchor="middle" dominantBaseline="central" fill="rgba(255,255,255,0.70)" fontSize="11" fontFamily="inherit">{label}</text>
          </g>
        ))}
      </svg>
    );
  }

  return null;
}

export function CheckupsSection({ content }: { content: SiteContent }) {
  const [activeId, setActiveId] = useState(content.checkups[0]?.id ?? "");
  const active =
    content.checkups.find((item) => item.id === activeId) ?? content.checkups[0];
  const activeVisual = active ? renderCheckupVisual(active.id) : null;

  if (!active) return null;

  return (
    <AnimatedSection
      id="tech-bootcamp"
      className="relative scroll-mt-24 overflow-hidden border-y border-[var(--divider)] py-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[var(--checkups-underlay)]" aria-hidden />
        <div
          className="absolute inset-0"
          style={{ opacity: "var(--checkups-image-opacity)" }}
        >
          <Image
            src={CHECKUPS_BG}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[center_42%]"
            style={{ filter: "var(--checkups-image-filter)" }}
            priority={false}
          />
        </div>
        <div className="absolute inset-0" style={{ background: "var(--checkups-overlay)" }} aria-hidden />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--checkups-grad-from), var(--checkups-grad-via), var(--checkups-grad-to))",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom right, var(--checkups-accent), transparent, color-mix(in oklab, var(--checkups-accent) 70%, transparent))",
          }}
          aria-hidden
        />
      </div>

      <Container className="relative z-10">
        <header className="mb-11 max-w-3xl space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)] sm:text-3xl sm:leading-tight">
            {content.checkupsIntro.title}
          </h2>
          {content.checkupsIntro.subtitle ? (
            <p className="max-w-2xl text-pretty text-sm leading-relaxed text-[var(--muted)] sm:text-[15px] sm:leading-relaxed">
              {content.checkupsIntro.subtitle}
            </p>
          ) : null}
        </header>

        <div className="grid gap-5 lg:grid-cols-[minmax(280px,0.9fr)_minmax(0,1.4fr)]">
          <aside className="rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_78%,transparent)] p-3 backdrop-blur-md">
            <ul className="space-y-2">
              {content.checkups.map((item) => {
                const isActive = item.id === active.id;
                return (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(item.id)}
                      className={`group flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition ${
                        isActive
                          ? "bg-[#e30613]/16 text-[var(--foreground)] ring-1 ring-[#e30613]/40"
                          : "bg-[color:color-mix(in_oklab,var(--surface)_90%,transparent)] text-[var(--muted)] hover:bg-[color:color-mix(in_oklab,var(--surface-2)_65%,transparent)]"
                      }`}
                    >
                      <span className="pr-3 text-sm font-medium leading-snug sm:text-base">
                        {item.title}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 shrink-0 transition ${
                          isActive
                            ? "text-[#ff8b94]"
                            : "text-[var(--muted)] group-hover:text-[var(--foreground)]"
                        }`}
                        aria-hidden
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          <article className="rounded-2xl border border-[#e30613]/25 bg-[color:color-mix(in_oklab,var(--surface)_86%,#2a1116)] p-6 backdrop-blur-sm sm:p-7">
            {activeVisual ? <div className="w-full overflow-hidden">{activeVisual}</div> : null}
            <div className="inline-flex items-center gap-2 rounded-full bg-[#e30613]/12 px-3 py-1 text-xs font-semibold text-[#ff8b94] ring-1 ring-[#e30613]/30">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Ожидаемый результат
            </div>
            <h3 className="mt-4 text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
              {active.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {active.description}
            </p>

            {active.outcomes?.length ? (
              <ul className="mt-5 space-y-2">
                {active.outcomes.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[var(--muted)]">
                    <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ff6e79]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        </div>
      </Container>
    </AnimatedSection>
  );
}
