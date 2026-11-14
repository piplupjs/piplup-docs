'use client';

import { HtmlFormHelperTextElement, HtmlInputElement } from '@piplup/rhf-adapters/html';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
      noValidate
    >
      <div>
        <HtmlInputElement
          messages={{
            required: 'Email is required',
          }}
          aria-describedby="email-help"
          className="border px-2 block rounded"
          control={control}
          name="email"
          placeholder="Enter your email address"
          required
        />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            ...(error && { color: 'red' }),
          })}
          control={control}
          id="email-help"
          name="email"
        >
          &quot;e.g. test@gmail.com&quot;
        </HtmlFormHelperTextElement>
      </div>
      <input
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
        type="submit"
        value="Submit"
      />
    </form>
  );
}
