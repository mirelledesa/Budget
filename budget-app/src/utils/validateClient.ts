import { z } from 'zod';
import { EMAIL_REGEX, NAME_MIN_LENGTH, PHONE_REGEX } from '../constants/validation';
import texts from '../data/ca.json';
import type { ClientData } from '../types/budget';

export type ClientErrors = Partial<Record<keyof ClientData, string>>;

const clientSchema = z.object({
  fullName: z.string().trim().min(NAME_MIN_LENGTH, texts.form.errors.fullName),
  phone: z.string().trim().regex(PHONE_REGEX, texts.form.errors.phone),
  email: z.string().trim().regex(EMAIL_REGEX, texts.form.errors.email),
});

export const validateClient = (client: ClientData): ClientErrors => {
  const result = clientSchema.safeParse(client);

  if (result.success) {
    return {};
  }

  const errors: ClientErrors = {};

  for (const issue of result.error.issues) {
    const field = issue.path[0] as keyof ClientData;

    if (!errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
};