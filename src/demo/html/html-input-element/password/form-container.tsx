'use client';

import { HtmlInputElement } from '@piplup/rhf-adapters/html';
import { FormContainer } from '@piplup/rhf-core';

export default function Page() {
  return (
    <FormContainer
      defaultValues={{
        'secure-input': '',
      }}
      onError={(errors) => {
        alert(JSON.stringify(errors, null, 2));
      }}
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
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
