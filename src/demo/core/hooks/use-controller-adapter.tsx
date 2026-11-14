/* eslint-disable react-hooks/refs */
'use client';

import * as React from 'react';

import { FormContainer, useControllerAdapter } from '@piplup/rhf-core';

function CurrencyInput() {
  const adapter = useControllerAdapter<string>({
    defaultValue: 0,
    helperText: 'Enter an amount greater than 0.',
    name: 'amount',
    required: true,
    rules: {
      min: {
        message: 'Amount must be at least 1.',
        value: 1,
      },
    },
    transform: {
      input: (value) => value.toString(),
      output: (event: React.ChangeEvent<HTMLInputElement>) => Number(event.target.value || 0),
    },
  });

  return (
    <div>
      <label htmlFor="amount">Amount</label>
      <input
        aria-invalid={adapter.error}
        className="border rounded block px-2"
        disabled={adapter.disabled}
        id="amount"
        name={adapter.name}
        onBlur={adapter.onBlur}
        onChange={adapter.onChange}
        ref={adapter.ref}
        value={adapter.value}
      />
      <p style={{ color: adapter.error ? 'red' : 'inherit' }}>{adapter.helperText}</p>
    </div>
  );
}

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ amount: 10 }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <CurrencyInput />
      <button
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded"
        style={{ marginTop: 12 }}
        type="submit"
      >
        Submit
      </button>
    </FormContainer>
  );
}
