'use client';

import { HtmlButtonElement, HtmlFormHelperTextElement } from '@piplup/rhf-adapters/html';
import { useFormStateAdapter } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FieldValues = {
  email: string;
  password: string;
};

function SubmitSummary({ control }: { control?: Control<FieldValues> }) {
  const summary = useFormStateAdapter({
    className: 'bg-red-500/10 text-red-500 px-4 py-1 rounded w-fit',
    control,
    disableOnIsSubmitting: true,
    helperText: 'Please fix the highlighted fields before continuing.',
    name: ['email', 'password'],
  });

  if (!summary.error) {
    return null;
  }

  return (
    <p aria-live="polite" className={summary.className} style={summary.style}>
      {summary.helperText}
    </p>
  );
}

export default function Page() {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register('email', {
            required: 'Email is required.',
          })}
          className="border rounded block px-2"
        />
        <HtmlFormHelperTextElement
          className="text-red-500"
          control={control}
          name="email"
          renderOnError
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            required: 'Password is required.',
          })}
          className="border rounded block px-2"
        />
        <HtmlFormHelperTextElement
          className="text-red-500"
          control={control}
          name="password"
          renderOnError
        />
      </div>
      <SubmitSummary control={control} />
      <div className="flex flex-row gap-2 items-center mt-3">
        <button className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded" type="submit">
          Submit
        </button>
        <HtmlButtonElement
          className="border border-black hover:border-black/90 px-4 py-1 rounded"
          control={control}
          type="reset"
        >
          Reset
        </HtmlButtonElement>
      </div>
    </form>
  );
}
