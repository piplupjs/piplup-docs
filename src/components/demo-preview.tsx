"use client";

import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// fumadocs (next-themes) toggles a `light`/`dark` class on <html>,
// so MUI's CSS variables follow the same selector.
const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },
  colorSchemes: { light: true, dark: true },
});

export function DemoPreview({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <div className="not-prose rounded-xl border bg-fd-background p-4">
        {children}
      </div>
    </ThemeProvider>
  );
}
