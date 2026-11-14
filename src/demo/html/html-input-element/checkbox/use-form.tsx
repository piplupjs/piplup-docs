'use client';

import { HtmlInputElement } from '@piplup/rhf-adapters/html';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      checkbox: [],
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
        <HtmlInputElement control={control} id="one" name="checkbox" type="checkbox" value="one" />
        <label htmlFor="one">One</label>
      </div>
      <div>
        <HtmlInputElement control={control} id="two" name="checkbox" type="checkbox" value="two" />
        <label htmlFor="two">Two</label>
      </div>
    </form>
  );
}
