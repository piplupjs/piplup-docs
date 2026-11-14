'use client';

import { useFieldStateAdapter } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FieldValues = {
  email: string;
};

function EmailHelperText({ control }: { control?: Control<FieldValues> }) {
  const helper = useFieldStateAdapter({
    control,
    disableOnIsSubmitting: true,
    helperText: 'We will only use this for account updates.',
    name: 'email',
  });

  return (
    <p aria-live="polite" className={helper.className} style={helper.style}>
      {helper.helperText}
    </p>
  );
}

export default function Page() {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="name@example.com"
          type="email"
          {...register('email', {
            required: 'Email is required.',
          })}
          className="border rounded block px-2"
        />
      </div>
      <EmailHelperText control={control} />
      <button
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded"
        style={{ marginTop: 12 }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
