// components/LanguageSwitcher.tsx
"use client";

import { Menu, Portal, Button } from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const LANGUAGES = [
  { code: "en", label: "EN" },
  { code: "ko", label: "KO" },
];

export function LanguageSwitch() {
  const { i18n } = useTranslation();
  const current =
    LANGUAGES.find((l) => l.code === i18n.language) ?? LANGUAGES[0];

  const handleChange = (code: string) => {
    if (code !== current.code) {
      i18n.changeLanguage(code);
    }
  };

  console.log("Current language:", current.code);

  return (
    <Menu.Root navigate={({ value }) => handleChange(value)}>
      <Menu.Trigger asChild>
        <Button size="sm" bg="navbarBg" variant="outline" color="text">
          {current.label}
          <FaChevronDown />
        </Button>
      </Menu.Trigger>

      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="5rem" bg="navbarBg" color="text">
            <Menu.RadioItemGroup
              value={current.code}
              onValueChange={(e) => handleChange(e.value)}
            >
              {LANGUAGES.map((lang) => (
                <Menu.RadioItem
                  key={lang.code}
                  value={lang.code}
                  cursor="pointer"
                  color={current.code === lang.code ? "red" : "text"}
                  _hover={{ bg: "navbarHover" }}
                >
                  {lang.label}
                  <Menu.ItemIndicator />
                </Menu.RadioItem>
              ))}
            </Menu.RadioItemGroup>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
