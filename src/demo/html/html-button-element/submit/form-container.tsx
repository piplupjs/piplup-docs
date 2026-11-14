'use client';

import { HtmlButtonElement, HtmlInputElement } from '@piplup/rhf-adapters/html';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
    >
      <div>
        <HtmlInputElement
          className="border px-2 block rounded"
          name="input"
          placeholder="Type text here"
          type="text"
          disableOnIsSubmitting
        />
      </div>
      <div>
        <HtmlButtonElement
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
          type="submit"
          disableOnIsSubmitting
        >
          Submit
        </HtmlButtonElement>
      </div>
    </FormContainer>
  );
}
