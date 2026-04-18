"use client";

import { useForm } from "react-hook-form";
import { HtmlInputElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      option: "",
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
        <HtmlInputElement control={control} id="one" name="option" type="radio" value="one" />
        <label htmlFor="one">One</label>
      </div>
      <div>
        <HtmlInputElement control={control} id="two" name="option" type="radio" value="two" />
        <label htmlFor="two">Two</label>
      </div>
    </form>
  );
}