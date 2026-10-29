import { useState, type ChangeEvent, type FormEvent } from 'react';
import texts from '../data/ca.json';
import type { ClientData } from '../types/budget';
import { validateClient, type ClientErrors } from '../utils/validateClient';

type FormErrors = ClientErrors & { services?: string };

const EMPTY_CLIENT: ClientData = { fullName: '', phone: '', email: '' };

export const useClientForm = (hasSelectedServices: boolean) => {
  const [values, setValues] = useState<ClientData>(EMPTY_CLIENT);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setValues((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setIsSuccess(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const clientErrors = validateClient(values);
    const nextErrors: FormErrors = hasSelectedServices
      ? clientErrors
      : { ...clientErrors, services: texts.form.errors.services };

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setValues(EMPTY_CLIENT);
    setIsSuccess(true);
  };

  return { values, errors, isSuccess, handleChange, handleSubmit };
};