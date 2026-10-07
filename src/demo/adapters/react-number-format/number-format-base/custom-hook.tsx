"use client";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useNumberFormatBaseAdapter } from "@piplup/rhf-adapters/react-number-format";
import { type Control, useForm } from "react-hook-form";
import { NumberFormatBase } from "react-number-format";

type FormValues = { expiry: string };

// Turns the typed digits into "MM/YY" and keeps the month between 01 and 12.
function formatExpiry(digits: string) {
  if (digits === "") {
    return "";
  }

  let month = digits.slice(0, 2);
  const year = digits.slice(2, 4);

  if (month.length === 1 && Number(month) > 1) {
    month = `0${month}`;
  } else if (month === "00") {
    month = "01";
  } else if (Number(month) > 12) {
    month = "12";
  }

  return month.length < 2 ? month : `${month}/${year}`;
}

// The form stores the digits only, e.g. "0428" for "04/28".
function isExpired(digits: string) {
  const month = Number(digits.slice(0, 2));
  const year = 2000 + Number(digits.slice(2, 4));
  const now = new Date();

  return year < now.getFullYear() || (year === now.getFullYear() && month < now.getMonth() + 1);
}

function CardExpiryField({ control }: { control: Control<FormValues> }) {
  const adapter = useNumberFormatBaseAdapter<string, FormValues, "expiry">({
    control,
    name: "expiry",
    required: true,
    composeHelperText: true,
    helperText: "MM/YY",
    messages: { required: "Enter the card's expiry date" },
    rules: {
      validate: {
        complete: (value) => value.length === 4 || "Enter both month and year",
        notExpired: (value) => !isExpired(value) || "This card has expired",
      },
    },
  });

  return (
    <NumberFormatBase
      customInput={TextField}
      label="Expiry date"
      format={formatExpiry}
      {...adapter}
    />
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { expiry: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        <CardExpiryField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Save card
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
