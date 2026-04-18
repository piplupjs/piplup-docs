"use client";

import { type Control, useForm } from "react-hook-form";
import { useFieldStateAdapter } from "@piplup/rhf-core";

type FieldValues = {
  email: string;
};

function EmailHelperText({ control }: { control?: Control<FieldValues> }) {
  const helper = useFieldStateAdapter({
    name: "email",
    helperText: "We will only use this for account updates.",
    disableOnIsSubmitting: true,
    control,
  });

  return (
    <p className={helper.className} style={helper.style} aria-live="polite">
      {helper.helperText}
    </p>
  );
}

export default function Page() {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      email: "",
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
          placeholder="name@example.com"
          {...register("email", {
            required: "Email is required.",
          })}
          className="border rounded block px-2"
        />
      </div>
      <EmailHelperText control={control} />
      <button
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded"
        type="submit"
        style={{ marginTop: 12 }}
      >
        Submit
      </button>
    </form>
  );
}
