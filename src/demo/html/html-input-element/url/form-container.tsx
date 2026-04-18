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
        website: "",
      }}
    >
      <HtmlInputElement
        name="website"
        placeholder="Type your website url"
        type="url"
      />
    </FormContainer>
  );
}