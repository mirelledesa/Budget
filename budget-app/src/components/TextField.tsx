import { useId, type ChangeEventHandler } from 'react';

type FieldType = 'text' | 'tel' | 'email';

interface TextFieldProps {
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: FieldType;
  autoComplete?: string;
  error?: string;
}

const BASE_INPUT_CLASS =
  'w-full rounded-md border px-3 py-2 text-xs placeholder:text-gray-500 ' +
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong';

export const TextField = ({
  name,
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  autoComplete,
  error,
}: TextFieldProps) => {
  const inputId = useId();
  const errorId = `${inputId}-error`;
  const borderClass = error ? 'border-red-700' : 'border-gray-300';

  return (
    <div className="flex-1">
      <label htmlFor={inputId} className="sr-only">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={onChange}
        className={`${BASE_INPUT_CLASS} ${borderClass}`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
};