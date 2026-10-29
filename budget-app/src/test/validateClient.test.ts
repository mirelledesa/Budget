import { describe, it, expect } from 'vitest';
import texts from '../data/ca.json';
import type { ClientData } from '../types/budget';
import { validateClient } from '../utils/validateClient';

const VALID_CLIENT: ClientData = {
  fullName: 'Mirelle Alemida
  phone: '111 111 111',
  email: 'mirelle@gmail.com',
};

describe('Feature: Client form validation', () => {
  it('Scenario: valid data -> no errors', () => {
    expect(validateClient(VALID_CLIENT)).toEqual({});
  });

  it('Scenario: empty fields -> one error per field', () => {
    const errors = validateClient({ fullName: '', phone: '', email: '' });

    expect(errors).toEqual({
      fullName: texts.form.errors.fullName,
      phone: texts.form.errors.phone,
      email: texts.form.errors.email,
    });
  });

  it('Scenario: invalid email -> only the email error', () => {
    const errors = validateClient({ ...VALID_CLIENT, email: 'joan@' });

    expect(errors).toEqual({ email: texts.form.errors.email });
  });

  it('Scenario: phone with too few digits -> phone error', () => {
    const errors = validateClient({ ...VALID_CLIENT, phone: '12345' });

    expect(errors).toEqual({ phone: texts.form.errors.phone });
  });

  it('Scenario: name with only spaces -> name error', () => {
    const errors = validateClient({ ...VALID_CLIENT, fullName: '   ' });

    expect(errors).toEqual({ fullName: texts.form.errors.fullName });
  });

  it('Scenario: international phone with plus sign -> valid', () => {
    expect(validateClient({ ...VALID_CLIENT, phone: '+34 666 666 666' })).toEqual({});
  });
});