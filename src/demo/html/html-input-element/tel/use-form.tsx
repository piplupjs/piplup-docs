"use client";

import { useForm } from "react-hook-form";
import { HtmlInputElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: "",
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
        name="phone"
        placeholder="Type your phone number"
        type="tel"
        control={control}
      />
    </form>
  );
}