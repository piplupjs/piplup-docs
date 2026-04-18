"use client";

import { useForm } from "react-hook-form";
import {
  HtmlFormHelperTextElement,
  HtmlFormLabelElement,
  HtmlInputElement,
} from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: "",
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data));
      })}
    >
      <div>
        <HtmlFormLabelElement
          id="email-label"
          htmlFor="email"
          control={control}
          name="email"
          className="block"
          style={({ error }) => ({
            ...(error && { color: "red" }),
          })}
        >
          Email
        </HtmlFormLabelElement>
        <HtmlInputElement
          control={control}
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
        <HtmlFormHelperTextElement
          id="email-help"
          name="email"
          control={control}
        >
          &quot;e.g. test@gmail.co&quot;
        </HtmlFormHelperTextElement>
      </div>
      <input
        type="submit"
        value="Submit"
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
      />
    </form>
  );
}
