"use client";

import { FormContainer } from "@piplup/rhf-core";
import { HtmlTextareaElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  return (
    <FormContainer
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
      onError={(error) => {
        alert(JSON.stringify(error, null, 2));
      }}
    >
      <HtmlTextareaElement
        rows={4}
        defaultValue=""
        name="description"
        placeholder="Enter a description"
        className="border px-2 block rounded w-full"
      />
      <input
        type="submit"
        value="Submit"
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
      />
    </FormContainer>
  );
}
