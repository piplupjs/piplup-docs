'use client';

import {
  HtmlFormHelperTextElement,
  HtmlFormLabelElement,
  HtmlInputElement,
} from '@piplup/rhf-adapters/html';
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
        <HtmlFormLabelElement
          style={({ error }) => ({
            ...(error && { color: 'red' }),
          })}
          className="block"
          control={control}
          htmlFor="email"
          id="email-label"
          name="email"
        >
          Email
        </HtmlFormLabelElement>
        <HtmlInputElement
          messages={{
            required: 'Email is required',
          }}
          aria-describedby="email-help"
          aria-labelledby="email-label"
          className="border px-2 block rounded"
          control={control}
          name="email"
          placeholder="Enter your email address"
          required
        />
        <HtmlFormHelperTextElement control={control} id="email-help" name="email">
          &quot;e.g. test@gmail.co&quot;
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
