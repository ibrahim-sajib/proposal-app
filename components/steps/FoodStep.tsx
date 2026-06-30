"use client";

import { StepShell } from "@/components/steps/StepShell";
import { StepNav } from "@/components/steps/StepNav";
import { SelectableCard } from "@/components/ui/SelectableCard";
import { FOOD_OPTIONS } from "@/constants";

interface FoodStepProps {
  value: string[];
  onChange: (value: string[]) => void;
  onBack: () => void;
  onNext: () => void;
}

export function FoodStep({ value, onChange, onBack, onNext }: FoodStepProps) {
  function toggle(id: string) {
    onChange(
      value.includes(id) ? value.filter((v) => v !== id) : [...value, id]
    );
  }

  return (
    <StepShell
      title="What should we eat?"
      subtitle="Pick as many as you like."
      stepIndex={2}
      totalSteps={5}
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {FOOD_OPTIONS.map((food) => (
          <SelectableCard
            key={food.id}
            emoji={food.emoji}
            label={food.label}
            selected={value.includes(food.id)}
            onSelect={() => toggle(food.id)}
          />
        ))}
      </div>

      <StepNav onBack={onBack} onNext={onNext} nextDisabled={value.length === 0} />
    </StepShell>
  );
}
