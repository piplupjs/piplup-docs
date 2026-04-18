"use client";

import { useForm } from "react-hook-form";
import { HtmlTextareaElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm();
  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        alert(JSON.stringify(data, null, 2));
      })}
    >
      <HtmlTextareaElement
        control={control}
        rows={4}
        defaultValue=""
        name="description"
        placeholder="Enter a description"
        className="border px-2 block rounded w-full"
      />
      <input
        type="submit"
        value="Submit"
        className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
      />
    </form>
  );
}
