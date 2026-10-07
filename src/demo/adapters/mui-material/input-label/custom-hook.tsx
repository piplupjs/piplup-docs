"use client";

import { type ChangeEvent, useId } from "react";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import {
  MuiButtonElement,
  useMuiInputAdapterProps,
  useMuiInputLabelAdapter,
} from "@piplup/rhf-adapters/mui-material";
import { type Control, useForm } from "react-hook-form";

type FormValues = { promoCode: string };

// The floating label turns red when the promo code is invalid. The label
// hook does not register anything; it only reads the field's error.
function PromoCodeField({ control }: { control: Control<FormValues> }) {
  const id = useId();

  const { helperText: _labelHelperText, ...label } = useMuiInputLabelAdapter<
    FormValues,
    "promoCode",
    HTMLLabelElement
  >({
    control,
    name: "promoCode",
  });

  const { ref, helperText, ...input } = useMuiInputAdapterProps({
    control,
    name: "promoCode",
    pattern: /^[A-Z]{4}-\d{4}$/,
    composeHelperText: true,
    helperText: "Optional, e.g. SAVE-2024",
    messages: { pattern: "Codes look like SAVE-2024" },
    transform: {
      output: (event: ChangeEvent<HTMLInputElement>) =>
        event.target.value.toUpperCase(),
    },
  });

  return (
    <FormControl variant="standard">
      <InputLabel {...label} htmlFor={id}>
        Promo code
      </InputLabel>
      <Input {...input} id={id} inputRef={ref} />
      <FormHelperText error={input.error}>{helperText}</FormHelperText>
    </FormControl>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { promoCode: "" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        alert(JSON.stringify(values, null, 2)),
      )}
    >
      <Stack direction="column" spacing={2}>
        <PromoCodeField control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Apply
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
