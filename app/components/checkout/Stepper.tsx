"use client";

import { StepId } from "@/app/types/interface";


const STEPS: { id: StepId; label: string }[] = [
  { id: "bag", label: "Bag" },
  { id: "delivery", label: "Delivery" },
  { id: "payment", label: "Payment" },
  { id: "review", label: "Review" },
];

interface StepperProps {
  currentStep: StepId;
  onStepClick: (step: StepId) => void;
  furthestStepIndex: number;
}

export default function Stepper({ currentStep, onStepClick, furthestStepIndex }: StepperProps) {
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <nav aria-label="Checkout progress" className="w-full">
      <ol className="flex items-start">
        {STEPS.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isReachable = index <= furthestStepIndex;

          return (
            <li key={step.id} className="flex flex-1 flex-col items-start last:flex-none">
              <div className="flex w-full items-center">
                <button
                  type="button"
                  disabled={!isReachable}
                  onClick={() => isReachable && onStepClick(step.id)}
                  aria-current={isCurrent ? "step" : undefined}
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-medium transition-colors duration-200",
                    isComplete
                      ? "bg-ink text-paper"
                      : isCurrent
                      ? "bg-accent text-paper"
                      : "bg-transparent text-ink/40 ring-1 ring-inset ring-line",
                    isReachable && !isCurrent ? "cursor-pointer" : "",
                    !isReachable ? "cursor-not-allowed" : "",
                  ].join(" ")}
                >
                  {isComplete ? (
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </button>
                {index < STEPS.length - 1 && (
                  <div className="mx-2 h-[2px] flex-1 bg-line">
                    <div
                      className="h-full bg-ink transition-all duration-500 ease-out"
                      style={{ width: isComplete ? "100%" : "0%" }}
                    />
                  </div>
                )}
              </div>
              <span
                className={[
                  "mt-2 text-[13px] font-medium",
                  isCurrent ? "text-ink" : isComplete ? "text-ink/70" : "text-ink/35",
                ].join(" ")}
              >
                {step.label}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
