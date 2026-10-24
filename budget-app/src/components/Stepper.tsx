import { useId } from 'react';
import texts from '../data/ca.json';
import type { StepDirection } from '../types/budget';

interface StepperProps {
    label: string;
    value: number;
    min: number;
    onChange: (direction: StepDirection) => void;
}
const BUTTON_CLASS =
 'relative flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-[10px] text-gray-600 ' +
  'before:absolute before:-inset-1 before:content-[""] ' +
  'hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong ' +
  'disabled:cursor-not-allowed disabled:opacity-40';

export const Stepper = ({ label, value, min, onChange }: StepperProps) => {
    const labelId = useId();
    return (
        <div className="flex items-center justify-end gap-2 text-xs font-semibold">
            <span id={labelId}>{label}</span>
            <button
                type="button"
                className={BUTTON_CLASS}
                aria-label={`${texts.stepper.decrease} ${label}`}
                disabled={value <= min}
                onClick={() => onChange(-1)}
            >
             −
            </button>
            <output
            aria-labelledby={labelId}
            className="flex h-7 w-10 items-center justify-center rounded-md border border-gray-300 text-sm font-bold"
            >
                {value}
            </output>
            <button
                type="button"
                className={BUTTON_CLASS}
                aria-label={`${texts.stepper.increase} ${label}`}
                onClick={() => onChange(1)}
                >
                    +

                </button>
            </div>
            );  
};