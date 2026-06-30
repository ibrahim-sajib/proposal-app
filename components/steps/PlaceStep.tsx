"use client";

import { StepShell } from "@/components/steps/StepShell";
import { StepNav } from "@/components/steps/StepNav";
import { SelectableCard } from "@/components/ui/SelectableCard";
import { PLACE_OPTIONS } from "@/constants";

interface PlaceStepProps {
  value: string | null;
  onChange: (value: string) => void;
  onBack: () => void;
  onNext: () => void;
}

export function PlaceStep({ value, onChange, onBack, onNext }: PlaceStepProps) {
  return (
    <StepShell
      title="Where shall we go?"
      subtitle="Pick the spot for our date."
      stepIndex={1}
      totalSteps={5}
    >
      <div
        role="radiogroup"
        aria-label="Choose a place"
        className="grid grid-cols-2 gap-4 sm:grid-cols-4"
      >
        {PLACE_OPTIONS.map((place) => (
          <SelectableCard
            key={place.id}
            emoji={place.emoji}
            label={place.label}
            description={place.description}
            selected={value === place.id}
            onSelect={() => onChange(place.id)}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} nextDisabled={!value} />
    </StepShell>
  );
}
