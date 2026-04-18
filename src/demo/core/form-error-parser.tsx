"use client";

import { useForm } from "react-hook-form";
import { FormErrorProvider } from "@piplup/rhf-core";
import {
  HtmlFormHelperTextElement,
  HtmlInputElement,
} from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm();

  return (
    <FormErrorProvider
      errorParser={(error) => {
        const message = error?.message;
        if (typeof message === "string") {
          switch (message) {
            case "message.field.required":
              return "This field is required";
            default:
              return message;
          }
        }
        return null;
      }}
    >
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data, null, 2));
        })}
      >
        <div>
          <HtmlInputElement
            control={control}
            name="message"
            required
            className="border px-2 rounded"
            messages={{
              required: "message.field.required",
            }}
          />
          <HtmlFormHelperTextElement
            control={control}
            name="message"
            style={({ error }) => ({
              ...(error && { color: "red" }),
            })}
            renderOnError
          />
        </div>
        <button
          type="submit"
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
        >
          Submit
        </button>
      </form>
    </FormErrorProvider>
  );
}
