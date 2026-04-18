"use client";

import { useForm } from "react-hook-form";
import { HtmlInputElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      checkbox: [],
    },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
      })}
    >
      <div>
        <HtmlInputElement
          control={control}
          id="one"
          name="checkbox"
          type="checkbox"
          value="one"
        />
        <label htmlFor="one">One</label>
      </div>
      <div>
        <HtmlInputElement
          control={control}
          id="two"
          name="checkbox"
          type="checkbox"
          value="two"
        />
        <label htmlFor="two">Two</label>
      </div>
    </form>
  );
}