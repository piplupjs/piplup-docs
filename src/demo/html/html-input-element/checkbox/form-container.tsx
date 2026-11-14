'use client';

import { HtmlInputElement } from '@piplup/rhf-adapters/html';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{
        checkbox: [],
      }}
      onError={(errors) => {
        alert(JSON.stringify(errors, null, 2));
      }}
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
    >
      <div>
        <HtmlInputElement id="one" name="checkbox" type="checkbox" value="one" />
        <label htmlFor="one">One</label>
      </div>
      <div>
        <HtmlInputElement id="two" name="checkbox" type="checkbox" value="two" />
        <label htmlFor="two">Two</label>
      </div>
    </FormContainer>
  );
}
