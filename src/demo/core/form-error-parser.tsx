'use client';

import { HtmlFormHelperTextElement, HtmlInputElement } from '@piplup/rhf-adapters/html';
import { FormErrorProvider } from '@piplup/rhf-core';
import { useForm } from 'react-hook-form';

export default function Page() {
  const { control, handleSubmit } = useForm();

  return (
    <FormErrorProvider
      errorParser={(error) => {
        const message = error?.message;
        if (typeof message === 'string') {
          switch (message) {
            case 'message.field.required':
              return 'This field is required';
            default:
              return message;
          }
        }
        return null;
      }}
    >
      <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data, null, 2));
        })}
        noValidate
      >
        <div>
          <HtmlInputElement
            messages={{
              required: 'message.field.required',
            }}
            className="border px-2 rounded"
            control={control}
            name="message"
            required
          />
          <HtmlFormHelperTextElement
            style={({ error }) => ({
              ...(error && { color: 'red' }),
            })}
            control={control}
            name="message"
            renderOnError
          />
        </div>
        <button
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </FormErrorProvider>
  );
}
