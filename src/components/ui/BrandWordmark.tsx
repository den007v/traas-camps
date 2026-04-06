/** Логотип «TraaS & Camps»: светлый акроним + акцент на втором слове. */
export function BrandWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline gap-x-1.5 tracking-tight sm:gap-x-2 ${className}`}
    >
      <span className="font-semibold text-white">TraaS</span>
      <span className="shrink-0 px-0.5 font-normal text-zinc-500 sm:px-1">
        &amp;
      </span>
      <span className="font-semibold text-[#ff6f77]">Camps</span>
    </span>
  );
}
