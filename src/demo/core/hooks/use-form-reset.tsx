'use client';

import { useFormReset } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';

import type { Control } from 'react-hook-form';

type FieldValues = {
  firstName: string;
  subscribed: boolean;
};

function ResetButton({ control }: { control?: Control<FieldValues> }) {
  const reset = useFormReset({
    control,
  });

  return (
    <button
      onClick={() =>
        reset(
          {
            firstName: 'Taylor',
            subscribed: false,
          },
          { keepDirty: false },
        )
      }
      className="border border-black hover:border-black/90 px-4 py-1 rounded"
      type="button"
    >
      Reset form
    </button>
  );
}

export default function Page() {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      firstName: 'Taylor',
      subscribed: false,
    },
  });

  return (
    <form onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))} noValidate>
      <div>
        <label htmlFor="firstName">First name</label>
        <input id="firstName" {...register('firstName')} className="border rounded block px-2" />
      </div>

      <label className="flex flex-row gap-2 items-center">
        <input type="checkbox" {...register('subscribed')} className="border rounded" />
        Subscribe to updates
      </label>

      <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
        <button className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded" type="submit">
          Submit
        </button>
        <ResetButton control={control} />
      </div>
    </form>
  );
}
