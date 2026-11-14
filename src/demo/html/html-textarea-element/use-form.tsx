'use client';

import { HtmlTextareaElement } from '@piplup/rhf-adapters/html';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
      })}
      noValidate
    >
      <HtmlTextareaElement
        className="border px-2 block rounded w-full"
        control={control}
        defaultValue=""
        name="description"
        placeholder="Enter a description"
        rows={4}
      />
      <input
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
        type="submit"
        value="Submit"
      />
    </form>
  );
}
