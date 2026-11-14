'use client';

import { HtmlInputElement } from '@piplup/rhf-adapters/html';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      uploadFiles: [],
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
      })}
      noValidate
    >
      <HtmlInputElement control={control} name="uploadFiles" type="file" multiple />
    </form>
  );
}
