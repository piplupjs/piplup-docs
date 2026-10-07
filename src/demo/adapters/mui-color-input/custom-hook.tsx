"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useMuiColorInputAdapter } from "@piplup/rhf-adapters/mui-color-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { MuiColorInput, matchIsValidColor } from "mui-color-input";
import { type Control, useForm, useWatch } from "react-hook-form";

type FormValues = { buttonColor: string };

// Perceived brightness of a "#rrggbb" color, from 0 (black) to 255 (white).
function brightness(hex: string) {
  const rgb = parseInt(hex.slice(1, 7), 16);
  const r = (rgb >> 16) & 255;
  const g = (rgb >> 8) & 255;
  const b = rgb & 255;

  return (r * 299 + g * 587 + b * 114) / 1000;
}

// A color field for button backgrounds: hex only, no alpha,
// and it rejects colors too light for white button text.
function ButtonColorField({ control }: { control: Control<FormValues> }) {
  const adapter = useMuiColorInputAdapter<string, FormValues, "buttonColor", HTMLDivElement>({
    control,
    name: "buttonColor",
    required: true,
    composeHelperText: true,
    helperText: "Used behind white button text",
    messages: { required: "Pick a button color" },
    rules: {
      validate: {
        valid: (value) => matchIsValidColor(value) || "Enter a valid hex color",
        contrast: (value) => brightness(value) < 128 || "Too light for white text",
      },
    },
  });

  return <MuiColorInput label="Button color" format="hex" isAlphaHidden {...adapter} />;
}

function Preview({ control }: { control: Control<FormValues> }) {
  const color = useWatch({ control, name: "buttonColor" });
  const background = matchIsValidColor(color) ? color : undefined;

  return (
    <Button variant="contained" sx={{ bgcolor: background, alignSelf: "flex-start" }}>
      Preview
    </Button>
  );
}

export default function Page() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: { buttonColor: "#1976d2" },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) => alert(JSON.stringify(values, null, 2)))}
    >
      <Stack direction="column" spacing={2}>
        <ButtonColorField control={control} />
        <Preview control={control} />
        <div>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Save theme
          </MuiButtonElement>
        </div>
      </Stack>
    </form>
  );
}
