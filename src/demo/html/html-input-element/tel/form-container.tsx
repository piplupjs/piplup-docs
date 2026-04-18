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
        phone: "",
      }}
    >
      <HtmlInputElement
        name="phone"
        placeholder="Type your phone number"
        type="tel"
      />
    </FormContainer>
  );
}