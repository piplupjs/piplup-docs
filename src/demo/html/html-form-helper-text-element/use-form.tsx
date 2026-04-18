"use client";

import { useForm } from "react-hook-form";
import {
  HtmlFormHelperTextElement,
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
        <HtmlInputElement
          control={control}
          name="email"
          required
          messages={{
            required: "Email is required",
          }}
          aria-describedby="email-help"
          placeholder="Enter your email address"
          className="border px-2 block rounded"
        />
        <HtmlFormHelperTextElement
          id="email-help"
          name="email"
          control={control}
          style={({ error }) => ({
            ...(error && { color: "red" }),
          })}
        >
          &quot;e.g. test@gmail.com&quot;
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
