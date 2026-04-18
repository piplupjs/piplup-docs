"use client";

import { useForm } from "react-hook-form";
import { HtmlButtonElement, HtmlInputElement } from "@piplup/rhf-adapters/html";

export default function Page() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      input: "",
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
          name="input"
          placeholder="Type text here"
          type="text"
          control={control}
          className="border px-2 block rounded"
        />
      </div>
      <div>
        <HtmlButtonElement
          control={control}
          type="reset"
          className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded mt-3"
        >
          Reset
        </HtmlButtonElement>
      </div>
    </form>
  );
}
