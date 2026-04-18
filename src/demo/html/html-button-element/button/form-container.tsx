"use client";

import { FormContainer } from "@piplup/rhf-core";
import { HtmlButtonElement, HtmlInputElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  return (
    <FormContainer
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
    >
      <div>
        <HtmlInputElement
          name="input"
          placeholder="Type text here"
          type="text"
          className="border px-2 block rounded"
        />
      </div>
      <div>
        <HtmlButtonElement
          type="button"
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
        >
          Button
        </HtmlButtonElement>
      </div>
    </FormContainer>
  );
}
