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
        checkbox: [],
      }}
    >
      <div>
        <HtmlInputElement
          id="one"
          name="checkbox"
          type="checkbox"
          value="one"
        />
        <label htmlFor="one">One</label>
      </div>
      <div>
        <HtmlInputElement
          id="two"
          name="checkbox"
          type="checkbox"
          value="two"
        />
        <label htmlFor="two">Two</label>
      </div>
    </FormContainer>
  );
}