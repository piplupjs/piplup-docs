"use client";

import { type Control, useForm } from "react-hook-form";
import { useFormReset } from "@piplup/rhf-core";

type FieldValues = {
  firstName: string;
  subscribed: boolean;
};

function ResetButton({ control }: { control?: Control<FieldValues> }) {
  const reset = useFormReset({
    control,
  });

  return (
    <button
      type="button"
      className="border border-black hover:border-black/90 px-4 py-1 rounded"
      onClick={() =>
        reset(
          {
            firstName: "Taylor",
            subscribed: false,
          },
          { keepDirty: false },
        )
      }
    >
      Reset form
    </button>
  );
}

export default function Page() {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      firstName: "Taylor",
      subscribed: false,
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
        <label htmlFor="firstName">First name</label>
        <input
          id="firstName"
          {...register("firstName")}
          className="border rounded block px-2"
        />
      </div>

      <label className="flex flex-row gap-2 items-center">
        <input
          type="checkbox"
          {...register("subscribed")}
          className="border rounded"
        />
        Subscribe to updates
      </label>

      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button
          type="submit"
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded"
        >
          Submit
        </button>
        <ResetButton control={control} />
      </div>
    </form>
  );
}
