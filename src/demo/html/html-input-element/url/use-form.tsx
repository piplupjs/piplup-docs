'use client';

import { HtmlInputElement } from '@piplup/rhf-adapters/html';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      website: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
      })}
      noValidate
    >
      <HtmlInputElement
        control={control}
        name="website"
        placeholder="Type your website url"
        type="url"
      />
    </form>
  );
}
