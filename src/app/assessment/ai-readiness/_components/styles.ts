export const assessmentShell =
  "relative min-h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]";

export const assessmentBackground =
  "pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_8%_0%,rgba(227,6,19,0.14),transparent_30%),radial-gradient(circle_at_92%_10%,rgba(159,123,36,0.09),transparent_28%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.05),transparent_34%)]";

export const assessmentCard =
  "relative overflow-hidden rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_92%,transparent)] shadow-[0_20px_50px_rgba(0,0,0,0.20)] ring-1 ring-inset ring-[#e30613]/10";

export const assessmentSoftCard =
  "rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface)_88%,transparent)] ring-1 ring-inset ring-white/5";

export const assessmentElevated =
  "rounded-2xl border border-[var(--divider)] bg-[color:color-mix(in_oklab,var(--surface-2)_78%,transparent)]";

export const assessmentDangerPanel =
  "rounded-2xl border border-[color:color-mix(in_oklab,var(--error)_42%,var(--border))] bg-[color:color-mix(in_oklab,var(--error)_10%,var(--surface)_90%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

export const assessmentSuccessPanel =
  "rounded-2xl border border-[color:color-mix(in_oklab,var(--success)_42%,var(--border))] bg-[color:color-mix(in_oklab,var(--success)_10%,var(--surface)_90%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

export const assessmentWarningPanel =
  "rounded-2xl border border-[color:color-mix(in_oklab,var(--warning)_34%,var(--border))] bg-[color:color-mix(in_oklab,var(--warning)_8%,var(--surface)_92%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

export const assessmentPrimaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[color:color-mix(in_oklab,var(--primary)_70%,#ffffff)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--primary)_84%,#ff5e67),var(--primary-hover))] px-5 py-3 font-semibold text-white shadow-[0_10px_24px_color-mix(in_oklab,var(--primary)_34%,transparent),inset_0_1px_0_rgba(255,255,255,0.24)] transition hover:brightness-105 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)] disabled:cursor-not-allowed disabled:opacity-55";

export const assessmentSecondaryButton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-3 font-semibold text-[var(--foreground)] transition hover:border-[var(--primary)]/55 hover:bg-[color:color-mix(in_oklab,var(--surface)_86%,var(--primary)_14%)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]";

export const assessmentChip =
  "inline-flex items-center rounded-lg border border-[var(--border)] bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium text-[var(--muted)] transition hover:border-[var(--primary)]/55 hover:text-[var(--foreground)]";

export const assessmentEyebrow =
  "text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]";

export const assessmentSectionTitle =
  "text-3xl font-bold uppercase leading-tight tracking-tight text-[var(--foreground)] sm:text-4xl lg:text-[2.35rem] lg:leading-[1.1]";

export const assessmentMutedText =
  "text-sm leading-relaxed text-[var(--muted)] sm:text-[15px]";

export const assessmentInput =
  "mt-2 min-h-12 w-full rounded-xl border border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface-2)_82%,transparent)] px-4 py-3 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 focus:ring-offset-[var(--background)]";
