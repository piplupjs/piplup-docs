/* eslint-disable react-hooks/refs */
"use client";

import * as React from "react";
import { FormContainer, useControllerAdapter } from "@piplup/rhf-core";

function CurrencyInput() {
  const adapter = useControllerAdapter<string>({
    name: "amount",
    defaultValue: 0,
    rules: {
      min: {
        value: 1,
        message: "Amount must be at least 1.",
      },
    },
    helperText: "Enter an amount greater than 0.",
    required: true,
    transform: {
      input: (value) => value.toString(),
      output: (event: React.ChangeEvent<HTMLInputElement>) =>
        Number(event.target.value || 0),
    },
  });

  return (
    <div>
      <label htmlFor="amount">Amount</label>
      <input
        id="amount"
        ref={adapter.ref}
        name={adapter.name}
        value={adapter.value}
        onChange={adapter.onChange}
        onBlur={adapter.onBlur}
        disabled={adapter.disabled}
        aria-invalid={adapter.error}
        className="border rounded block px-2"
      />
      <p style={{ color: adapter.error ? "red" : "inherit" }}>{adapter.helperText}</p>
    </div>
  );
}

export default function Page() {
  return (
    <FormContainer
      defaultValues={{ amount: 10 }}
      onSubmit={(values) => alert(JSON.stringify(values, null, 2))}
    >
      <CurrencyInput />
      <button className="bg-black hover:bg-black/90 px-4 py-1 text-white rounded" type="submit" style={{ marginTop: 12 }}>
        Submit
      </button>
    </FormContainer>
  );
}
