"use client";

import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { MuiFileInputElement } from "@piplup/rhf-adapters/mui-file-input";
import { MuiButtonElement } from "@piplup/rhf-adapters/mui-material";
import { useForm } from "react-hook-form";

const MAX_SIZE = 1024 * 1024; // 1 MB

type FormValues = { photos: File[] };

export default function Page() {
  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: { photos: [] },
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit((values) =>
        // File objects serialize to {} with JSON.stringify, so list them by hand.
        alert(
          values.photos.map((file) => `${file.name} (${Math.round(file.size / 1024)} KB)`).join("\n"),
        ),
      )}
    >
      <Stack direction="column" spacing={2}>
        <MuiFileInputElement
          control={control}
          name="photos"
          label="Photos"
          placeholder="Choose up to 3 images"
          multiple
          required
          messages={{ required: "Attach at least one photo" }}
          // `accept` only filters the browser's file picker. The rules below enforce it.
          slotProps={{ htmlInput: { accept: "image/*" } }}
          rules={{
            validate: {
              count: (files) => files.length <= 3 || "Attach up to 3 photos",
              type: (files) =>
                files.every((file) => file.type.startsWith("image/")) ||
                "Only image files are allowed",
              size: (files) =>
                files.every((file) => file.size <= MAX_SIZE) || "Each photo must be 1 MB or smaller",
            },
          }}
        />
        <Stack direction="row" spacing={1}>
          <MuiButtonElement control={control} variant="contained" type="submit">
            Upload
          </MuiButtonElement>
          <Button variant="outlined" onClick={() => reset()}>
            Reset
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
