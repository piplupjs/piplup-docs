"use client";

import { useForm, type Control } from "react-hook-form";
import { useFormSetFocus } from "@piplup/rhf-core";

type FieldValues = {
  email: string;
  password: string;
};

function FocusEmailButton({ control }: { control?: Control<FieldValues> }) {
  const setFocus = useFormSetFocus({ control });

  return (
    <button
      type="button"
      onClick={() => setFocus("email", { shouldSelect: true })}
      className="border border-black hover:border-black/90 px-4 py-1 rounded"
    >
      Focus email
    </button>
  );
}

export default function Page() {
  const { control, register, handleSubmit } = useForm({
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
          className="border rounded block px-2"
          {...register("email")}
        />
      </div>

      <div style={{ marginTop: 12 }}>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="border rounded block px-2"
          {...register("password")}
        />
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          type="submit"
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded"
        >
          Submit
        </button>
        <FocusEmailButton control={control} />
      </div>
    </form>
  );
}
