import { motion } from "framer-motion";
import type {
  AssessmentQuestionItem,
  ProfileQuestion,
} from "@/data/assessmentAiReadiness";

type Props = {
  question: AssessmentQuestionItem | ProfileQuestion;
  selectedValue?: string | number;
  onSelect: (value: string) => void;
};

export function AssessmentQuestion({ question, selectedValue, onSelect }: Props) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, y: 18, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -18, scale: 0.99 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
    >
      <h2 className="text-balance text-xl font-semibold leading-tight text-[var(--foreground)] sm:text-[1.7rem]">
        {question.text}
      </h2>
      <div className="mt-5 grid gap-2.5">
        {question.options.map((option, idx) => {
          const selected = selectedValue === option.value;
          return (
            <motion.button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.value)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx, duration: 0.25 }}
              whileHover={{ y: -1.5, scale: 1.005 }}
              whileTap={{ scale: 0.992 }}
              className={`w-full rounded-xl border px-3.5 py-3 text-left transition sm:px-4 sm:py-3.5 ${
                selected
                  ? "border-[#e30613]/72 bg-[color:color-mix(in_oklab,var(--surface)_86%,#2a0e14)] shadow-[0_10px_30px_rgba(227,6,19,0.16)]"
                  : "border-[var(--border)] bg-[color:color-mix(in_oklab,var(--surface)_94%,transparent)] hover:border-[#e30613]/45 hover:bg-[var(--surface-2)]/85"
              }`}
            >
              <div className="flex gap-2.5">
                <span
                  className={`mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                    selected
                      ? "bg-[#e30613]/25 text-[#ffc6ca]"
                      : "bg-[var(--surface-2)] text-[var(--muted)]"
                  }`}
                >
                  {option.id}
                </span>
                <span className="text-[14px] leading-relaxed text-[var(--foreground)] sm:text-[15px]">
                  {option.text}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
