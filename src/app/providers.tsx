"use client";

import { ThemeProvider } from "next-themes";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import { ColorModeProvider } from "@/components/ui/color-mode";
import { ReactNode } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/utils/i18n";

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
        navbarHover: {
          value: {
            base: "#efefef",
            _dark: "#2d3748",
          },
        },
        box: {
          value: {
            base: "#ffffff",
            _dark: "#1E293B",
          },
        },
        boxHeader: {
          value: {
            base: "#fff1f1",
            _dark: "#283548",
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
        themeRed: {
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

export function Provider(props: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider attribute="class" disableTransitionOnChange>
        <ColorModeProvider>{props.children}</ColorModeProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export function I18nProvider({ children }: { children: ReactNode }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
