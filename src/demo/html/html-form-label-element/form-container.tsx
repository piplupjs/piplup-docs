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
      defaultValues={{
        email: '',
      }}
      onError={(error) => {
        alert(JSON.stringify(error, null, 2));
      }}
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
    >
      <div>
        <HtmlFormLabelElement
          style={({ error }) => ({
            ...(error && { color: 'red' }),
          })}
          className="block"
          htmlFor="email"
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
          name="email"
          placeholder="Enter your email address"
          required
        />
        <HtmlFormHelperTextElement id="email-help" name="email">
          &quot;e.g. test@gmail.com&quot;
        </HtmlFormHelperTextElement>
      </div>
      <input
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
        type="submit"
        value="Submit"
      />
    </FormContainer>
  );
}
