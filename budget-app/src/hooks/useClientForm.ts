import { useState, type ChangeEvent, type FormEvent } from 'react';
import texts from '../data/ca.json';
import type { ClientData } from '../types/budget';
import { validateClient, type ClientErrors } from '../utils/validateClient';

type FormErrors = ClientErrors & { services?: string };
type SubmitStatus = 'idle' | 'success' | 'error';

interface UseClientFormOptions {
  hasSelectedServices: boolean;
  onSubmit: (client: ClientData) => boolean;
}

const EMPTY_CLIENT: ClientData = { fullName: '', phone: '', email: '' };

export const useClientForm = ({ hasSelectedServices, onSubmit }: UseClientFormOptions) => {
  const [values, setValues] = useState<ClientData>(EMPTY_CLIENT);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SubmitStatus>('idle');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setStatus('idle');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const cleanClient: ClientData = {
      fullName: values.fullName.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
    };

    const clientErrors = validateClient(cleanClient);
    const nextErrors: FormErrors = hasSelectedServices
      ? clientErrors
      : { ...clientErrors, services: texts.form.errors.services };

    setErrors(nextErrors);
    setStatus('idle');

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const wasSaved = onSubmit(cleanClient);

    if (!wasSaved) {
      setStatus('error');
      return;
    }

    setValues(EMPTY_CLIENT);
    setStatus('success');
  };

  return { values, errors, status, handleChange, handleSubmit };
};