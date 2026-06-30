"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface StepNavProps {
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}

export function StepNav({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
  showBack = true,
}: StepNavProps) {
  return (
    <div className="mt-10 flex items-center justify-between gap-4">
      {showBack ? (
        <Button variant="ghost" size="md" onClick={onBack}>
          <ArrowLeft size={18} />
          Back
        </Button>
      ) : (
        <span />
      )}
      <Button variant="primary" size="md" onClick={onNext} disabled={nextDisabled}>
        {nextLabel}
        <ArrowRight size={18} />
      </Button>
    </div>
  );
}
