"use client";

import Stack from "@mui/material/Stack";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { MuiTelInputElement } from "@piplup/rhf-adapters/mui-tel-input";
import { type MuiTelInputCountry, matchIsValidTel } from "mui-tel-input";
import { useForm } from "react-hook-form";

const COUNTRIES: MuiTelInputCountry[] = ["GB", "IE", "US"];

export default function Page() {
  const { control, handleSubmit } = useForm({ defaultValues: { phone: "" } });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        <MuiTelInputElement
          control={control}
          name="phone"
          label="Mobile number"
          defaultCountry="GB"
          onlyCountries={COUNTRIES}
          required
          messages={{ required: "Enter a phone number" }}
          rules={{
            validate: (value) =>
              matchIsValidTel(value, { onlyCountries: COUNTRIES }) ||
              "Enter a valid UK, Irish or US number",
          }}
        />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Submit
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
