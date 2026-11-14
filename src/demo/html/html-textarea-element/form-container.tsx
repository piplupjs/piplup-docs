'use client';

import { HtmlTextareaElement } from '@piplup/rhf-adapters/html';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      onError={(error) => {
        alert(JSON.stringify(error, null, 2));
      }}
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
    >
      <HtmlTextareaElement
        className="border px-2 block rounded w-full"
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
    </FormContainer>
  );
}
