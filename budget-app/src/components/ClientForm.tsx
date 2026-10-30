import texts from '../data/ca.json';
import { useClientForm } from '../hooks/useClientForm';
import type { ClientData } from '../types/budget';
import { TextField } from './TextField';

interface FieldConfig {
  name: keyof ClientData;
  type: 'text' | 'tel' | 'email';
  autoComplete: string;
}

const FIELDS: FieldConfig[] = [
  { name: 'fullName', type: 'text', autoComplete: 'name' },
  { name: 'phone', type: 'tel', autoComplete: 'tel' },
  { name: 'email', type: 'email', autoComplete: 'email' },
];

interface ClientFormProps {
  hasSelectedServices: boolean;
  onSubmit: (client: ClientData) => boolean;
}

export const ClientForm = ({ hasSelectedServices, onSubmit}: ClientFormProps) => {
  const { values, errors, status, handleChange, handleSubmit 

   } = useClientForm({
      hasSelectedServices,
    onSubmit,
     });

  return (
    <section aria-labelledby="client-form-title" className="rounded-2xl bg-white p-6 shadow-md">
      <h2 id="client-form-title" className="text-lg font-bold">
        {texts.form.title}
      </h2>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col gap-4 md:flex-row md:items-start"
      >
        {FIELDS.map(({ name, type, autoComplete }) => (
          <TextField
            key={name}
            name={name}
            type={type}
            autoComplete={autoComplete}
            label={texts.form.fields[name].label}
            placeholder={texts.form.fields[name].placeholder}
            value={values[name]}
            error={errors[name]}
            onChange={handleChange}
          />
        ))}
        <button
          type="submit"
          className="rounded-md bg-brand-strong px-4 py-2 text-xs font-bold text-white hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-strong focus-visible:ring-offset-2 md:whitespace-nowrap"
        >
          {texts.form.submit} <span aria-hidden="true">→</span>
        </button>
      </form>

      {!hasSelectedServices && errors.services && (
        <p role="alert" className="mt-3 text-xs font-semibold text-red-700">
          {errors.services}
        </p>
      )}

      {status === 'success' && (
  <p role="status" className="mt-3 text-xs font-semibold text-brand-strong">
    {texts.form.success}
  </p>
)}

{status === 'error' && (
  <p role="alert" className="mt-3 text-xs font-semibold text-red-700">
    {texts.form.saveError}
  </p>
    )}
    </section>
  );
};