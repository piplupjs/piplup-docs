'use client';

import { useFormSetFocus } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FieldValues = {
  email: string;
  password: string;
};

function FocusEmailButton({ control }: { control?: Control<FieldValues> }) {
  const setFocus = useFormSetFocus({ control });

  return (
    <button
      className="border border-black hover:border-black/90 px-4 py-1 rounded"
      onClick={() => setFocus('email', { shouldSelect: true })}
      type="button"
    >
      Focus email
    </button>
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
          className="border rounded block px-2"
          id="email"
          type="email"
          {...register('email')}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label htmlFor="password">Password</label>
        <input
          className="border rounded block px-2"
          id="password"
          type="password"
          {...register('password')}
        />
      </div>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded" type="submit">
          Submit
        </button>
        <FocusEmailButton control={control} />
      </div>
    </form>
  );
}
