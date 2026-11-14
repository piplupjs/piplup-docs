'use client';

import { HtmlButtonElement, HtmlInputElement } from '@piplup/rhf-adapters/html';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      input: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
      })}
      noValidate
    >
      <div>
        <HtmlInputElement
          className="border px-2 block rounded"
          control={control}
          name="input"
          placeholder="Type text here"
          type="text"
        />
      </div>
      <div>
        <HtmlButtonElement
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
          control={control}
          type="button"
        >
          Button
        </HtmlButtonElement>
      </div>
    </form>
  );
}
