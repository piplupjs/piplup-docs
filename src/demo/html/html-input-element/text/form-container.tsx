'use client';

import { FormContainer } from '@piplup/rhf-core';
import { HtmlInputElement } from '@piplup/rhf-adapters/html';

export default function Page() {
  return (
    <FormContainer
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
      onError={(errors) => {
        alert(JSON.stringify(errors, null, 2));
      }}
      defaultValues={{
        input: ''
      }}
    >
      <HtmlInputElement 
        name="input"
        placeholder="Type text here"
        type="text"
        className="border px-2 block rounded"
      />
      <input
        type="submit"
        value="Submit"
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
      />
    </FormContainer>
  );
}