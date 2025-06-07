"use client";

import { ThemeProvider } from "next-themes";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";

const config = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        bg: {
          value: {
            base: "#fdf8f8",
            _dark: "#182234",
          },
        },
        navbarBg: {
          value: {
            base: "#ffffff",
            _dark: "#1a202c",
          },
        },
        box: {
          value: {
            base: "#ffffff",
            _dark: "#1E293B",
          },
        },
        border: {
          value: {
            base: "#E5E7EB",
            _dark: "#334155",
          },
        },
        text: {
          value: {
            base: "#1e293b",
            _dark: "#fdf8f8",
          },
        },
        text_secondary: {
          value: {
            base: "#6B7280",
            _dark: "#94a3b8",
          },
        },
        red: {
          value: {
            base: "#E92933",
            _dark: "#F87171",
          },
          _hover: {
            value: {
              base: "#DC2626",
              _dark: "#F87171",
            },
          },
        },
      },
    },
  },
  globalCss: {},
});

const system = createSystem(defaultConfig, config);

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ColorModeProvider>{props.children}</ColorModeProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}
