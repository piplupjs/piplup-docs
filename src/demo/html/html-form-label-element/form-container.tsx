"use client";

import {
  HtmlFormHelperTextElement,
  HtmlFormLabelElement,
  HtmlInputElement,
} from "@piplup/rhf-adapters/html";
import { FormContainer } from "@piplup/rhf-core";

export default function Page() {
  return (
    <FormContainer
      onSubmit={(data) => {
        alert(JSON.stringify(data, null, 2));
      }}
      onError={(error) => {
        alert(JSON.stringify(error, null, 2));
      }}
      defaultValues={{
        email: "",
      }}
    >
      <div>
        <HtmlFormLabelElement
          htmlFor="email"
          name="email"
          className="block"
          style={({ error }) => ({
            ...(error && { color: "red" }),
          })}
        >
          Email
        </HtmlFormLabelElement>
        <HtmlInputElement
          name="email"
          required
          messages={{
            required: "Email is required",
          }}
          aria-describedby="email-help"
          placeholder="Enter your email address"
          aria-labelledby="email-label"
          className="border px-2 block rounded"
        />
        <HtmlFormHelperTextElement id="email-help" name="email">
          &quot;e.g. test@gmail.com&quot;
        </HtmlFormHelperTextElement>
      </div>
      <input
        type="submit"
        value="Submit"
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
      />
    </FormContainer>
  );
}
