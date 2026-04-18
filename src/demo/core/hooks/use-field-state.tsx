"use client";

import { useForm, type Control } from "react-hook-form";
import { useFieldState } from "@piplup/rhf-core";
import { HtmlButtonElement } from "@piplup/rhf-adapters/html";

type FieldValues = {
  password: string;
};

function PasswordStatus({ control }: { control?: Control<FieldValues> }) {
  const fieldState = useFieldState({
    name: "password",
    control,
  });

  if (!fieldState.isTouched) {
    return <p>Start typing to validate your password.</p>;
  }

  return (
    <p style={{ color: fieldState.invalid ? "red" : "green" }}>
      {fieldState.invalid
        ? (fieldState.error?.message ?? "Password is invalid.")
        : "Password looks good."}
    </p>
  );
}

export default function Page() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
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
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters.",
            },
          })}
          className="border rounded block px-2"
        />
      </div>
      <PasswordStatus control={control} />
      <div className="flex flex-row gap-2">
        <HtmlButtonElement className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded" control={control} type="submit">
          Submit
        </HtmlButtonElement>
        <HtmlButtonElement className="border border-black hover:border-black/90 px-4 py-1 rounded" control={control} type="reset">
          Reset
        </HtmlButtonElement>
      </div>
    </form>
  );
}
