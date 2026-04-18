"use client";

import { useForm } from "react-hook-form";
import { HtmlInputElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      datetimeLocal: "",
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
      })}
    >
      <HtmlInputElement
        name="datetimeLocal"
        type="datetime-local"
        control={control}
      />
    </form>
  );
}