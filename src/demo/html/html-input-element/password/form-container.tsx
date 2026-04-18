"use client";

import { FormContainer } from "@piplup/rhf-core";
import { HtmlInputElement } from "@piplup/rhf-adapters/html";

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
        "secure-input": "",
      }}
    >
      <HtmlInputElement
        name="secure-input"
        placeholder="Type your super secret password here"
        type="password"
      />
    </FormContainer>
  );
}