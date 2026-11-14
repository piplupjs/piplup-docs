'use client';

import { HtmlInputElement } from '@piplup/rhf-adapters/html';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{
        altitude: '',
      }}
      onError={(errors) => {
        alert(JSON.stringify(errors, null, 2));
      }}
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
    >
      <HtmlInputElement name="altitude" type="range" />
    </FormContainer>
  );
}
