"use client";

import { type Control, useForm } from "react-hook-form";
import { useFormStateAdapter } from "@piplup/rhf-core";
import {
  HtmlButtonElement,
  HtmlFormHelperTextElement,
} from "@piplup/rhf-adapters/html";

type FieldValues = {
  email: string;
  password: string;
};

function SubmitSummary({ control }: { control?: Control<FieldValues> }) {
  const summary = useFormStateAdapter({
    name: ["email", "password"],
    helperText: "Please fix the highlighted fields before continuing.",
    disableOnIsSubmitting: true,
    control,
    className: "bg-red-500/10 text-red-500 px-4 py-1 rounded w-fit",
  });

  if (!summary.error) {
    return null;
  }

  return (
    <p className={summary.className} style={summary.style} aria-live="polite">
      {summary.helperText}
    </p>
  );
}

export default function Page() {
  const { control, handleSubmit, register } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
      noValidate
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "Email is required.",
          })}
          className="border rounded block px-2"
        />
        <HtmlFormHelperTextElement
          control={control}
          name="email"
          renderOnError
          className="text-red-500"
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required.",
          })}
          className="border rounded block px-2"
        />
        <HtmlFormHelperTextElement
          control={control}
          name="password"
          renderOnError
          className="text-red-500"
        />
      </div>
      <SubmitSummary control={control} />
      <div className="flex flex-row gap-2 items-center mt-3">
        <button
          type="submit"
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded"
        >
          Submit
        </button>
        <HtmlButtonElement
          control={control}
          type="reset"
          className="border border-black hover:border-black/90 px-4 py-1 rounded"
        >
          Reset
        </HtmlButtonElement>
      </div>
    </form>
  );
}
