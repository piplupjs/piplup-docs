'use client';

import {
  HtmlFormHelperTextElement,
  HtmlFormLabelElement,
  HtmlInputElement,
} from '@piplup/rhf-adapters/html';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ name: '' }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <div>
        <HtmlFormLabelElement htmlFor="name" name="name">
          Name
        </HtmlFormLabelElement>
        <HtmlInputElement
          className="border px-2 block rounded"
          id="name"
          name="name"
          placeholder="Type your name"
          required
        />
        <HtmlFormHelperTextElement
          style={({ error }) => ({
            ...(error && { color: 'red' }),
          })}
          name="name"
          renderOnError
        />
      </div>
      <button
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
        type="submit"
      >
        Submit
      </button>
    </FormContainer>
  );
}
